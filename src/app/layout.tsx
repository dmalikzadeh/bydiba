import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Borel } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothProvider from "@/components/SmoothProvider";
import { NavProvider } from "@/components/NavContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://bydiba.dev"),
  title: {
    default: "bydiba | portfolio",
    template: "%s | bydiba",
  },
  description:
    "Full-stack developer building polished, AI-powered web experiences.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "bydiba",
    title: "bydiba | portfolio",
    description:
      "Full-stack developer building polished, AI-powered web experiences.",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "bydiba | portfolio",
    description:
      "Full-stack developer building polished, AI-powered web experiences.",
  },
  verification: {
    google: "yRnJdgK0hsm6Rgq_WXjvV_YekaWqPxz3vlE_sGsYdYg",
  },
};

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const clash = localFont({
  src: "./fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash",
});

const borel = Borel({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-borel",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jakarta.variable} ${mono.variable} ${clash.variable} ${borel.variable} font-jakarta overflow-x-hidden`}
      >
        <NavProvider>
          <SmoothProvider />

          {children}
        </NavProvider>
      </body>
    </html>
  );
}
