"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { CalendarDays, Command, Mail } from "lucide-react";
import { BookCall } from "./BookCall";
import { GithubIcon as Github, LinkedinIcon as Linkedin, WhatsappIcon as MessageCircle } from "./BrandIcons";
import { links, profile } from "@/content/site";
import { navItems } from "@/lib/nav";
import { hireHref, whatsappHref } from "./ui";
import { LangSwitch } from "./LangSwitch";
import { lp, splitPath, type Locale } from "@/i18n/config";
import type { Dict } from "@/i18n";

type NavDict = Pick<Dict, "nav" | "hire" | "cmd">;
import { Brand } from "./Logo";
import { CommandMenu } from "./CommandMenu";

function useLocalTime() {
  const [t, setT] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Casablanca" });
    const tick = () => setT(fmt.format(new Date()));
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 20_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);
  return t;
}

export function Nav({ lang, t }: { lang: Locale; t: NavDict }) {
  const pathname = usePathname();
  const home = splitPath(pathname).rest === "/";
  const homeHref = lp(lang, "/");
  const [open, setOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  const progress = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const time = useLocalTime();

  /* scroll: frosted state, hide-on-scroll-down, progress bar, scroll-spy */
  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 12);
      setHidden(y > 600 && y > lastY + 4 ? true : y < lastY - 4 ? false : (h) => h);
      lastY = y;
      if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      if (!home) return;
      const probe = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const item of navItems) {
        for (const id of item.sections) {
          const el = document.getElementById(id);
          if (el) {
            const r = el.getBoundingClientRect();
            if (r.top <= probe && r.bottom > probe) current = item.id;
          }
        }
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [home]);

  /* sliding highlight under hovered / active link */
  const target = hover ?? active;
  useLayoutEffect(() => {
    const el = target ? linkRefs.current[target] : null;
    setPill(el ? { x: el.offsetLeft, w: el.offsetWidth } : null);
  }, [target, scrolled]);

  /* ⌘K / Ctrl+K */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* lock scroll behind mobile menu */
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const close = useCallback(() => setOpen(false), []);
  const hireTarget = hireHref.startsWith("http") ? "_blank" : undefined;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${
          hidden && !open ? "-translate-y-[120%]" : ""
        }`}
      >
        <div className={`mx-auto transition-all duration-500 ${scrolled ? "max-w-6xl px-3 pt-3 sm:px-5" : "max-w-6xl px-0 pt-0"}`}>
          <div
            className={`relative flex h-16 items-center justify-between gap-4 px-5 transition-all duration-500 sm:px-6 ${
              scrolled || open
                ? "rounded-2xl border border-line-strong bg-[#0b0b0f]/75 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
                : "rounded-none border border-transparent"
            }`}
          >
            <Link href={homeHref} onClick={close} className="shrink-0" aria-label="USM4">
              <Brand id="wm-nav" sub={profile.name} role={t.nav.engineer} />
            </Link>

            {/* desktop links */}
            <nav
              className="relative hidden items-center lg:flex"
              aria-label="Primary"
              onMouseLeave={() => setHover(null)}
            >
              <span
                aria-hidden
                className="absolute top-1/2 h-8 -translate-y-1/2 rounded-lg bg-white/[0.06] transition-all duration-300 ease-out"
                style={{ left: pill?.x ?? 0, width: pill?.w ?? 0, opacity: pill ? 1 : 0 }}
              />
              {navItems.map((i) => (
                <Link
                  key={i.id}
                  href={`${homeHref}#${i.id}`}
                  ref={(el) => {
                    linkRefs.current[i.id] = el;
                  }}
                  onMouseEnter={() => setHover(i.id)}
                  aria-current={active === i.id ? "true" : undefined}
                  className={`relative z-10 whitespace-nowrap px-3 py-2 text-[13.5px] xl:px-3.5 transition-colors ${
                    active === i.id ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {t.nav.items[i.id]}
                  <span
                    className={`absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_8px_#c6ff3d] transition-opacity ${
                      active === i.id ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* right cluster */}
            <div className="flex items-center gap-2">
              <span className="me-2 hidden items-center gap-2 font-mono text-[11px] text-muted xl:flex">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                {time ? <span dir="ltr">MA {time}</span> : t.nav.availableShort}
              </span>
              <div className="hidden md:block">
                <LangSwitch lang={lang} label={t.nav.language} />
              </div>
              <button
                onClick={() => setCmdOpen(true)}
                className="hidden h-9 items-center gap-2 rounded-lg border border-line px-2.5 font-mono text-[11px] text-muted transition-colors hover:border-line-strong hover:text-fg md:flex lg:hidden xl:flex"
                aria-label={t.nav.commandMenu}
              >
                <Command className="h-3.5 w-3.5" />K
              </button>
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hidden h-9 w-9 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-line-strong hover:text-fg md:grid lg:hidden xl:grid"
              >
                <Github className="h-4 w-4" />
              </a>
              <BookCall
                icon={false}
                className="group relative hidden h-9 items-center gap-1.5 overflow-hidden whitespace-nowrap rounded-lg bg-accent px-4 text-[13px] font-semibold text-accent-ink transition-shadow hover:shadow-[0_0_28px_-4px_rgba(198,255,61,0.7)] sm:flex"
              >
                <CalendarDays aria-hidden className="relative z-10 h-3.5 w-3.5" />
                <span className="relative z-10">{t.hire.bookShort}</span>
                <span className="absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-20deg] bg-white/50 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />
              </BookCall>
              <button
                className="grid h-10 w-10 place-items-center rounded-lg border border-line lg:hidden"
                aria-label={open ? t.nav.close : t.nav.open}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              >
                <span className="relative block h-3 w-4">
                  <span className={`absolute left-0 h-px w-4 bg-fg transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                  <span className={`absolute left-0 top-1.5 h-px bg-fg transition-all duration-300 ${open ? "w-0 opacity-0" : "w-2.5"}`} />
                  <span className={`absolute left-0 h-px w-4 bg-fg transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
                </span>
              </button>
            </div>

            {/* scroll progress */}
            <div
              ref={progress}
              aria-hidden
              className={`absolute inset-x-4 bottom-0 h-px origin-left bg-gradient-to-r from-accent/0 via-accent to-accent rtl:origin-right rtl:bg-gradient-to-l transition-opacity ${
                scrolled ? "opacity-100" : "opacity-0"
              }`}
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </header>

      {/* mobile / tablet full-screen menu */}
      <div
        className={`fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="grid-bg absolute inset-0 opacity-60" />
        <nav className="relative flex h-full flex-col px-6 pb-8 pt-28" aria-label="Mobile">
          <ul className="space-y-1">
            {navItems.map((i, n) => (
              <li
                key={i.id}
                className="transition-all duration-500"
                style={{
                  transitionDelay: open ? `${80 + n * 50}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateY(14px)",
                }}
              >
                <Link
                  href={`${homeHref}#${i.id}`}
                  onClick={close}
                  tabIndex={open ? 0 : -1}
                  className="group flex items-baseline gap-4 border-b border-line py-4"
                >
                  <span className="font-mono text-xs text-accent">{String(n + 1).padStart(2, "0")}</span>
                  <span className={`text-3xl font-semibold tracking-tight ${active === i.id ? "text-accent" : "text-fg"}`}>
                    {t.nav.items[i.id]}
                  </span>
                  <span className="ms-auto text-muted transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto space-y-4">
            <LangSwitch lang={lang} label={t.nav.language} variant="row" />
            <BookCall className="flex items-center justify-center gap-2 rounded-xl bg-accent py-4 font-semibold text-accent-ink">
              {t.hire.book}
            </BookCall>
            <a
              href={hireHref}
              target={hireTarget}
              rel="noopener noreferrer"
              tabIndex={open ? 0 : -1}
              className="block rounded-xl border border-line-strong py-4 text-center font-semibold text-fg"
            >
              {t.hire.short} <span className="inline-block rtl:-scale-x-100">→</span>
            </a>
            <div className="grid grid-cols-4 gap-2">
              {[
                { href: `mailto:${profile.email}`, Icon: Mail, label: "Email" },
                { href: whatsappHref, Icon: MessageCircle, label: "WhatsApp" },
                { href: links.linkedin, Icon: Linkedin, label: "LinkedIn" },
                { href: links.github, Icon: Github, label: "GitHub" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  tabIndex={open ? 0 : -1}
                  aria-label={label}
                  className="grid h-12 place-items-center rounded-xl border border-line text-muted"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <p className="flex items-center justify-center gap-2 font-mono text-[11px] text-faint">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {t.nav.availableLong}
              {time && (
                <span>
                  · {t.nav.timeIn} <span dir="ltr">{time}</span>
                </span>
              )}
            </p>
          </div>
        </nav>
      </div>

      <CommandMenu lang={lang} t={t} open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </>
  );
}
