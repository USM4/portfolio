import Link from "next/link";
import type { Dict } from "@/i18n";
import { lp, type Locale } from "@/i18n/config";
import { CardArt } from "./CardArt";
import { TiltCard } from "./TiltCard";
import { Container, SectionHead } from "./ui";

const span = { xl: "md:col-span-6 md:row-span-1", lg: "md:col-span-3", md: "md:col-span-2" } as const;

export function Work({ t, lang }: { t: Dict; lang: Locale }) {
  return (
    <section id="work" className="relative border-t border-line bg-bg/88 py-24 backdrop-blur-2xl md:py-32">
      <Container>
        <SectionHead
          index="03"
          label={t.work.label}
          title={
            <>
              {t.work.title} <span className="text-muted">{t.work.titleMuted}</span>
            </>
          }
          lead={t.work.lead}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
          {t.caseStudies.map((c, i) => (
            <TiltCard key={c.slug} className={`reveal min-w-0 ${span[c.size]}`}>
              <Link
                href={lp(lang, `/work/${c.slug}`)}
                className="group card-light relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors duration-300 hover:border-accent/40"
              >
                <div className={`relative overflow-hidden border-b border-line ${c.size === "xl" ? "h-56 sm:h-72" : "h-44"}`}>
                  <CardArt
                    kind={c.kind}
                    className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="absolute start-5 top-4 font-mono text-[11px] text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="absolute end-5 top-4 rounded-[3px] border border-accent/40 bg-bg/70 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    {t.work.kinds[c.kind]}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="font-mono text-[11px] text-faint">{c.visibility}</span>
                  <h3
                    className={`mt-2 font-semibold tracking-[-0.02em] ${c.size === "xl" ? "text-2xl sm:text-3xl" : "text-xl"}`}
                  >
                    {c.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{c.summary}</p>
                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-4">
                    <span className="truncate font-mono text-[11.5px] text-fg/60" dir="ltr">
                      {c.stack.slice(0, c.size === "md" ? 3 : 5).join(" · ")}
                    </span>
                    <span className="shrink-0 text-sm text-fg transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent rtl:-scale-x-100 rtl:group-hover:-translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </TiltCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
