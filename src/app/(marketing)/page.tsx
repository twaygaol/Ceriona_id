import { Hero } from "@/components/sections/Hero";
import { Templates } from "@/components/sections/Templates";
import { Stats } from "@/components/sections/Stats";
import { Features } from "@/components/sections/Features";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <div className="divider"><span>✦</span></div>
      <Templates />
      <Stats />
      <Features />
      <div className="divider"><span>✦</span></div>
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
    </main>
  );
}