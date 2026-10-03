import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies } from "@/content/site";
import { Button, Container, Label, Tag, primaryHire } from "@/components/ui";
import { CardArt } from "@/components/CardArt";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = caseStudies.find((s) => s.slug === slug);
  if (!c) return {};
  return { title: c.title, description: c.summary, alternates: { canonical: `/work/${c.slug}` } };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const idx = caseStudies.findIndex((s) => s.slug === slug);
  if (idx === -1) notFound();
  const c = caseStudies[idx];
  const next = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <article className="relative pt-28 sm:pt-36">
      <div className="grid-bg pointer-events-none absolute inset-x-0 top-0 h-[600px]" aria-hidden />
      <Container>
        <Link href="/#work" className="font-mono text-xs text-muted transition-colors hover:text-fg">
          ← All work
        </Link>
        <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2">
          <Label className="text-accent">{c.kind}</Label>
          <span className="text-faint">·</span>
          <Label>{c.visibility}</Label>
        </div>
        <h1 className="relative mt-5 max-w-4xl text-4xl font-semibold leading-[1.0] tracking-[-0.04em] sm:text-6xl md:text-7xl">
          {c.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{c.summary}</p>
      </Container>

      <Container className="mt-14">
        <div className="relative h-64 overflow-hidden rounded-xl border border-line bg-surface sm:h-96">
          <div className="grid-bg absolute inset-0" />
          <CardArt kind={c.kind} fit="meet" className="absolute inset-0 h-full w-full" />
        </div>
      </Container>

      <Container className="py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <aside className="space-y-8 md:col-span-4">
            <div>
              <Label>Stack</Label>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {c.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </div>
            {c.github && (
              <div>
                <Label>Source</Label>
                <a
                  href={c.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block text-sm text-fg underline decoration-line-strong underline-offset-4 hover:decoration-accent"
                >
                  View on GitHub ↗
                </a>
              </div>
            )}
          </aside>
          <div className="space-y-14 md:col-span-8">
            <section>
              <Label>The challenge</Label>
              <p className="mt-4 text-xl leading-relaxed text-fg">{c.challenge}</p>
            </section>
            <section>
              <Label>What I did</Label>
              <ol className="mt-5 border-t border-line">
                {c.work.map((w, i) => (
                  <li key={w} className="flex gap-5 border-b border-line py-4 text-[15px] leading-relaxed text-fg/90">
                    <span className="font-mono text-xs text-accent pt-1">{String(i + 1).padStart(2, "0")}</span>
                    {w}
                  </li>
                ))}
              </ol>
            </section>
            <section>
              <Label>Result</Label>
              <p className="mt-4 border-l-2 border-accent pl-5 text-lg leading-relaxed text-fg">{c.outcome}</p>
            </section>
          </div>
        </div>
      </Container>

      <section className="border-t border-line">
        <Container className="flex flex-col gap-8 py-16 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Label>Need something similar?</Label>
            <p className="mt-3 text-2xl font-medium tracking-tight">Let&apos;s talk about your project.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={primaryHire.href} external>
              {primaryHire.label}
            </Button>
            <Button href={`/work/${next.slug}`} variant="ghost">
              Next: {next.title.split(" - ")[0]}
            </Button>
          </div>
        </Container>
      </section>
    </article>
  );
}
