import { Check } from "lucide-react";
import type { Dict } from "@/i18n";
import { Button, Container, SectionHead, hireLink } from "./ui";

export function Engagements({ t }: { t: Dict }) {
  const hire = hireLink(t);
  return (
    <section id="engage" className="relative border-t border-line bg-bg/92 py-24 backdrop-blur-2xl md:py-32">
      <Container>
        <SectionHead
          index="05"
          label={t.engage.label}
          title={
            <>
              {t.engage.title} <span className="text-muted">{t.engage.titleMuted}</span>
            </>
          }
          lead={t.engage.lead}
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {t.engage.items.map((e) => (
            <article
              key={e.name}
              className={`reveal relative flex flex-col overflow-hidden rounded-2xl border p-8 ${
                e.highlight
                  ? "border-accent/50 bg-[linear-gradient(180deg,rgba(198,255,61,0.08),rgba(14,14,18,1)_45%)] shadow-[0_0_80px_-30px_rgba(198,255,61,0.45)]"
                  : "border-line bg-surface"
              }`}
            >
              {e.highlight && (
                <span className="absolute end-6 top-6 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  ● {t.engage.ongoing}
                </span>
              )}
              <h3 className="text-2xl font-semibold tracking-tight">{e.name}</h3>
              <p className="mt-2 text-[15px] text-muted">{e.tagline}</p>
              <ul className="mt-8 flex-1 space-y-3 border-t border-line pt-6">
                {e.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-[15px] text-fg/90">
                    <Check className="h-4 w-4 shrink-0 text-accent" strokeWidth={2.2} />
                    {p}
                  </li>
                ))}
              </ul>
              <Button href={hire.href} external variant={e.highlight ? "primary" : "ghost"} className="mt-8 w-full">
                {e.cta}
              </Button>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
