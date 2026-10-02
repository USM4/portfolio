"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** CLI-style line (à la `npm i -g @nestjs/cli`) that copies a value. */
export function CopyCommand({ command, value, hint }: { command: string; value: string; hint: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setOk(true);
          setTimeout(() => setOk(false), 1800);
        } catch {
          /* ignore */
        }
      }}
      className="group flex w-full max-w-xl items-center justify-between gap-4 rounded-xl border border-line-strong bg-[#0a0a0d]/90 px-5 py-4 text-left font-mono text-sm backdrop-blur transition-colors hover:border-accent/50"
      aria-label={`Copy ${value}`}
    >
      <span className="truncate">
        <span className="text-accent">$</span> <span className="text-fg">{command}</span>
      </span>
      <span className="flex shrink-0 items-center gap-1.5 text-[11px] text-muted group-hover:text-accent">
        {ok ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {ok ? "copied" : hint}
      </span>
    </button>
  );
}
