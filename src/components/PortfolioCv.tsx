import Image from "next/image";

const proofPoints = [
  { value: "First Class", label: "BSc Computer Science · 75.6% average" },
  { value: "100%", label: "Functional Programming · then taught it" },
  { value: "In production", label: "Client platform live and maintained" },
  { value: "18 users", label: "Aicademy · two rounds of research" },
  { value: "7-person team", label: "Led to 88% · Team Software Project" },
  { value: "A*A*A", label: "Maths · Further Maths · Computer Science" },
];

const principles = [
  {
    title: "Build it, then let real people break it.",
    body: "Aicademy went through two rounds of user research. The second version exists because the first one was wrong in places I could not see on my own.",
  },
  {
    title: "If I cannot explain it, I do not know it.",
    body: "I scored 100% in Functional Programming, then spent a term teaching it. Explaining recursion to someone else is where you find out what you actually understood.",
  },
  {
    title: "Most of what I know, I taught myself.",
    body: "Unfamiliar tooling is a scheduling problem, not a barrier. I would rather read the docs and ship something rough than wait until I feel ready.",
  },
];

const colophon = [
  { label: "Languages", value: "English · native\nPersian / Farsi · native" },
  {
    label: "Set in",
    value: "Clash Display\nPlus Jakarta Sans\nJetBrains Mono",
  },
  {
    label: "Built with",
    value: "Next.js · TypeScript\nTailwind CSS\nDeployed on Vercel",
  },
  { label: "Status", value: "Open to graduate\nsoftware roles · UK" },
];

type SupportingProject = {
  name: string;
  descriptor: string;
  stack: string;
  summary: string;
  href?: string;
  linkLabel?: string;
};

const supportingProjects: SupportingProject[] = [
  {
    name: "MotorArc",
    descriptor: "Production platform · paying client",
    stack: "Next.js · TypeScript · PostgreSQL · Cloudinary · Resend",
    summary:
      "Delivered a live dealership platform with an authenticated admin area, vehicle and image management, enquiry capture, PDF brochures and transactional email.",
    href: "https://motorarc.co.uk",
    linkLabel: "motorarc.co.uk",
  },
  {
    name: "InterviewBot",
    descriptor: "Voice-driven AI interview coach",
    stack:
      "Next.js · TypeScript · Azure OpenAI · Speech-to-text · Text-to-speech · GSAP",
    summary:
      "Built a spoken mock-interview tool that listens, transcribes and responds in real time, then returns structured feedback on the answer rather than a generic score.",
    href: "https://interview.bydiba.dev",
    linkLabel: "interview.bydiba.dev",
  },
  {
    name: "Taskado",
    descriptor: "Seven-person team lead · 88%",
    stack: "Angular · Spring Boot · Spring Security · PostgreSQL · Docker",
    summary:
      "Led delivery of a full-stack productivity platform, built the task-management flow across the frontend and API, and owned the Git workflow, integration and deployment.",
  },
  {
    name: "Bug Report Classification",
    descriptor: "Empirical ML study · 3,712 reports",
    stack: "Python · scikit-learn · TF-IDF · Logistic Regression",
    summary:
      "Evaluated classifiers across 3,712 reports from five deep-learning projects, improving baseline macro-F1 on every project with statistically significant gains across 30 runs.",
  },
];

const technicalPractice = [
  {
    label: "Languages",
    value: "TypeScript, JavaScript, Python, Java, SQL, Haskell and C",
  },
  {
    label: "Product engineering",
    value:
      "React, Next.js, Angular, Vue.js, Tailwind CSS, Node.js, Express, Spring Boot and REST APIs",
  },
  {
    label: "AI & machine learning",
    value:
      "Azure OpenAI, LLM application design, document grounding, strict output contracts, STT/TTS and scikit-learn",
  },
  {
    label: "Data & access",
    value:
      "PostgreSQL, MySQL, Prisma, Supabase, Auth.js, OAuth, JWT and role-based access control",
  },
  {
    label: "Delivery",
    value:
      "Git, GitHub Actions, Docker, Vercel, Cloudinary, Resend, Linux and CI quality gates",
  },
  {
    label: "Design practice",
    value:
      "Figma, responsive interface design, accessibility, user research and interaction polish",
  },
];

export default function PortfolioCv() {
  return (
    <article
      aria-label="Diba Malikzadeh portfolio CV"
      className="bg-[#fffdf9] font-jakarta text-[#28231f] selection:bg-[#efb8aa] selection:text-black"
    >
      <div className="mx-auto min-h-full max-w-[790px] bg-[#fffdf9] shadow-[0_0_0_1px_rgba(57,43,35,0.05)]">
        <header className="relative min-h-[555px] overflow-hidden bg-[linear-gradient(118deg,#f6c8be_0%,#f9d8c0_42%,#f7e6d5_72%,#eddae4_100%)] px-10 pt-11">
          <div
            aria-hidden="true"
            className="absolute -top-16 -right-10 size-52 rounded-full bg-white/40 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 left-[28%] size-48 rounded-full bg-[#f59d76]/20 blur-3xl"
          />

          <div className="relative z-10 flex min-h-[500px] w-[59%] flex-col">
            <div className="mb-7 flex items-center gap-3 font-mono text-[8px] font-bold tracking-[0.2em] text-black/40 uppercase">
              <span>Portfolio CV / 2026</span>
              <span className="h-px w-7 bg-black/20" />
              <span>Online edition</span>
            </div>

            <h1 className="max-w-[410px] font-clash text-[clamp(3.2rem,7.5vw,4.25rem)] leading-[0.84] font-medium tracking-[-0.065em] text-[#211d1a]">
              Diba
              <br />
              Malikzadeh
            </h1>

            <p className="mt-8 max-w-[340px] font-clash text-[22px] leading-[1.08] font-medium tracking-[-0.025em] text-[#8e3f2e]">
              Software engineer building AI-powered products that hold up in the
              real world.
            </p>

            <div className="mt-6 inline-flex w-fit items-center gap-2 font-mono text-[9px] font-bold tracking-[0.08em] text-[#8f3e2c] uppercase">
              <span className="size-1.5 rounded-full bg-[#d66145]" />
              Open to graduate software roles
            </div>

            <div className="mt-auto h-px w-2/3 bg-black/10"></div>
            <nav
              aria-label="Contact and public profile links"
              className="flex flex-wrap gap-1.5 pt-5 pb-8 font-mono text-[9px] font-semibold"
            >
              <a
                href="https://www.linkedin.com/in/dibamalikzadeh"
                target="_blank"
                rel="noreferrer"
                aria-label="Open Diba Malikzadeh on LinkedIn"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#0a66c2] px-2.5 py-1 text-white/80 transition-[transform,color] duration-200 hover:-translate-y-px hover:text-white focus-visible:ring-2 focus-visible:ring-[#8e3f2e]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8d5c3] focus-visible:outline-none active:translate-y-0 active:scale-[0.98]"
              >
                <svg
                  aria-hidden="true"
                  className="size-[1em] shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                </svg>
                /dibamalikzadeh
              </a>
              <a
                href="https://github.com/dmalikzadeh"
                target="_blank"
                rel="noreferrer"
                aria-label="Open Diba Malikzadeh on GitHub"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#181717] px-2.5 py-1 text-white/80 transition-[transform,color] duration-200 hover:-translate-y-px hover:text-white focus-visible:ring-2 focus-visible:ring-[#8e3f2e]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8d5c3] focus-visible:outline-none active:translate-y-0 active:scale-[0.98]"
              >
                <svg
                  aria-hidden="true"
                  className="size-[1em] shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                </svg>
                /dmalikzadeh
              </a>
              <a
                href="https://bydiba.dev"
                target="_blank"
                rel="noreferrer"
                aria-label="Open bydiba.dev in a new tab"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#F27554] px-2.5 py-1 text-white/80 transition-[transform,color] duration-200 hover:-translate-y-px hover:text-white focus-visible:ring-2 focus-visible:ring-[#8e3f2e]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8d5c3] focus-visible:outline-none active:translate-y-0 active:scale-[0.98]"
              >
                <svg
                  aria-hidden="true"
                  className="size-[1em] shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.309 11.881c-2.357 2.256-3.249 1.365-3.9.713-.711-.713-1.597-1.6.922-4.122 1.096-1.097 2.013-1.654 2.725-1.654.282 0 .734.076 1.388.731A1 1 0 1 0 9.86 6.135c-2.02-2.022-4.262-1.762-6.944.923-2.645 2.65-2.946 4.923-.922 6.95.884.885 1.81 1.327 2.795 1.327 1.21 0 2.503-.669 3.903-2.009a1 1 0 1 0-1.384-1.445" />
                  <path d="M14.005 1.985C12.037.015 9.847.237 7.31 2.665A1 1 0 1 0 8.69 4.111c2.358-2.256 3.249-1.364 3.9-.714.711.714 1.597 1.6-.922 4.123-1.1 1.103-2.017 1.661-2.724 1.661-.279 0-.728-.076-1.388-.738A1 1 0 1 0 6.14 9.857c.891.892 1.808 1.325 2.805 1.325 1.292 0 2.608-.715 4.14-2.248 2.644-2.649 2.945-4.921.92-6.95" />
                </svg>
                bydiba.dev
              </a>
              <a
                href="mailto:contact@bydiba.dev"
                aria-label="Email Diba Malikzadeh"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#EA4335] px-2.5 py-1 text-white/80 transition-[transform,color] duration-200 hover:-translate-y-px hover:text-white focus-visible:ring-2 focus-visible:ring-[#8e3f2e]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8d5c3] focus-visible:outline-none active:translate-y-0 active:scale-[0.98]"
              >
                <svg
                  aria-hidden="true"
                  className="size-[1em] shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="m15.97 3.695-5.613 5.612a3.34 3.34 0 0 1-4.714 0L.03 3.695C.02 3.8 0 3.895 0 4v8a3.34 3.34 0 0 0 3.333 3.333h9.334A3.337 3.337 0 0 0 16 12V4c0-.105-.021-.2-.03-.305" />
                  <path d="m9.415 8.364 6.09-6.09A3.32 3.32 0 0 0 12.666.667H3.333A3.32 3.32 0 0 0 .496 2.274l6.09 6.09a2.005 2.005 0 0 0 2.829 0" />
                </svg>
                contact@bydiba.dev
              </a>
            </nav>
          </div>

          <figure className="absolute inset-y-0 right-0 h-auto w-[55%] overflow-hidden [clip-path:ellipse(90%_108%_at_100%_90%)]">
            <Image
              src="/diba-graduation.jpg"
              alt="Diba Malikzadeh in graduation dress holding a pink bouquet outside the University of Birmingham"
              fill
              sizes="(max-width: 639px) 100vw, 435px"
              className="origin-[left_44%] scale-[1.18] object-cover object-[50%_44%]"
            />
            <figcaption className="absolute right-5 bottom-5 text-right font-mono text-[8px] leading-[1.55] font-semibold tracking-[0.1em] text-white/80 uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
              <span className="block">BSc Computer Science</span>
              <span className="block">First-Class Honours · 2026</span>
            </figcaption>
          </figure>
        </header>

        <section className="grid grid-cols-[120px_minmax(0,1fr)] gap-6 bg-[#fffdf9] px-10 py-11">
          <div>
            <p className="font-mono text-[8px] font-bold tracking-[0.1em] text-black/30">
              01
            </p>
            <h2 className="mt-1.5 font-mono text-[9.5px] leading-[1.45] font-extrabold tracking-[0.17em] text-[#94412f] uppercase">
              Profile
            </h2>
            <p className="mt-3 flex items-center gap-1 font-mono text-[8px] font-semibold tracking-[0.1em] text-black/50 uppercase">
              <svg
                aria-hidden="true"
                className="size-[1em] shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M11.995 14.531a3 3 0 0 1-.229-.009c-.877-.067-1.696-.509-2.578-1.392-1.866-1.865-1.866-3.758 0-5.624s3.758-1.865 5.625 0c1.865 1.867 1.865 3.759 0 5.624-.94.94-1.865 1.4-2.817 1.4Zm.023-6.423c-.409 0-.85.246-1.416.812-1.196 1.196-.966 1.829 0 2.796.518.519.949.783 1.316.812.416.045.909-.24 1.479-.812 1.195-1.195.966-1.829 0-2.796-.508-.509-.925-.812-1.379-.812" />
                <path d="M11.986 1c-4.827.066-9.677 4.808-9.677 9.456 0 6.416 8.776 12.141 9.145 12.382a1.005 1.005 0 0 0 1.112-.012c.368-.252 9.021-6.25 9.126-12.418-.146-4.77-4.85-9.341-9.705-9.407Zm.001 19.773c-1.838-1.324-7.576-5.816-7.679-10.329.13-3.709 3.938-7.393 7.677-7.444 3.774.051 7.592 3.75 7.705 7.42-.074 4.302-5.864 8.976-7.704 10.353Z" />
              </svg>
              United Kingdom
            </p>
          </div>
          <div className="min-w-0">
            <p className="max-w-[560px] font-clash text-[27px] leading-[1.16] font-medium tracking-[-0.03em] text-[#2b2521]">
              I like taking complicated systems and making them feel obvious to
              use.
            </p>
            <p className="mt-5 max-w-[570px] text-[14px] leading-[1.78] text-black/60">
              I&apos;m a software engineer working across full-stack systems,
              applied AI and product design. I&apos;ve shipped a live AI
              revision platform, delivered production software for paying
              clients, led a seven-person team and taught a module I had just
              scored 100% in. I care about reliable outputs, clear interfaces
              and the unglamorous engineering that makes a product trustworthy.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-[120px_minmax(0,1fr)] gap-6 bg-[linear-gradient(118deg,rgba(246,200,190,0.3)_0%,rgba(249,216,192,0.3)_55%,rgba(237,218,228,0.3)_100%)] px-10 py-9">
          <div>
            <p className="font-mono text-[8px] font-bold tracking-[0.1em] text-black/30">
              02
            </p>
            <h2 className="mt-1.5 font-mono text-[9.5px] leading-[1.45] font-extrabold tracking-[0.17em] text-[#94412f] uppercase">
              Selected evidence
            </h2>
          </div>
          <dl className="grid min-w-0 grid-cols-2 gap-x-10 gap-y-7 py-1">
            {proofPoints.map((point, index) => (
              <div
                key={point.label}
                className="grid grid-cols-[24px_minmax(0,1fr)] gap-3"
              >
                <span className="font-mono text-[8px] font-bold tracking-[0.08em] text-[#b55a43]">
                  0{index + 1}
                </span>
                <div>
                  <dd className="font-clash text-[18px] leading-none font-medium tracking-[-0.035em] text-[#2a2420]">
                    {point.value}
                  </dd>
                  <dt className="mt-2 text-[8px] leading-[1.5] font-semibold tracking-[0.045em] text-black/40 uppercase">
                    {point.label}
                  </dt>
                </div>
              </div>
            ))}
          </dl>
        </section>

        <section className="grid grid-cols-[120px_minmax(0,1fr)] gap-6 bg-[#fffdf9] px-10 py-11">
          <div>
            <p className="font-mono text-[8px] font-bold tracking-[0.1em] text-black/30">
              03
            </p>
            <h2 className="mt-1.5 font-mono text-[9.5px] leading-[1.45] font-extrabold tracking-[0.17em] text-[#94412f] uppercase">
              Selected work
            </h2>
            <p className="mt-3 font-mono text-[8px] leading-[1.5] font-semibold tracking-[0.1em] text-black/50 uppercase">
              2024 - 2026
            </p>
          </div>
          <div className="min-w-0">
            <article>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[8px] font-bold tracking-[0.16em] text-[#ad4f39] uppercase">
                    Featured · Final-year project · 74%
                  </p>
                  <h3 className="mt-2 font-clash text-[31px] leading-none font-medium tracking-[-0.045em] text-black">
                    Aicademy
                  </h3>
                  <p className="mt-2 text-[11px] font-semibold text-black/50">
                    AI-powered adaptive revision platform
                  </p>
                </div>
                <a
                  href="https://useaicademy.com"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold text-black/50 transition-colors hover:text-[#b6543d] focus-visible:underline focus-visible:underline-offset-4 focus-visible:outline-none"
                >
                  useaicademy.com
                  <span
                    aria-hidden="true"
                    className="text-[11px] leading-none transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
                  >
                    ↗
                  </span>
                </a>
              </div>

              <p className="mt-4 font-mono text-[8px] leading-[1.6] font-semibold tracking-[0.04em] text-[#9c4a37] uppercase">
                Next.js · TypeScript · PostgreSQL · Auth.js · Azure OpenAI ·
                Vercel
              </p>
              <p className="mt-4 text-[13px] leading-[1.7] text-black/60">
                Built a live platform that transforms a topic or uploaded
                PDF/DOCX into structured learning paths, quizzes and flashcards,
                supported by a contextual AI tutor, spaced-repetition review and
                progress analytics.
              </p>

              <ul className="mt-4 space-y-2 text-[12px] leading-[1.65] text-black/60">
                <li className="flex gap-3">
                  <span aria-hidden="true" className="text-[#bd5a43]">
                    —
                  </span>
                  <span>
                    Modelled the relational data layer and strict AI output
                    contracts so generated study material remains reliable,
                    editable and grounded in source documents.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="text-[#bd5a43]">
                    —
                  </span>
                  <span>
                    Validated with 18 users across two rounds: 5.0/5 ease of
                    use, 4.9/5 usefulness and 10 of 12 preferring it to a
                    general-purpose AI tool.
                  </span>
                </li>
              </ul>
            </article>

            <div className="mt-8 border-t border-[#312923]/10">
              {supportingProjects.map((project, index) => (
                <article
                  key={project.name}
                  className={`py-5 ${
                    index ? "border-t border-[#312923]/10" : ""
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                    <div>
                      <h3 className="font-clash text-[20px] leading-none font-medium tracking-[-0.03em] text-black">
                        {project.name}
                      </h3>
                      <p className="mt-2 text-[8px] font-bold tracking-[0.1em] text-[#a44a35] uppercase">
                        {project.descriptor}
                      </p>
                    </div>
                    {project.href && project.linkLabel && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold text-black/50 transition-colors hover:text-[#b6543d] focus-visible:underline focus-visible:underline-offset-4 focus-visible:outline-none"
                      >
                        {project.linkLabel}
                        <span
                          aria-hidden="true"
                          className="text-[11px] leading-none transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
                        >
                          ↗
                        </span>
                      </a>
                    )}
                  </div>
                  <p className="mt-3 text-[12px] leading-[1.65] text-black/60">
                    {project.summary}
                  </p>
                  <p className="mt-2 font-mono text-[8px] leading-[1.6] font-semibold tracking-[0.04em] text-black/40 uppercase">
                    {project.stack}
                  </p>
                </article>
              ))}
            </div>

            <a
              href="https://github.com/dmalikzadeh"
              target="_blank"
              rel="noreferrer"
              aria-label="See more of Diba Malikzadeh's work on GitHub"
              className="group mt-6 inline-flex items-center gap-2 font-mono text-[9px] font-bold tracking-[0.08em] text-[#94412f] uppercase transition-colors hover:text-[#b6543d] focus-visible:underline focus-visible:underline-offset-4 focus-visible:outline-none"
            >
              <svg
                aria-hidden="true"
                className="size-3 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
              </svg>
              More work on GitHub
              <span
                aria-hidden="true"
                className="text-[11px] leading-none transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
              >
                ↗
              </span>
            </a>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#241f1c] px-10 py-14">
          <div
            aria-hidden="true"
            className="absolute -top-20 right-[12%] size-56 rounded-full bg-[#f6c8be]/10 blur-3xl"
          />
          <div className="relative z-10">
            <div className="flex items-center gap-3 font-mono text-[9.5px] leading-[1.45] font-extrabold tracking-[0.17em] text-[#e8a891] uppercase">
              <span className="font-bold text-white/30">04</span>
              <span>How I work</span>
              <span className="h-px w-16 bg-white/20" />
            </div>

            <p className="mt-6 max-w-[520px] font-clash text-[31px] leading-[1.1] font-medium tracking-[-0.03em] text-[#fdf6f0]">
              Three things I keep coming back to.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-8">
              {principles.map((principle, index) => (
                <div key={principle.title}>
                  <p className="font-mono text-[9px] font-bold tracking-[0.08em] text-[#e0846a]">
                    0{index + 1}
                  </p>
                  <h3 className="mt-3 font-clash text-[18px] leading-[1.15] font-medium tracking-[-0.03em] text-[#fdf6f0]">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-[12px] leading-[1.75] text-white/50">
                    {principle.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-[120px_minmax(0,1fr)] gap-6 bg-[#fffdf9] px-10 py-10">
          <div>
            <p className="font-mono text-[8px] font-bold tracking-[0.1em] text-black/30">
              05
            </p>
            <h2 className="mt-1.5 font-mono text-[9.5px] leading-[1.45] font-extrabold tracking-[0.17em] text-[#94412f] uppercase">
              Experience &amp; education
            </h2>
          </div>
          <div className="min-w-0">
            <div className="grid grid-cols-2 gap-10">
              <div>
                <p className="mb-5 font-mono text-[8px] font-bold tracking-[0.16em] text-[#a54b36] uppercase">
                  Experience
                </p>

                <article>
                  <p className="text-[9px] font-bold tracking-[0.1em] text-black/40 uppercase">
                    Sep - Dec 2025
                  </p>
                  <h3 className="mt-2 text-[14px] leading-5 font-bold">
                    Undergraduate Teaching Associate
                  </h3>
                  <p className="text-[9px] leading-[1.5] text-black/40 italic">
                    University of Birmingham · Functional Programming
                  </p>
                  <p className="mt-2 text-[12px] leading-[1.7] text-black/50">
                    Supported second-year Haskell labs and office hours after
                    achieving 100% in the module, explaining recursion, type
                    systems and higher-order functions to mixed-experience
                    groups.
                  </p>
                </article>

                <article className="mt-7">
                  <p className="text-[9px] font-bold tracking-[0.1em] text-black/40 uppercase">
                    2021 - 2024
                  </p>
                  <h3 className="mt-2 text-[14px] leading-5 font-bold">
                    Customer-facing roles
                  </h3>
                  <p className="mt-2 text-[12px] leading-[1.7] text-black/50">
                    Worked across Clinique, Tesco, McDonald&apos;s and
                    hospitality while studying full-time — practical experience
                    in communication, reliability and fast-paced teamwork.
                  </p>
                </article>
              </div>

              <div>
                <p className="mb-5 font-mono text-[8px] font-bold tracking-[0.16em] text-[#a54b36] uppercase">
                  Education
                </p>

                <article>
                  <p className="text-[9px] font-bold tracking-[0.1em] text-black/40 uppercase">
                    Sep 2023 - Jul 2026
                  </p>
                  <h3 className="mt-2 text-[14px] leading-5 font-bold">
                    BSc (Hons) Computer Science
                  </h3>
                  <p className="text-[9px] leading-[1.5] text-black/40 italic">
                    University of Birmingham · First-Class Honours
                  </p>
                  <p className="mt-2 text-[12px] leading-[1.7] text-black/50">
                    Overall average of{" "}
                    <span className="font-medium text-black/80">75.6%</span>.
                    Highlights include Functional Programming{" "}
                    <span className="font-medium text-black/80">(100%)</span>,
                    Team Software Project{" "}
                    <span className="font-medium text-black/80">(88%)</span>,
                    Machine Learning{" "}
                    <span className="font-medium text-black/80">(82%)</span>,
                    Security &amp; Networks{" "}
                    <span className="font-medium text-black/80">(81%)</span> and
                    Artificial Intelligence{" "}
                    <span className="font-medium text-black/80">(80%)</span>.
                  </p>
                </article>

                <article className="mt-7">
                  <p className="text-[9px] font-bold tracking-[0.1em] text-black/40 uppercase">
                    2020 - 2022
                  </p>
                  <h3 className="mt-2 text-[14px] leading-5 font-bold">
                    A-Levels
                  </h3>
                  <p className="text-[9px] leading-[1.5] text-black/40 italic">
                    Great Marlow School
                  </p>
                  <p className="mt-2 text-[12px] leading-[1.7] text-black/50">
                    Mathematics{" "}
                    <span className="font-medium text-black/80">(A*)</span>,
                    Further Mathematics{" "}
                    <span className="font-medium text-black/80">(A*)</span> and
                    Computer Science{" "}
                    <span className="font-medium text-black/80">(A)</span>
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-[120px_minmax(0,1fr)] gap-6 bg-[linear-gradient(118deg,rgba(246,200,190,0.3)_0%,rgba(249,216,192,0.3)_55%,rgba(237,218,228,0.3)_100%)] px-10 py-10">
          <div>
            <p className="font-mono text-[8px] font-bold tracking-[0.1em] text-black/30">
              06
            </p>
            <h2 className="mt-1.5 font-mono text-[9.5px] leading-[1.45] font-extrabold tracking-[0.17em] text-[#94412f] uppercase">
              Technical practice
            </h2>
          </div>
          <div className="min-w-0">
            <dl className="grid grid-cols-2 gap-x-10 gap-y-7">
              {technicalPractice.map((group) => (
                <div key={group.label}>
                  <dt className="text-[9px] font-bold tracking-[0.12em] text-[#9d4733] uppercase">
                    {group.label}
                  </dt>
                  <dd className="mt-2 text-[12px] leading-[1.7] text-black/60">
                    {group.value}
                  </dd>
                </div>
              ))}
            </dl>

            <aside className="mt-9 grid grid-cols-2 gap-10 border-t-2 border-[#c36049]/40 pt-6">
              <div>
                <p className="font-mono text-[8px] font-bold tracking-[0.17em] text-[#a84f3b] uppercase">
                  Security foundation
                </p>
                <p className="mt-3 font-clash text-[20px] leading-[1.08] font-medium tracking-[-0.025em] text-[#2d2723]">
                  Built into the product work.
                </p>
              </div>
              <p className="text-[12px] leading-[1.75] text-black/60">
                Practical coursework covered reverse engineering, binary
                patching, buffer-overflow exploitation and dynamic analysis
                across x64 and ARM. Product work includes OAuth, JWT, role-based
                access control, server-side validation, secrets management and
                CI quality gates.
              </p>
            </aside>
          </div>
        </section>

        <footer className="bg-[#fffdf9] px-10 py-10">
          <p className="font-mono text-[9.5px] leading-[1.45] font-extrabold tracking-[0.17em] text-[#94412f] uppercase">
            Colophon
          </p>

          <dl className="mt-6 grid grid-cols-4 gap-x-8 gap-y-6">
            {colophon.map((item) => (
              <div key={item.label}>
                <dt className="font-mono text-[8px] font-bold tracking-[0.13em] text-[#a34a35] uppercase">
                  {item.label}
                </dt>
                <dd className="mt-2 text-[11px] leading-[1.7] whitespace-pre-line text-black/50">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-9 flex flex-wrap items-end justify-between gap-5 border-t border-[#312923]/10 pt-6">
            <div>
              <a
                href="https://bydiba.dev"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 font-clash text-[21px] leading-none font-medium tracking-[-0.03em] text-[#8e3f2e] transition-colors hover:text-[#b6543d]"
              >
                <svg
                  aria-hidden="true"
                  className="size-[1.05em] shrink-0 transition-transform duration-500 ease-in-out group-hover:rotate-[360deg]"
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
              <p className="font-mono text-[8px] tracking-[0.12em] text-black/40 uppercase">
                Portfolio edition · 2026
              </p>
            </div>
            <a
              href="mailto:contact@bydiba.dev"
              className="group font-clash text-[17px] font-medium tracking-[-0.02em] text-[#8e3f2e] transition-colors hover:text-[#b6543d]"
            >
              Let&apos;s build something
              <span
                aria-hidden="true"
                className="ml-1 inline-block transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
          </div>
        </footer>
      </div>
    </article>
  );
}
