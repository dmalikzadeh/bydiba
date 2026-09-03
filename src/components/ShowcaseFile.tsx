"use client";

import AicademyShowcase from "./AicademyShowcase";
import DesktopFile, { type DesktopFileProps } from "./DesktopFile";

const showcaseHome: DesktopFileProps["home"] = ({ width, height, self }) => ({
  x: width - self - 100,
  y: Math.round(height * 0.3),
});

const showcaseInfo: DesktopFileProps["infoRows"] = ({ name, pages }) => [
  [
    ["File Name", name],
    ["Document Type", "Product Showcase"],
  ],
  [
    ["Page Count", String(pages)],
    ["Page Size", "21 × 29.7 cm"],
    ["Created", "Aug 2025"],
    ["Modified", "Sep 2026"],
  ],
  [
    ["Author", "Diba Malikzadeh"],
    ["Product", "Aicademy"],
    ["Typeface", "Clash Display · Jakarta"],
    ["Built With", "Next.js · Tailwind · Azure OpenAI"],
    ["Colour Profile", "Cool"],
    ["Compression", "None. Every number is real"],
    ["Status", "Live at useaicademy.com"],
  ],
];

export default function ShowcaseFile() {
  return (
    <DesktopFile
      url="/Aicademy-Showcase.pdf"
      defaultName="Aicademy-Showcase-v3.pdf"
      storageKey="bydiba:showcase-file"
      noun="showcase"
      preview="/preview-showcase.webp"
      pageCount={10}
      paperWidth={794}
      contentScale={768 / 794}
      contentClassName="[&>div]:gap-0 [&>div]:py-0 [&_article]:shadow-none"
      home={showcaseHome}
      infoRows={showcaseInfo}
    >
      <AicademyShowcase />
    </DesktopFile>
  );
}
