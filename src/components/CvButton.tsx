"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function CvButton() {
  const [visible, setVisible] = useState(false);
  const resumeIconRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: "-45% 0px 0px 0px" },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const icon = resumeIconRef.current;

      if (!icon) return;

      gsap.set(icon, {
        rotation: 0,
        transformOrigin: "50% 50%",
      });

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.4,
      });

      tl.set(icon, { x: 0, y: 0, rotation: 12 })
        .to({}, { duration: 0.6 })

        .set(icon, { rotation: 0 })
        .to({}, { duration: 0.6 })

        .set(icon, { rotation: -12 })
        .to({}, { duration: 0.6 });
    });

    return () => ctx.revert();
  }, []);

  return (
    <button
      type="button"
      onClick={(event) =>
        window.dispatchEvent(
          new CustomEvent("bydiba:open-cv", {
            detail: { source: event.currentTarget },
          }),
        )
      }
      aria-label="Open my CV"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`group fixed right-8 bottom-8 z-40 hidden cursor-pointer items-center gap-1.5 rounded-full bg-[#f9dcc4] px-3 py-2 font-clash text-xs text-black/80 duration-300 hover:text-black hover:brightness-95 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#C9583B]/35 focus-visible:ring-offset-2 focus-visible:outline-none md:inline-flex ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      my résumé
      <svg
        ref={resumeIconRef}
        className="w-[1em] h-[1em]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M23.66 5.499c-.35-1.623-2.792-2.972-7.455-2.34-1.63.213-3.253.427-4.884.632-2.332.299-4.663.598-6.994.922-.666.094-1.273.265-1.87.427-.316.094-.64.188-.983.265-.025.008-.034.017-.06.025s-.042.018-.068.026a1 1 0 0 0-.145.094c-.008.009-.025.017-.034.026-.008.008-.008.008-.008.017a.6.6 0 0 0-.129.188c-.008.017-.008.025-.008.042-.017.052-.034.094-.043.154-.008.12-.085 1.076-.188 2.417-.23 3.006-.615 7.95-.768 9.82-.009.051-.197 1.273.674 2.297.735.863 1.947 1.298 3.621 1.298 2.22 0 4.475-.068 6.653-.128l1.665-.051c.691-.017 1.375-.06 2.066-.102a49 49 0 0 1 2.741-.103c5.773 0 6.362-3.288 6.422-3.945.24-2.477.154-10.418-.205-11.981m-19.154.478c2.323-.325 4.646-.623 6.977-.922 1.63-.205 3.262-.419 4.893-.632 2.11-.282 3.638-.111 4.645.247q-.204.27-.41.538l-.256.325c-1.058 1.426-5.508 6.849-5.661 7.028-1.913 1.913-2.912 1.17-4.56-.06-1.239-.93-5.312-4.415-7.233-6.148.546-.154 1.058-.3 1.605-.376M1.304 18.863a1.5 1.5 0 0 1-.009-.487c.162-1.921.547-6.874.777-9.871.034-.402.06-.777.086-1.093a223 223 0 0 0 5.38 4.645 39 39 0 0 1-6.234 6.806m13.321 1.392c-.674.043-1.349.077-2.032.094l-1.674.051a211 211 0 0 1-6.61.128c-1.024 0-1.801-.205-2.314-.572a39.5 39.5 0 0 0 6.516-7.096c.342.282.64.512.845.675.957.708 1.99 1.477 3.211 1.477.897 0 1.896-.41 3.049-1.563.026-.025.17-.205.393-.478 1.358 1.494 2.493 3.236 3.578 4.927l1.102 1.691c-.752.325-1.794.555-3.254.555-.93 0-1.887.051-2.81.111m7.96-2.895c-.018.23-.146.905-.812 1.537a57 57 0 0 1-1.102-1.69c-1.152-1.794-2.348-3.638-3.834-5.244 1.46-1.785 3.809-4.68 4.535-5.662l.239-.307c.17-.222.35-.444.512-.675.145.154.248.3.282.453.307 1.315.418 9.103.18 11.588" />{" "}
      </svg>
    </button>
  );
}
