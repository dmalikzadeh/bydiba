"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import ScrollSmoother from "gsap/ScrollSmoother";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useNav } from "./NavContext";

gsap.registerPlugin(ScrollSmoother, ScrollToPlugin, ScrollTrigger);

const NAVIGATION = [
  {
    label: "Projects",
    href: "#projects",
    key: "projects",
    align: "top+=1 top",
  },
  { label: "About", href: "#about", key: "about", align: "top+=1 top" },
  { label: "Skills", href: "#skills", key: "skills", align: "top+=80 top" },
  { label: "Contact", href: "#contact", key: "contact", align: "top+=1 top" },
] as const;

type NavKey = (typeof NAVIGATION)[number]["key"];

export default function Header() {
  const { activeKey, setActiveKey } = useNav();

  const navRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const indicatorTrailRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<Record<NavKey, HTMLAnchorElement | null>>({
    about: null,
    contact: null,
    skills: null,
    projects: null,
  });
  const hasPlacedIndicatorRef = useRef(false);

  const moveIndicator = (key: NavKey, immediate = false) => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    const indicatorTrail = indicatorTrailRef.current;
    const button = buttonRefs.current[key];

    if (!nav || !indicator || !indicatorTrail || !button) {
      return;
    }

    const navRect = nav.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const target = {
      height: buttonRect.height,
      width: buttonRect.width,
      x: buttonRect.left - navRect.left,
      y: buttonRect.top - navRect.top,
    };

    if (immediate || !hasPlacedIndicatorRef.current) {
      gsap.set([indicator, indicatorTrail], {
        ...target,
        opacity: 1,
      });
      hasPlacedIndicatorRef.current = true;
      return;
    }

    gsap.to(indicatorTrail, {
      ...target,
      duration: 1,
      ease: "power3.out",
      opacity: 0.42,
    });

    gsap.to(indicator, {
      ...target,
      duration: 0.78,
      ease: "expo.out",
      opacity: 1,
    });
  };

  useEffect(() => {
    if (!activeKey) {
      return;
    }

    moveIndicator(activeKey);
  }, [activeKey]);

  useEffect(() => {
    const handleResize = () => {
      if (!activeKey) {
        return;
      }

      moveIndicator(activeKey, true);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeKey]);

  function scrollToSection(selector: string, align = "top top") {
    const target = document.querySelector(selector);
    if (!target) return;

    const smoother = ScrollSmoother.get();

    if (smoother) {
      smoother.scrollTo(target, true, align);
    } else {
      gsap.to(window, {
        scrollTo: target,
        duration: 1.2,
        ease: "power4.inOut",
      });
    }
  }

  function scrollToTop() {
    const smoother = ScrollSmoother.get();

    if (smoother) {
      smoother.scrollTo(0, true);
    } else {
      gsap.to(window, {
        scrollTo: 0,
        duration: 1.2,
        ease: "power4.inOut",
      });
    }
  }

  return (
    <header className="z-100 fixed top-0 w-full py-6 px-4 sm:px-12">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-6">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
          className="group flex items-center gap-2 text-xl font-medium tracking-[-0.03em] text-black/80 hover:text-black transition duration-500 ease-in-out"
        >
          <svg
            className="w-6 h-6 group-hover:text-[#ef476f] group-hover:rotate-360 transition duration-500 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.67.127C8.457.584 7.537 1.603 7.106 2.965c-.099.314-.149.729-.174 1.462-.044 1.193.068 1.998.44 3.115l.229.694-.585-.198c-.997-.343-1.724-.456-2.931-.457-1.038-.004-1.12.007-1.623.205-.95.371-1.605 1.018-2.048 2.01-.52 1.172-.552 2.34-.088 3.253.212.411.957 1.218 1.42 1.539.418.288 1.406.719 2.194.956.881.267 2.578.24 3.845-.056l.202-.05-.123.19c-.065.106-.148.19-.18.19-.099 0-1.016 1.154-1.465 1.843-.77 1.188-1.124 2.103-1.193 3.087-.058.837.128 1.425.657 2.077.455.557 1.055.902 1.918 1.097.951.218 2.143-.027 3.13-.64.475-.293 1.972-1.708 1.972-1.86 0-.043.091-.196.203-.34.57-.734 1.176-2.161 1.267-2.973l.049-.425.241.418c.704 1.21 2.104 2.56 3.285 3.166.722.371 1.13.478 1.77.475 1.821-.018 3.623-1.595 3.808-3.335.036-.367-.137-1.511-.278-1.836q-.09-.209-.172-.424c-.135-.355-.976-1.528-1.473-2.05-.78-.82-2.176-1.63-3.286-1.91l-.628-.157.47-.09c2.568-.479 5.325-2.564 5.905-4.462.503-1.652-.44-3.866-1.975-4.635-.453-.229-.479-.232-1.451-.232-1.087 0-1.299.049-2.297.529-.898.43-1.342.73-1.92 1.291a9.2 9.2 0 0 0-1.498 1.915l-.244.413-.037-.31c-.019-.173-.074-.669-.119-1.103-.219-2.059-.936-3.88-1.834-4.665-.549-.474-.998-.65-1.764-.676-.538-.02-.747.005-1.055.121m.48.82c-.398.111-1.046.5-1.329.8-.319.338-.698 1.03-.87 1.583-.13.417-.156.661-.149 1.406.018 1.776.635 3.593 1.495 4.394.393.366 1.38 1.004 1.554 1.004.053 0 .212-.097.355-.213.417-.34.893-.518 1.5-.56.302-.021.59-.065.64-.097.119-.074.195-.83.2-1.99.014-3.269-.988-5.885-2.421-6.318-.42-.128-.538-.128-.974-.008m9.49 2.596c-.503.118-1.837.773-2.347 1.158-1.057.789-2.168 2.53-2.694 4.218l-.217.695.297.302c.29.295.634.928.637 1.165.002.369 2.17.149 3.63-.37 1.078-.38 2.295-1.212 3.174-2.166 1.07-1.158 1.252-2.124.647-3.435-.288-.618-.864-1.246-1.347-1.464-.42-.19-1.205-.237-1.78-.103M3.558 8.517c-.08.02-.309.069-.51.111a3 3 0 0 0-.587.184c-.224.115-.915.754-.915.85 0 .029-.064.143-.145.256-.469.673-.559 2.063-.18 2.788.378.724 1.139 1.258 2.472 1.738 1.703.615 3.745.397 5.833-.62.703-.345.786-.42.701-.645-.09-.243-.082-1.408.01-1.655.073-.194.054-.223-.3-.554C8.569 9.7 7.193 8.962 5.624 8.658c-.59-.114-1.823-.197-2.066-.14m9.287 1.757c-.624.057-.885.181-1.224.584-1.114 1.323-.59 3.062.883 2.925 1.079-.1 1.877-.915 1.946-1.996.026-.386 0-.522-.136-.789-.16-.318-.693-.803-.857-.782-.047.004-.322.032-.612.058m2.38 2.466c-.056.09-.182.31-.28.492-.1.177-.348.485-.552.676l-.37.353.075.329c.178.764.25 1.01.495 1.623a8.57 8.57 0 0 0 2.954 3.803c1.46 1.063 2.847.996 4.023-.199.556-.566.763-1.001.798-1.676.048-.945-.32-1.775-1.36-3.06-.963-1.182-2.966-2.159-4.915-2.396-.174-.021-.42-.054-.545-.075-.18-.029-.244-.002-.324.13m-5.084 2.089c-.597.464-1.547 1.356-2.128 2.001-.482.53-1.282 1.733-1.558 2.335-.564 1.228-.64 1.984-.28 2.732.171.352.276.471.597.668.52.318.986.452 1.583.45.826-.005 1.355-.186 2.193-.752 1.026-.692 2.328-2.632 2.62-3.9.097-.422.103-.596.032-1.203-.088-.748-.297-1.48-.586-2.043-.171-.33-.18-.338-.704-.45-.293-.063-.614-.17-.714-.239-.1-.065-.227-.121-.283-.121s-.401.233-.772.522"
              clipRule="evenodd"
            />
          </svg>
          bydiba
        </a>

        <div className="hidden sm:block rounded-full border border-black/6 bg-white/80 p-1 shadow-[0_12px_30px_rgba(17,17,17,0.06)] backdrop-blur-md">
          <nav ref={navRef} className="relative flex items-center gap-1">
            <div
              ref={indicatorTrailRef}
              className="pointer-events-none absolute left-0 top-0 rounded-full bg-white/70 opacity-0 blur-[10px]"
            />
            <div
              ref={indicatorRef}
              className="pointer-events-none absolute left-0 top-0 rounded-full bg-white opacity-0 shadow-[0_8px_22px_rgba(17,17,17,0.08)]"
            />

            {NAVIGATION.map((item) => {
              const isActive = activeKey === item.key;

              return (
                <a
                  key={item.href}
                  ref={(element) => {
                    buttonRefs.current[item.key] = element;
                  }}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveKey(item.key);
                    scrollToSection(item.href, item.align);
                  }}
                  className={`relative z-10 rounded-full px-4 py-2 text-sm transition duration-300 ${
                    isActive
                      ? "text-black"
                      : "text-black/40 hover:text-black/80"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
