import type { Metadata } from "next";
import PortfolioCv from "@/components/PortfolioCv";

export const metadata: Metadata = {
  title: "Diba Malikzadeh — CV",
  robots: { index: false, follow: false },
};

/** print-only rendering of the portfolio CV  */

export default function CvPdfPage() {
  return (
    <>
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          background: #fffdf9;
        }

        @page {
          size: 210mm 297mm;
          margin: 14px 0;
        }

        @page :first {
          margin: 0;
        }

        /* Keep gradients, tints and the dark band in the printed output. */
        *, *::before, *::after {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }

        /*
         * On the site the CV is viewed in a wide window, so the title's
         * clamp(3.2rem, 7.5vw, 4.25rem) always resolves to its 4.25rem cap.
         * At A4 width 7.5vw would fall below that, so pin it to match.
         */
        article h1 {
          font-size: 4.25rem !important;
        }

        /*
         * Deliberate page-by-page rhythm. Page one has enough room for the
         * profile and evidence sections to keep their full on-site breathing
         * space; later pages use measured print spacing rather than one global
         * compression value.
         */
        article > div > section:nth-child(2) {
          padding-top: 44px !important;
          padding-bottom: 44px !important;
        }
        article > div > section:nth-child(3) {
          padding-top: 36px !important;
          padding-bottom: 36px !important;
        }
        article > div > section:nth-child(4) {
          padding-top: 10px !important;
          padding-bottom: 10px !important;
        }
        article > div > section:nth-child(5) {
          padding-top: 12px !important;
          padding-bottom: 12px !important;
        }
        article > div > section:nth-child(6) {
          padding-top: 20px !important;
          padding-bottom: 20px !important;
        }
        article > div > section:nth-child(7),
        article > div > footer {
          padding-top: 18px !important;
          padding-bottom: 18px !important;
        }

        /* The cover keeps its full on-site proportions. */

        /* Selected work: project rows and internal spacing */
        article > div > section:nth-child(4) article {
          padding-top: 4px !important;
          padding-bottom: 4px !important;
        }
        article > div > section:nth-child(4) .mt-4 {
          margin-top: 10px !important;
        }
        article > div > section:nth-child(4) .mt-8 {
          margin-top: 14px !important;
        }
        article > div > section:nth-child(4) [class~="text-[13px]"] {
          font-size: 12px !important;
        }
        article > div > section:nth-child(4) [class~="text-[12px]"] {
          font-size: 11.5px !important;
        }
        article > div > section:nth-child(4) > div:last-child > a {
          margin-top: 10px !important;
          font-size: 9px !important;
        }

        /* How I work */
        article > div > section:nth-child(5) .mt-6 {
          margin-top: 12px !important;
        }
        article > div > section:nth-child(5) .mt-10 {
          margin-top: 20px !important;
        }
        article > div > section:nth-child(5) [class~="text-[12px]"] {
          font-size: 11px !important;
        }

        /* Experience / education entries */
        article > div > section:nth-child(6) article {
          margin-top: 16px !important;
          padding-top: 12px !important;
        }
        article > div > section:nth-child(6) [class~="text-[13px]"] {
          font-size: 12px !important;
        }

        /* Technical practice grid + security aside */
        article > div > section:nth-child(7) dl {
          row-gap: 21px !important;
        }
        article > div > section:nth-child(7) aside {
          margin-top: 20px !important;
          padding-top: 16px !important;
        }
        article > div > section:nth-child(7) [class~="text-[12px]"] {
          font-size: 11.25px !important;
        }

        /* Colophon */
        article > div > footer > div:last-child {
          margin-top: 20px !important;
          padding-top: 16px !important;
        }

        /* Never split an individual entry, stat or column across a page. */
        article section article,
        article dl > div,
        article footer dl > div {
          break-inside: avoid;
          page-break-inside: avoid;
        }

        /*
         * Deliberate page boundaries, so each page ends on a whole section
         * instead of clipping one mid-way.
         *   1 · header, profile, evidence
         *   2 · selected work, how I work
         *   3 · experience, technical practice, colophon
         */
        article > div > section:nth-child(4),
        article > div > section:nth-child(6) {
          break-before: page;
          page-break-before: always;
        }

        article > div > section:nth-child(5) {
          break-inside: avoid;
          page-break-inside: avoid;
        }
      `}</style>
      <PortfolioCv />
    </>
  );
}
