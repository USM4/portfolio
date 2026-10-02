import type { CaseStudy } from "@/content/site";

const L = "#c6ff3d";
const D = "rgba(255,255,255,0.14)";
const D2 = "rgba(255,255,255,0.06)";

/** Generative line-art cover per project type (no screenshots needed). */
export function CardArt({
  kind,
  className = "",
  fit = "slice",
}: {
  kind: CaseStudy["kind"];
  className?: string;
  fit?: "slice" | "meet";
}) {
  return (
    <svg viewBox="0 0 400 220" className={className} preserveAspectRatio={`xMidYMid ${fit}`} aria-hidden>
      <defs>
        <pattern id={`g-${kind}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke={D2} strokeWidth="1" />
        </pattern>
        <radialGradient id={`r-${kind}`} cx="75%" cy="10%" r="70%">
          <stop offset="0" stopColor={L} stopOpacity="0.16" />
          <stop offset="1" stopColor={L} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="220" fill={`url(#g-${kind})`} />
      <rect width="400" height="220" fill={`url(#r-${kind})`} />
      {art[kind]}
    </svg>
  );
}

const art: Record<CaseStudy["kind"], React.ReactNode> = {
  Commerce: (
    <g>
      {[0, 1, 2].map((s) => (
        <g key={s} transform={`translate(${70 + s * 26} ${40 + s * 16})`} opacity={0.35 + s * 0.3}>
          <rect width="200" height="128" rx="6" fill="#0d0d11" stroke={s === 2 ? L : D} />
          <rect x="12" y="12" width="40" height="5" fill={s === 2 ? L : D} />
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(${12 + i * 46} 30)`}>
              <rect width="38" height="44" rx="3" fill="none" stroke={D} />
              <rect y="52" width="30" height="4" fill={D} />
              <rect y="62" width="16" height="4" fill={s === 2 ? L : D} />
            </g>
          ))}
        </g>
      ))}
    </g>
  ),
  Platform: (
    <g>
      {[
        [115, 62, "UI"],
        [115, 160, "AUTH"],
        [200, 110, "API"],
        [285, 62, "DB"],
        [285, 160, "QUEUE"],
      ].map(([x, y, t]) => (
        <g key={t as string}>
          <line x1={200} y1={110} x2={x as number} y2={y as number} stroke={t === "API" ? "none" : L} strokeOpacity="0.5" strokeDasharray="3 4" />
        </g>
      ))}
      {[
        [115, 62, "UI"],
        [115, 160, "AUTH"],
        [200, 110, "API"],
        [285, 62, "DB"],
        [285, 160, "QUEUE"],
      ].map(([x, y, t]) => (
        <g key={`n${t}`} transform={`translate(${(x as number) - 34} ${(y as number) - 16})`}>
          <rect width="68" height="32" rx="4" fill="#0d0d11" stroke={t === "API" ? L : D} />
          <text x="34" y="20" textAnchor="middle" fontFamily="monospace" fontSize="10" fill={t === "API" ? L : "#9a9aa5"}>
            {t}
          </text>
        </g>
      ))}
    </g>
  ),
  DevOps: (
    <g transform="translate(110 30)">
      {Array.from({ length: 24 }).map((_, i) => {
        const x = (i % 6) * 32,
          y = Math.floor(i / 6) * 38;
        const on = [2, 7, 9, 14, 19, 22].includes(i);
        return <rect key={i} x={x} y={y} width="24" height="28" rx="3" fill={on ? L : "#0d0d11"} fillOpacity={on ? 0.85 : 1} stroke={on ? L : D} />;
      })}
      <rect x="-10" y="-10" width="200" height="170" rx="8" fill="none" stroke={D} strokeDasharray="4 4" />
    </g>
  ),
  "Real-time": (
    <g>
      {[0, 1, 2].map((k) => (
        <path
          key={k}
          d={`M0 ${110 + k * 6} ${Array.from({ length: 41 })
            .map((_, i) => `L${i * 10} ${110 + Math.sin(i * 0.55 + k) * (40 - k * 12) * Math.sin(i / 13)}`)
            .join(" ")}`}
          fill="none"
          stroke={k === 0 ? L : D}
          strokeWidth={k === 0 ? 2 : 1}
        />
      ))}
      <circle cx="200" cy="110" r="5" fill={L} />
    </g>
  ),
  AI: (
    <g>
      {[0, 1, 2, 3].map((col) =>
        Array.from({ length: col === 3 ? 2 : 4 - (col % 2) }).map((_, row, arr) => {
          const x = 90 + col * 75;
          const y = 110 + (row - (arr.length - 1) / 2) * 42;
          return (
            <g key={`${col}-${row}`}>
              {col < 3 &&
                Array.from({ length: col === 2 ? 2 : 4 - ((col + 1) % 2) }).map((__, r2, a2) => (
                  <line key={r2} x1={x} y1={y} x2={x + 75} y2={110 + (r2 - (a2.length - 1) / 2) * 42} stroke={L} strokeOpacity="0.18" />
                ))}
              <circle cx={x} cy={y} r="7" fill="#0d0d11" stroke={col === 3 ? L : D} strokeWidth="1.5" />
              {col === 3 && <circle cx={x} cy={y} r="3" fill={L} />}
            </g>
          );
        }),
      )}
    </g>
  ),
  Mobile: (
    <g>
      {[-1, 0, 1].map((k) => (
        <g key={k} transform={`translate(${170 + k * 90} ${k === 0 ? 22 : 40}) rotate(${k * 8})`} opacity={k === 0 ? 1 : 0.4}>
          <rect width="62" height="130" rx="10" fill="#0d0d11" stroke={k === 0 ? L : D} />
          <rect x="22" y="8" width="18" height="3" rx="1.5" fill={D} />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x="9" y={24 + i * 22} width={i === 1 ? 44 : 34} height="12" rx="2" fill={i === 1 && k === 0 ? L : D2} stroke={D} />
          ))}
        </g>
      ))}
    </g>
  ),
  Systems: (
    <g fontFamily="monospace" fontSize="11">
      <rect x="60" y="30" width="280" height="160" rx="6" fill="#0d0d11" stroke={D} />
      {["$ ./ircserv 6667 ****", "› listening on :6667", "› client#12 JOIN #ops", "› client#31 JOIN #ops", "› poll() 128 fds ready", "› client#12 KICK #ops"].map((t, i) => (
        <text key={t} x="76" y={58 + i * 20} fill={i === 0 ? L : "#8b8b94"}>
          {t}
        </text>
      ))}
    </g>
  ),
};
