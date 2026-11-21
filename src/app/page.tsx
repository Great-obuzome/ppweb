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
import { FinalCtaAndFooter } from "@/components/FinalCtaAndFooter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F1DB] text-[#050409]">
      {/* SECTION 1: Floating pill navbar & Skydive-style Hero */}
      <Navbar />
      <main className="flex-1">
        <Hero />

        {/* SECTION 2: "Working with" logo strip */}
        <WorkingWith />

        {/* SECTION 3: Services */}
        <Services />

        {/* SECTION 3.5: Replay (How it runs) */}
        <Replay />

        {/* SECTION 4: How I Work (Process) */}
        <HowIWork />

        {/* SECTION 4.5: Try It Demo (Waterfall Enrichment) */}
        <TryItDemo />

        {/* SECTION 5: Selected Work */}
        <SelectedWork />

        {/* SECTION 6: About */}
        <About />

        {/* SECTION 7: Testimonials */}
        <Testimonials />
      </main>

      {/* SECTION 8: Final CTA Band + Footer */}
      <FinalCtaAndFooter />
    </div>
  );
}
