import { codeSamples } from "@/content/site";
import type { Dict } from "@/i18n";
import { highlight } from "@/lib/highlight";
import { CodeTabs } from "./CodeTabs";
import { Container, Label } from "./ui";

export async function CodeShowcase({ t }: { t: Dict }) {
  const samples = await Promise.all(
    codeSamples.map(async (s) => ({ ...s, html: await highlight(s.code, s.lang), lines: s.code.split("\n").length })),
  );
  return (
    <section id="code" className="relative border-t border-line bg-bg/70 py-24 backdrop-blur-xl md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <Label>
              <span className="text-accent">04</span> / {t.code.label}
            </Label>
            <h2 className="mt-6 text-3xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
              {t.code.title} <span className="text-muted">{t.code.titleMuted}</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-fg/70 sm:text-lg">{t.code.lead}</p>
            <ul className="mt-8 space-y-3 font-mono text-[13px] text-muted">
              {t.code.points.map((p) => (
                <li key={p}>
                  <span className="text-accent">✓</span> {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0 lg:col-span-8">
            <CodeTabs samples={samples} labels={{ copy: t.code.copy, copied: t.code.copied }} />
          </div>
        </div>
      </Container>
    </section>
  );
}
