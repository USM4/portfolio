"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarDays } from "lucide-react";
import { links } from "@/content/site";
import { calendlyUrl, loadCalendly } from "@/lib/calendly";

/** Embedded booking calendar, loaded only when scrolled near. */
export function CalendlyInline({ loadingLabel, openLabel }: { loadingLabel: string; openLabel: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "ready" | "error">("idle");

  useEffect(() => {
    const el = box.current;
    if (!el || !calendlyUrl) return;
    let done = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (done || !entries.some((e) => e.isIntersecting)) return;
        done = true;
        io.disconnect();
        loadCalendly()
          .then((c) => {
            c.initInlineWidget({ url: calendlyUrl, parentElement: el });
            setState("ready");
          })
          .catch(() => setState("error"));
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!links.calendly) return null;

  return (
    <div className="relative h-[700px] overflow-hidden rounded-xl border border-line bg-surface/60">
      {state !== "ready" && (
        <div className="absolute inset-0 grid place-items-center">
          <div className="flex flex-col items-center gap-4 text-sm text-muted">
            <CalendarDays className={`h-6 w-6 text-accent ${state === "idle" ? "animate-pulse" : ""}`} />
            {state === "error" ? (
              <a href={links.calendly} target="_blank" rel="noopener noreferrer" className="text-fg underline underline-offset-4 hover:text-accent">
                {openLabel} ↗
              </a>
            ) : (
              <span>{loadingLabel}</span>
            )}
          </div>
        </div>
      )}
      <div ref={box} className="relative h-full w-full [&_iframe]:h-full" />
    </div>
  );
}
