import { codeSamples } from "@/content/site";
import { highlight } from "@/lib/highlight";
import { CodeTabs } from "./CodeTabs";
import { Container, Label } from "./ui";

export async function CodeShowcase() {
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
              <span className="text-accent">04</span> / Code
            </Label>
            <h2 className="mt-6 text-3xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
              Code that reads <span className="text-muted">like documentation.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-fg/70 sm:text-lg">
              Typed, modular and secure. The same standards across NestJS, Laravel, Docker and WooCommerce - so your
              project stays easy to extend long after launch.
            </p>
            <ul className="mt-8 space-y-3 font-mono text-[13px] text-muted">
              <li><span className="text-accent">✓</span> Transactions & validation at the boundary</li>
              <li><span className="text-accent">✓</span> Token rotation & guard-based auth</li>
              <li><span className="text-accent">✓</span> Isolated networks, read-only mounts</li>
              <li><span className="text-accent">✓</span> Hooks over hacks - no core edits</li>
            </ul>
          </div>
          <div className="min-w-0 lg:col-span-8">
            <CodeTabs samples={samples} />
          </div>
        </div>
      </Container>
    </section>
  );
}
