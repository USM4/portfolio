import { about, links, process, profile, stack } from "@/content/site";
import { Terminal } from "./Terminal";
import { CopyCommand } from "./CopyCommand";
import { Button, Container, Label, SectionHead, primaryHire, whatsappHref } from "./ui";

export function Console() {
  return (
    <section id="console" className="relative border-t border-line bg-bg/55 py-24 backdrop-blur-sm md:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Label>
              <span className="text-accent">06</span> / Console
            </Label>
            <h2 className="mt-6 text-3xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
              Don&apos;t read. <span className="text-muted">Run it.</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-fg/70 sm:text-lg">
              A working shell. Ask who I am, list the stack - or type <code className="font-mono text-accent">deploy</code>{" "}
              and watch the traffic in the system behind this page speed up.
            </p>
            <ol className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line">
              {process.map((p) => (
                <li key={p.step} className="bg-bg/80 p-5">
                  <span className="font-mono text-xs text-accent">{p.step}</span>
                  <p className="mt-2 font-medium">{p.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{p.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-7">
            <Terminal />
          </div>
        </div>
      </Container>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="relative border-t border-line bg-bg/92 py-24 backdrop-blur-2xl md:py-32">
      <Container>
        <SectionHead
          index="07"
          label="About"
          title={
            <>
              Engineering depth. <span className="text-muted">Commerce instinct.</span>
            </>
          }
        />
        <div className="grid gap-12 md:grid-cols-12">
          <div className="reveal md:col-span-4">
            <div className="group/photo relative aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-xl border border-line bg-surface shadow-[0_40px_100px_-40px_rgba(198,255,61,0.25)]">
              {profile.photo ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={profile.photo}
                    alt={`${profile.name} looking out over the mountains in Morocco`}
                    loading="lazy"
                    className="h-full w-full object-cover object-[50%_42%] brightness-[0.82] contrast-[1.08] saturate-[0.55] transition-all duration-700 ease-out group-hover/photo:scale-[1.04] group-hover/photo:brightness-95 group-hover/photo:saturate-100"
                  />
                  {/* grade: dark fade into the card + faint lime tint */}
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,10,0)_45%,rgba(7,7,10,0.85)_100%)]" />
                  <div className="pointer-events-none absolute inset-0 bg-accent/[0.06] mix-blend-color transition-opacity duration-700 group-hover/photo:opacity-0" />
                  {/* viewfinder corners */}
                  {["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "left-3 bottom-16 border-b border-l", "right-3 bottom-16 border-b border-r"].map((c) => (
                    <span key={c} className={`pointer-events-none absolute h-4 w-4 border-accent/70 ${c}`} />
                  ))}
                  <span className="pointer-events-none absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.18em] text-fg/80">
                    <span className="text-accent">●</span> REC · USM4
                  </span>
                  <span className="pointer-events-none absolute right-5 top-5 font-mono text-[10px] uppercase tracking-[0.18em] text-fg/60">
                    {profile.location}
                  </span>
                </>
              ) : (
                <div className="relative grid h-full w-full place-items-center">
                  <div className="grid-bg absolute inset-0" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(198,255,61,0.18),transparent_60%)]" />
                  <span className="relative font-mono text-7xl font-semibold tracking-tight text-accent">{profile.initials}</span>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-line bg-bg/80 px-4 py-3 backdrop-blur">
                <span className="text-sm font-medium">{profile.name}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">● available</span>
              </div>
            </div>
            <dl className="mt-8 grid max-w-[340px] grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">Based in</dt>
                <dd className="mt-1">
                  {profile.location} · {profile.timezone}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">Languages</dt>
                <dd className="mt-1">{about.languages.join(" · ")}</dd>
              </div>
            </dl>
          </div>
          <div className="md:col-span-8">
            <div className="space-y-5 text-lg leading-relaxed text-fg/75 sm:text-xl">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="reveal">
                  {p}
                </p>
              ))}
            </div>
            <div className="reveal mt-12 border-t border-line">
              {about.education.map((e) => (
                <div key={e.school} className="flex flex-col gap-1 border-b border-line py-5 sm:flex-row sm:justify-between">
                  <span className="font-medium">{e.school}</span>
                  <span className="text-sm text-muted">{e.detail}</span>
                </div>
              ))}
            </div>
            <dl className="reveal mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {stack.map((g) => (
                <div key={g.group} className="bg-bg p-5">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">{g.group}</dt>
                  <dd className="mt-3 text-[14px] leading-relaxed text-fg/80">{g.items.join(" · ")}</dd>
                </div>
              ))}
            </dl>
            <div className="reveal mt-10">
              <Button href={profile.resume} variant="ghost" external>
                Download résumé
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Contact() {
  const channels = [
    links.upwork && { label: "Upwork", value: "Hire on Upwork", href: links.upwork },
    links.fiverr && { label: "Fiverr", value: "Order on Fiverr", href: links.fiverr },
    { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { label: "WhatsApp", value: `+${profile.whatsapp}`, href: whatsappHref },
    { label: "LinkedIn", value: "Connect", href: links.linkedin },
    { label: "GitHub", value: "@USM4", href: links.github },
  ].filter(Boolean) as { label: string; value: string; href: string }[];

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line bg-bg/60 py-28 backdrop-blur-sm md:py-40">
      <Container className="relative">
        <Label>
          <span className="text-accent">08</span> / Contact
        </Label>
        <h2 className="reveal mt-8 max-w-5xl text-[2.7rem] font-semibold leading-[0.95] tracking-[-0.045em] sm:text-7xl md:text-[6.5rem]">
          Let&apos;s build <span className="bg-gradient-to-r from-accent to-white bg-clip-text text-transparent">your system.</span>
        </h2>
        <p className="reveal mt-8 max-w-xl text-lg text-fg/70">
          A new store, a platform, or infrastructure that needs fixing - send the brief. You get a reply within 24 hours
          with questions or a clear plan.
        </p>
        <div className="reveal mt-10 flex flex-wrap gap-3">
          <Button href={primaryHire.href} external>
            {primaryHire.label}
          </Button>
          <Button href={whatsappHref} variant="ghost" external>
            Message on WhatsApp
          </Button>
        </div>
        <div className="reveal mt-10">
          <CopyCommand command={`hire usm4 --email ${profile.email}`} value={profile.email} hint="copy email" />
        </div>
        <ul className={`reveal mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 ${channels.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
          {channels.map((c) => (
            <li key={c.label} className="bg-bg/85">
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-6 transition-colors hover:bg-surface"
              >
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-faint">{c.label}</span>
                  <span className="mt-1 block text-[15px]">{c.value}</span>
                </span>
                <span className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
