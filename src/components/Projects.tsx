"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNav } from "./NavContext";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    name: "Aicademy",
    description:
      "Full-stack AI learning platform that turns topics or study material into structured, reusable revision workflows. Designed to move beyond one-off AI responses into a connected learning system.",
    tags: ["Next.js", "PostgreSQL", "Azure AI", "Full-stack", "System design"],
    href: "https://aicademy.bydiba.dev",
    demo: "https://aicademy.bydiba.dev/demo",
    previewImage: "/aicademy.webp",
    bg: "#e8eef7",
  },
  {
    number: "02",
    name: "MotorHub",
    description:
      "A full-stack automotive website built for a client, with a custom admin panel for managing listings, including adding, editing and removing vehicles.",
    tags: ["Next.js", "Admin panel", "CRUD", "Database"],
    href: "https://motors.bydiba.dev",
    previewImage: "/motorhub.webp",
    bg: "#EDE9DD",
  },
  {
    number: "03",
    name: "aiAutomation",
    description:
      "A polished, production-ready landing page with a strong visual direction, smooth GSAP-driven animations, and fully integrated contact and legal flows.",
    tags: ["Next.js", "GSAP", "Motion", "UI/UX", "Landing"],
    href: "https://landing.bydiba.dev",
    previewImage: "/aiautomation.webp",
    bg: "#DCDCDC",
  },
  {
    number: "04",
    name: "InterviewBot",
    description:
      "Real-time AI mock interview tool that simulates natural interview conversations with voice interaction and personalised feedback.",
    tags: [
      "Next.js",
      "Azure AI",
      "Speech-to-text",
      "Text-to-speech",
      "Real-time",
    ],
    href: "https://interview.bydiba.dev",
    github: "https://github.com/dmalikzadeh/ai-interview",
    previewImage: "/interviewbot.webp",
    bg: "#f8ecff",
  },
];

export default function Projects() {
  const { setActiveKey } = useNav();

  const panelRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const introTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const transitionDirectionRef = useRef(1);
  const isTransitioningRef = useRef(false);
  const queuedIndexRef = useRef<number | null>(null);
  const queuedDirectionRef = useRef<1 | -1 | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const project = projects[displayIndex];

  const activeIndexRef = useRef(activeIndex);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const getWrappedIndex = (index: number) =>
    (index + projects.length) % projects.length;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 639px)").matches;

      gsap.set(".projects-title", { autoAlpha: 0, y: 40 });
      gsap.set(".project-btn", { autoAlpha: 0, y: 48 });
      gsap.set(".projects-preview", { autoAlpha: 0, scale: 0.99, y: 52 });
      gsap.set(".mobile-nav", { autoAlpha: 0, y: 28 });
      gsap.set(".mobile-nav-arrow", { autoAlpha: 0, scale: 0.96 });
      gsap.set(".mobile-nav-step", { autoAlpha: 0, y: 12 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: ".projects-section",
          start: "top",
          end: "+=100%",
          toggleActions: "play none none reverse",
          pin: true,
          invalidateOnRefresh: true,
          onLeave: () => {
            gsap.to(":root", {
              "--bg": "#f6f5f1",
              duration: 0.6,
              ease: "power2.inOut",
              overwrite: "auto",
            });
          },
          onLeaveBack: () => {
            gsap.to(":root", {
              "--bg": "#f6f5f1",
              duration: 0.6,
              ease: "power2.inOut",
              overwrite: "auto",
            });
          },
          onEnter: () => {
            gsap.to(":root", {
              "--bg": projects[activeIndexRef.current].bg,
              duration: 0.6,
              ease: "power2.inOut",
              overwrite: "auto",
            });
          },
          onEnterBack: () => {
            gsap.to(":root", {
              "--bg": projects[activeIndexRef.current].bg,
              duration: 0.6,
              ease: "power2.inOut",
              overwrite: "auto",
            });
          },
          onToggle: (self) => {
            if (self.isActive) {
              setActiveKey("projects");
            }
          },
        },
      });

      tl.to(".projects-title", { autoAlpha: 1, duration: 0.8, y: 0 }, 0);

      if (isMobile) {
        tl.to(
          ".projects-preview",
          { autoAlpha: 1, duration: 0.75, scale: 1, y: 0 },
          0.6,
        )
          .to(".mobile-nav", { autoAlpha: 1, duration: 0.65, y: 0 }, 0.9)
          .to(
            ".mobile-nav-arrow, .mobile-nav-step",
            {
              autoAlpha: 1,
              duration: 0.45,
              scale: 1,
              stagger: 0.06,
              y: 0,
            },
            "-=0.35",
          );
      } else {
        tl.to(
          ".project-btn",
          { autoAlpha: 1, duration: 0.75, stagger: 0.1, y: 0 },
          0.6,
        ).to(
          ".projects-preview",
          { autoAlpha: 1, duration: 0.75, scale: 1, y: 0 },
          1.2,
        );
      }

      tl.to({}, { duration: 1.6 });
    });

    return () => ctx.revert();
  }, [setActiveKey]);

  useEffect(() => {
    const panel = panelRef.current;
    const media = mediaRef.current;
    const content = contentRef.current;
    const direction = transitionDirectionRef.current;

    if (!panel || !media || !content) return;

    introTimelineRef.current?.kill();

    const children = Array.from(content.children);
    const tl = gsap.timeline();
    introTimelineRef.current = tl;

    gsap.set(panel, { autoAlpha: 1 });

    tl.fromTo(
      media,
      { autoAlpha: 0, scale: 0.98, y: 30 * direction },
      { autoAlpha: 1, duration: 0.45, ease: "power3.out", scale: 1, y: 0 },
    ).fromTo(
      children,
      { autoAlpha: 0, y: 16 * direction },
      { autoAlpha: 1, duration: 0.4, ease: "power3.out", stagger: 0.06, y: 0 },
      "-=0.16",
    );

    return () => {
      tl.kill();
      if (introTimelineRef.current === tl) introTimelineRef.current = null;
    };
  }, [displayIndex]);

  const handleProjectSelect = (index: number, forcedDirection?: 1 | -1) => {
    const nextIndex = getWrappedIndex(index);
    const direction = forcedDirection ?? (nextIndex > displayIndex ? 1 : -1);

    if (nextIndex === activeIndex && nextIndex === displayIndex) {
      return;
    }

    setActiveIndex(nextIndex);

    if (!mediaRef.current || !contentRef.current) {
      transitionDirectionRef.current = direction;
      setDisplayIndex(nextIndex);
      return;
    }

    if (isTransitioningRef.current) {
      queuedIndexRef.current = nextIndex;
      queuedDirectionRef.current = direction;
      return;
    }

    isTransitioningRef.current = true;
    introTimelineRef.current?.kill();

    const currentMedia = mediaRef.current;
    const currentContent = contentRef.current;
    const tl = gsap.timeline({
      onComplete: () => {
        const queuedIndex = queuedIndexRef.current;
        const resolvedIndex = queuedIndex ?? nextIndex;
        const resolvedDirection =
          queuedIndex !== null
            ? (queuedDirectionRef.current ?? direction)
            : direction;

        queuedIndexRef.current = null;
        queuedDirectionRef.current = null;
        isTransitioningRef.current = false;
        transitionDirectionRef.current = resolvedDirection;
        setDisplayIndex(resolvedIndex);

        if (queuedIndex !== null) {
          gsap.to(":root", {
            "--bg": projects[resolvedIndex].bg,
            duration: 0.6,
            ease: "power2.inOut",
            overwrite: "auto",
          });
        }
      },
    });

    tl.to(Array.from(currentContent.children), {
      autoAlpha: 0,
      y: -16 * direction,
      duration: 0.2,
      ease: "power2.inOut",
      stagger: 0.03,
    }).to(
      currentMedia,
      {
        autoAlpha: 0,
        y: -30 * direction,
        scale: 0.98,
        duration: 0.25,
        ease: "power2.inOut",
      },
      0,
    );

    gsap.to(":root", {
      "--bg": projects[nextIndex].bg,
      duration: 0.6,
      ease: "power2.inOut",
      overwrite: "auto",
    });
  };

  const handlePreviousProject = () => {
    const currentIndex = queuedIndexRef.current ?? activeIndexRef.current;
    handleProjectSelect(currentIndex - 1, -1);
  };

  const handleNextProject = () => {
    const currentIndex = queuedIndexRef.current ?? activeIndexRef.current;
    handleProjectSelect(currentIndex + 1, 1);
  };

  return (
    <section
      id="projects"
      className="projects-section flex items-center justify-center h-[100svh] p-4 pt-20 sm:pt-24 sm:p-12"
    >
      <div className="projects-content sm:h-auto h-full flex flex-col sm:items-end sm:flex-row gap-2 sm:gap-24">
        <div className="sm:w-[40%] flex flex-col gap-12 sm:gap-24">
          <h2 className="projects-title font-clash text-5xl sm:text-6xl border-b sm:border-none pb-4 sm:pb-0 mb-4 sm:mb-0 border-black/10">
            projects.
          </h2>

          <div className="hidden sm:block space-y-4 sm:space-y-6">
            {projects.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <div key={item.name} className="project-btn">
                  <button
                    type="button"
                    onClick={() => handleProjectSelect(index)}
                    className={`hover-underline hover:translate-x-1 flex w-full items-end justify-between border-b border-black/10 pb-4 text-left cursor-pointer transition duration-200 ${
                      isActive
                        ? "active-underline translate-x-1 opacity-100"
                        : "opacity-40 hover:opacity-100"
                    }`}
                    aria-pressed={isActive}
                  >
                    <p className="font-clash text-lg sm:text-xl">{item.name}</p>

                    <p className="mb-2 text-xs uppercase tracking-[0.24em] text-black/40">
                      {item.number}
                    </p>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="projects-preview sm:w-[60%] flex flex-col">
          <div ref={panelRef}>
            <div
              ref={mediaRef}
              className="group relative aspect-[16/9] overflow-hidden rounded-2xl border border-black/5"
            >
              <Image
                src={project.previewImage}
                alt={`${project.name} preview`}
                fill
                priority={displayIndex === 0}
                className="object-cover object-top transition duration-700 group-hover:scale-[1.03]"
                sizes="(min-width: 640px) 634px, calc(100vw - 2rem)"
              />
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className={`group/btn flex items-center gap-1 rounded-full backdrop-blur-md border px-4 py-2 text-xs active:scale-95 transition duration-300 ${
                      project.name == "aiAutomation"
                        ? "bg-white/3 border-white/10 text-white/60 hover:bg-white hover:text-black"
                        : "bg-black/3 border-black/10 text-black/60 hover:bg-black hover:text-white"
                    }`}
                  >
                    Watch demo
                    <span className="relative w-[1em] h-[1em] overflow-hidden">
                      <svg
                        className="absolute translate-x-[-150%] translate-y-[150%] group-hover/btn:translate-x-0 group-hover/btn:translate-y-0 duration-300"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 5h8v8M19 5 5 19"
                        />
                      </svg>

                      <svg
                        className="absolute group-hover/btn:translate-x-[150%] group-hover/btn:translate-y-[-150%] transition duration-300"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 5h8v8M19 5 5 19"
                        />
                      </svg>
                    </span>
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className={`group/btn flex items-center gap-1 rounded-full backdrop-blur-md border px-4 py-2 text-xs active:scale-95 transition duration-300 ${
                      project.name == "aiAutomation"
                        ? "bg-white/3 border-white/10 text-white/60 hover:bg-white hover:text-black"
                        : "bg-black/3 border-black/10 text-black/60 hover:bg-black hover:text-white"
                    }`}
                  >
                    GitHub
                    <span className="relative w-[1em] h-[1em] overflow-hidden">
                      <svg
                        className="absolute translate-x-[-150%] translate-y-[150%] group-hover/btn:translate-x-0 group-hover/btn:translate-y-0 duration-300"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 5h8v8M19 5 5 19"
                        />
                      </svg>

                      <svg
                        className="absolute group-hover/btn:translate-x-[150%] group-hover/btn:translate-y-[-150%] transition duration-300"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 5h8v8M19 5 5 19"
                        />
                      </svg>
                    </span>
                  </a>
                )}
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`group/btn flex items-center gap-1 rounded-full backdrop-blur-md border px-4 py-2 text-xs active:scale-95 transition duration-300 ${
                    project.name == "aiAutomation"
                      ? "bg-white/10 border-white/20 text-white/80 hover:bg-white hover:text-black"
                      : "bg-black/5 border-black/10 text-black/60 hover:bg-black hover:text-white"
                  }`}
                >
                  Visit site
                  <span className="relative w-[1em] h-[1em] overflow-hidden">
                    <svg
                      className="absolute translate-x-[-150%] translate-y-[150%] group-hover/btn:translate-x-0 group-hover/btn:translate-y-0 duration-300"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5h8v8M19 5 5 19"
                      />
                    </svg>

                    <svg
                      className="absolute group-hover/btn:translate-x-[150%] group-hover/btn:translate-y-[-150%] transition duration-300"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5h8v8M19 5 5 19"
                      />
                    </svg>
                  </span>
                </a>
              </div>
            </div>

            <div
              ref={contentRef}
              className="p-2 mt-4 sm:mt-6 flex flex-1 flex-col justify-between gap-4 sm:gap-6"
            >
              <h3 className="font-clash text-2xl sm:text-3xl">
                {project.name}
              </h3>

              <p className="text-sm sm:text-base font-light text-black/60">
                {project.description}
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono font-light rounded-full bg-black/3 px-3 py-1.5 text-[10px] sm:text-xs text-black/60 hover:-translate-y-[2px] hover:bg-black/5 hover:text-black transition duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/** mobile navigation */}
        <div className="mobile-nav sm:hidden flex items-center justify-between gap-8 mt-auto">
          <div className="mobile-nav-arrow">
            <button
              type="button"
              onClick={handlePreviousProject}
              className="w-12 h-12 border rounded-full flex items-center justify-center text-black/40 hover:text-black active:text-black active:scale-90 transition duration-300"
              aria-label="Previous project"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
            </button>{" "}
          </div>

          <div className="flex flex-1 gap-2">
            {projects.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => handleProjectSelect(index)}
                  className="mobile-nav-step group relative h-0.5 flex-1 overflow-hidden rounded-full bg-black/10"
                  aria-label={`Go to ${item.name}`}
                  aria-pressed={isActive}
                >
                  <span
                    className={`absolute inset-y-0 left-0 rounded-full bg-black transition-all duration-500 ${
                      isActive ? "w-full" : "w-0 group-hover:w-1/3"
                    }`}
                  />
                </button>
              );
            })}
          </div>
          <div className="mobile-nav-arrow">
            <button
              type="button"
              onClick={handleNextProject}
              className="w-12 h-12 border rounded-full flex items-center justify-center text-black/40 hover:text-black active:text-black active:scale-90 transition duration-300"
              aria-label="Next project"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
