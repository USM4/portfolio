"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarDays } from "lucide-react";
import { links } from "@/content/site";
import { calendlyUrl, loadCalendly } from "@/lib/calendly";

/**
 * Calendly booking widget, skinned for the site.
 * Kept under 650px wide so Calendly renders its full-bleed layout (no white page margins),
 * and hidden behind our own loader until Calendly reports the calendar is painted.
 */
export function CalendlyInline({
  loadingLabel,
  openLabel,
  eager = false,
  className = "",
}: {
  loadingLabel: string;
  openLabel: string;
  eager?: boolean;
  className?: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "ready" | "error">("idle");

  useEffect(() => {
    const el = box.current;
    if (!el || !calendlyUrl) return;
    let started = false;
    let timer = 0;

    const onMsg = (e: MessageEvent) => {
      if (e.origin !== "https://calendly.com") return;
      const frame = el.querySelector("iframe");
      if (frame && e.source !== frame.contentWindow) return;
      const ev = (e.data as { event?: string })?.event;
      if (ev === "calendly.event_type_viewed" || ev === "calendly.profile_page_viewed") setState("ready");
    };
    window.addEventListener("message", onMsg);

    const start = () => {
      if (started) return;
      started = true;
      loadCalendly()
        .then((c) => {
          c.initInlineWidget({ url: calendlyUrl, parentElement: el });
          timer = window.setTimeout(() => setState((s) => (s === "idle" ? "ready" : s)), 20000);
        })
        .catch(() => setState("error"));
    };

    let io: IntersectionObserver | undefined;
    if (eager) start();
    else {
      io = new IntersectionObserver((en) => en.some((x) => x.isIntersecting) && (io?.disconnect(), start()), {
        rootMargin: "600px 0px",
      });
      io.observe(el);
    }
    return () => {
      io?.disconnect();
      window.removeEventListener("message", onMsg);
      clearTimeout(timer);
    };
  }, [eager]);

  if (!links.calendly) return null;

  return (
    <div className={`relative overflow-hidden bg-[#0b0b0f] ${className}`}>
      <div
        ref={box}
        className={`calendly-box h-full w-full transition-opacity duration-500 ${state === "ready" ? "opacity-100" : "opacity-0"}`}
      />
      {state !== "ready" && (
        <div className="absolute inset-0 grid place-items-center">
          <div className="flex flex-col items-center gap-4 text-sm text-muted">
            <span className="relative grid h-12 w-12 place-items-center">
              {state === "idle" && <span className="absolute inset-0 animate-ping rounded-full border border-accent/30" />}
              <CalendarDays className="h-6 w-6 text-accent" />
            </span>
            {state === "error" ? (
              <a href={links.calendly} target="_blank" rel="noopener noreferrer" className="text-fg underline underline-offset-4 hover:text-accent">
                {openLabel} ↗
              </a>
            ) : (
              <span className="font-mono text-[11px] uppercase tracking-[0.18em]">{loadingLabel}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
