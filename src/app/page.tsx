import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { WorkingWith } from "@/components/WorkingWith";
import { Services } from "@/components/Services";
import { Replay } from "@/components/Replay";
import { HowIWork } from "@/components/HowIWork";
import { TryItDemo } from "@/components/TryItDemo";
import { SelectedWork } from "@/components/SelectedWork";
import { About } from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { FinalCta } from "@/components/FinalCta";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F1DB] text-[#050409]">
      {/* Floating pill navbar */}
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero (with floating live card and draggable ring) */}
        <Hero />

        {/* 2. Find me on (client / platform strip) */}
        <WorkingWith />

        {/* 3. Services (the 4 bento cards) */}
        <Services />

        {/* 4. Replay (timeline of a run) */}
        <Replay />

        {/* 5. Process (the 4 steps) */}
        <HowIWork />

        {/* 6. "Try it" demo (live input + table) */}
        <TryItDemo />

        {/* 7. Selected Work (featured card + 6-card grid) */}
        <SelectedWork />

        {/* 8. About */}
        <About />

        {/* 9. Testimonials */}
        <Testimonials />

        {/* 10. Final CTA */}
        <FinalCta />

        {/* 11. Contact */}
        <ContactSection />
      </main>

      {/* 12. Footer */}
      <Footer />
    </div>
  );
}
