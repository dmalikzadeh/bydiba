import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Borel } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothProvider from "@/components/SmoothProvider";
import { NavProvider } from "@/components/NavContext";

const siteName = "bydiba";
const siteTitle = "bydiba | portfolio";
const siteUrl = "https://bydiba.dev";
const creatorName = "Diba Malikzadeh";
const siteDescription =
  "Portfolio of Diba Malikzadeh, a full-stack developer building polished, AI-powered web experiences.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: siteTitle,
    template: "%s | bydiba",
  },
  description: siteDescription,
  authors: [{ name: creatorName, url: siteUrl }],
  creator: creatorName,
  publisher: creatorName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "profile",
    url: "/",
    siteName,
    title: siteTitle,
    description: siteDescription,
    locale: "en_GB",
    firstName: "Diba",
    lastName: "Malikzadeh",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
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
