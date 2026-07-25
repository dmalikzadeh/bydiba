"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import Image from "next/image";
import { useEffect, useLayoutEffect } from "react";
import { useNav } from "./NavContext";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

export default function Skills() {
  const { setActiveKey } = useNav();

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      gsap.set(".skills-arrow", { autoAlpha: 1 });
      gsap.set(".skills-title", { autoAlpha: 0, y: 40 });
      gsap.set(".skills-subtitle", { autoAlpha: 0, y: 20 });
      gsap.set(".skill-card", { autoAlpha: 0, scale: 0.98, y: 40 });
      gsap.set(".card-title, .card-content", { autoAlpha: 0, y: 16 });
      gsap.set(".card-halo, .card-icon, .card-image", {
        autoAlpha: 0,
        scale: 0.95,
        y: 18,
      });
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".skills-intro",
          start: "top top",
          end: "+=100%",
          toggleActions: "play none none reverse",
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
          onToggle: (self) => {
            if (self.isActive) {
              setActiveKey("skills");
            }
          },
        },
      });

      introTl.to(".skills-title", { autoAlpha: 1, duration: 0.8, y: 0 }, 0);
      introTl.to(
        ".skills-subtitle",
        { autoAlpha: 1, duration: 0.7, ease: "power3.out", y: 0 },
        "-=0.5",
      );

      introTl.from(
        ".skills-arrow-line",
        { duration: 1, drawSVG: 0, ease: "sine.out" },
        "-=0.4",
      );
      introTl.from(".skills-arrow-head", {
        duration: 0.2,
        drawSVG: 0,
        ease: "power3.out",
      });

      introTl.to({}, { duration: 1.2 });

      mm.add(
        {
          isDesktop: "(min-width: 640px)",
          isMobile: "(max-width: 639px)",
        },
        (context) => {
          const { isMobile } = context.conditions as {
            isDesktop: boolean;
            isMobile: boolean;
          };
          const cardOrder = isMobile
            ? [".card-1", ".card-3", ".card-2", ".card-4"]
            : [".card-1", ".card-2", ".card-3", ".card-4"];

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: ".skills-cards",
              start: "top bottom",
              end: "+=800px",
              scrub: 2,
              invalidateOnRefresh: true,
            },
          });

          tl.to(".skills-arrow", { autoAlpha: 0, duration: 0.8 }, 0.2);

          cardOrder.forEach((card, index) => {
            tl.to(
              card,
              { autoAlpha: 1, duration: 0.75, scale: 1, y: 0 },
              index === 0 ? 0 : "-=0.15",
            )
              .to(
                `${card} .card-halo, ${card} .card-icon, ${card} .card-image`,
                {
                  autoAlpha: 1,
                  duration: 0.45,
                  scale: 1,
                  stagger: 0.05,
                  y: 0,
                },
                "-=0.35",
              )
              .to(
                `${card} .card-title`,
                {
                  autoAlpha: 1,
                  duration: 0.4,
                  y: 0,
                },
                "-=0.2",
              )
              .to(
                `${card} .card-content`,
                {
                  autoAlpha: 1,
                  duration: 0.4,
                  y: 0,
                },
                "-=0.2",
              );
          });
        },
      );
    });

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [setActiveKey]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to([".orbit-ring", ".orbit-glow"], {
        rotate: 360,
        duration: 22,
        repeat: -1,
        ease: "linear",
      });
      gsap.to(".orbit-glow", {
        x: 2,
        y: -2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="w-full">
      <div className="skills-intro h-[100svh] max-w-2xl mx-auto text-center flex flex-col items-center justify-center p-4 sm:p-12">
        <div className="relative space-y-6">
          <h2 className="skills-title font-clash text-5xl sm:text-6xl text-black">
            skills & interests.
          </h2>
          <p className="skills-subtitle text-lg sm:text-xl text-black/80 font-light">
            There&apos;s{" "}
            <span className="italic text-black font-normal">always</span> more
            to learn. I enjoy exploring different parts of development and
            refining how I design and build.
          </p>
          <svg
            className="skills-arrow invisible absolute top-[100%] left-1/2 -translate-x-1/2 w-12 h-auto mt-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 60"
            fill="none"
            stroke="currentColor"
          >
            <path
              className="skills-arrow-line"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth=".25"
              d="M5.825.125c8.902 26.795 5.3 39.277-3.707 32.749s15.349-16.435 16.906-2.05c.717 6.616-2.618 19.171-2.651 26.718"
            />
            <path
              className="skills-arrow-head"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth=".25"
              d="m14.337 57.09 2.009 2.035 2.008-2.036"
            />
          </svg>
        </div>
      </div>

      <div className="h-[60vh]" />

      <div className="skills-cards flex flex-col sm:flex-row gap-4 w-full p-4 sm:p-12">
        <div className="flex-1 flex flex-col gap-4">
          <div className="skill-card card-1 flex-2 flex flex-col items-center justify-between text-center p-8 sm:p-12 bg-[#F1EFEA] rounded-4xl">
            <div className="card-halo relative w-32 h-32 sm:w-60 sm:h-60 flex items-center justify-center">
              <div className="absolute w-full h-full rounded-full bg-[#F2B8A0]/20 blur-3xl" />
              <Image
                src="/skills/halo-ring.svg"
                alt=""
                width={400}
                height={380}
                className="absolute inset-0 orbit-ring"
              />
              <Image
                src="/skills/halo-glow.svg"
                alt=""
                width={400}
                height={380}
                className="absolute inset-0 orbit-glow"
              />
              <Image
                src="/skills/sparkles.svg"
                alt=""
                width={24}
                height={24}
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
            </div>
            <div>
              <h2 className="card-title text-xl sm:text-2xl font-clash text-black/80 mb-2">
                AI & Intelligent Features
              </h2>
              <p className="card-content text-sm sm:text-base text-black/60 font-light text-balance">
                Artificial intelligence is one of my main interests, and I enjoy
                building with it in ways that go beyond novelty and focus on
                real, user-facing value.
              </p>
            </div>
          </div>

          <div className="skill-card card-3 flex-1 flex flex-col items-center justify-between gap-8 text-center p-8 sm:p-12 bg-[#F1EFEA] rounded-4xl">
            <div className="flex items-center gap-3">
              <span className="card-icon">
                <Image
                  src="/skills/postgresql.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="w-8 h-8 sm:w-12 sm:h-12 hover:-translate-y-2 transition-transform duration-300 ease-out"
                />
              </span>
              <span className="card-icon">
                <Image
                  src="/skills/nodejs.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="w-8 h-8 sm:w-12 sm:h-12 hover:-translate-y-2 transition-transform duration-300 ease-out"
                />
              </span>
            </div>

            <div>
              <h2 className="card-title text-xl sm:text-2xl font-clash text-black/80 mb-2">
                Systems & Data
              </h2>
              <p className="card-content text-sm sm:text-base text-black/60 font-light text-balance">
                I work across the backend too: designing APIs, structuring data,
                and building systems that are reliable, scalable, and built to
                support real applications.
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div className="skill-card card-2 flex-1 flex flex-col items-center justify-between gap-8 text-center p-8 sm:p-12 bg-[#F1EFEA] rounded-4xl">
            <div className="flex items-center gap-3">
              <span className="card-icon">
                <Image
                  src="/skills/figma.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="w-8 h-8 sm:w-12 sm:h-12 hover:-translate-y-2 transition-transform duration-300 ease-out"
                />
              </span>
              <span className="card-icon">
                <Image
                  src="/skills/nextjs.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="w-8 h-8 sm:w-12 sm:h-12 hover:-translate-y-2 transition-transform duration-300 ease-out"
                />
              </span>

              <span className="card-icon">
                <Image
                  src="/skills/typescript.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="w-8 h-8 sm:w-12 sm:h-12 hover:-translate-y-2 transition-transform duration-300 ease-out"
                />
              </span>

              <span className="card-icon">
                <Image
                  src="/skills/react.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="w-8 h-8 sm:w-12 sm:h-12 hover:-translate-y-2 transition-transform duration-300 ease-out"
                />
              </span>
            </div>
            <div>
              <h2 className="card-title text-xl sm:text-2xl font-clash text-black/80 mb-2">
                Interfaces & Experience
              </h2>
              <p className="card-content text-sm sm:text-base text-black/60 font-light text-balance">
                I design and build interfaces that feel intuitive and polished,
                focusing on responsiveness, smooth interactions, and the small
                details that elevate the overall experience.
              </p>
            </div>
          </div>

          <div className="skill-card card-4 flex-1 flex flex-col items-center justify-between text-center p-8 sm:p-12 bg-[#F1EFEA] rounded-4xl">
            <Image
              src="/skills/github-kanban.webp"
              alt=""
              width={519}
              height={337}
              className="card-image w-full h-auto kanban-fade"
            />

            <div className="-mt-12">
              <h2 className="card-title text-xl sm:text-2xl font-clash text-black/80 mb-2">
                Product & Collaboration
              </h2>
              <p className="card-content text-sm sm:text-base text-black/60 font-light text-balance">
                I work well within teams and naturally take on leadership
                responsibilities, helping organise work, support others, and
                take ownership of features from idea through to final delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
