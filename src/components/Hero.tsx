import { profile } from "@/content/site";
import type { Dict } from "@/i18n";
import { Button, Container, hireLink } from "./ui";
import { Scramble } from "./Scramble";
import { CountUp } from "./CountUp";

export function Hero({ t }: { t: Dict }) {
  const hire = hireLink(t);
  return (
    <section id="top" data-stage="-1" className="relative flex min-h-[100svh] flex-col justify-end pb-10 pt-28">
      {/* legibility veil over the 3D scene */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#07070a_0%,rgba(7,7,10,0.85)_35%,rgba(7,7,10,0)_70%)] max-md:bg-[linear-gradient(180deg,rgba(7,7,10,0.2)_0%,rgba(7,7,10,0.9)_55%,#07070a_100%)] rtl:md:bg-[linear-gradient(270deg,#07070a_0%,rgba(7,7,10,0.85)_35%,rgba(7,7,10,0)_70%)]" />
      <Container className="relative">
        <div className="max-w-4xl">
          <div className="mb-7 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            {profile.available && (
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
            )}
            <Scramble text={`${profile.name} - ${t.hero.eyebrow}`} />
          </div>
          <h1 className="text-[2.9rem] font-semibold leading-[0.95] tracking-[-0.045em] sm:text-7xl lg:text-[5.6rem]">
            <span className="block">{t.hero.title[0]}</span>
            <span className="block bg-gradient-to-r from-accent via-[#e9ffad] to-white bg-clip-text pb-2 text-transparent rtl:bg-gradient-to-l">
              {t.hero.title[1]}
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-fg/70 sm:text-lg">{t.hero.lead}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={hire.href} external>
              {hire.label}
            </Button>
            <Button href="#pipeline" variant="ghost">
              {t.hero.enter}
            </Button>
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line backdrop-blur-md sm:mt-20 md:grid-cols-4">
          {t.stats.map((s) => (
            <div key={s.value} className="flex flex-col-reverse bg-bg/70 px-5 py-5 sm:px-6">
              <dt className="mt-1 text-xs text-muted sm:text-sm">{s.label}</dt>
              <dd className="font-mono text-3xl font-medium tracking-tight text-fg sm:text-4xl" dir="ltr">
                <span className="inline-block">
                  <CountUp value={s.value} />
                </span>
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
          <span className="inline-block h-6 w-px animate-pulse bg-accent" /> {t.hero.scroll}
        </div>
      </Container>
    </section>
  );
}
