import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Showcase } from "@/components/Showcase";
import { Features } from "@/components/Features";
import { Gallery } from "@/components/Gallery";
import { Pricing } from "@/components/Pricing";
import { Business } from "@/components/Business";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Showcase />
        <Features />
        <Gallery />
        <Pricing />
        <Business />
        <Faq />
        <Footer />
      </main>
    </>
  );
}
