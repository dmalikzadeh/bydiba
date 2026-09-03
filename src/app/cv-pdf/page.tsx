import type { Metadata } from "next";
import PortfolioCv from "@/components/PortfolioCv";

export const metadata: Metadata = {
  title: "Diba Malikzadeh — CV",
  robots: { index: false, follow: false },
};

/** print-only rendering of the portfolio CV */

export default function CvPdfPage() {
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
      <PortfolioCv />
    </>
  );
}
