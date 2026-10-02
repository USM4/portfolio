"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

type Sample = { id: string; tab: string; tech: string; html: string; code: string; lines: number };

export function CodeTabs({ samples }: { samples: Sample[] }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const s = samples[active];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(s.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-line-strong bg-[#0a0a0d]/95 shadow-[0_50px_140px_-40px_rgba(0,0,0,0.9),0_0_0_1px_rgba(198,255,61,0.04)]">
      <div className="flex items-center justify-between gap-4 border-b border-line pl-2 pr-3">
        <div role="tablist" className="flex min-w-0 overflow-x-auto [scrollbar-width:none]">
          {samples.map((t, i) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`relative shrink-0 px-4 py-3.5 font-mono text-[12px] transition-colors ${
                i === active ? "text-fg" : "text-faint hover:text-muted"
              }`}
            >
              <span className={i === active ? "text-accent" : ""}>{t.tech}</span>
              {i === active && <span className="ml-2 hidden text-muted sm:inline">{t.tab}</span>}
              {i === active && <span className="absolute inset-x-3 bottom-0 h-px bg-accent shadow-[0_0_10px_#c6ff3d]" />}
            </button>
          ))}
        </div>
        <button
          onClick={copy}
          className="flex shrink-0 items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-accent/50 hover:text-accent"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="relative flex max-h-[34rem] overflow-auto py-5 text-[12.5px] leading-[1.7] sm:text-[13px]">
        <div aria-hidden className="select-none px-4 text-right font-mono text-faint/60">
          {Array.from({ length: s.lines }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <div className="code-body min-w-0 flex-1 pr-6 font-mono" dangerouslySetInnerHTML={{ __html: s.html }} />
      </div>
    </div>
  );
}
