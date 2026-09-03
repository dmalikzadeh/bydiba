/**
 * Aicademy showcase, printed at A4 (794 × 1123 px @96dpi) via
 * `npm run showcase:pdf`.
 */

const evidence = [
  { value: "694", label: "Lessons written to an exam specification" },
  { value: "39", label: "Diagram types, each with its own custom renderer" },
  { value: "12", label: "Subjects across AQA, Edexcel and OCR" },
  { value: "128", label: "API routes in one TypeScript codebase" },
  { value: "6", label: "Settings that change what the AI writes" },
  { value: "Live", label: "In production since August 2025" },
];

const featuresA = [
  {
    n: "01",
    title: "Start from anything",
    src: "/showcase/s-dashboard.webp",
    width: 350,
    body: "Enter a topic or upload material, and optionally choose a difficulty level. Aicademy reads the request and decides what fits best: a single lesson, a learning path, a quiz or a flashcard deck.",
  },
  {
    n: "02",
    title: "Learning paths",
    src: "/showcase/s-path.webp",
    width: 350,
    body: "A whole subject broken into lessons and quizzes, planned in one pass, so every lesson builds on the last. Each step unlocks the next — there is always a clear next move instead of a syllabus to stare at.",
  },
  {
    n: "03",
    title: "Lessons",
    src: "/showcase/s-lesson.webp",
    width: 350,
    body: "Each lesson is a set of slides rather than an essay, one idea at a time, with tables, code and diagrams built in. The tutor and notes sit on the same page, so nothing pulls the student into another tab.",
  },
];

const featuresB = [
  {
    n: "04",
    title: "Quizzes",
    src: "/showcase/s-quiz.webp",
    width: 350,
    body: "Five question types, two modes and a tutor built in. Every answer is explained, with the common misconceptions flagged.",
  },
  {
    n: "05",
    title: "Flashcards",
    src: "/showcase/s-flashcards.webp",
    width: 350,
    body: "Scheduling follows SM-2 — a card recalled easily drops out of rotation, and one missed keeps coming back until it sticks.",
  },
  {
    n: "06",
    title: "Notes",
    src: "/showcase/s-notes.webp",
    width: 350,
    body: "A Tiptap editor with headings, tables, code and LaTeX. Highlight a passage and turn it into flashcards. Mention anything using @.",
  },
  {
    n: "07",
    title: "The library",
    src: "/showcase/shot-library.webp",
    width: 350,
    body: "Everything a student makes ends up here, with its progress attached and searchable: lessons, quizzes and paths. This is the part a chat window cannot do, and the reason the whole thing is relational rather than a transcript.",
  },
  {
    n: "08",
    title: "Aica, the tutor",
    src: "/showcase/aica-chat.png",
    width: 215,
    body: "Sits inside lessons and quizzes, knows the slide the student is on and how they learn, and can suggest edits to it.",
  },
];

const uat = [
  ["Ease of use", "4.8", "5.0"],
  ["Usefulness", "4.8", "4.9"],
  ["Trust in AI-generated content", "4.7", "4.6"],
  ["Likelihood of reuse", "4.3", "4.8"],
  ["Confidence in the topic, before", "1.5", "2.8"],
  ["Confidence in the topic, after", "4.5", "4.5"],
];

const links: [string, string, string][] = [
  ["Product", "useaicademy.com", "https://useaicademy.com"],
  [
    "Repository",
    "github.com/dmalikzadeh/aicademy",
    "https://github.com/dmalikzadeh/aicademy",
  ],
  [
    "LinkedIn",
    "linkedin.com/company/useaicademy",
    "https://www.linkedin.com/company/useaicademy",
  ],
  ["Portfolio", "bydiba.dev", "https://bydiba.dev"],
];

const PAGE =
  "relative w-[794px] h-[1123px] overflow-hidden flex flex-col break-before-page bg-[#fbfcfe] text-[#16212e] shadow-[0_2px_28px_rgba(2,48,71,0.15)] print:shadow-none";
const LABEL =
  "mt-1.5 font-mono text-[9.5px] leading-[1.45] font-extrabold tracking-[0.17em] text-[#12708d] uppercase";

function Page({ children }: { children: React.ReactNode }) {
  return <article className={PAGE}>{children}</article>;
}

function PageTitle({ n, title }: { n: string; title: string }) {
  return (
    <div className="shrink-0 px-10 pt-[38px] pb-4">
      <p className="font-mono text-[8px] font-bold tracking-[0.22em] text-[#219ebc] uppercase">
        {n}
      </p>
      <h2 className="font-clash mt-2 text-[31px] leading-none font-medium tracking-[-0.045em] text-[#032f45]">
        {title}
      </h2>
      <div className="mt-[11px] h-px w-[86px] bg-[#219ebc]" />
    </div>
  );
}

function Foot({ page, dark }: { page: number; dark?: boolean }) {
  return (
    <div
      className={`invisible flex shrink-0 justify-between border-t pt-2.5 pb-3.5 font-mono text-[7.5px] font-semibold tracking-[0.14em] uppercase print:visible ${
        dark
          ? "border-[#eaf3f8]/15 text-[#eaf3f8]/45"
          : "border-[#023047]/10 px-10 text-[#023047]/30"
      }`}
    >
      <span>Aicademy · A showcase</span>
      <span>
        <Ext href="https://bydiba.dev" className={LINK}>
          bydiba.dev
        </Ext>{" "}
        · {String(page).padStart(2, "0")} / 09
      </span>
    </div>
  );
}

const LINK =
  "transition-colors duration-200 outline-none focus-visible:underline focus-visible:underline-offset-[3px]";
const TEAL_LINK = `${LINK} hover:text-[#1a8fb0]`;
const ONDARK = `${LINK} underline decoration-[0.5px] decoration-current/25 underline-offset-[3px] hover:decoration-current/60`;

function Ext({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const mail = href.startsWith("mailto:");
  return (
    <a
      href={href}
      className={className}
      {...(mail ? {} : { target: "_blank", rel: "noreferrer" })}
    >
      {children}
    </a>
  );
}

function Ref({ n }: { n: number }) {
  return (
    <span className="font-mono text-[9px] font-bold text-[#8ecae6]">[{n}]</span>
  );
}

function Section({
  label,
  note,
  tint,
  tight,
  flat,
  lift,
  py,
  children,
}: {
  label: string;
  note?: string;
  tint?: boolean;
  tight?: boolean;
  flat?: boolean;
  lift?: number;
  py?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`grid ${flat ? "shrink-0" : "grow content-center"} grid-cols-[120px_minmax(0,1fr)] gap-6 px-10 ${py ?? (tight ? "py-[11px]" : "py-[26px]")} ${tint ? "bg-[#e7edf6]" : ""} ${lift ? "relative" : ""}`}
      style={lift ? { top: -lift } : undefined}
    >
      <div>
        <h2 className={LABEL}>{label}</h2>
        {note && (
          <p className="mt-3 font-mono text-[7.5px] leading-[1.65] font-semibold tracking-[0.08em] text-[#023047]/40 uppercase">
            {note}
          </p>
        )}
      </div>
      <div>{children}</div>
    </section>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-[13px] max-w-[560px] text-[12.5px] leading-[1.66] text-[#0b2230]/70 first:mt-0">
      {children}
    </p>
  );
}

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-clash max-w-[550px] text-[22px] leading-[1.18] font-medium tracking-[-0.03em] text-[#072f42]">
      {children}
    </p>
  );
}

function Strong({ children }: { children: React.ReactNode }) {
  return <b className="font-bold text-[#072f42]">{children}</b>;
}

const RATIO: Record<string, number> = {
  supabase: 4.98,
  nextjs: 4.96,
  azure: 6.84,
  authjs: 3.37,
  typescript: 4.01,
  resend: 4.71,
  cloudinary: 5.12,
  github: 4.38,
  vercel: 5.0,
  stripe: 2.4,
  posthog: 5.71,
  devices: 1.05,
  claude: 1,
};

function Logo({
  name,
  cx,
  cy,
  h,
}: {
  name: string;
  cx: number;
  cy: number;
  h: number;
}) {
  const w = h * RATIO[name];
  return (
    <image
      href={`/showcase/logos/${name}.svg`}
      x={cx - w / 2}
      y={cy - h / 2}
      width={w}
      height={h}
    />
  );
}

const TEAL = "#12708d";
const GROUP = "#e7edf6";
const LINE = "rgba(2,48,71,0.3)";
const CAP = "rgba(11,34,48,0.5)";
const ARROW = "rgba(2,48,71,0.45)";

const AXIS = 287;
const PAD = 18;
const CARD = 58;
const STEP = 68;
const COL = 160;

function GroupLabel({ x, y, t }: { x: number; y: number; t: string }) {
  return (
    <text
      x={x}
      y={y - 10}
      fill={TEAL}
      fontSize="7.5"
      fontWeight="700"
      letterSpacing="1.6"
      className="font-mono"
    >
      {t}
    </text>
  );
}

function Caption({ x, y, t }: { x: number; y: number; t: string }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fill={CAP}
      fontSize="5.8"
      letterSpacing="0.55"
      className="font-mono"
    >
      {t}
    </text>
  );
}

function Card({
  x,
  y,
  w = 200,
  name,
  cap,
  bare,
}: {
  x: number;
  y: number;
  w?: number;
  name: string;
  cap: string;
  bare?: boolean;
}) {
  return (
    <g>
      {!bare && (
        <rect
          x={x}
          y={y}
          width={w}
          height={CARD}
          rx={8}
          fill="rgb(255, 255, 255, 0.6)"
        />
      )}
      <Logo name={name} cx={x + w / 2} cy={y + 23} h={17} />
      <Caption x={x + w / 2} y={y + 47} t={cap} />
    </g>
  );
}

const right = (x: number, y: number) => (
  <path
    d={`M${x - 5} ${y - 3.2}L${x} ${y}L${x - 5} ${y + 3.2}Z`}
    fill={ARROW}
  />
);
const left = (x: number, y: number) => (
  <path
    d={`M${x + 5} ${y - 3.2}L${x} ${y}L${x + 5} ${y + 3.2}Z`}
    fill={ARROW}
  />
);
const down = (x: number, y: number) => (
  <path
    d={`M${x - 3.2} ${y - 5}L${x} ${y}L${x + 3.2} ${y - 5}Z`}
    fill={ARROW}
  />
);
const up = (x: number, y: number) => (
  <path
    d={`M${x - 3.2} ${y + 5}L${x} ${y}L${x + 3.2} ${y + 5}Z`}
    fill={ARROW}
  />
);

const FOLDER_D =
  "M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z";

function Folder({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(0.5)`}>
      <path
        d={FOLDER_D}
        fill="none"
        stroke="#12708d"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

function SkillPipeline() {
  const PAD = 14;
  const ROW = 26;
  const STEP = 34;
  const AXIS = 100;
  const TREE_STEP = 26;

  const TREE: [number, string][] = [
    [0, "content/"],
    [1, "official-lessons/"],
    [1, "specs/"],
    [1, "subjects/"],
    [0, "validation-reports/"],
  ];
  const SKILLS = [
    "/aicademy-lesson-author",
    "/aicademy-lesson-validator",
    "/aicademy-curriculum-auditor",
    "/aicademy-asset-validator",
  ];

  const REPO_W = 170;
  const AGENT_X = 222;
  const AGENT_W = 230;
  const AGENT_H = 172;
  const SKILL_X = 504;
  const SKILL_W = 210;

  const repoH = TREE.length * TREE_STEP + PAD * 2 - (TREE_STEP - 14);
  const skillH =
    SKILLS.length * ROW + (SKILLS.length - 1) * (STEP - ROW) + PAD * 2;
  const repoY = AXIS - repoH / 2;
  const skillY = AXIS - skillH / 2;

  const rowY = (i: number) => repoY + PAD + 7 + i * TREE_STEP;
  const kids = TREE.map((t, i) => [t[0], i] as const).filter(([d]) => d === 1);
  const lastKid = rowY(kids[kids.length - 1][1]);

  return (
    <svg
      viewBox="0 0 714 190"
      className="w-full"
      role="img"
      aria-label="Claude Code loading four scoped skills to work on the lesson repository"
    >
      {/* the repo */}
      <GroupLabel x={0} y={repoY} t="THE REPO" />
      <rect
        x={0}
        y={repoY}
        width={REPO_W}
        height={repoH}
        rx={11}
        fill={GROUP}
      />

      <path
        d={`M22 ${rowY(0) + 6}V${lastKid}`}
        fill="none"
        stroke="rgba(2,48,71,0.3)"
        strokeWidth={1}
      />
      {kids.map(([, i]) => (
        <path
          key={i}
          d={`M22 ${rowY(i)}H32`}
          fill="none"
          stroke="rgba(2,48,71,0.3)"
          strokeWidth={1}
        />
      ))}

      {TREE.map(([depth, name], i) => {
        const x = PAD + (depth === 1 ? 22 : 0);
        return (
          <g key={name}>
            <Folder x={x} y={rowY(i) - 6} />
            <text
              x={x + 17}
              y={rowY(i) + 3}
              fill="#12708d"
              fontSize="7.5"
              className="font-mono"
            >
              {name}
            </text>
          </g>
        );
      })}

      {/* the agent */}
      <rect
        x={AGENT_X}
        y={AXIS - AGENT_H / 2}
        width={AGENT_W}
        height={AGENT_H}
        rx={12}
        fill="#f8edeb"
      />
      <text
        x={AGENT_X + AGENT_W / 2}
        y={AXIS - AGENT_H / 2 + 38}
        textAnchor="middle"
        fill="#072f42"
        fontSize="13.5"
        fontWeight="600"
      >
        Claude Code
      </text>
      <Logo name="claude" cx={AGENT_X + AGENT_W / 2} cy={AXIS + 6} h={50} />
      <Caption
        x={AGENT_X + AGENT_W / 2}
        y={AXIS + AGENT_H / 2 - 22}
        t="ONE SKILL LOADED AT A TIME"
      />

      {/* the skills */}
      <GroupLabel x={SKILL_X} y={skillY} t=".CLAUDE/SKILLS" />
      <rect
        x={SKILL_X}
        y={skillY}
        width={SKILL_W}
        height={skillH}
        rx={11}
        fill={GROUP}
      />
      {SKILLS.map((t, i) => (
        <g key={t}>
          <rect
            x={SKILL_X + PAD}
            y={skillY + PAD + i * STEP}
            width={SKILL_W - PAD * 2}
            height={ROW}
            rx={7}
            fill="rgb(255, 255, 255, 0.6)"
          />
          <text
            x={SKILL_X + PAD + 12}
            y={skillY + PAD + i * STEP + 17}
            fill="#12708d"
            fontSize="7.5"
            className="font-mono"
          >
            {t}
          </text>
        </g>
      ))}

      <line
        x1={REPO_W}
        y1={AXIS - 10}
        x2={AGENT_X - 6}
        y2={AXIS - 10}
        stroke={LINE}
        strokeWidth={1}
      />
      {right(AGENT_X - 1, AXIS - 10)}
      <path
        d={`M${AGENT_X} ${AXIS + 12}H${REPO_W + 5}`}
        fill="none"
        stroke={LINE}
        strokeWidth={1}
      />
      {left(REPO_W, AXIS + 12)}
      <line
        x1={AGENT_X + AGENT_W}
        y1={AXIS}
        x2={SKILL_X - 6}
        y2={AXIS}
        stroke={LINE}
        strokeWidth={1}
      />
      {right(SKILL_X - 1, AXIS)}

      <text
        x={(REPO_W + AGENT_X) / 2}
        y={AXIS - 16}
        textAnchor="middle"
        fill={CAP}
        fontSize="6"
        letterSpacing="0.6"
        className="font-mono"
      >
        READS
      </text>
      <text
        x={(REPO_W + AGENT_X) / 2}
        y={AXIS + 24}
        textAnchor="middle"
        fill={CAP}
        fontSize="6"
        letterSpacing="0.6"
        className="font-mono"
      >
        WRITES
      </text>
      <text
        x={(AGENT_X + AGENT_W + SKILL_X) / 2}
        y={AXIS - 6}
        textAnchor="middle"
        fill={CAP}
        fontSize="6"
        letterSpacing="0.6"
        className="font-mono"
      >
        LOADS
      </text>
    </svg>
  );
}

function Architecture() {
  const services: [string, string][] = [
    ["azure", "GENERATION · SWEDEN CENTRAL"],
    ["supabase", "POSTGRES · LONDON"],
    ["stripe", "CHECKOUT · WEBHOOKS"],
    ["cloudinary", "MEDIA"],
    ["resend", "TRANSACTIONAL EMAIL"],
    ["posthog", "PRODUCT ANALYTICS"],
  ];
  const appCards: [string, string][] = [
    ["nextjs", "APP ROUTER · 128 API ROUTES"],
    ["typescript", "ONE CODEBASE"],
    ["authjs", "SESSIONS · V5"],
  ];

  const svcH =
    services.length * CARD + (services.length - 1) * (STEP - CARD) + PAD * 2;
  const svcY = AXIS - svcH / 2;
  const svcCard = (i: number) => svcY + PAD + i * STEP;

  const appBlocks = appCards.length;
  const appH = appBlocks * CARD + (appBlocks - 1) * (STEP - CARD) + PAD * 2;
  const appY = AXIS - appH / 2;
  const appCard = (i: number) => appY + PAD + i * STEP;
  const appBottom = appY + appH;

  const ciY = svcY + svcH - CARD / 2;

  return (
    <svg
      viewBox="0 51 714 456"
      className="w-full"
      role="img"
      aria-label="Aicademy architecture"
    >
      {/* client */}
      <GroupLabel x={0} y={AXIS - 70} t="CLIENT" />
      <rect x={0} y={AXIS - 70} width={COL} height={140} rx={11} fill={GROUP} />
      <Logo name="devices" cx={COL / 2} cy={AXIS - 15} h={64} />
      <Caption x={COL / 2} y={AXIS + 47} t="BROWSER · MOBILE" />

      <line
        x1={COL}
        y1={AXIS}
        x2={206}
        y2={AXIS}
        stroke={LINE}
        strokeWidth={1}
      />
      {right(211, AXIS)}

      {/* application */}
      <GroupLabel x={212} y={appY} t="APPLICATION" />
      <rect x={212} y={appY} width={232} height={appH} rx={11} fill={GROUP} />

      {appCards.map(([name, cap], i) => (
        <Card key={name} x={228} y={appCard(i)} name={name} cap={cap} />
      ))}

      <line
        x1={444}
        y1={AXIS}
        x2={466}
        y2={AXIS}
        stroke={LINE}
        strokeWidth={1}
      />
      <line
        x1={466}
        y1={svcCard(0) + CARD / 2}
        x2={466}
        y2={svcCard(services.length - 1) + CARD / 2}
        stroke={LINE}
        strokeWidth={1}
      />
      {services.map(([name], i) => (
        <g key={name}>
          <line
            x1={466}
            y1={svcCard(i) + CARD / 2}
            x2={484}
            y2={svcCard(i) + CARD / 2}
            stroke={LINE}
            strokeWidth={1}
          />
          {right(489, svcCard(i) + CARD / 2)}
        </g>
      ))}

      {/* data & services */}
      <GroupLabel x={490} y={svcY} t="DATA &amp; SERVICES" />
      <rect x={490} y={svcY} width={224} height={svcH} rx={11} fill={GROUP} />
      {services.map(([name, cap], i) => (
        <Card
          key={name}
          x={490 + PAD}
          y={svcCard(i)}
          w={188}
          name={name}
          cap={cap}
        />
      ))}

      {/* hosting */}
      <rect x={0} y={svcY} width={COL} height={CARD} rx={9} fill={GROUP} />
      <Logo name="vercel" cx={COL / 2} cy={svcY + 23} h={16} />
      <Caption x={COL / 2} y={svcY + 47} t="PRODUCTION HOSTING" />
      <path
        d={`M${COL} ${svcY + CARD / 2}H328V${appY - 5}`}
        fill="none"
        stroke={LINE}
        strokeWidth={1}
      />
      {down(328, appY)}
      <text
        x={214}
        y={svcY + CARD / 2 - 6}
        fill={CAP}
        fontSize="6"
        letterSpacing="0.6"
        className="font-mono"
      >
        DEPLOYS
      </text>

      {/* ci/cd */}
      <rect
        x={0}
        y={ciY - CARD / 2}
        width={COL}
        height={CARD}
        rx={9}
        fill={GROUP}
      />
      <Logo name="github" cx={COL / 2} cy={ciY - CARD / 2 + 23} h={16} />
      <Caption x={COL / 2} y={ciY - CARD / 2 + 47} t="LINT · TYPES · BUILD" />
      <path
        d={`M${COL} ${ciY}H328V${appBottom + 5}`}
        fill="none"
        stroke={LINE}
        strokeWidth={1}
      />
      {up(328, appBottom)}
      <text
        x={214}
        y={ciY - 6}
        fill={CAP}
        fontSize="6"
        letterSpacing="0.6"
        className="font-mono"
      >
        CI / CD
      </text>
    </svg>
  );
}

function FeatureHero({
  n,
  title,
  src,
  body,
}: {
  n: string;
  title: string;
  src: string;
  body: string;
}) {
  return (
    <div className="shrink-0 px-10">
      <div className="overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={title} className="w-full" />
      </div>
      <div className="mt-[15px] grid grid-cols-[240px_minmax(0,1fr)] gap-8">
        <div>
          <p className="font-mono text-[8px] font-bold tracking-[0.16em] text-[#219ebc]">
            {n}
          </p>
          <h3 className="font-clash mt-[7px] text-[22px] leading-[1.12] font-medium tracking-[-0.028em] text-[#072f42]">
            {title}
          </h3>
        </div>
        <p className="text-[12px] leading-[1.65] text-[#0b2230]/70">{body}</p>
      </div>
    </div>
  );
}

function FeatureCard({
  n,
  title,
  src,
  body,
  h = 148,
}: {
  n: string;
  title: string;
  src: string;
  body: string;
  h?: number;
}) {
  return (
    <div>
      <div
        className="flex items-center justify-center"
        style={{ height: `${h}px` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={title}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <p className="mt-[11px] font-mono text-[8px] font-bold tracking-[0.16em] text-[#219ebc]">
        {n}
      </p>
      <h3 className="font-clash mt-[5px] text-[17px] leading-[1.15] font-medium tracking-[-0.025em] text-[#072f42]">
        {title}
      </h3>
      <p className="mt-[7px] text-[11px] leading-[1.6] text-[#0b2230]/70">
        {body}
      </p>
    </div>
  );
}

export default function AicademyShowcase() {
  return (
    <div className="flex flex-col items-center gap-8 py-8 print:block print:gap-0 print:py-0">
      {/* ═══════════ cover ═══════════ */}
      <article className="relative flex h-[1123px] w-[794px] flex-col overflow-hidden bg-[#022c41] text-[#eaf3f8] shadow-[0_2px_28px_rgba(2,48,71,0.15)] print:shadow-none">
        <figure className="h-[430px] w-full shrink-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/showcase/cover.jpg"
            alt="Aicademy interface"
            className="size-full object-cover object-[50%_46%]"
          />
        </figure>
        <div className="h-[3px] w-full shrink-0 bg-[#219ebc]" />

        <div className="relative flex flex-1 flex-col justify-between px-[60px] pt-11 pb-[54px]">
          <div className="pointer-events-none absolute -top-[60px] right-[-140px] size-[420px] rounded-full bg-[#219ebc]/20 blur-[110px]" />
          <div className="pointer-events-none absolute bottom-[-200px] left-[-120px] size-[380px] rounded-full bg-[#8ecae6]/10 blur-[110px]" />

          <div className="relative z-10 flex items-center justify-between">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/showcase/wordmark.png"
              alt="Aicademy"
              className="h-[19px] w-auto brightness-0 invert"
            />
            <span className="font-mono text-[8.5px] font-bold tracking-[0.22em] text-[#eaf3f8]/50 uppercase">
              Product showcase
            </span>
          </div>

          <div className="relative z-10">
            <h1 className="font-clash text-[92px] leading-[0.82] font-medium tracking-[-0.07em] text-white">
              Aicademy
            </h1>
            <p className="font-clash mt-[22px] max-w-[470px] text-[24px] leading-[1.2] tracking-[-0.028em] text-[#8ecae6]">
              Everyone has the same AI. Not everyone gets the same out of it.
            </p>
            <p className="mt-[26px] max-w-[520px] text-[13px] leading-[1.72] text-[#eaf3f8]/70">
              An AI-powered revision platform that turns any topic or uploaded
              documents into lessons, quizzes, flashcards and notes, with a
              tutor that already knows what the student is working on. Designed,
              built and shipped by one person.
            </p>
          </div>

          <div className="relative z-10">
            <dl className="grid grid-cols-4 gap-5 border-t border-[#eaf3f8]/20 pt-[22px]">
              {(
                [
                  ["Live at", "useaicademy.com", "https://useaicademy.com"],
                  ["Built by", "Diba Malikzadeh", ""],
                  [
                    "Contact",
                    "contact@bydiba.dev",
                    "mailto:contact@bydiba.dev",
                  ],
                  ["Updated", "September 2026", ""],
                ] as [string, string, string][]
              ).map(([k, v, href]) => (
                <div key={k}>
                  <dt className="font-mono text-[7.5px] font-bold tracking-[0.16em] text-[#8ecae6]/75 uppercase">
                    {k}
                  </dt>
                  <dd className="mt-[7px] text-[11.5px] leading-[1.45] text-[#eaf3f8]/90">
                    {href ? (
                      <Ext href={href} className={ONDARK}>
                        {v}
                      </Ext>
                    ) : (
                      v
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </article>

      {/* ═══════════ 01 · why it exists ═══════════ */}
      <Page>
        <PageTitle n="01" title="Why it exists" />

        <Section label="The gap" tight>
          <Quote>
            Getting something useful out of a chatbot is a skill, and it is not
            the one being examined.
          </Quote>
          <Body>
            The difference is not access. It is the prompting and the
            tool-switching it takes to turn an answer into something worth
            revising from, and nothing that comes back is saved anyway.{" "}
            <Strong>
              Aicademy exists so that none of that is the student&apos;s job.
            </Strong>
          </Body>
          <div className="mt-[18px] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/showcase/generate-bar.png"
              alt="Say what you want to learn"
              className="w-full"
            />
          </div>
        </Section>

        <Section label="The story" tint tight>
          <Body>
            Lecture slides never worked for me, so I used AI to turn whatever I
            was studying into something I could actually revise from. People
            started asking for what I had made, even though they could have
            asked for it themselves. The gap was knowing how to prompt. Noticing
            that is what gave me the idea for Aicademy.
          </Body>
          <Body>
            When my final year started I asked to carry on with it as my
            project. It was graded a First in March, and{" "}
            <Strong>about three quarters of the work has happened since</Strong>
            . The people testing it kept asking whether the site would stay up,
            so it did.
          </Body>
          <Body>
            I used AI the way I would use any other tool: to explore options, to
            move faster through repetitive changes, and to argue with. Every
            decision in here is one I made and can defend.
          </Body>
        </Section>

        <Section label="Currently" tight>
          <dl className="grid grid-cols-3 gap-x-[26px] gap-y-4">
            {evidence.map((e) => (
              <div key={e.label}>
                <dt className="font-clash text-[23px] leading-none font-medium tracking-[-0.035em] text-[#12708d]">
                  {e.value}
                </dt>
                <dd className="mt-[5px] text-[10px] leading-[1.45] text-[#0b2230]/65">
                  {e.label}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Foot page={1} />
      </Page>

      {/* ═══════════ 02 · what's inside ═══════════ */}
      <Page>
        <PageTitle n="02" title="What's inside" />
        <div className="shrink-0 px-10 pt-[30px] pb-[24px]">
          <div className="grid grid-cols-2 gap-x-[26px]">
            {featuresA.slice(0, 2).map((f) => (
              <FeatureCard key={f.n} {...f} h={216} />
            ))}
          </div>
        </div>
        <div className="grow content-center pb-4">
          <FeatureHero {...featuresA[2]} />
        </div>
        <Foot page={2} />
      </Page>

      {/* ═══════════ 03 · what's inside, continued ═══════════ */}
      <Page>
        <PageTitle n="03" title="What's inside, continued" />
        <div className="grow content-center px-10 pb-4">
          <div className="grid grid-cols-3 gap-x-[22px]">
            {featuresB.slice(0, 3).map((f) => (
              <FeatureCard key={f.n} {...f} h={140} />
            ))}
          </div>
          <div className="mt-[34px] grid grid-cols-[1.9fr_1fr] gap-x-[26px]">
            {featuresB.slice(3).map((f) => (
              <FeatureCard key={f.n} {...f} h={286} />
            ))}
          </div>
        </div>

        <Section label="The comparison" tint>
          <Body>
            ChatGPT explains things well, and that is the problem. A clear
            explanation feels like learning: asked to predict what they will
            remember, students turn out to be poor judges of what they can
            actually recall later. So nothing here stops at the explanation.
          </Body>
          <Body>
            The full comparison:{" "}
            <Ext
              href="https://useaicademy.com/blog/aicademy-vs-chatgpt"
              className={`font-mono text-[#12708d] ${TEAL_LINK}`}
            >
              useaicademy.com/blog/aicademy-vs-chatgpt
            </Ext>
          </Body>
        </Section>

        <Foot page={3} />
      </Page>

      {/* ═══════════ 04 · built around the student ═══════════ */}
      <Page>
        <PageTitle n="04" title="Built around the student" />

        <div className="shrink-0 px-10">
          <p className="max-w-[440px] text-[12.5px] leading-[1.66] text-[#0b2230]/70">
            A good teacher does not explain the same way to everyone.
            &quot;Built around you&quot; began as that idea, and it did not stay
            in the writing.
          </p>
        </div>

        <div className="grow content-center px-10 pb-4">
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/showcase/set-personalise.webp"
              alt="Personalisation settings"
              className="w-full"
            />
            <figcaption className="mt-[11px] grid grid-cols-[240px_minmax(0,1fr)] gap-8">
              <div>
                <p className="text-[13px] leading-[1.3] font-semibold text-[#0b2230]/80">
                  Personalisation
                </p>
              </div>
              <p className="text-[11.5px] leading-[1.6] text-[#0b2230]/70">
                Six settings shape how everything is written: tone, explanation
                style, learning helpers, learning focus, study context and
                free-text instructions. A few questions at the start set them
                up, so the first lesson already fits.
              </p>
            </figcaption>
          </figure>

          <div className="mt-[26px] grid grid-cols-2 gap-x-[26px]">
            {[
              [
                "set-themes",
                "Appearance",
                "Six themes to choose from, so the workspace suits whoever is using it: Light, Dark, Blush, Mint, Sunset and Aurora.",
              ],
              [
                "set-access",
                "Accessibility",
                "Reduced motion, high contrast, dyslexia-friendly type and font scaling, and everything underneath that has no switch to show.",
              ],
            ].map(([file, title, body]) => (
              <figure key={file}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/showcase/${file}.webp`}
                  alt={title}
                  className="w-full"
                />
                <figcaption className="mt-[11px]">
                  <p className="text-[13px] leading-[1.3] font-semibold text-[#0b2230]/80">
                    {title}
                  </p>
                  <p className="mt-[7px] text-[11.5px] leading-[1.6] text-[#0b2230]/70">
                    {body}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <Foot page={4} />
      </Page>

      {/* ═══════════ 05 · the diagrams ═══════════ */}
      <Page>
        <PageTitle n="05" title="The model is never allowed to draw" />

        <div className="shrink-0 px-10 pt-[14px]">
          <p className="max-w-[660px] text-[12.5px] leading-[1.66] text-[#0b2230]/70">
            A lesson needs diagrams, and there was no way to get them: generated
            images were unusable and no library covered the syllabus. So I took
            the idea behind Mermaid, where a model writes a fixed notation and
            something else draws it, and built it for school subjects:{" "}
            <Strong>39 schemas so far</Strong>, each with its own renderer. The
            model supplies values, never markup, and a block that fails
            validation is dropped rather than shown.
          </p>
        </div>

        <div className="grow content-center px-10 pb-4">
          <div className="mb-[15px] flex items-center gap-3">
            <h3 className="font-mono text-[8.5px] font-extrabold tracking-[0.17em] text-[#12708d] uppercase">
              Some examples
            </h3>
            <span className="h-px flex-1 bg-[#023047]/10" />
          </div>
          <div className="grid grid-cols-2 gap-x-[22px] gap-y-[22px]">
            {[
              ["s-tree", "Binary search tree", "diagram · tree"],
              ["s-adder", "Half adder", "circuit"],
              ["s-boxplot", "Marks by paper", "stat · boxplot"],
              ["s-cuboid", "Space diagonal", "solid3d"],
              ["s-er", "One to many", "er"],
              ["s-queue", "Linear queue", "queue"],
            ].map(([file, title, block]) => (
              <figure
                key={file}
                className="overflow-hidden rounded-[10px] border border-[#023047]/10 bg-white"
              >
                <div className="flex h-[196px] items-center justify-center px-6 py-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/showcase/figures/${file}.svg`}
                    alt={title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <figcaption className="flex items-baseline gap-3 border-t border-[#023047]/10 px-[14px] py-[9px]">
                  <p className="text-[10.5px] leading-[1.3] font-semibold text-[#0b2230]/80">
                    {title}
                  </p>
                  <p className="ml-auto font-mono text-[7px] tracking-[0.14em] text-[#12708d] uppercase">
                    {block}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <Foot page={5} />
      </Page>

      {/* ═══════════ 06 · the free library ═══════════ */}
      <Page>
        <PageTitle n="06" title="How the free lessons are made" />

        <Section label="Model output" tight lift={10}>
          <Body>
            The first draft is written by AI and I say so on the site, because
            pretending otherwise would serve nobody. The rest is a separation of
            duties: the skill that writes a lesson is never the skill that
            approves it, because a model asked to judge its own work will favour
            it. Four Claude Code skills, each running with its own scoped tool
            permissions.
          </Body>
          <Body>
            The published version:{" "}
            <Ext
              href="https://useaicademy.com/about/our-content"
              className={`font-mono text-[#12708d] ${TEAL_LINK}`}
            >
              useaicademy.com/about/our-content
            </Ext>
          </Body>
          <div className="mt-[16px] -ml-[144px] w-[714px]">
            <SkillPipeline />
          </div>
        </Section>

        <Section label="Spec-locked" tint tight>
          <Body>
            Every lesson is locked to one exam board and checked against that
            board&apos;s own specification document, not written from general
            knowledge and hoped to line up. Anything falling just outside the
            spec is labelled as extra context. All of that review sits behind{" "}
            <Strong>694 lessons that need no account to read</Strong>.
          </Body>
          <Body>
            These lessons are published at{" "}
            <Ext
              href="https://useaicademy.com/explore"
              className={`font-mono text-[#12708d] ${TEAL_LINK}`}
            >
              useaicademy.com/explore
            </Ext>
          </Body>
        </Section>

        <div className="grow content-center px-10 py-[14px]">
          <div className="grid grid-cols-[300px_minmax(0,1fr)] items-start gap-9">
            <div>
              <h2 className="font-mono text-[9.5px] leading-[1.45] font-extrabold tracking-[0.17em] text-[#12708d] uppercase">
                Human reviewed
              </h2>
              <p className="mt-[16px] text-[12.5px] leading-[1.66] text-[#0b2230]/70">
                A schema proves a block is{" "}
                <Strong>well-formed, not well-drawn</Strong>. So I built a
                studio where every diagram renders on one page, and I mark each
                with a note on how it is drawn. Individually those notes are
                complaints; together they are a list of failure modes, and one
                fix lands across every diagram that shares one.
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/showcase/s-studio.png"
              alt="The diagram review queue"
              className="w-full"
            />
          </div>
        </div>

        <Foot page={6} />
      </Page>

      {/* ═══════════ 07 · under the hood ═══════════ */}
      <Page>
        <PageTitle n="07" title="Under the hood" />

        <Section label="The shape" tight flat>
          <Body>
            Aicademy is built on Next.js and runs on Vercel, with a managed
            service behind everything else. Every box below is called in
            production today.
          </Body>
        </Section>

        <div className="shrink-0 px-10 mt-[26px] mb-[90px]">
          <Architecture />
        </div>

        <Section label="Where it runs" tight flat>
          <Body>
            Generation goes through Azure OpenAI, Microsoft&apos;s enterprise
            service rather than the consumer product. The resource sits in{" "}
            <Strong>Sweden Central</Strong>, prompts stay inside the EU data
            zone, and accounts, lessons, progress and tutor history live in a
            single Supabase Postgres database in London. Every sub-processor is
            documented with what it sees and how long it keeps it, including the
            Microsoft abuse-monitoring exemption I have not applied for.
          </Body>
          <Body>
            Advice from a school sent me to check what the enterprise service
            guarantees, and to build the parts it does not. Prompts are not used
            to train a model; the upload screen asks for study material and
            nothing else, and the tutor will not repeat personal details about
            other people back to a student. Accounts require confirming the
            account holder is 13 or over, and because the material is GCSE and
            A-level, <Strong>most users are between 13 and 17</Strong>.
          </Body>
          <Body>
            Documented in full at{" "}
            <Ext
              href="https://useaicademy.com/ai-and-data"
              className={`font-mono text-[#12708d] ${TEAL_LINK}`}
            >
              useaicademy.com/ai-and-data
            </Ext>
          </Body>
        </Section>

        <div className="grow" />

        <Foot page={7} />
      </Page>

      {/* ═══════════ 08 · what it cost ═══════════ */}
      <Page>
        <PageTitle n="08" title="What it cost" />

        <Section label="Document upload" flat py="py-[12px]">
          <Body>
            An upload is read once and rewritten into numbered sections that can
            be taught from on their own, and each is then assigned to the
            lessons and quizzes that need it. That is retrieval-augmented
            generation with{" "}
            <Strong>
              the retrieval done by reading rather than by similarity search
            </Strong>
            . It works because the path is planned before anything is written;
            adaptive paths are the change that would make a vector store worth
            reconsidering.
          </Body>
        </Section>

        <Section label="Quiz marking" flat py="py-[12px]">
          <Body>
            Three of the five question types have unambiguous answers. Fill in
            the blank is matched against a list of accepted forms generated with
            the question, covering spellings, synonyms and the usual
            misspellings. Short answers run through the same marker and are the
            weak point:{" "}
            <Strong>
              one typed line has too many right shapes for a fixed list to hold
            </Strong>
            . That is where an AI marker starts to make sense, especially once
            quizzes become practice papers.
          </Body>
        </Section>

        <div className="grow" />

        <Section label="User testing" tint flat py="py-[32px]">
          <Body>
            I ran two anonymised rounds of user testing for the final project:
            an initial one, and another after I had fixed the problems it turned
            up.
          </Body>
          <table className="mt-3 w-full border-collapse text-[11px]">
            <thead>
              <tr className="border-b border-[#023047]/20 font-mono text-[8px] font-bold tracking-[0.12em] text-[#12708d] uppercase">
                <th className="px-2 py-1.5 text-left">Measure</th>
                <th className="w-[132px] px-2 py-1.5 text-center whitespace-nowrap">
                  Round 1 · n=6
                </th>
                <th className="w-[132px] px-2 py-1.5 text-center whitespace-nowrap">
                  Round 2 · n=12
                </th>
              </tr>
            </thead>
            <tbody>
              {uat.map(([m, a, b]) => (
                <tr key={m} className="border-b border-[#023047]/10">
                  <td className="px-2 py-1.5 text-[#0b2230]/70">{m}</td>
                  <td className="px-2 py-1.5 text-center font-mono text-[10.5px] font-bold text-[#072f42]">
                    {a}
                  </td>
                  <td className="px-2 py-1.5 text-center font-mono text-[10.5px] font-bold text-[#072f42]">
                    {b}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Body>
            Twelve people self-reporting is not evidence that the product is
            good. What it shows is that the changes landed: the seven who had
            seen the earlier version rated it improved, and the written answers
            kept saying the same thing, that it worked as{" "}
            <Strong>one tool rather than several</Strong>.
          </Body>
        </Section>

        <div className="grow" />

        <Section label="Organic search" flat py="py-[12px]">
          <Body>
            Every lesson is indexed and impressions have grown from nothing in
            three months. The page that ranks first gets{" "}
            <Strong>thousands of impressions and no clicks</Strong>, because
            Google&apos;s AI overview answers the search in the results. What
            arrives is mostly British, and a quarter of the people who click
            anything make an account. Bing runs at five times Google&apos;s
            click rate on a fraction of the impressions, which fits school
            machines where Edge is the default.
          </Body>
        </Section>

        <Section label="What I'd fix" flat py="pt-[12px] pb-[38px]">
          <Body>
            Mobile converts at about a third of the desktop rate, and that is
            the first thing I would fix. The rest is{" "}
            <Strong>what one person can defer and a team cannot</Strong>: schema
            changes are made in Supabase rather than versioned with the code,
            there is no code review beyond my own, and nothing alerts me when
            something breaks in production.
          </Body>
        </Section>

        <Foot page={8} />
      </Page>

      {/* ═══════════ 09 · close ═══════════ */}
      <article className="relative flex h-[1123px] w-[794px] flex-col overflow-hidden bg-[#022c41] text-[#eaf3f8] shadow-[0_2px_28px_rgba(2,48,71,0.15)] print:shadow-none">
        <div className="pointer-events-none absolute -top-[120px] right-[-160px] size-[440px] rounded-full bg-[#219ebc]/20 blur-[110px]" />
        <div className="pointer-events-none absolute bottom-[-220px] left-[-140px] size-[400px] rounded-full bg-[#8ecae6]/10 blur-[110px]" />

        <div className="relative z-10 flex flex-1 flex-col px-[60px] pt-11 pb-[54px]">
          <p className="font-mono text-[8px] font-bold tracking-[0.22em] text-[#8ecae6] uppercase">
            09
          </p>
          <h2 className="font-clash mt-2 text-[31px] leading-none font-medium tracking-[-0.045em] text-white">
            Close
          </h2>
          <div className="mt-[11px] h-px w-[86px] bg-[#219ebc]" />

          <p className="mt-[34px] max-w-[620px] text-[13.5px] leading-[1.72] text-[#eaf3f8]/80">
            Quizzes and flashcards aren&apos;t decoration. Testing yourself
            improves retention more than re-reading does <Ref n={1} />, spacing
            that testing out works better than doing it in one go <Ref n={2} />,
            and students do better when they can see and steer their own plan{" "}
            <Ref n={3} />. Those three findings are why every lesson can become
            a quiz, why spaced repetition is built in, and why the product has
            learning paths.
          </p>

          <ol className="mt-[26px] max-w-[600px] list-none space-y-[8px] text-[9.5px] leading-[1.6] text-[#eaf3f8]/55">
            <li className="grid grid-cols-[26px_minmax(0,1fr)]">
              <span className="font-mono text-[9px] font-medium text-[#8ecae6]">
                [1]
              </span>
              <span>
                Roediger, H. L. &amp; Karpicke, J. D. (2006). Test-Enhanced
                Learning: Taking Memory Tests Improves Long-Term Retention.
                Psychological Science, 17(3), 249-255.
              </span>
            </li>
            <li className="grid grid-cols-[26px_minmax(0,1fr)]">
              <span className="font-mono text-[9px] font-medium text-[#8ecae6]">
                [2]
              </span>
              <span>
                Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T. &amp; Rohrer,
                D. (2006). Distributed Practice in Verbal Recall Tasks: A Review
                and Quantitative Synthesis. Psychological Bulletin, 132(3),
                354-380.
              </span>
            </li>
            <li className="grid grid-cols-[26px_minmax(0,1fr)]">
              <span className="font-mono text-[9px] font-medium text-[#8ecae6]">
                [3]
              </span>
              <span>
                Zimmerman, B. J. (2002). Becoming a Self-Regulated Learner: An
                Overview. Theory Into Practice, 41(2), 64-70.
              </span>
            </li>
          </ol>

          <div className="mt-[60px] grid grid-cols-[120px_minmax(0,1fr)] gap-6 border-t border-[#eaf3f8]/15 pt-[40px]">
            <h3 className="font-mono text-[9.5px] leading-[1.45] font-extrabold tracking-[0.17em] text-[#8ecae6] uppercase">
              Find it
            </h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-[14px]">
              {links.map(([k, v, href]) => (
                <div key={k}>
                  <p className="font-mono text-[7.5px] font-bold tracking-[0.16em] text-[#8ecae6]/70 uppercase">
                    {k}
                  </p>
                  <p className="mt-[5px] font-mono text-[9.5px] leading-[1.4] text-white/80">
                    <Ext href={href} className={ONDARK}>
                      {v}
                    </Ext>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-[38px] grid grid-cols-[120px_minmax(0,1fr)] gap-6">
            <h3 className="font-mono text-[9.5px] leading-[1.45] font-extrabold tracking-[0.17em] text-[#8ecae6] uppercase">
              Who made it
            </h3>
            <div>
              <p className="text-[11.5px] leading-[1.6] text-[#eaf3f8]/80">
                Diba Malikzadeh. BSc Computer Science, first class, Birmingham
                2026. Looking for graduate software engineering work in the UK.
              </p>
              <p className="mt-[9px] font-mono text-[9.5px] leading-[1.5] text-white/75">
                <Ext href="mailto:contact@bydiba.dev" className={ONDARK}>
                  contact@bydiba.dev
                </Ext>
              </p>
            </div>
          </div>

          <div className="mt-auto flex items-end justify-between pb-9">
            <div>
              <div className="flex size-[50px] items-center justify-center rounded-[13px] bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/showcase/mark.png"
                  alt="Aicademy"
                  className="h-[32px] w-auto"
                />
              </div>
              <p className="font-clash mt-[22px] max-w-[300px] text-[38px] leading-[1.12] tracking-[-0.032em] text-white">
                Calm learning, built around you.
              </p>
            </div>
            <p className="font-mono text-[9px] font-bold tracking-[0.16em] text-[#8ecae6] uppercase">
              <Ext
                href="https://useaicademy.com"
                className={`${LINK} hover:text-white`}
              >
                useaicademy.com
              </Ext>
            </p>
          </div>

          <Foot page={9} dark />
        </div>
      </article>
    </div>
  );
}
