"use client";

import Link from "next/link";
import { useEffect } from "react";
import gsap from "gsap";

export default function Home() {
  useEffect(() => {
    gsap.set(".fade-up", { autoAlpha: 0, y: 20 });
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.1 });

    tl.to(".fade-up", {
      y: 0,
      autoAlpha: 1,
      duration: 0.9,
      stagger: 0.15,
    });
  }, []);

  return (
    <div className="font-inter relative flex h-full min-h-screen items-center justify-center bg-[#edede9] text-neutral-800 overflow-x-hidden">
      <div className="blur">
        <div className="gradient-mask">
          <div className="spin-wrapper">
            <div className="spinning-gradient"></div>
          </div>
        </div>
      </div>

      <main className="z-10 max-w-5xl min-h-screen flex flex-col gap-12 justify-between items-center px-4 sm:px-8 md:px-12 py-12 ">
        <div>
          <h2 className="fade-up font-space-grotesk text-xl opacity-70">
            bydiba.dev
          </h2>
        </div>
        <div className="flex flex-col md:flex-row gap-20">
          <div className="flex-2 flex flex-col gap-4">
            <h1 className="fade-up text-5xl md:text-6xl font-bold mb-4 md:mb-8 text-balance">
              Hi, I&apos;m Diba. Full-Stack & AI Developer.
            </h1>
            <p className="fade-up text-xl md:text-2xl text-neutral-700 text-balance">
              My full portfolio is{" "}
              <span className="text-neutral-800 font-medium underline">
                currently in development
              </span>{" "}
              — here are a few of my projects you can explore.
            </p>
          </div>
          <div className="flex-1">
            <h2 className="fade-up text-sm md:text-base uppercase text-neutral-600 mb-6 md:mb-8 font-light tracking-wider">
              Selected Projects
            </h2>
            <div className="font-space-grotesk flex flex-col gap-8 md:gap-10 font-medium text-xl md:text-2xl">
              <div className="fade-up">
                <Link
                  href="https://interview.bydiba.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit AI Interview Coach project"
                  className="hover-underline group flex items-center justify-between pb-2 border-b border-neutral-800/10"
                >
                  AI Interview Coach
                  <svg
                    className="w-5 h-5 opacity-0 group-hover:opacity-100 transition duration-500"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h306.7L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                  </svg>
                </Link>
              </div>

              <div className="fade-up">
                <Link
                  href="https://landing.bydiba.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Landing Page project"
                  className="hover-underline group flex items-center justify-between pb-2 border-b border-neutral-800/10"
                >
                  Landing Page
                  <svg
                    className="w-5 h-5 opacity-0 group-hover:opacity-100 transition duration-500"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h306.7L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                  </svg>
                </Link>
              </div>
              <div className="fade-up">
                <Link
                  href="https://motors.bydiba.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Business Site project"
                  className="hover-underline group flex items-center justify-between pb-2 border-b border-neutral-800/10"
                >
                  Business Website
                  <svg
                    className="w-5 h-5 opacity-0 group-hover:opacity-100 transition duration-500"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h306.7L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="fade-up">
            <Link
              href="https://www.linkedin.com/in/diba-malikzadeh-74700736a/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my LinkedIn profile"
              className="flex items-center justify-center w-10 h-10 border rounded-full border-neutral-800/15 text-neutral-800/40 hover:border-neutral-800/30 hover:text-neutral-800/60 hover:scale-105 active:scale-95 transition duration-300"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4.5 9.5H4c-.943 0-1.414 0-1.707.293S2 10.557 2 11.5V20c0 .943 0 1.414.293 1.707S3.057 22 4 22h.5c.943 0 1.414 0 1.707-.293S6.5 20.943 6.5 20v-8.5c0-.943 0-1.414-.293-1.707S5.443 9.5 4.5 9.5m2-5.25a2.25 2.25 0 1 1-4.5 0a2.25 2.25 0 0 1 4.5 0m5.826 5.25H11.5c-.943 0-1.414 0-1.707.293S9.5 10.557 9.5 11.5V20c0 .943 0 1.414.293 1.707S10.557 22 11.5 22h.5c.943 0 1.414 0 1.707-.293S14 20.943 14 20v-3.5c0-1.657.528-3 2.088-3c.78 0 1.412.672 1.412 1.5v4.5c0 .943 0 1.414.293 1.707s.764.293 1.707.293h.499c.942 0 1.414 0 1.707-.293c.292-.293.293-.764.293-1.706L22 14c0-2.486-2.364-4.5-4.703-4.5c-1.332 0-2.52.652-3.297 1.673c0-.63 0-.945-.137-1.179a1 1 0 0 0-.358-.358c-.234-.137-.549-.137-1.179-.137"
                  color="currentColor"
                />
              </svg>
            </Link>
          </div>
          <div className="fade-up">
            <Link
              href="https://github.com/dmalikzadeh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my GitHub profile"
              className="flex items-center justify-center w-10 h-10 border rounded-full border-neutral-800/15 text-neutral-800/40 hover:border-neutral-800/30 hover:text-neutral-800/60 hover:scale-105 active:scale-95 transition duration-300"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                >
                  <path d="M9.096 21.25v-3.146a3.33 3.33 0 0 1 .758-2.115c-3.005-.4-5.28-1.859-5.28-5.798c0-1.666 1.432-3.89 1.432-3.89c-.514-1.13-.5-3.084.06-3.551c0 0 1.95.175 3.847 1.75c1.838-.495 3.764-.554 5.661 0c1.897-1.575 3.848-1.75 3.848-1.75c.558.467.573 2.422.06 3.551c0 0 1.432 2.224 1.432 3.89c0 3.94-2.276 5.398-5.28 5.798a3.33 3.33 0 0 1 .757 2.115v3.146" />
                  <path d="M3.086 16.57c.163.554.463 1.066.878 1.496c.414.431.932.77 1.513.988a4.46 4.46 0 0 0 3.62-.216" />
                </g>
              </svg>
            </Link>
          </div>
          <div className="fade-up">
            <Link
              href="mailto:contact@bydiba.dev"
              aria-label="Send me an email"
              className="flex items-center justify-center w-10 h-10 border rounded-full border-neutral-800/15 text-neutral-800/40 hover:border-neutral-800/30 hover:text-neutral-800/60 hover:scale-105 active:scale-95 transition duration-300"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M14.95 3.684L8.637 8.912a1 1 0 0 1-1.276 0l-6.31-5.228A.999.999 0 0 0 1 4v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a.999.999 0 0 0-.05-.316M2 2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m-.21 1l5.576 4.603a1 1 0 0 0 1.27.003L14.268 3z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
