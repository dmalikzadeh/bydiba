"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ChangeEvent,
  FormEvent,
  useLayoutEffect,
  useState,
  useRef,
} from "react";
import { useNav } from "./NavContext";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_EMAIL = "contact@bydiba.dev";

export default function Contact() {
  const { setActiveKey } = useNav();

  const [draft, setDraft] = useState({
    company: "",
    from: "",
    message: "",
    subject: "",
  });

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".success-wrapper", {
        autoAlpha: 0,
        pointerEvents: "none",
      });

      gsap.set(".contact-title", { autoAlpha: 0, y: 40 });
      gsap.set(".contact-subtitle", { autoAlpha: 0, y: 20 });
      gsap.set(".contact-window", { autoAlpha: 0, scale: 0.98, y: 56 });
      gsap.set(".contact-input", { autoAlpha: 0, y: 20 });
      gsap.set(".contact-tab", { autoAlpha: 0, x: 32 });
      gsap.set(".mobile-link", { autoAlpha: 0, y: 16 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top top",
          end: "+=100%",
          toggleActions: "play none none reverse",
          pin: true,
          invalidateOnRefresh: true,
          onToggle: (self) => {
            if (self.isActive) {
              setActiveKey("contact");
            }
          },
        },
      });

      tl.to(".contact-title", { autoAlpha: 1, duration: 0.8, y: 0 }, 0)
        .to(".contact-subtitle", { autoAlpha: 1, duration: 0.7, y: 0 }, "-=0.5")
        .to(
          ".mobile-link",
          {
            autoAlpha: 1,
            duration: 0.55,
            stagger: 0.08,
            y: 0,
          },
          "-=0.4",
        )
        .to(
          ".contact-window",
          { autoAlpha: 1, duration: 0.9, scale: 1, y: 0 },
          "-=0.4",
        )
        .to(
          ".contact-input",
          {
            autoAlpha: 1,
            duration: 0.65,
            stagger: 0.08,
            y: 0,
          },
          "-=0.4",
        )
        .to(
          ".contact-tab",
          {
            autoAlpha: 1,
            duration: 0.6,
            stagger: 0.1,
            x: 0,
          },
          "-=0.4",
        );

      tl.to({}, { duration: 1 });
    });

    return () => ctx.revert();
  }, [setActiveKey]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = document.querySelector(".success-wrapper");
      const overlay = document.querySelector(".success-overlay");

      if (!wrapper || !overlay) return;

      gsap.set(wrapper, { autoAlpha: 0, pointerEvents: "none" });
      gsap.set(overlay, {
        backdropFilter: "blur(0px)",
        autoAlpha: 0,
      });

      gsap.set(".success-title", { autoAlpha: 0 });
      gsap.set([".success-subtitle", ".success-btn"], {
        autoAlpha: 0,
        scale: 0.96,
      });
      gsap.set(".success-blob", { autoAlpha: 0, scale: 0.8 });

      const tl = gsap.timeline({ paused: true });

      tl.set(wrapper, { pointerEvents: "auto" })
        .to(wrapper, {
          autoAlpha: 1,
          duration: 0.5,
          ease: "power2.out",
        })
        .to(
          overlay,
          {
            backdropFilter: "blur(18px)",
            autoAlpha: 1,
            duration: 1.8,
            ease: "sine.out",
          },
          0.1,
        )
        .to(
          ".success-blob",
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.4,
            ease: "power2.out",
          },
          0.15,
        )
        .to(
          ".success-title",
          {
            autoAlpha: 1,
            duration: 2,
            ease: "power3.out",
          },
          0.2,
        )
        .to(
          [".success-subtitle", ".success-btn"],
          {
            autoAlpha: 1,
            scale: 1,
            stagger: 0.8,
            duration: 1.2,
            ease: "power3.out",
          },
          0.8,
        );

      tlRef.current = tl;
    });

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;

    if (sent) {
      tl.timeScale(1);
      tl.play();
    } else {
      tl.timeScale(1.8);
      tl.reverse();
    }
  }, [sent]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending || !hasContent) return;

    if (error) setError(false);
    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(draft),
      });

      if (!res.ok) throw new Error();

      setSent(true);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setSending(false);
    }
  };

  const hasContent = [draft.from, draft.subject, draft.message].some(
    (value) => value.trim().length > 0,
  );

  const handleChange =
    (field: keyof typeof draft) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setDraft((currentDraft) => ({
        ...currentDraft,
        [field]: event.target.value,
      }));
    };

  return (
    <section
      id="contact"
      className="contact-section relative h-[100svh] flex items-center p-4 pt-20 sm:pt-24 sm:p-12"
    >
      <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 w-full sm:h-auto h-full">
        <div className="sm:flex-1 sm:pt-12">
          <h2 className="contact-title font-clash text-5xl sm:text-6xl mb-4 sm:mb-6">
            let&apos;s talk.
          </h2>
          <p className="contact-subtitle max-w-sm text-lg sm:text-xl text-black/80 font-light ">
            Have an idea, opportunity, or just want to connect? I&apos;d love to
            hear from you.
          </p>
        </div>

        <div className="sm:hidden text-sm flex flex-col gap-3 items-end text-black/60">
          <div className="mobile-link flex items-center gap-2">
            <a
              href="mailto:contact@bydiba.dev"
              className="underline cursor-pointer"
            >
              contact@bydiba.dev
            </a>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22 7.535V17a3 3 0 0 1-2.824 2.995L19 20H5a3 3 0 0 1-2.995-2.824L2 17V7.535l9.445 6.297.116.066a1 1 0 0 0 .878 0l.116-.066z" />
              <path d="M19 4c1.08 0 2.027.57 2.555 1.427L12 11.797l-9.555-6.37a3 3 0 0 1 2.354-1.42L5 4z" />
            </svg>
          </div>

          <div className="mobile-link flex items-center gap-2">
            <a
              href="https://linkedin.com/in/dibamalikzadeh"
              target="_blank"
              rel="noopener noreferrer"
              className="underline cursor-pointer"
            >
              linkedin.com/in/dibamalikzadeh
            </a>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17 2a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm-9 8a1 1 0 0 0-1 1v5a1 1 0 0 0 2 0v-5a1 1 0 0 0-1-1m6 0a3 3 0 0 0-1.168.236l-.125.057A1 1 0 0 0 11 11v5a1 1 0 0 0 2 0v-3a1 1 0 0 1 2 0v3a1 1 0 0 0 2 0v-3a3 3 0 0 0-3-3M8 7a1 1 0 0 0-.993.883L7 8.01a1 1 0 0 0 1.993.117L9 8a1 1 0 0 0-1-1" />
            </svg>
          </div>
          <div className="mobile-link flex items-center gap-2">
            <a
              href="https://github.com/dmalikzadeh"
              target="_blank"
              rel="noopener noreferrer"
              className="underline cursor-pointer"
            >
              github.com/dmalikzadeh
            </a>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M5.315 2.1c.791-.113 1.9.145 3.333.966l.272.161.16.1.397-.083a13.3 13.3 0 0 1 4.59-.08l.456.08.396.083.161-.1c1.385-.84 2.487-1.17 3.322-1.148l.164.008.147.017.076.014.05.011.144.047a1 1 0 0 1 .53.514 5.2 5.2 0 0 1 .397 2.91l-.047.267-.046.196.123.163c.574.795.93 1.728 1.03 2.707l.023.295L21 9.5c0 3.855-1.659 5.883-4.644 6.68l-.245.061-.132.029.014.161.008.157.004.365-.002.213L16 21a1 1 0 0 1-.883.993L15 22H9a1 1 0 0 1-.993-.883L8 21v-.734c-1.818.26-3.03-.424-4.11-1.878l-.535-.766c-.28-.396-.455-.579-.589-.644l-.048-.019a1 1 0 0 1 .564-1.918c.642.188 1.074.568 1.57 1.239l.538.769c.76 1.079 1.36 1.459 2.609 1.191L8 17.562l-.018-.168a5 5 0 0 1-.021-.824l.017-.185.019-.12-.108-.024c-2.976-.71-4.703-2.573-4.875-6.139l-.01-.31L3 9.5a5.6 5.6 0 0 1 .908-3.051l.152-.222.122-.163-.045-.196a5.2 5.2 0 0 1 .145-2.642l.1-.282.106-.253a1 1 0 0 1 .529-.514l.144-.047z" />
            </svg>
          </div>
        </div>

        <div className="z-10 relative flex-1">
          <div className="contact-window relative flex flex-col bg-[#fafafa] rounded-3xl w-full h-full border border-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <div className="border-b border-black/10 h-[60px] sm:h-[52px] flex items-center justify-between px-2">
              <div className="flex gap-2 px-2.5">
                <span className="w-4 h-4 sm:w-3.5 sm:h-3.5 rounded-full bg-[#FF5F57]" />
                <span className="w-4 h-4 sm:w-3.5 sm:h-3.5 rounded-full bg-[#FFBD2E]" />
                <span className="w-4 h-4 sm:w-3.5 sm:h-3.5 rounded-full bg-[#28C840]" />
              </div>

              <button
                type="submit"
                form="contact-form"
                className="w-11 h-11 sm:w-9 sm:h-9 rounded-full flex items-center justify-center
                          bg-[#0A84FF] hover:brightness-120 text-white
                          disabled:opacity-40 disabled:pointer-events-none
                          active:scale-90 cursor-pointer transition duration-300"
                disabled={!hasContent || sending || sent}
                id="sendBtn"
                aria-label="Send message"
              >
                {sending ? (
                  <svg
                    className="w-5 h-5 opacity-80"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        dur="0.75s"
                        values="0 12 12;360 12 12"
                        repeatCount="indefinite"
                      />
                    </path>
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 sm:w-5 sm:h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                    />
                  </svg>
                )}
              </button>
            </div>

            <div className="success-wrapper z-20 absolute inset-0 flex rounded-[inherit] overflow-hidden pointer-events-none">
              <div className="success-overlay absolute inset-0 bg-white/10">
                <div className="hidden sm:block success-blob absolute top-[20%] left-[12%] bg-[#fca311]/30 rounded-full w-50 h-50 blur-3xl" />
                <div className="hidden sm:block success-blob absolute top-[12%] right-[20%] bg-[#8338ec]/30 rounded-full w-40 h-40 blur-3xl" />
                <div className="hidden sm:block success-blob absolute bottom-[30%] left-[12%] bg-[#ff006e]/30 rounded-full w-30 h-30 blur-3xl" />
                <div className="hidden sm:block success-blob absolute bottom-[20%] right-[16%] bg-[#fb5607]/30 rounded-full w-50 h-50 blur-3xl" />
                <div className="hidden sm:block success-blob absolute bottom-[45%] right-[12%] bg-[#00b4d8]/30 rounded-full w-30 h-30 blur-3xl" />
              </div>
              <div className="success-content z-10 flex-1 flex flex-col items-center justify-center">
                <h3 className="success-title font-borel text-3xl sm:text-5xl">
                  thank you
                </h3>

                <p className="success-subtitle sm:text-lg font-light text-black/60">
                  I&apos;ll get back to you soon.
                </p>

                <div className="success-btn">
                  <button
                    onClick={() => {
                      setSent(false);
                      setDraft({
                        company: "",
                        from: "",
                        subject: "",
                        message: "",
                      });
                    }}
                    className="group mt-12 flex items-center gap-2 text-sm text-white rounded-full px-4 py-2
                  bg-[#0A84FF] hover:brightness-120 active:scale-95 cursor-pointer transition duration-300"
                  >
                    Send another
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition duration-300"
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

            <form
              id="contact-form"
              noValidate
              onSubmit={handleSubmit}
              className="pl-6 flex-1 flex flex-col sm:text-sm text-black/70"
            >
              <div
                aria-hidden="true"
                className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden opacity-0 pointer-events-none"
              >
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={draft.company}
                  onChange={handleChange("company")}
                  name="company"
                  type="text"
                />
              </div>

              <div className="contact-input flex items-center gap-1.5 border-b border-black/10 py-3">
                <span className="text-black/40">To:</span>
                <span className="text-black/80">{CONTACT_EMAIL}</span>
              </div>

              <div className="contact-input flex items-center border-b border-black/10 py-3">
                <span className="text-black/40">Subject:</span>
                <input
                  aria-label="Subject"
                  type="text"
                  value={draft.subject}
                  onChange={handleChange("subject")}
                  name="subject"
                  className="flex-1 bg-transparent outline-none px-1.5"
                />
              </div>

              <div className="contact-input flex items-center border-b border-black/10 py-3">
                <span className="text-black/40">From:</span>
                <input
                  aria-label="Your contact info"
                  type="text"
                  value={draft.from}
                  onChange={handleChange("from")}
                  name="from"
                  className="flex-1 bg-transparent outline-none px-1.5"
                />
              </div>

              <div className="contact-input flex-1 py-4">
                <textarea
                  aria-label="Message"
                  placeholder="Write your message..."
                  value={draft.message}
                  onChange={handleChange("message")}
                  name="message"
                  className="min-h-24 sm:min-h-80 w-full h-full resize-none bg-transparent outline-none pr-1.5"
                />
              </div>
            </form>

            {error && (
              <div className="p-6 font-light text-sm text-red-500">
                <p>
                  Oops, something went wrong — feel free to reach out directly
                  via email or LinkedIn.
                </p>
              </div>
            )}
          </div>

          <div className="hidden sm:flex absolute bottom-10 right-[100%] flex-col items-end gap-2 -z-1 whitespace-nowrap text-sm">
            <div className="contact-tab">
              <div className="flex items-center gap-3 p-3 bg-[#E07A5F] text-white rounded-l-full opacity-80 hover:opacity-100 translate-x-[calc(100%-2.5rem)] hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 7.535V17a3 3 0 0 1-2.824 2.995L19 20H5a3 3 0 0 1-2.995-2.824L2 17V7.535l9.445 6.297.116.066a1 1 0 0 0 .878 0l.116-.066z" />
                  <path d="M19 4c1.08 0 2.027.57 2.555 1.427L12 11.797l-9.555-6.37a3 3 0 0 1 2.354-1.42L5 4z" />
                </svg>
                <a
                  href="mailto:contact@bydiba.dev"
                  className="underline cursor-pointer"
                >
                  contact@bydiba.dev
                </a>
              </div>
            </div>
            <div className="contact-tab">
              <div className="flex items-center gap-3 p-3 bg-[#0077B5] text-white rounded-l-full opacity-80 hover:opacity-100 translate-x-[calc(100%-2.5rem)] hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17 2a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm-9 8a1 1 0 0 0-1 1v5a1 1 0 0 0 2 0v-5a1 1 0 0 0-1-1m6 0a3 3 0 0 0-1.168.236l-.125.057A1 1 0 0 0 11 11v5a1 1 0 0 0 2 0v-3a1 1 0 0 1 2 0v3a1 1 0 0 0 2 0v-3a3 3 0 0 0-3-3M8 7a1 1 0 0 0-.993.883L7 8.01a1 1 0 0 0 1.993.117L9 8a1 1 0 0 0-1-1" />
                </svg>
                <a
                  href="https://linkedin.com/in/dibamalikzadeh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline cursor-pointer"
                >
                  linkedin.com/in/dibamalikzadeh
                </a>
              </div>
            </div>
            <div className="contact-tab">
              <div className="flex items-center gap-3 p-3 bg-[#24292e] text-white rounded-l-full opacity-80 hover:opacity-100 translate-x-[calc(100%-2.5rem)] hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.315 2.1c.791-.113 1.9.145 3.333.966l.272.161.16.1.397-.083a13.3 13.3 0 0 1 4.59-.08l.456.08.396.083.161-.1c1.385-.84 2.487-1.17 3.322-1.148l.164.008.147.017.076.014.05.011.144.047a1 1 0 0 1 .53.514 5.2 5.2 0 0 1 .397 2.91l-.047.267-.046.196.123.163c.574.795.93 1.728 1.03 2.707l.023.295L21 9.5c0 3.855-1.659 5.883-4.644 6.68l-.245.061-.132.029.014.161.008.157.004.365-.002.213L16 21a1 1 0 0 1-.883.993L15 22H9a1 1 0 0 1-.993-.883L8 21v-.734c-1.818.26-3.03-.424-4.11-1.878l-.535-.766c-.28-.396-.455-.579-.589-.644l-.048-.019a1 1 0 0 1 .564-1.918c.642.188 1.074.568 1.57 1.239l.538.769c.76 1.079 1.36 1.459 2.609 1.191L8 17.562l-.018-.168a5 5 0 0 1-.021-.824l.017-.185.019-.12-.108-.024c-2.976-.71-4.703-2.573-4.875-6.139l-.01-.31L3 9.5a5.6 5.6 0 0 1 .908-3.051l.152-.222.122-.163-.045-.196a5.2 5.2 0 0 1 .145-2.642l.1-.282.106-.253a1 1 0 0 1 .529-.514l.144-.047z" />
                </svg>
                <a
                  href="https://github.com/dmalikzadeh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline cursor-pointer"
                >
                  github.com/dmalikzadeh
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
