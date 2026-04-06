import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Creative from "@/components/Creative";
import Header from "@/components/Header";

export default function Home() {
  return (
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
  );
}
