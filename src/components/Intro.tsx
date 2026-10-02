"use client";

import { useEffect, useState } from "react";
import { Wordmark } from "./Logo";

/** Brand intro — bayonet unsheathes, USM4 lands, curtain lifts. Once per session. */
export function Intro() {
  const [phase, setPhase] = useState<"show" | "hide" | "gone">("show");
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("usm4-intro") === "1";
      sessionStorage.setItem("usm4-intro", "1");
    } catch {
      /* storage unavailable */
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      const t = setTimeout(() => setPhase("gone"), 0);
      return () => clearTimeout(t);
    }
    const a = setTimeout(() => setPhase("hide"), 1900);
    const b = setTimeout(() => setPhase("gone"), 2600);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, []);
  if (phase === "gone") return null;
  return (
    <div
      aria-hidden
      data-intro
      className={`fixed inset-0 z-[100] grid place-items-center bg-bg transition-[opacity,transform] duration-700 ease-[cubic-bezier(.7,0,.2,1)] ${
        phase === "hide" ? "-translate-y-full opacity-90" : ""
      }`}
    >
      <div className="flex flex-col items-center">
        <Wordmark id="wm-intro" animate className="w-[min(80vw,560px)] drop-shadow-[0_0_50px_rgba(198,255,61,0.18)]" />
        <p className="intro-word mt-6 font-mono text-[11px] uppercase tracking-[0.5em] text-muted">Oussama Redoine</p>
        <div className="mt-6 h-px w-40 overflow-hidden bg-line">
          <div className="intro-bar h-px bg-accent" />
        </div>
      </div>
    </div>
  );
}
