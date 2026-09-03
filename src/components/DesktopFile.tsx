"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import ScrollSmoother from "gsap/ScrollSmoother";
import type {
  PointerEvent as ReactPointerEvent,
  ReactNode,
  RefObject,
} from "react";

export type DesktopFileProps = {
  url: string;
  defaultName: string;
  storageKey: string;
  noun: string;
  preview: string;
  pageCount: number;
  paperWidth?: number;
  contentScale?: number;
  home: (bounds: { width: number; height: number; self: number }) => Position;
  infoRows: (context: { name: string; pages: number }) => [string, string][][];
  children: ReactNode;
};
const DESKTOP_MEDIA_QUERY = "(min-width: 768px)";

const PAGE_W = 46;
const PAGE_H = 64;
const WELL = 80;
const LABEL_W = 122;

const DRAG_SLOP = 4;
const RENAME_DELAY = 700;
const EDGE = 12;

const WINDOW_ANIMATION_MS = 300;
const BACKDROP_ANIMATION_MS = 180;
const REDUCED_MOTION_MS = 140;
const WINDOW_RADIUS = "24px";
const WINDOW_EASING = "cubic-bezier(0.32, 0.72, 0, 1)";
const WINDOW_SHADOW =
  "0 28px 80px rgba(0,0,0,0.24), 0 3px 12px rgba(0,0,0,0.12)";
const SOURCE_SHADOW = "0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)";

const MENU_ITEM =
  "flex h-[22px] w-full shrink-0 items-center gap-2 rounded-[6px] px-3 text-left hover:bg-[#007AFF]/80 hover:text-white";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), Math.max(min, max));

const truncate = (name: string, max = 28) =>
  name.length <= max
    ? name
    : `${name.slice(0, max - 13)}…${name.slice(name.length - 12)}`;

const isDesktopViewport = () => window.matchMedia(DESKTOP_MEDIA_QUERY).matches;

type Position = { x: number; y: number };
type Rect = Pick<DOMRect, "left" | "top" | "width" | "height">;

const getSourceTransform = (source: Rect, destination: Rect) => {
  const sourceCenterX = source.left + source.width / 2;
  const sourceCenterY = source.top + source.height / 2;
  const destinationCenterX = destination.left + destination.width / 2;
  const destinationCenterY = destination.top + destination.height / 2;

  return `translate3d(${sourceCenterX - destinationCenterX}px, ${
    sourceCenterY - destinationCenterY
  }px, 0) scale3d(${Math.max(source.width / destination.width, 0.001)}, ${Math.max(
    source.height / destination.height,
    0.001,
  )}, 1)`;
};

const getPanelLayoutRect = (panel: HTMLElement): Rect => ({
  left: (window.innerWidth - panel.offsetWidth) / 2,
  top: (window.innerHeight - panel.offsetHeight) / 2,
  width: panel.offsetWidth,
  height: panel.offsetHeight,
});

const getBoundary = (root: HTMLElement) =>
  (root.offsetParent as HTMLElement | null) ?? root.closest("section");

function FileGraphic({
  name,
  preview,
  selected,
  showWell = true,
  hideLabel = false,
}: {
  name: string;
  preview: string;
  selected: boolean;
  showWell?: boolean;
  hideLabel?: boolean;
}) {
  return (
    <>
      <div
        className={`grid place-items-center rounded-lg border-2 ${
          selected && showWell ? "border-white/40" : "border-transparent"
        }`}
        style={{
          width: WELL,
          height: WELL,
          background: selected && showWell ? "rgba(0,0,0,0.1)" : "transparent",
        }}
      >
        <div
          style={{
            filter:
              "drop-shadow(0 1px 1px rgba(0,0,0,0.20)) drop-shadow(0 3px 6px rgba(0,0,0,0.11))",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-cv-page
            src={preview}
            width={PAGE_W}
            height={PAGE_H}
            alt=""
            className="block"
            aria-hidden="true"
          />
        </div>
      </div>

      <div
        data-file-name
        className="mt-0.5 max-h-[36px] overflow-hidden px-0.5 text-center text-xs font-semibold"
        style={{ width: LABEL_W, visibility: hideLabel ? "hidden" : undefined }}
      >
        <span
          className="rounded-[5px] px-1 py-px"
          style={{
            background: selected ? "#007AFF" : "transparent",
            color: selected ? "#FFFFFF" : "rgba(0,0,0,0.85)",
            boxDecorationBreak: "clone",
            WebkitBoxDecorationBreak: "clone",
          }}
        >
          {truncate(name)}
        </span>
      </div>
    </>
  );
}

export default function DesktopFile({
  url,
  defaultName,
  storageKey,
  noun,
  preview,
  pageCount,
  paperWidth = 768,
  contentScale = 1,
  home: homeFor,
  infoRows,
  children,
}: DesktopFileProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const dragImageRef = useRef<HTMLDivElement | null>(null);

  const posRef = useRef<Position>({ x: 0, y: 0 });
  const placedRef = useRef(false);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    grabX: number;
    grabY: number;
    originLeft: number;
    originTop: number;
    moved: boolean;
    onName: boolean;
    wasSelected: boolean;
  } | null>(null);
  const renameTimer = useRef<number | null>(null);
  const stopTrackingRef = useRef<(() => void) | null>(null);
  const selectedRef = useRef(false);
  const renamingRef = useRef(false);
  const nameRef = useRef(defaultName);

  const [name, setName] = useState(defaultName);
  const [draft, setDraft] = useState(defaultName);
  const [selected, setSelected] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [renameBox, setRenameBox] = useState<Position | null>(null);
  const [dragOrigin, setDragOrigin] = useState<Position | null>(null);
  const [menu, setMenu] = useState<Position | null>(null);
  const [windowOpen, setWindowOpen] = useState(false);

  useEffect(() => {
    if (!windowOpen) return;

    const smoother = ScrollSmoother.get();
    smoother?.paused(true);

    return () => {
      smoother?.paused(false);
    };
  }, [windowOpen]);

  const clearRenameTimer = () => {
    if (renameTimer.current === null) return;
    window.clearTimeout(renameTimer.current);
    renameTimer.current = null;
  };

  const select = useCallback((next: boolean) => {
    selectedRef.current = next;
    setSelected(next);
  }, []);

  const save = useCallback(() => {
    window.sessionStorage.setItem(
      storageKey,
      JSON.stringify({ ...posRef.current, name: nameRef.current }),
    );
  }, [storageKey]);

  const openFile = useCallback(() => {
    if (!isDesktopViewport()) return;
    clearRenameTimer();
    window.open(url, "_blank", "noopener,noreferrer");
  }, [url]);

  const openWindow = useCallback(() => {
    if (!isDesktopViewport()) return;
    clearRenameTimer();
    setMenu(null);
    setWindowOpen(true);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const closeForMobile = (event: MediaQueryListEvent | MediaQueryList) => {
      if (event.matches) return;

      if (renameTimer.current !== null) {
        window.clearTimeout(renameTimer.current);
        renameTimer.current = null;
      }
      stopTrackingRef.current?.();
      stopTrackingRef.current = null;
      dragRef.current = null;
      renamingRef.current = false;
      selectedRef.current = false;
      setDragging(false);
      setDragOrigin(null);
      setRenaming(false);
      setRenameBox(null);
      setSelected(false);
      setMenu(null);
      setWindowOpen(false);
    };

    desktop.addEventListener("change", closeForMobile);
    return () => desktop.removeEventListener("change", closeForMobile);
  }, []);

  const closeWindow = useCallback(() => {
    setWindowOpen(false);
    window.requestAnimationFrame(() => {
      rootRef.current?.focus({ preventScroll: true });
    });
  }, []);

  const getWindowSourceRect = useCallback(() => {
    const page = rootRef.current?.querySelector("[data-cv-page]");
    const rect = page?.getBoundingClientRect();

    return rect && rect.width > 0 && rect.height > 0 ? rect : null;
  }, []);

  const download = useCallback(() => {
    const link = document.createElement("a");
    link.href = url;
    link.download = nameRef.current;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }, [url]);

  const commitRename = useCallback(() => {
    const cleaned = draft
      .trim()
      .replace(/\s+/g, " ")
      .replaceAll(":", "-")
      .replaceAll("/", "-");
    const next = cleaned || nameRef.current;

    nameRef.current = next;
    renamingRef.current = false;
    setName(next);
    setDraft(next);
    setRenaming(false);
    save();
  }, [draft, save]);

  const cancelRename = useCallback(() => {
    renamingRef.current = false;
    setDraft(nameRef.current);
    setRenaming(false);
  }, []);

  const beginRename = useCallback(() => {
    clearRenameTimer();
    select(true);

    const label = rootRef.current?.querySelector("[data-file-name]");
    const rect = label?.getBoundingClientRect();
    if (rect) setRenameBox({ x: rect.left + rect.width / 2, y: rect.top });

    renamingRef.current = true;
    setDraft(nameRef.current);
    setRenaming(true);
  }, [select]);

  useLayoutEffect(() => {
    if (!renaming) return;
    const input = inputRef.current;
    if (!input) return;

    const dot = nameRef.current.lastIndexOf(".");
    input.style.height = "auto";
    input.style.height = `${input.scrollHeight}px`;
    input.focus({ preventScroll: true });
    input.setSelectionRange(0, dot > 0 ? dot : nameRef.current.length);
  }, [renaming]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !placedRef.current) return;
    root.style.left = `${posRef.current.x}px`;
    root.style.top = `${posRef.current.y}px`;
  });

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let observer: ResizeObserver | null = null;
    let frame = 0;

    const place = () => {
      const boundary = getBoundary(root);
      if (!boundary) {
        frame = window.requestAnimationFrame(place);
        return;
      }

      if (!observer) {
        observer = new ResizeObserver(place);
        observer.observe(boundary);
      }

      const width = root.offsetWidth || LABEL_W;
      const maxX = boundary.clientWidth - width - EDGE;
      const maxY = boundary.clientHeight - root.offsetHeight - EDGE;
      if (maxX <= EDGE || maxY <= EDGE) return;

      if (!placedRef.current) {
        placedRef.current = true;
        setPlaced(true);
        const home = homeFor({
          width: boundary.clientWidth,
          height: boundary.clientHeight,
          self: width,
        });

        try {
          const saved = JSON.parse(
            window.sessionStorage.getItem(storageKey) ?? "null",
          );
          if (saved?.name) {
            nameRef.current = saved.name;
            setName(saved.name);
            setDraft(saved.name);
          }
          posRef.current =
            typeof saved?.x === "number" ? { x: saved.x, y: saved.y } : home;
        } catch {
          posRef.current = home;
        }
      }

      posRef.current = {
        x: clamp(posRef.current.x, EDGE, maxX),
        y: clamp(posRef.current.y, EDGE, maxY),
      };
      root.style.left = `${posRef.current.x}px`;
      root.style.top = `${posRef.current.y}px`;
    };

    place();

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [homeFor, storageKey]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (rootRef.current?.contains(target)) return;
      if (menuRef.current?.contains(target)) return;
      if (inputRef.current?.contains(target)) return;

      clearRenameTimer();
      if (renamingRef.current) commitRename();
      select(false);
      setMenu(null);
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    return () =>
      document.removeEventListener("pointerdown", onPointerDown, true);
  }, [commitRename, select]);

  useEffect(
    () => () => {
      clearRenameTimer();
      stopTrackingRef.current?.();
    },
    [],
  );

  const endDrag = useCallback(
    (event: PointerEvent | ReactPointerEvent, commit: boolean) => {
      const drag = dragRef.current;
      const root = rootRef.current;
      const boundary = root && getBoundary(root);
      if (!drag || !boundary || !root) return;

      dragRef.current = null;

      if (drag.moved) {
        if (commit) {
          const rect = boundary.getBoundingClientRect();
          posRef.current = {
            x: Math.round(
              clamp(
                event.clientX - drag.grabX - rect.left,
                EDGE,
                boundary.clientWidth - root.offsetWidth - EDGE,
              ),
            ),
            y: Math.round(
              clamp(
                event.clientY - drag.grabY - rect.top,
                EDGE,
                boundary.clientHeight - root.offsetHeight - EDGE,
              ),
            ),
          };
          root.style.left = `${posRef.current.x}px`;
          root.style.top = `${posRef.current.y}px`;
          save();
        } else {
          const image = dragImageRef.current;
          if (image) {
            image.style.transition =
              "left 0.2s ease-out, top 0.2s ease-out, opacity 0.2s ease-out";
            image.style.left = `${drag.originLeft}px`;
            image.style.top = `${drag.originTop}px`;
            image.style.opacity = "0";
          }
        }
      } else if (drag.onName && drag.wasSelected) {
        clearRenameTimer();
        renameTimer.current = window.setTimeout(beginRename, RENAME_DELAY);
      }

      setDragging(false);
    },
    [beginRename, save],
  );

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;

    const target = event.target as HTMLElement;
    if (target.closest("textarea")) return;
    if (renamingRef.current) commitRename();

    clearRenameTimer();
    setMenu(null);

    const rect = event.currentTarget.getBoundingClientRect();
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      grabX: event.clientX - rect.left,
      grabY: event.clientY - rect.top,
      originLeft: rect.left,
      originTop: rect.top,
      moved: false,
      onName: Boolean(target.closest("[data-file-name]")),
      wasSelected: selectedRef.current,
    };

    select(true);
    rootRef.current?.focus({ preventScroll: true });

    const onMove = (moveEvent: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== moveEvent.pointerId) return;

      if (moveEvent.buttons === 0) {
        stopTracking();
        endDrag(moveEvent, true);
        return;
      }

      const dx = moveEvent.clientX - drag.startX;
      const dy = moveEvent.clientY - drag.startY;

      if (!drag.moved) {
        if (Math.hypot(dx, dy) < DRAG_SLOP) return;
        drag.moved = true;
        clearRenameTimer();
        setDragOrigin({ x: drag.originLeft, y: drag.originTop });
        setDragging(true);
      }

      const image = dragImageRef.current;
      if (image) {
        image.style.left = `${moveEvent.clientX - drag.grabX}px`;
        image.style.top = `${moveEvent.clientY - drag.grabY}px`;
      }
      moveEvent.preventDefault();
    };

    const onUp = (upEvent: PointerEvent) => {
      if (dragRef.current?.pointerId !== upEvent.pointerId) return;
      stopTracking();
      endDrag(upEvent, true);
    };

    const onCancel = (cancelEvent: PointerEvent) => {
      stopTracking();
      endDrag(cancelEvent, false);
    };

    const stopTracking = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onCancel);
      stopTrackingRef.current = null;
    };

    stopTrackingRef.current = stopTracking;
    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onCancel);

    event.preventDefault();
  };

  const onContextMenu = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    clearRenameTimer();
    if (renamingRef.current) commitRename();
    select(true);
    setMenu({ x: event.clientX, y: event.clientY });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (renamingRef.current) return;

    if (event.key === "Enter") {
      event.preventDefault();
      beginRename();
    } else if (event.key === " ") {
      event.preventDefault();
      openFile();
    } else if (event.key === "o" && event.metaKey) {
      event.preventDefault();
      openWindow();
    } else if (event.key === "Escape") {
      clearRenameTimer();
      select(false);
      setMenu(null);
    }
  };

  useEffect(() => {
    if (!dragging) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const drag = dragRef.current;
      if (!drag) return;
      stopTrackingRef.current?.();
      endDrag(
        {
          clientX: drag.startX,
          clientY: drag.startY,
        } as PointerEvent,
        false,
      );
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [dragging, endDrag]);

  return (
    <>
      <div
        ref={rootRef}
        role="button"
        tabIndex={0}
        aria-label={`${name}. Double-click to open, press Return to rename, or drag to move.`}
        data-selected={selected}
        className="absolute top-0 left-0 z-20 hidden w-[122px] cursor-default touch-none outline-none select-none md:block"
        style={placed ? undefined : { visibility: "hidden" }}
        onPointerDown={onPointerDown}
        onDoubleClick={(event) => {
          event.preventDefault();
          clearRenameTimer();
          if (!renamingRef.current) openWindow();
        }}
        onContextMenu={onContextMenu}
        onDragStart={(event) => event.preventDefault()}
        onKeyDown={onKeyDown}
      >
        <div className="scroll-fade">
          <div className="hero-file invisible flex flex-col items-center">
            <FileGraphic
              name={name}
              preview={preview}
              selected={selected}
              hideLabel={renaming}
            />
          </div>
        </div>
      </div>

      {renaming &&
        renameBox &&
        createPortal(
          <RenameField
            inputRef={inputRef}
            draft={draft}
            setDraft={setDraft}
            commit={commitRename}
            cancel={() => {
              cancelRename();
              rootRef.current?.focus({ preventScroll: true });
            }}
            box={renameBox}
          />,
          document.body,
        )}

      {dragging &&
        dragOrigin &&
        createPortal(
          <div
            ref={dragImageRef}
            aria-hidden="true"
            className="pointer-events-none fixed z-50 flex w-[122px] flex-col items-center opacity-70"
            style={{ left: dragOrigin.x, top: dragOrigin.y }}
          >
            <FileGraphic
              name={name}
              preview={preview}
              selected
              showWell={false}
            />
          </div>,
          document.body,
        )}

      {windowOpen &&
        createPortal(
          <FileWindow
            name={name}
            url={url}
            noun={noun}
            pageCount={pageCount}
            paperWidth={paperWidth}
            contentScale={contentScale}
            infoRows={infoRows}
            getSourceRect={getWindowSourceRect}
            onClosed={closeWindow}
          >
            {children}
          </FileWindow>,
          document.body,
        )}

      {menu &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            className="fixed z-50 w-[186px] rounded-xl bg-white/40 p-1 text-xs text-black/85 shadow-[0_0_0_0.5px_rgba(0,0,0,0.12),inset_0_0.5px_0_rgba(255,255,255,0.55),0_12px_32px_rgba(0,0,0,0.20),0_4px_10px_rgba(0,0,0,0.10)] backdrop-blur-xl backdrop-saturate-[1.8]"
            style={{
              left: Math.min(menu.x, window.innerWidth - 200),
              top: Math.min(menu.y, window.innerHeight - 130),
            }}
            onContextMenu={(event) => event.preventDefault()}
          >
            <button
              type="button"
              role="menuitem"
              className={MENU_ITEM}
              onClick={() => {
                setMenu(null);
                openWindow();
              }}
            >
              <svg
                className="w-[1em] h-[1em]"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M17.25 8.625v4.5a1.125 1.125 0 1 1-2.25 0v-2.534L8.67 16.92a1.122 1.122 0 0 1-1.92-.795c0-.299.118-.585.33-.796L13.408 9h-2.535a1.125 1.125 0 0 1 0-2.25h4.5c1.034 0 1.876.841 1.876 1.875m3.75-1.5v9.75A4.13 4.13 0 0 1 16.875 21h-9.75A4.13 4.13 0 0 1 3 16.875v-9.75A4.13 4.13 0 0 1 7.125 3h9.75A4.13 4.13 0 0 1 21 7.125m-2.25 0c0-1.033-.84-1.875-1.875-1.875h-9.75A1.877 1.877 0 0 0 5.25 7.125v9.75c0 1.034.84 1.875 1.875 1.875h9.75a1.877 1.877 0 0 0 1.875-1.875z" />
              </svg>
              Open
            </button>

            <button
              type="button"
              role="menuitem"
              className={MENU_ITEM}
              onClick={() => {
                setMenu(null);
                openFile();
              }}
            >
              <svg
                className="w-[1em] h-[1em]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Quick Look
            </button>

            <div className="mx-2 my-1 h-[0.5px] bg-black/20" />

            <button
              type="button"
              role="menuitem"
              className={MENU_ITEM}
              onClick={() => {
                setMenu(null);
                beginRename();
              }}
            >
              <svg
                className="w-[1em] h-[1em]"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.341 3.659a2.25 2.25 0 0 0-3.182 0l-.991.992 3.181 3.181.992-.991a2.25 2.25 0 0 0 0-3.182M18.44 8.742 15.258 5.56 4.844 15.974a4.5 4.5 0 0 0-1.131 1.898l-.686 2.302a.643.643 0 0 0 .8.8l2.3-.686a4.5 4.5 0 0 0 1.899-1.132z" />{" "}
              </svg>
              Rename
            </button>

            <button
              type="button"
              role="menuitem"
              className={MENU_ITEM}
              onClick={() => {
                setMenu(null);
                download();
              }}
            >
              <svg
                className="w-[1em] h-[1em]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 18a3.5 3.5 0 0 0 0-7h-1A5 4.5 0 0 0 7 9a4.6 4.4 0 0 0-2.1 8.4M12 13v9M9 19l3 3 3-3" />
              </svg>
              Download
            </button>
          </div>,
          document.body,
        )}
    </>
  );
}

function FileWindow({
  name,
  url,
  noun,
  pageCount,
  paperWidth,
  contentScale,
  infoRows,
  getSourceRect,
  onClosed,
  children,
}: {
  name: string;
  url: string;
  noun: string;
  pageCount: number;
  paperWidth: number;
  contentScale: number;
  infoRows: (context: { name: string; pages: number }) => [string, string][][];
  getSourceRect: () => DOMRect | null;
  onClosed: () => void;
  children: ReactNode;
}) {
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const panelAnimationRef = useRef<Animation | null>(null);
  const backdropAnimationRef = useRef<Animation | null>(null);
  const mountedRef = useRef(true);
  const closingRef = useRef(false);
  const closeFinishedRef = useRef(false);
  const [phase, setPhase] = useState<"opening" | "open" | "closing">("opening");
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const zoomRef = useRef(zoom);
  const [info, setInfo] = useState(false);
  const [pages, setPages] = useState({ current: 1, total: pageCount });

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const measure = () => {
      const paper = scroller.firstElementChild as HTMLElement | null;
      if (!paper) return;

      const span = (paper.offsetHeight * zoom * contentScale) / pageCount;
      if (span <= 0) return;
      const current = clamp(
        Math.floor(scroller.scrollTop / span) + 1,
        1,
        pageCount,
      );
      setPages({ current, total: pageCount });
    };

    measure();
    scroller.addEventListener("scroll", measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(scroller);
    return () => {
      scroller.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }, [zoom, contentScale, pageCount]);

  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const onWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();

      const current = zoomRef.current;
      const next = clamp(current - event.deltaY * 0.01, 0.5, 2.5);
      if (next === current) return;

      const rect = scroller.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      const anchorX = (scroller.scrollLeft + offsetX) / current;
      const anchorY = (scroller.scrollTop + offsetY) / current;

      setZoom(next);

      window.requestAnimationFrame(() => {
        scroller.scrollLeft = anchorX * next - offsetX;
        scroller.scrollTop = anchorY * next - offsetY;
      });
    };

    scroller.addEventListener("wheel", onWheel, { passive: false });
    return () => scroller.removeEventListener("wheel", onWheel);
  }, []);

  const finishClose = useCallback(() => {
    if (closeFinishedRef.current) return;
    closeFinishedRef.current = true;
    onClosed();
  }, [onClosed]);

  const requestClose = useCallback(() => {
    if (closingRef.current) return;

    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    if (!panel || !backdrop) {
      finishClose();
      return;
    }

    closingRef.current = true;
    setPhase("closing");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const panelStyle = window.getComputedStyle(panel);
    const backdropStyle = window.getComputedStyle(backdrop);
    const currentTransform = panelStyle.transform;
    const currentOpacity = Number.parseFloat(panelStyle.opacity);
    const currentBackdropOpacity = Number.parseFloat(backdropStyle.opacity);
    const currentShadow = panelStyle.boxShadow;
    const source = getSourceRect();
    const destination = getPanelLayoutRect(panel);
    const morphing = !reduceMotion && Boolean(source);
    const sourceTransform =
      morphing && source
        ? getSourceTransform(source, destination)
        : reduceMotion
          ? currentTransform
          : "translate3d(0, 10px, 0) scale3d(0.965, 0.965, 1)";

    panelAnimationRef.current?.cancel();
    backdropAnimationRef.current?.cancel();

    const duration = reduceMotion ? REDUCED_MOTION_MS : WINDOW_ANIMATION_MS;
    const panelAnimation = panel.animate(
      [
        {
          transform: currentTransform,
          opacity: Number.isFinite(currentOpacity) ? currentOpacity : 1,
          borderRadius: panelStyle.borderRadius,
          boxShadow: currentShadow,
        },
        {
          transform: sourceTransform,
          opacity: morphing ? 0.12 : 0,
          borderRadius: morphing ? "6px" : panelStyle.borderRadius,
          boxShadow: morphing ? SOURCE_SHADOW : currentShadow,
        },
      ],
      { duration, easing: WINDOW_EASING, fill: "both" },
    );
    const backdropAnimation = backdrop.animate(
      [
        {
          opacity: Number.isFinite(currentBackdropOpacity)
            ? currentBackdropOpacity
            : 1,
        },
        { opacity: 0 },
      ],
      {
        duration: reduceMotion ? REDUCED_MOTION_MS : BACKDROP_ANIMATION_MS,
        easing: WINDOW_EASING,
        fill: "both",
      },
    );

    panelAnimationRef.current = panelAnimation;
    backdropAnimationRef.current = backdropAnimation;

    void Promise.allSettled([
      panelAnimation.finished,
      backdropAnimation.finished,
    ]).then(finishClose);
  }, [finishClose, getSourceRect]);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    if (!panel || !backdrop) return;

    mountedRef.current = true;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const source = getSourceRect();
    const destination = getPanelLayoutRect(panel);
    const morphing = !reduceMotion && Boolean(source);
    const sourceTransform =
      morphing && source
        ? getSourceTransform(source, destination)
        : reduceMotion
          ? "translate3d(0, 0, 0) scale3d(1, 1, 1)"
          : "translate3d(0, 10px, 0) scale3d(0.965, 0.965, 1)";
    const duration = reduceMotion ? REDUCED_MOTION_MS : WINDOW_ANIMATION_MS;
    const panelAnimation = panel.animate(
      [
        {
          transform: sourceTransform,
          opacity: morphing ? 0.12 : 0,
          borderRadius: morphing ? "6px" : WINDOW_RADIUS,
          boxShadow: morphing ? SOURCE_SHADOW : WINDOW_SHADOW,
        },
        {
          transform: "translate3d(0, 0, 0) scale3d(1, 1, 1)",
          opacity: 1,
          borderRadius: WINDOW_RADIUS,
          boxShadow: WINDOW_SHADOW,
        },
      ],
      { duration, easing: WINDOW_EASING, fill: "both" },
    );
    const backdropAnimation = backdrop.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      {
        duration: reduceMotion ? REDUCED_MOTION_MS : BACKDROP_ANIMATION_MS,
        easing: WINDOW_EASING,
        fill: "both",
      },
    );

    panelAnimationRef.current = panelAnimation;
    backdropAnimationRef.current = backdropAnimation;

    void Promise.allSettled([
      panelAnimation.finished,
      backdropAnimation.finished,
    ]).then(() => {
      if (!mountedRef.current || closingRef.current) return;
      panelAnimation.cancel();
      backdropAnimation.cancel();
      panelAnimationRef.current = null;
      backdropAnimationRef.current = null;
      setPhase("open");
      panelRef.current?.focus({ preventScroll: true });
    });

    return () => {
      mountedRef.current = false;
      panelAnimation.cancel();
      backdropAnimation.cancel();
    };
  }, [getSourceRect]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") requestClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [requestClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="CV window"
      data-phase={phase}
      className="fixed inset-0 z-[100] grid place-items-center p-8"
    >
      <div
        ref={backdropRef}
        aria-hidden="true"
        className="absolute inset-0 bg-black/15 backdrop-blur-[3px]"
        onMouseDown={requestClose}
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative bg-[#F6F6F6] flex h-[min(700px,calc(100vh-64px))] w-[min(900px,calc(100vw-64px))] origin-center flex-col overflow-hidden rounded-3xl border border-black/15 shadow-[0_0_1px_rgba(0,0,0,0.5),0_4px_12px_rgba(0,0,0,0.15),0_20px_60px_rgba(0,0,0,0.3)] outline-none will-change-[transform,opacity]"
      >
        <div className="pointer-events-none absolute top-0 left-0 z-20 w-full h-[50px] shrink-0 bg-gradient-to-b from-white/80 via-white/40 to-transparent">
          <div className="group pointer-events-auto absolute top-1/2 left-[18px] flex -translate-y-1/2 items-center gap-[9px]">
            <button
              type="button"
              aria-label={`Close ${noun} window`}
              className="w-[14px] h-[14px] flex items-center justify-center rounded-full border-[0.5px] border-[#E0443E] bg-[#FF5F56] text-[#560000]/80"
              onClick={requestClose}
            >
              <svg
                className="w-[12px] h-[12px] opacity-0 group-hover:opacity-100"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="m14.328 11.974 4.197-4.198a1.62 1.62 0 0 0-1.167-2.691 1.62 1.62 0 0 0-1.124.403l-4.201 4.193-4.209-4.206A1.624 1.624 0 0 0 5.528 7.77l4.21 4.205-4.197 4.196a1.622 1.622 0 1 0 2.292 2.29l4.2-4.194 4.196 4.193a1.624 1.624 0 0 0 2.296-2.293z" />
              </svg>
            </button>
            <button
              type="button"
              aria-label={`Minimize ${noun} window`}
              className="w-[14px] h-[14px] flex items-center justify-center rounded-full border-[0.5px] border-[#DEA123] bg-[#FFBD2E] text-[#634700]/80"
              onClick={requestClose}
            >
              <svg
                className="w-[12px] h-[12px] opacity-0 group-hover:opacity-100"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18 14H6a2 2 0 1 1 0-4h12a2 2 0 0 1 0 4" />
              </svg>
            </button>
            <span
              aria-hidden="true"
              className="w-[14px] h-[14px] flex items-center justify-center rounded-full border-[0.5px] border-[#1AAB29] bg-[#27C93F] text-[#005300]/80"
            >
              <svg
                className="w-[12px] h-[12px] opacity-0 group-hover:opacity-100"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6.007 6.507a.5.5 0 0 1 .5-.5L14.669 6a.5.5 0 0 1 .354.854l-8.17 8.169A.5.5 0 0 1 6 14.669zM17.157 17.828a.5.5 0 0 0 .5-.5l.006-8.162a.5.5 0 0 0-.853-.354l-8.17 8.169a.5.5 0 0 0 .355.854z" />{" "}
              </svg>
            </span>
          </div>
        </div>

        <div className="pointer-events-none absolute top-0 left-0 z-20 flex h-[50px] w-full items-center justify-center">
          <div className="text-center leading-tight">
            <p className="text-[13px] font-bold text-black/70">{name}</p>
            <p className="text-[10px] text-black/50">
              Page {pages.current} of {pages.total}
            </p>
          </div>
        </div>

        <div className="pointer-events-auto absolute top-[25px] right-[12px] -translate-y-1/2 z-20 flex items-center gap-[10px]">
          <div className="h-[36px] p-1 flex gap-[8px] rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.02),0_0_0_0.5px_rgba(0,0,0,0.01)]">
            <button
              type="button"
              aria-label="Zoom out"
              className="flex items-center justify-center h-full aspect-square rounded-full text-black/80 hover:bg-black/5 disabled:opacity-40 disabled:pointer-events-none"
              disabled={zoom <= 0.5}
              onClick={() =>
                setZoom((current) => clamp(current - 0.15, 0.5, 2.5))
              }
            >
              <svg
                className="w-[20px] h-[20px]"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8.5 6a.5.5 0 0 1 0 1h-4a.5.5 0 0 1 0-1zm-2-5a5.5 5.5 0 0 1 4.227 9.02l3.127 3.127a.5.5 0 1 1-.707.707l-3.127-3.127A5.5 5.5 0 1 1 6.5 1m0 1a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Zoom in"
              className="flex items-center justify-center h-full aspect-square rounded-full text-black/80 hover:bg-black/5 disabled:opacity-40 disabled:pointer-events-none"
              disabled={zoom >= 2.5}
              onClick={() =>
                setZoom((current) => clamp(current + 0.15, 0.5, 2.5))
              }
            >
              <svg
                className="w-[20px] h-[20px]"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 4a.5.5 0 0 1 .5.5V6h1.5a.5.5 0 0 1 0 1H7v1.5a.5.5 0 0 1-1 0V7H4.5a.5.5 0 0 1 0-1H6V4.5a.5.5 0 0 1 .5-.5m0-3a5.5 5.5 0 0 1 4.227 9.02l3.127 3.127a.5.5 0 1 1-.707.707l-3.127-3.127A5.5 5.5 0 1 1 6.5 1m0 1a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9" />
              </svg>
            </button>
          </div>

          <button
            type="button"
            aria-label="Show details"
            aria-pressed={info}
            className="p-1 h-[36px] w-[36px] flex items-center justify-center bg-white rounded-full text-black/80 shadow-[0_4px_14px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.02),0_0_0_0.5px_rgba(0,0,0,0.01)]"
            onClick={() => setInfo((open) => !open)}
          >
            <span
              className={`flex items-center justify-center h-full aspect-square rounded-full ${
                info ? "bg-[#007AFF] text-white" : "hover:bg-black/5"
              }`}
            >
              <svg
                className="w-[20px] h-[20px]"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M6.84 3.123c0 .62.474 1.116 1.067 1.116.601 0 1.068-.496 1.06-1.116C8.968 2.496 8.509 2 7.908 2c-.593 0-1.068.496-1.068 1.123M5 13.365c0 .38.26.635.653.635h4.694c.393 0 .653-.256.653-.635 0-.372-.26-.628-.653-.628h-1.49v-5.91c0-.419-.26-.698-.646-.698h-2.35c-.386 0-.646.248-.646.62 0 .387.26.643.645.643h1.625v5.345H5.653c-.393 0-.653.256-.653.628" />{" "}
              </svg>
            </span>
          </button>

          <a
            href={url}
            download={name}
            aria-label={`Download ${noun}`}
            className="p-1 h-[36px] w-[36px] flex items-center justify-center bg-white rounded-full text-black/80 shadow-[0_4px_14px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.02),0_0_0_0.5px_rgba(0,0,0,0.01)]"
          >
            <span className="flex items-center justify-center h-full aspect-square rounded-full hover:bg-black/5 disabled:opacity-40 disabled:pointer-events-none">
              <svg
                className="w-[20px] h-[20px]"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.855 2.174A4.84 4.84 0 0 1 8 1c2.354 0 4.308 1.75 4.52 4.007C13.913 5.204 15 6.37 15 7.8c0 1.572-1.31 2.824-2.899 2.824H9.75a.438.438 0 0 1 0-.875h2.352c1.13 0 2.023-.886 2.023-1.949s-.893-1.95-2.024-1.95h-.437v-.437c0-1.942-1.627-3.539-3.664-3.539a3.96 3.96 0 0 0-2.573.962c-.663.571-1.01 1.259-1.01 1.799v.392l-.389.043c-1.222.133-2.153 1.137-2.153 2.332 0 1.284 1.076 2.347 2.433 2.347H6.25a.437.437 0 1 1 0 .875H4.308C2.495 10.625 1 9.195 1 7.403c0-1.542 1.108-2.82 2.574-3.144.125-.755.611-1.507 1.281-2.085" />
                <path d="M7.69 14.872a.437.437 0 0 0 .62 0l2.624-2.625a.438.438 0 1 0-.62-.62l-1.877 1.88V5.811a.438.438 0 0 0-.875 0v7.694l-1.878-1.879a.438.438 0 0 0-.62.62z" />
              </svg>
            </span>
          </a>
        </div>

        <div
          aria-hidden={!info}
          className={`absolute top-0 right-0 bottom-0 z-10 pt-[50px] w-[280px] border-l border-black/5 bg-[rgba(246,246,246,0.6)] backdrop-blur-xs backdrop-saturate-[1.8] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            info ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="h-full overflow-y-auto px-3 py-3">
            {infoRows({ name, pages: pages.total }).map((group, groupIndex) => (
              <dl
                key={groupIndex}
                className="mb-[12px] px-3 overflow-hidden rounded-[10px] bg-black/3 text-[11px]"
              >
                {group.map(([label, value], rowIndex) => (
                  <div
                    key={label}
                    className={`flex items-start justify-between gap-3 py-[8px] ${
                      rowIndex === 0 ? "" : "border-t border-black/[0.06]"
                    }`}
                  >
                    <dt className="shrink-0 font-medium text-black/80">
                      {label}
                    </dt>
                    <dd className="text-right text-black/50">{value}</dd>
                  </div>
                ))}
              </dl>
            ))}

            <p className="mt-3 px-3 text-[10px] leading-[1.6] text-black/35">
              Nobody opens this panel. Hello.
            </p>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="cv-scroller flex-1 overflow-auto overscroll-contain"
        >
          <div
            className="mt-[80px] mx-auto"
            style={{
              width: paperWidth,
              maxWidth: zoom > 1 ? "none" : "100%",
              zoom: zoom * contentScale,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function RenameField({
  inputRef,
  draft,
  setDraft,
  commit,
  cancel,
  box,
}: {
  inputRef: RefObject<HTMLTextAreaElement | null>;
  draft: string;
  setDraft: (value: string) => void;
  commit: () => void;
  cancel: () => void;
  box: Position;
}) {
  return (
    <textarea
      ref={inputRef}
      value={draft}
      rows={1}
      maxLength={80}
      spellCheck={false}
      aria-label="Rename file"
      className="fixed z-50 w-[112px] resize-none overflow-hidden rounded-[2px] border border-[#005DFE] bg-white px-1 text-center text-xs tracking-[-0.01em] shadow-[0_0_0_2.5px_rgba(0,93,254,0.3)] outline-none selection:bg-[#A5CDFF] text-black"
      style={{ left: box.x - 56, top: box.y - 1 }}
      onChange={(event) => {
        setDraft(event.target.value);
        event.target.style.height = "auto";
        event.target.style.height = `${event.target.scrollHeight}px`;
      }}
      onBlur={commit}
      onPointerDown={(event) => event.stopPropagation()}
      onDoubleClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => {
        event.stopPropagation();
        if (event.key === "Enter") {
          event.preventDefault();
          commit();
        }
        if (event.key === "Escape") {
          event.preventDefault();
          cancel();
        }
      }}
    />
  );
}
