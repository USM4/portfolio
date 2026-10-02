import { stages } from "@/content/site";
import { Container, Label } from "./ui";

export function Pipeline() {
  return (
    <section id="pipeline" className="relative">
      <Container className="pt-24 md:pt-36">
        <div className="max-w-2xl rounded-xl border border-line bg-bg/70 p-7 backdrop-blur-md sm:p-9">
          <Label>
            <span className="text-accent">The pipeline</span> / What I build
          </Label>
          <h2 className="mt-5 text-3xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            Five layers. <span className="text-muted">One engineer.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-fg/70 sm:text-lg">
            Every order on the internet travels the same path — storefront, checkout, backend, database, cloud. Most
            projects need three freelancers to cover it. I build every layer, so nothing breaks in between.
          </p>
        </div>
      </Container>

      {stages.map((s, i) => (
        <div
          key={s.id}
          id={s.id}
          data-stage={i}
          className="flex min-h-[115svh] items-end pb-[12svh] md:items-center md:pb-0"
        >
          <Container>
            <article className="reveal max-w-[34rem] rounded-xl border border-line bg-bg/75 p-7 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-9">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                  Stage {s.code} — {s.name}
                </span>
                <span className="font-mono text-[11px] text-faint">
                  {String(i + 1).padStart(2, "0")}/05
                </span>
              </div>
              <h3 className="mt-6 text-3xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-[2.75rem]">
                {s.title}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-fg/70 sm:text-base">{s.lead}</p>
              <ul className="mt-7 space-y-3 border-t border-line pt-6">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[15px] text-fg/90">
                    <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[12px] text-muted">
                {s.tech.map((t) => (
                  <span key={t}>
                    <span className="text-faint">#</span>
                    {t}
                  </span>
                ))}
              </div>
            </article>
          </Container>
        </div>
      ))}
    </section>
  );
}
