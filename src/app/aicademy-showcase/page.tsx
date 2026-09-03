import type { Metadata } from "next";
import AicademyShowcase from "@/components/AicademyShowcase";

export const metadata: Metadata = {
  title: "Aicademy — A Showcase",
  robots: { index: false, follow: false },
};

/** print-only rendering of the Aicademy showcase */

export default function AicademyShowcasePage() {
  return (
    <>
      <style>{`
        html, body { margin: 0; padding: 0; background: #e7e4df; }

        @page { size: 794px 1123px; margin: 0; }

        *, *::before, *::after {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
      `}</style>
      <AicademyShowcase />
    </>
  );
}
