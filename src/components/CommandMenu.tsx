"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, Briefcase, CalendarDays, Copy, CornerDownLeft, ExternalLink, FileDown, Globe, Hash, Rocket, Search } from "lucide-react";
import { links, profile } from "@/content/site";
import { navItems, runTerminal } from "@/lib/nav";
import { hireHref, whatsappHref } from "./ui";
import { openCalendly } from "@/lib/calendly";
import { localeNames, locales, lp, splitPath, type Locale } from "@/i18n/config";
import type { Dict } from "@/i18n";
import { BayonetMark } from "./Logo";

type Item = { group: string; label: string; hint?: string; icon: React.ComponentType<{ className?: string }>; run: () => void };

export function CommandMenu({
  lang,
  t,
  open,
  onClose,
}: {
  lang: Locale;
  t: Pick<Dict, "nav" | "hire" | "cmd">;
  open: boolean;
  onClose: () => void;
}) {
  const c = t.cmd;
  const router = useRouter();
  const pathname = usePathname();
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);

  const items: Item[] = useMemo(() => {
    const { rest } = splitPath(pathname);
    const home = rest === "/";
    const homeHref = lp(lang, "/");
    const go = (id: string) => () => {
      if (home) document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      else router.push(`${homeHref}#${id}`);
    };
    const ext = (href: string) => () => window.open(href, href.startsWith("http") ? "_blank" : "_self", "noopener");
    const out: Item[] = [
      { group: c.navigate, label: c.home, hint: "top", icon: Hash, run: go("top") },
      ...navItems.map((n) => ({ group: c.navigate, label: t.nav.items[n.id], hint: `#${n.id}`, icon: Hash, run: go(n.id) })),
      { group: c.navigate, label: c.contact, hint: "#contact", icon: Hash, run: go("contact") },
      ...(links.calendly ? [{ group: c.actions, label: t.hire.book, hint: "Calendly", icon: CalendarDays, run: () => openCalendly() }] : []),
      { group: c.actions, label: c.hire, hint: links.upwork ? "Upwork" : "email", icon: Briefcase, run: ext(hireHref) },
      {
        group: c.actions,
        label: c.copyEmail,
        hint: profile.email,
        icon: Copy,
        run: () => {
          navigator.clipboard?.writeText(profile.email).then(
            () => setToast(c.copied),
            () => setToast(profile.email),
          );
        },
      },
      { group: c.actions, label: c.whatsapp, hint: `+${profile.whatsapp}`, icon: ExternalLink, run: ext(whatsappHref) },
      { group: c.actions, label: c.resume, hint: "PDF", icon: FileDown, run: ext(profile.resume) },
      {
        group: c.actions,
        label: c.deploy,
        hint: c.deployHint,
        icon: Rocket,
        run: () => {
          if (!home) return router.push(`${homeHref}#console`);
          document.getElementById("console")?.scrollIntoView({ behavior: "smooth" });
          setTimeout(() => runTerminal("deploy"), 700);
        },
      },
      ...(
        [
          ["Upwork profile", links.upwork],
          ["Fiverr profile", links.fiverr],
          ["GitHub", links.github],
          ["LinkedIn", links.linkedin],
        ] as const
      )
        .filter(([, h]) => h)
        .map(([label, href]) => ({ group: c.links, label, hint: "↗", icon: ArrowRight, run: ext(href) })),
      ...locales
        .filter((l) => l !== lang)
        .map((l) => ({ group: c.language, label: localeNames[l], hint: l.toUpperCase(), icon: Globe, run: () => router.push(lp(l, rest)) })),
    ];
    return out;
  }, [pathname, router, lang, c, t.nav.items, t.hire.book]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? items.filter((i) => `${i.label} ${i.hint ?? ""} ${i.group}`.toLowerCase().includes(s)) : items;
  }, [items, q]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      setQ("");
      setSel(0);
      input.current?.focus();
    }, 10);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1600);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    list.current?.querySelector(`[data-i="${sel}"]`)?.scrollIntoView({ block: "nearest" });
  }, [sel]);

  const exec = (i: Item | undefined) => {
    if (!i) return;
    i.run();
    if (!i.label.startsWith("Copy")) onClose();
  };

  if (!open && !toast) return null;

  let lastGroup = "";
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[14vh]" role="dialog" aria-modal="true" aria-label="Command menu">
          <button aria-label="Close" className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <div className="cmd-in relative w-full max-w-xl overflow-hidden rounded-2xl border border-line-strong bg-[#0c0c10]/95 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(198,255,61,0.05)] backdrop-blur-xl">
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-4 w-4 shrink-0 text-muted" />
              <input
                ref={input}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setSel(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setSel((s) => Math.min(s + 1, filtered.length - 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setSel((s) => Math.max(s - 1, 0));
                  } else if (e.key === "Enter") {
                    e.preventDefault();
                    exec(filtered[sel]);
                  } else if (e.key === "Escape") onClose();
                }}
                placeholder={c.placeholder}
                className="h-14 flex-1 bg-transparent text-[15px] text-fg outline-none placeholder:text-faint"
                aria-label="Search commands"
              />
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-faint">ESC</kbd>
            </div>
            <ul ref={list} className="max-h-[52vh] overflow-y-auto p-2">
              {filtered.length === 0 && <li className="px-3 py-8 text-center text-sm text-muted">{c.noResults} “{q}”.</li>}
              {filtered.map((i, n) => {
                const header = i.group !== lastGroup ? i.group : null;
                lastGroup = i.group;
                const Icon = i.icon;
                return (
                  <li key={`${i.group}-${i.label}`}>
                    {header && (
                      <p className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">{header}</p>
                    )}
                    <button
                      data-i={n}
                      onMouseMove={() => setSel(n)}
                      onClick={() => exec(i)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[14px] transition-colors ${
                        n === sel ? "bg-white/[0.06] text-fg" : "text-fg/75"
                      }`}
                    >
                      <span
                        className={`grid h-7 w-7 place-items-center rounded-md border ${
                          n === sel ? "border-accent/50 text-accent" : "border-line text-muted"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="flex-1 truncate">{i.label}</span>
                      {i.hint && <span className="truncate font-mono text-[11px] text-faint">{i.hint}</span>}
                      {n === sel && <CornerDownLeft className="h-3.5 w-3.5 text-accent" />}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[10.5px] text-faint">
              <span className="flex items-center gap-2">
                <BayonetMark className="h-4 w-4" framed={false} /> USM4
              </span>
              <span>{c.help}</span>
            </div>
          </div>
        </div>
      )}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[95] -translate-x-1/2 rounded-lg border border-accent/40 bg-[#0c0c10] px-4 py-2.5 font-mono text-xs text-accent shadow-xl">
          ✓ {toast}
        </div>
      )}
    </>
  );
}
