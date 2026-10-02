import { brand, links, profile } from "@/content/site";
import { Brand, Wordmark } from "./Logo";
import { Container } from "./ui";

export function Footer() {
  const cols = [
    {
      title: "Navigate",
      items: [
        ["Pipeline", "/#pipeline"],
        ["Work", "/#work"],
        ["Code", "/#code"],
        ["Console", "/#console"],
        ["About", "/#about"],
      ],
    },
    {
      title: "Services",
      items: [
        ["E-commerce stores", "/#storefront"],
        ["Web platforms", "/#backend"],
        ["DevOps & cloud", "/#cloud"],
        ["Rescue & audit", "/#engage"],
      ],
    },
    {
      title: "Connect",
      items: [
        ["Upwork", links.upwork],
        ["Fiverr", links.fiverr],
        ["LinkedIn", links.linkedin],
        ["GitHub", links.github],
        ["Email", `mailto:${profile.email}`],
      ].filter(([, h]) => h),
    },
  ];
  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg">
      <Container className="pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Brand id="wm-foot" sub={profile.name} />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">{brand.story}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Commerce stores, web platforms and cloud infrastructure — engineered end to end from {profile.location}.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title} className="md:col-span-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">{c.title}</p>
              <ul className="mt-5 space-y-3 text-sm">
                {c.items.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-fg/70 transition-colors hover:text-accent"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      <div className="relative mt-20 select-none" aria-hidden>
        <div className="mx-auto max-w-6xl px-5 pb-6 sm:px-8">
          <Wordmark id="wm-giant" tone="ghost" className="h-auto w-full drop-shadow-[0_0_60px_rgba(198,255,61,0.12)]" />
        </div>
      </div>

      <Container className="flex flex-col gap-3 border-t border-line py-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name} · {brand.handle}
        </p>
        <p className="font-mono">Built with Next.js · Three.js · TypeScript</p>
      </Container>
    </footer>
  );
}
