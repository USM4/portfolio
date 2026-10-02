"use client";

import { useEffect, useState } from "react";
import { stages } from "@/content/site";
import { readStage } from "@/lib/stage";

/** Game-style progress HUD for the 3D pipeline (desktop). */
export function Hud() {
  const [s, setS] = useState(-1);
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      setS(readStage());
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  const visible = s > -0.6 && s < 4.6;
  const active = Math.round(s);
  return (
    <aside
      className={`fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 transition-opacity duration-500 lg:block ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-label="Pipeline progress"
    >
      <div className="relative flex flex-col gap-5 rounded-lg border border-line bg-bg/60 px-4 py-5 backdrop-blur-md">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">Pipeline</span>
        {stages.map((st, i) => (
          <a key={st.id} href={`#${st.id}`} className="group flex items-center gap-3">
            <span
              className={`h-2 w-2 rotate-45 border transition-all duration-300 ${
                i === active
                  ? "border-accent bg-accent shadow-[0_0_12px_#c6ff3d]"
                  : i < active
                    ? "border-accent/60 bg-accent/30"
                    : "border-line-strong"
              }`}
            />
            <span
              className={`font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                i === active ? "text-fg" : "text-faint group-hover:text-muted"
              }`}
            >
              {st.code} {st.name}
            </span>
          </a>
        ))}
        <div className="mt-1 h-px w-full bg-line">
          <div
            className="h-px bg-accent transition-[width] duration-200"
            style={{ width: `${Math.max(0, Math.min(1, (s + 0.5) / 5)) * 100}%` }}
          />
        </div>
      </div>
    </aside>
  );
}
