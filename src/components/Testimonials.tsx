import { testimonials } from "@/content/site";
import { Container, SectionHead } from "./ui";

export function Testimonials() {
  if (!testimonials.length) return null;
  return (
    <section id="testimonials" className="relative border-t border-line bg-bg/92 py-24 backdrop-blur-2xl md:py-32">
      <Container>
        <SectionHead index="★" label="Clients" title="What clients say." />
        <div className="grid gap-4 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure key={t.name} className="reveal rounded-2xl border border-line bg-surface p-8">
              <blockquote className="text-lg leading-relaxed text-fg/90">“{t.quote}”</blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-medium">{t.name}</span> <span className="text-muted">· {t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
