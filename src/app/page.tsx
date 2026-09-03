import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Creative from "@/components/Creative";
import Header from "@/components/Header";

const siteUrl = "https://bydiba.dev";
const personId = `${siteUrl}/#diba-malikzadeh`;
const websiteId = `${siteUrl}/#website`;
const webpageId = `${siteUrl}/#webpage`;

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: siteUrl,
    name: "bydiba",
    alternateName: ["Diba Malikzadeh portfolio", "bydiba.dev"],
    inLanguage: "en-GB",
    creator: {
      "@id": personId,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": webpageId,
    url: siteUrl,
    name: "bydiba | portfolio",
    description:
      "Portfolio of Diba Malikzadeh, a full-stack developer building polished, AI-powered web experiences.",
    inLanguage: "en-GB",
    isPartOf: {
      "@id": websiteId,
    },
    about: {
      "@id": personId,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: "Diba Malikzadeh",
    alternateName: "Diba",
    url: siteUrl,
    jobTitle: "Full-Stack Developer",
    description:
      "Full-stack developer and first-class Computer Science graduate from the University of Birmingham.",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Birmingham",
      sameAs: "https://www.birmingham.ac.uk/",
    },
    sameAs: [
      "https://www.linkedin.com/in/dibamalikzadeh",
      "https://github.com/dmalikzadeh",
    ],
    mainEntityOfPage: {
      "@id": webpageId,
    },
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <main id="smooth-wrapper">
        <Header />
        <div id="smooth-content" className="max-w-6xl mx-auto">
          <Hero />
          <Projects />
          <About />
          <Skills />
          <Contact />
          <Creative />
        </div>
      </main>
    </>
  );
}
