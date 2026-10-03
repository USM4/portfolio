import { getDict } from "@/i18n";
import { isRtl, type Locale } from "@/i18n/config";
import { Hero } from "./Hero";
import { Pipeline } from "./Pipeline";
import { Work } from "./Work";
import { About, Console, Contact } from "./Sections";
import { Hud } from "./Hud";
import { TechMarquee } from "./TechMarquee";
import { Principles } from "./Principles";
import { CodeShowcase } from "./CodeShowcase";
import { Engagements } from "./Engagements";
import { Testimonials } from "./Testimonials";
import { SceneLoader } from "./three/SceneLoader";
import { Shell } from "./Shell";

export function HomePage({ lang }: { lang: Locale }) {
  const t = getDict(lang);
  return (
    <Shell lang={lang}>
      <SceneLoader rtl={isRtl(lang)} />
      <Hud title={t.hud.title} stages={t.stages.map(({ id, code, name }) => ({ id, code, name }))} />
      <Hero t={t} />
      <TechMarquee />
      <Pipeline t={t} />
      <Principles t={t} />
      <Work t={t} lang={lang} />
      <CodeShowcase t={t} />
      <Engagements t={t} />
      <Testimonials />
      <Console t={t} />
      <About t={t} />
      <Contact t={t} />
    </Shell>
  );
}
