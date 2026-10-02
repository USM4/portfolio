import { Boxes, Gauge, Layers, MessagesSquare, ShieldCheck, Workflow } from "lucide-react";
import { principles } from "@/content/site";
import { Container, SectionHead } from "./ui";

const iconMap = { layers: Layers, shield: ShieldCheck, boxes: Boxes, gauge: Gauge, workflow: Workflow, messages: MessagesSquare };

export function Principles() {
  return (
    <section id="principles" data-stage="5" className="relative border-t border-line bg-bg/92 py-24 backdrop-blur-2xl md:py-32">
      <Container>
        <SectionHead
          index="02"
          label="Principles"
          title={
            <>
              Built the right way. <span className="text-muted">Every time.</span>
            </>
          }
          lead="The engineering standards behind every store, platform and server I deliver."
        />
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p) => {
            const Icon = iconMap[p.icon];
            return (
              <article key={p.title} className="reveal group relative bg-bg p-8 transition-colors duration-300 hover:bg-surface">
                <div className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                <div className="grid h-12 w-12 place-items-center rounded-xl border border-line-strong bg-surface text-accent shadow-[0_0_30px_-10px_rgba(198,255,61,0.5)] transition-transform duration-300 group-hover:-translate-y-0.5">
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.text}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
