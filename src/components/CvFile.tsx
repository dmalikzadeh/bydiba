"use client";

import DesktopFile, { type DesktopFileProps } from "./DesktopFile";
import PortfolioCv from "./PortfolioCv";

const cvHome: DesktopFileProps["home"] = ({ width, height, self }) => ({
  x: width - self - 200,
  y: Math.round(height * 0.55),
});

const cvInfo: DesktopFileProps["infoRows"] = ({ name, pages }) => [
  [
    ["File Name", name],
    ["Document Type", "Portfolio CV"],
  ],
  [
    ["Page Count", String(pages)],
    ["Page Size", "21 × 29.7 cm"],
    ["Created", "Sep 2023"],
    ["Modified", "Still going"],
  ],
  [
    ["Author", "Diba Malikzadeh"],
    ["Classification", "First Class · 75.6%"],
    ["Typeface", "Clash Display · Jakarta"],
    ["Built With", "Next.js · Tailwind · GSAP"],
    ["Colour Profile", "Warm"],
    ["Compression", "None. Every number is real"],
    ["Status", "Open to graduate roles"],
  ],
];

export default function CvFile() {
  return (
    <DesktopFile
      url="/Diba-Malikzadeh-CV.pdf"
      defaultName="Diba-Malikzadeh-CV.pdf"
      storageKey="bydiba:cv-file"
      noun="CV"
      preview="/preview-cv.webp"
      pageCount={3}
      home={cvHome}
      infoRows={cvInfo}
    >
      <PortfolioCv />
    </DesktopFile>
  );
}
