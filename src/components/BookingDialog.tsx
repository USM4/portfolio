"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { profile } from "@/content/site";
import { BOOK_EVENT } from "@/lib/calendly";
import { CalendlyInline } from "./CalendlyInline";

type Labels = { bookTitle: string; bookLoading: string; bookOpen: string; bookClose: string };

/** Site-styled booking modal (replaces Calendly's white popup). */
export function BookingDialog({ t }: { t: Labels }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(BOOK_EVENT, onOpen);
    return () => window.removeEventListener(BOOK_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-label={t.bookTitle}>
      <button
        type="button"
        aria-label={t.bookClose}
        onClick={() => setOpen(false)}
        className="cmd-in absolute inset-0 bg-black/70 backdrop-blur-md"
      />
      <div className="cmd-in relative flex h-[min(780px,calc(100dvh-24px))] w-[min(640px,100%)] flex-col overflow-hidden rounded-2xl border border-line-strong bg-[#0b0b0f] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.95),0_0_80px_-30px_rgba(198,255,61,0.35)]">
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-line px-4">
          <span className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="text-fg">{t.bookTitle}</span>
            <span className="hidden sm:inline" dir="ltr">· {profile.name}</span>
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t.bookClose}
            className="grid h-8 w-8 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <CalendlyInline eager loadingLabel={t.bookLoading} openLabel={t.bookOpen} className="min-h-0 flex-1" />
      </div>
    </div>
  );
}
