import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import Stack from "@/components/sections/Stack";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import StickyNav from "@/components/StickyNav";

export default function Home() {
  return (
    <main className="relative bg-bg">
      <StickyNav />
      <Hero />
      <Work />
      <Stack />
      <About />
      <Contact />
    </main>
  );
}
