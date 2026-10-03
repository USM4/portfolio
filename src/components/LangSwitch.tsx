"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Check, Globe } from "lucide-react";
import { localeNames, locales, lp, splitPath, type Locale } from "@/i18n/config";

/** Globe button + dropdown that keeps you on the same page in another language. */
export function LangSwitch({ lang, label, variant = "menu" }: { lang: Locale; label: string; variant?: "menu" | "row" }) {
  const pathname = usePathname();
  const { rest } = splitPath(pathname);
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (variant === "row")
    return (
      <div className="flex flex-wrap gap-2" aria-label={label}>
        {locales.map((l) => (
          <Link
            key={l}
            href={lp(l, rest)}
            hrefLang={l}
            lang={l}
            className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
              l === lang ? "border-accent/60 text-accent" : "border-line text-muted hover:text-fg"
            }`}
          >
            {localeNames[l]}
          </Link>
        ))}
      </div>
    );

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        className="flex h-9 items-center gap-1.5 rounded-lg border border-line px-2.5 font-mono text-[11px] uppercase text-muted transition-colors hover:border-line-strong hover:text-fg"
      >
        <Globe className="h-3.5 w-3.5" />
        {lang}
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label={label}
          className="cmd-in absolute end-0 top-11 z-50 w-44 overflow-hidden rounded-xl border border-line-strong bg-[#0c0c10]/95 p-1.5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
        >
          {locales.map((l) => (
            <li key={l} role="option" aria-selected={l === lang}>
              <Link
                href={lp(l, rest)}
                hrefLang={l}
                lang={l}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between rounded-lg px-3 py-2 text-[13.5px] transition-colors hover:bg-white/[0.06] ${
                  l === lang ? "text-fg" : "text-fg/70"
                }`}
              >
                <span>{localeNames[l]}</span>
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase text-faint">
                  {l === lang && <Check className="h-3.5 w-3.5 text-accent" />}
                  {l}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
