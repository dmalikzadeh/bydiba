"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CvFile from "./CvFile";
import ShowcaseFile from "./ShowcaseFile";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);

  const scrollToProjects = () => {
    const target = document.querySelector("#projects");
    if (!target) return;

    const smoother = ScrollSmoother.get();

    if (smoother) {
      smoother.scrollTo(target, true, "top+=1 top");
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // page load animation
      gsap.set(".hero-subtitle", { autoAlpha: 0, y: 20 });
      gsap.set(".hero-cta", { autoAlpha: 0, y: 16 });
      gsap.set(".hero-link", { autoAlpha: 0, y: 12 });
      gsap.set(".hero-file", {
        autoAlpha: 0,
        scale: 0.6,
        y: -18,
        transformOrigin: "50% 50%",
      });
      gsap.set(".hero-glow", { scale: 0.88, autoAlpha: 0 });
      gsap.set(".hero-word", { y: 60, autoAlpha: 0 });
      gsap.set(".hero-flower-container", { width: 0 });
      gsap.set(".hero-flower", {
        autoAlpha: 0,
        rotation: 0,
        x: -14,
        transformOrigin: "50% 50%",
      });

      const introTl = gsap.timeline({
        defaults: { ease: "power3.out", overwrite: "auto" },
      });

      introTl.to(".hero-glow", {
        autoAlpha: 1,
        scale: 1,
        duration: 1.6,
      });

      introTl.to(
        ".hero-word",
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.06,
          duration: 0.9,
        },
        "-=1.2",
      );

      introTl.to(
        ".hero-subtitle",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.5",
      );

      introTl.to(
        ".hero-cta",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.3",
      );

      introTl.to(
        ".hero-link",
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.5,
        },
        "-=0.4",
      );

      introTl.to(
        ".hero-file",
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: "back.out(2)",
        },
        "-=0.2",
      );

      // scroll animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
        },
        overwrite: "auto",
      });

      tl.to(
        ".scroll-fade",
        {
          autoAlpha: 0,
          duration: 1.2,
          ease: "none",
        },
        0,
      );

      tl.to(
        ".hero-flower-container",
        {
          ease: "back.out(1.4)",
          width: "0.9em",
          duration: 1,
        },
        0,
      );

      tl.to(
        ".hero-flower",
        {
          autoAlpha: 1,
          ease: "back.out(1.6)",
          x: 0,
          duration: 1.2,
        },
        0.2,
      );

      tl.to({}, { duration: 0.6 });

      gsap.to(".hero-flower", {
        rotation: 360,
        duration: 2.6,
        ease: "steps(4)",
        repeat: -1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative h-[100svh] flex items-center p-4 sm:p-12"
    >
      <div className="hero-glow invisible blur">
        <div className="gradient-mask">
          <div className="spin-wrapper">
            <div className="spinning-gradient"></div>
          </div>
        </div>
      </div>

      <CvFile />
      <ShowcaseFile />

      <div className="z-10 flex h-full w-full flex-col">
        <div className="flex flex-1 items-center">
          <div>
            <h1 className="mb-8 flex w-full flex-wrap items-center gap-x-[0.2em] gap-y-2 font-clash text-8xl font-medium sm:inline-flex sm:w-auto sm:gap-y-0 sm:text-[8rem]/30">
              <span className="inline-block hero-word invisible">Hi,</span>
              <span className="inline-block hero-word invisible">I&apos;m</span>
              <span className="hero-name relative isolate inline-flex basis-full items-center hero-word invisible sm:basis-auto">
                <span className="hero-flower-container relative z-0 inline-flex h-[0.9em] w-0 shrink-0 items-center justify-center overflow-hidden">
                  <svg
                    className="shrink-0 hero-flower block h-full w-auto text-[#E07A5F]"
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
                </span>
                <span className="relative z-10">Diba.</span>
              </span>
            </h1>

            <div className="scroll-fade">
              <p className="hero-subtitle invisible max-w-xl text-xl sm:text-2xl text-black/60 font-light">
                I build{" "}
                <span className="text-black font-normal">full-stack</span> and{" "}
                <span className="text-black font-normal">AI-powered</span>{" "}
                products that are both technically solid and carefully designed.
              </p>
            </div>
          </div>
        </div>
        <div className="scroll-fade flex items-end justify-between">
          <div className="hero-cta invisible shrink-0">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToProjects();
              }}
              className="group font-clash font-light text-2xl inline-flex items-center gap-4 text-black/50 hover:text-black transition duration-500 ease-in-out"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center border rounded-full group-hover:scale-90 group-hover:bg-black group-hover:text-white transition duration-500 ease-in-out">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 5v14M6.5 13.5L12 19l5.5-5.5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                  />
                </svg>
              </div>
              View my work
            </a>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <div className="hero-link invisible">
              <a
                href="mailto:contact@bydiba.dev"
                aria-label="Email Diba"
                className="group text-black/20 hover:text-black/40 cursor-pointer transition duration-300"
              >
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 transition-transform duration-300 group-hover:scale-105 group-active:scale-95"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="11.75" strokeWidth=".5" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth=".5"
                    d="M7.333 7.334h9.334A1.17 1.17 0 0 1 17.833 8.5v7a1.17 1.17 0 0 1-1.166 1.167H7.333A1.17 1.17 0 0 1 6.167 15.5v-7a1.17 1.17 0 0 1 1.166-1.166"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth=".5"
                    d="M17.833 8.5 12 12.583 6.167 8.5"
                  />
                </svg>
              </a>
            </div>
            <div className="hero-link invisible">
              <a
                href="https://linkedin.com/in/dibamalikzadeh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Diba's LinkedIn profile"
                className="group text-black/20 hover:text-black/40 cursor-pointer transition duration-300"
              >
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 transition-transform duration-300 group-hover:scale-105 group-active:scale-95"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth=".5"
                    d="M12 .25C18.49.25 23.75 5.51 23.75 12S18.49 23.75 12 23.75.25 18.49.25 12 5.51.25 12 .25ZM6.055 17.27h2.839V9.284h-2.84zm8.978-8.056c-.716 0-1.307.195-1.744.468a2.5 2.5 0 0 0-.34.255v-.653H9.805l.013.264c.016.304.016 2.163.012 3.963l-.008 2.427-.003.785v.22l-.002.056v.272h3.13v-4.296c0-.123-.002-.224.003-.32a.6.6 0 0 1 .035-.199l.001-.003c.157-.395.475-.76 1.034-.76.384 0 .637.14.803.37.175.24.273.608.273 1.085v4.122h3.153v-4.413c0-1.204-.34-2.12-.929-2.737-.59-.617-1.401-.906-2.288-.906ZM7.425 5.75c-.486 0-.906.158-1.208.438a1.5 1.5 0 0 0-.472 1.11c0 .874.67 1.549 1.648 1.549h.018c.496 0 .918-.164 1.217-.448.262-.248.418-.58.451-.944l.007-.158v-.005l-.01-.16a1.53 1.53 0 0 0-.456-.942c-.295-.282-.709-.44-1.195-.44Z"
                  />
                </svg>
              </a>
            </div>
            <div className="hero-link invisible">
              <a
                href="https://github.com/dmalikzadeh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Diba's GitHub profile"
                className="group text-black/20 hover:text-black/40 cursor-pointer transition duration-300"
              >
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 transition-transform duration-300 group-hover:scale-105 group-active:scale-95"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth=".5"
                    d="M12 .25c6.484 0 11.75 5.39 11.75 12.054 0 5.322-3.36 9.832-8.017 11.43-.233.043-.346-.014-.402-.066a.39.39 0 0 1-.105-.281c0-.202.004-.633.007-1.222.004-.588.007-1.331.007-2.155 0-.92-.236-1.618-.57-2.092 1.209-.18 2.443-.543 3.411-1.374 1.105-.948 1.825-2.468 1.825-4.883 0-1.349-.45-2.467-1.202-3.355.166-.493.441-1.713-.169-3.293l-.042-.112-.113-.036-.027.084.027-.085h-.004l-.007-.003-.017-.005-.052-.01a1.3 1.3 0 0 0-.179-.02 2.6 2.6 0 0 0-.661.066c-.561.121-1.383.44-2.5 1.2a11.6 11.6 0 0 0-2.959-.393h-.002c-1.001.005-2.01.135-2.959.394-1.117-.76-1.94-1.08-2.5-1.201a2.6 2.6 0 0 0-.663-.066 1.3 1.3 0 0 0-.231.03l-.018.005-.009.003.076.239-.078-.239-.112.037-.043.112c-.608 1.58-.333 2.8-.168 3.293-.748.888-1.201 2.006-1.201 3.355 0 2.41.719 3.93 1.821 4.881.967.835 2.2 1.203 3.405 1.386-.225.323-.403.75-.494 1.279-.332.139-.83.291-1.355.243-.537-.049-1.124-.305-1.603-1.052l-.094-.157-.007-.014-.026-.042a3.3 3.3 0 0 0-.477-.599c-.333-.33-.845-.69-1.529-.74h-.033l-.042.002a2 2 0 0 0-.137.01 1 1 0 0 0-.38.11.44.44 0 0 0-.19.207.42.42 0 0 0 .005.325c.073.178.26.356.534.549l.017.012.017.007h.001l.001.001.017.01a1 1 0 0 1 .08.05c.07.05.172.132.293.256.24.247.554.667.814 1.342l.001.005a1 1 0 0 0 .042.106c.03.067.076.16.141.267.13.215.343.492.669.743.622.477 1.622.832 3.178.551.006.913.014 1.724.014 1.988a.38.38 0 0 1-.105.277c-.058.054-.173.111-.405.07C3.61 22.134.25 17.623.25 12.303.25 5.64 5.518.25 12 .25Z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
