import { About } from "../components/About";
import { BlogSection } from "../components/BlogSection";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <BlogSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
