import { Hero } from "@/components/Hero";
import { Pipeline } from "@/components/Pipeline";
import { Work } from "@/components/Work";
import { About, Console, Contact } from "@/components/Sections";
import { Hud } from "@/components/Hud";
import { TechMarquee } from "@/components/TechMarquee";
import { Principles } from "@/components/Principles";
import { CodeShowcase } from "@/components/CodeShowcase";
import { Engagements } from "@/components/Engagements";
import { Testimonials } from "@/components/Testimonials";
import { SceneLoader } from "@/components/three/SceneLoader";

export default function Home() {
  return (
    <>
      <SceneLoader />
      <Hud />
      <Hero />
      <TechMarquee />
      <Pipeline />
      <Principles />
      <Work />
      <CodeShowcase />
      <Engagements />
      <Testimonials />
      <Console />
      <About />
      <Contact />
    </>
  );
}
