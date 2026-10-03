import Link from "next/link";
import { getDict } from "@/i18n";
import { lp, type Locale } from "@/i18n/config";
import { Button, Container, Label, Tag, hireLink } from "./ui";
import { CardArt } from "./CardArt";
import { Shell } from "./Shell";

export function CaseStudyView({ lang, slug }: { lang: Locale; slug: string }) {
  const t = getDict(lang);
  const s = t.caseStudy;
  const list = t.caseStudies;
  const idx = list.findIndex((c) => c.slug === slug);
  const c = list[idx];
  const next = list[(idx + 1) % list.length];
  const hire = hireLink(t);

  return (
    <Shell lang={lang}>
      <article className="relative pt-28 sm:pt-36">
        <div className="grid-bg pointer-events-none absolute inset-x-0 top-0 h-[600px]" aria-hidden />
        <Container>
          <Link href={`${lp(lang, "/")}#work`} className="font-mono text-xs text-muted transition-colors hover:text-fg">
            <span className="inline-block rtl:-scale-x-100">←</span> {s.allWork}
          </Link>
          <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2">
            <Label className="text-accent">{t.work.kinds[c.kind]}</Label>
            <span className="text-faint">·</span>
            <Label>{c.visibility}</Label>
          </div>
          <h1 className="relative mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl md:text-7xl">
            {c.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{c.summary}</p>
        </Container>

        <Container className="mt-14">
          <div className="relative h-64 overflow-hidden rounded-xl border border-line bg-surface sm:h-96" dir="ltr">
            <div className="grid-bg absolute inset-0" />
            <CardArt kind={c.kind} fit="meet" className="absolute inset-0 h-full w-full" />
          </div>
        </Container>

        <Container className="py-16 md:py-24">
          <div className="grid gap-12 md:grid-cols-12">
            <aside className="space-y-8 md:col-span-4">
              <div>
                <Label>{s.stack}</Label>
                <div className="mt-4 flex flex-wrap gap-1.5" dir="ltr">
                  {c.stack.map((x) => (
                    <Tag key={x}>{x}</Tag>
                  ))}
                </div>
              </div>
              {c.github && (
                <div>
                  <Label>{s.source}</Label>
                  <a
                    href={c.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 block text-sm text-fg underline decoration-line-strong underline-offset-4 hover:decoration-accent"
                  >
                    {s.github} ↗
                  </a>
                </div>
              )}
            </aside>
            <div className="space-y-14 md:col-span-8">
              <section>
                <Label>{s.challenge}</Label>
                <p className="mt-4 text-xl leading-relaxed text-fg">{c.challenge}</p>
              </section>
              <section>
                <Label>{s.whatIDid}</Label>
                <ol className="mt-5 border-t border-line">
                  {c.work.map((w, i) => (
                    <li key={w} className="flex gap-5 border-b border-line py-4 text-[15px] leading-relaxed text-fg/90">
                      <span className="pt-1 font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                      {w}
                    </li>
                  ))}
                </ol>
              </section>
              <section>
                <Label>{s.result}</Label>
                <p className="mt-4 border-s-2 border-accent ps-5 text-lg leading-relaxed text-fg">{c.outcome}</p>
              </section>
            </div>
          </div>
        </Container>

        <section className="border-t border-line">
          <Container className="flex flex-col gap-8 py-16 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Label>{s.similar}</Label>
              <p className="mt-3 text-2xl font-medium tracking-tight">{s.talk}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href={hire.href} external>
                {hire.label}
              </Button>
              <Button href={lp(lang, `/work/${next.slug}`)} variant="ghost">
                {s.next}: {next.title.split(" - ")[0]}
              </Button>
            </div>
          </Container>
        </section>
      </article>
    </Shell>
  );
}
