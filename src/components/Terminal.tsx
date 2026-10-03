"use client";

import { useEffect, useRef, useState } from "react";
import { caseStudies, links, profile, stack, stages } from "@/content/site";
import { pulse } from "@/lib/stage";

type Line = { t: "in" | "out" | "ok" | "acc" | "err" | "dim"; s: string };

const banner: Line[] = [
  { t: "acc", s: "oussama-os v2.0 - interactive shell" },
  { t: "dim", s: "Type a command or tap one below. Try `deploy`." },
];

const quick = ["help", "whoami", "services", "work", "deploy", "hire"];

export function Terminal() {
  const [lines, setLines] = useState<Line[]>(banner);
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [hist, setHist] = useState<string[]>([]);
  const [hi, setHi] = useState(-1);
  const box = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    box.current?.scrollTo({ top: box.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  const print = (...l: Line[]) => setLines((p) => [...p, ...l]);
  const runRef = useRef<(c: string) => void>(() => {});
  useEffect(() => {
    const h = (e: Event) => runRef.current((e as CustomEvent<string>).detail);
    window.addEventListener("usm4:terminal", h);
    return () => window.removeEventListener("usm4:terminal", h);
  }, []);

  const deploy = async () => {
    setBusy(true);
    pulse.boost = 1;
    const steps: [string, string][] = [
      ["git push origin main", ""],
      ["› lint & typecheck", "1.8s"],
      ["› run test suite (unit + e2e)", "14.2s"],
      ["› docker build -t app:latest .", "22.6s"],
      ["› push image → registry", "6.1s"],
      ["› migrate database", "0.9s"],
      ["› rolling update · 0 downtime", "8.4s"],
      ["› health checks", "passing"],
    ];
    for (const [s, d] of steps) {
      await new Promise((r) => setTimeout(r, 380));
      print({ t: d ? "ok" : "in", s: d ? `✓ ${s.padEnd(34, " ")} ${d}` : `$ ${s}` });
      pulse.boost = 1;
    }
    await new Promise((r) => setTimeout(r, 400));
    print({ t: "acc", s: "▲ deployed → your-next-project.com is live" }, { t: "dim", s: "Want this for your product? Type `hire`." });
    setBusy(false);
  };

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    print({ t: "in", s: `$ ${raw}` });
    setHist((h) => [raw, ...h].slice(0, 30));
    setHi(-1);
    switch (cmd) {
      case "help":
        print(
          ...[
            ["whoami", "who's behind this"],
            ["services", "the 5 layers I build"],
            ["stack", "tools I ship with"],
            ["work", "selected projects"],
            ["deploy", "ship something (watch the background)"],
            ["hire", "start a project"],
            ["clear", "clean the screen"],
          ].map(([c, d]) => ({ t: "out" as const, s: `  ${c.padEnd(10, " ")} ${d}` })),
        );
        break;
      case "whoami":
        print(
          { t: "acc", s: `${profile.name} - ${profile.role}` },
          { t: "out", s: "Stores · Platforms · Infrastructure. Based in Morocco, working worldwide." },
          { t: "dim", s: "Trained at 1337 (42 Network). Ships end to end." },
        );
        break;
      case "services":
      case "ls":
        print(...stages.map((s) => ({ t: "out" as const, s: `  ${s.code}  ${s.name.padEnd(12, " ")} ${s.title}` })));
        break;
      case "stack":
        print(...stack.map((g) => ({ t: "out" as const, s: `  ${g.group.padEnd(10, " ")} ${g.items.join(", ")}` })));
        break;
      case "work":
      case "projects":
        print(
          ...caseStudies.map((c) => ({ t: "out" as const, s: `  [${c.kind.padEnd(9, " ")}] ${c.title}` })),
          { t: "dim", s: "Scroll up to open any case study." },
        );
        break;
      case "deploy":
        if (!busy) void deploy();
        break;
      case "hire":
      case "contact":
      case "sudo hire oussama":
        print(
          { t: "ok", s: cmd.startsWith("sudo") ? "✓ permission granted. good choice." : "✓ opening a channel…" },
          { t: "out", s: `  email     ${profile.email}` },
          { t: "out", s: `  whatsapp  +${profile.whatsapp}` },
          ...(links.upwork ? [{ t: "out" as const, s: `  upwork    ${links.upwork}` }] : []),
        );
        setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 900);
        break;
      case "clear":
        setLines(banner);
        break;
      case "coffee":
        print({ t: "out", s: "brewing… fuel level: production-ready." });
        break;
      case "rm -rf /":
      case "sudo rm -rf /":
        print({ t: "err", s: "nice try. backups are automated." });
        break;
      default:
        print({ t: "err", s: `command not found: ${cmd} - try \`help\`` });
    }
  };

  useEffect(() => {
    runRef.current = run;
  });

  const color: Record<Line["t"], string> = {
    in: "text-fg",
    out: "text-fg/75",
    ok: "text-accent",
    acc: "text-accent",
    err: "text-[#ff7a7a]",
    dim: "text-faint",
  };

  return (
    <div
      className="overflow-hidden rounded-xl border border-line-strong bg-[#0a0a0d]/90 shadow-[0_40px_140px_-30px_rgba(198,255,61,0.18)] backdrop-blur-xl"
      onClick={() => input.current?.focus()}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
        </div>
        <span className="font-mono text-[11px] text-faint">oussama@ored1 - zsh</span>
        <span className={`font-mono text-[11px] ${busy ? "text-accent" : "text-faint"}`}>{busy ? "● deploying" : "● idle"}</span>
      </div>
      <div ref={box} className="h-[22rem] overflow-y-auto px-5 py-4 font-mono text-[12.5px] leading-6 sm:text-[13px]">
        {lines.map((l, i) => (
          <pre key={i} className={`whitespace-pre-wrap break-words ${color[l.t]}`}>
            {l.s}
          </pre>
        ))}
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            run(value);
            setValue("");
          }}
        >
          <span className="text-accent">❯</span>
          <input
            ref={input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp" && hist.length) {
                e.preventDefault();
                const n = Math.min(hi + 1, hist.length - 1);
                setHi(n);
                setValue(hist[n]);
              }
              if (e.key === "ArrowDown") {
                e.preventDefault();
                const n = Math.max(hi - 1, -1);
                setHi(n);
                setValue(n === -1 ? "" : hist[n]);
              }
            }}
            disabled={busy}
            aria-label="Terminal command"
            autoComplete="off"
            spellCheck={false}
            className="flex-1 bg-transparent text-fg caret-accent outline-none placeholder:text-faint"
            placeholder={busy ? "" : "type a command…"}
          />
        </form>
      </div>
      <div className="flex flex-wrap gap-2 border-t border-line px-4 py-3">
        {quick.map((q) => (
          <button
            key={q}
            type="button"
            disabled={busy}
            onClick={(e) => {
              e.stopPropagation();
              run(q);
            }}
            className="rounded-[4px] border border-line px-2.5 py-1 font-mono text-[11.5px] text-muted transition-colors hover:border-accent/50 hover:text-accent disabled:opacity-40"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
