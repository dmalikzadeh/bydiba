"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import { useLayoutEffect } from "react";
import CreativeCanvas from "./CreativeCanvas";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

export default function Creative() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".creative-link", { autoAlpha: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: ".creative-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(
        ".creative-text",
        {
          duration: 2.2,
          scrambleText: {
            text: "crafted beyond the surface.",
            chars: "lowercase",
          },
        },
        1.2,
      );

      tl.to(
        ".creative-link",
        { autoAlpha: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6",
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="creative-section flex h-[100svh] items-center justify-center">
      <div className="relative h-full w-full overflow-hidden">
        <CreativeCanvas />

        <div className="absolute w-full bottom-20 left-1/2 -translate-x-1/2 flex flex-col gap-4 items-center text-center">
          <p className="creative-text font-clash"></p>

          <div className="creative-link">
            <a
              href="https://github.com/dmalikzadeh/bydiba"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 text-sm underline font-light text-[#E07A5F]/60 hover:text-[#E07A5F] cursor-pointer transition duration-300"
            >
              view source
              <svg
                className="w-[1em] h-[1em]"
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
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
