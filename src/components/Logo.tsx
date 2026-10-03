/**
 * USM4 brand - an M4 bayonet mark.
 * `Knife` is drawn horizontally on a 128×32 grid (point to the right).
 */

type KnifeProps = { blade?: "steel" | "lime"; draw?: boolean };

export function Knife({ blade = "steel", draw = false }: KnifeProps) {
  const d = draw ? "knife-draw" : undefined;
  return (
    <g className={d}>
      {/* blade - two bevel facets */}
      <path d="M46 11.6 H94 L124 16 H46 Z" fill={blade === "lime" ? "#d9ff7e" : "#ececf1"} />
      <path d="M46 16 H124 L103 20.4 H46 Z" fill={blade === "lime" ? "#c6ff3d" : "#a3a3ae"} />
      <path d="M50 14.6 H88" stroke={blade === "lime" ? "#5d7a12" : "#6c6c78"} strokeWidth="1.4" strokeLinecap="round" />
      {/* cutting edge + sharpened false edge */}
      {blade === "steel" && (
        <>
          <path d="M46 20.4 H103 L122.5 16.3" fill="none" stroke="#c6ff3d" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M80 11.6 H94 L122 15.7" fill="none" stroke="#c6ff3d" strokeWidth="0.9" strokeOpacity="0.7" strokeLinecap="round" />
        </>
      )}
      {/* cross-guard + muzzle ring */}
      <rect x="41.5" y="7.5" width="4.5" height="17" rx="1" fill="#d6d6de" />
      <circle cx="43.75" cy="4.6" r="3" fill="none" stroke="#d6d6de" strokeWidth="1.8" />
      {/* grip - stacked leather washers */}
      <rect x="10" y="11.2" width="31.5" height="9.6" rx="2" fill="#2b2b33" stroke="#55555f" strokeWidth="0.8" />
      <path
        d="M14 11.6V20.4M17.5 11.6V20.4M21 11.6V20.4M24.5 11.6V20.4M28 11.6V20.4M31.5 11.6V20.4M35 11.6V20.4M38.5 11.6V20.4"
        stroke="#55555f"
        strokeWidth="0.8"
      />
      {/* pommel */}
      <path d="M10 10.2 H5 Q3 10.2 3 12.2 V19.8 Q3 21.8 5 21.8 H10 Z" fill="#d6d6de" />
      <rect x="5" y="14.6" width="3.4" height="2.8" rx="0.6" fill="#07070a" />
    </g>
  );
}

/** Square brand mark: bayonet on a diagonal. */
export function BayonetMark({ className = "", framed = true }: { className?: string; framed?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      {framed && (
        <>
          <rect width="64" height="64" rx="14" fill="#07070a" />
          <rect x="1" y="1" width="62" height="62" rx="13" fill="none" stroke="#c6ff3d" strokeOpacity="0.3" strokeWidth="1.2" />
        </>
      )}
      <g transform="translate(32 32) rotate(-45) scale(0.6) translate(-63.5 -15)">
        <Knife />
      </g>
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────
 *  Sliced wordmark - the bayonet is driven through "USM4",
 *  cutting the letters in two along the blade.
 * ────────────────────────────────────────────────────────────── */

const ANGLE = -3.24; // blade angle (deg)
const y = (x: number) => 21 - ((x - 34) * 6) / 106; // cut line

export function Wordmark({
  id,
  className = "",
  tone = "solid",
  animate = false,
}: {
  id: string;
  className?: string;
  tone?: "solid" | "ghost";
  animate?: boolean;
}) {
  const top = `0,0 150,0 150,${y(150)} 0,${y(0)}`;
  const bottom = `0,${y(0)} 150,${y(150)} 150,36 0,36`;
  const ghost = tone === "ghost";
  const text = (
    <text
      x="42"
      y="29.5"
      fontFamily="var(--font-geist-sans), ui-sans-serif, system-ui"
      fontSize="28"
      fontWeight="800"
      letterSpacing="-0.6"
      fill={ghost ? "rgba(255,255,255,0.05)" : "#ededef"}
      stroke={ghost ? "rgba(255,255,255,0.22)" : "none"}
      strokeWidth={ghost ? 0.25 : 0}
    >
      USM<tspan fill={ghost ? "rgba(198,255,61,0.12)" : "#c6ff3d"}>4</tspan>
    </text>
  );
  return (
    <svg
      viewBox="0 0 152 36"
      className={`wordmark ${animate ? "wm-anim" : ""} overflow-visible ${className}`}
      role="img"
      aria-label="USM4"
    >
      <defs>
        <clipPath id={`${id}-t`}>
          <polygon points={top} />
        </clipPath>
        <clipPath id={`${id}-b`}>
          <polygon points={bottom} />
        </clipPath>
        <linearGradient id={`${id}-g`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#c6ff3d" stopOpacity="0.35" />
          <stop offset="0.75" stopColor="#c6ff3d" />
          <stop offset="1" stopColor="#f3ffd1" />
        </linearGradient>
      </defs>

      {/* the bayonet */}
      <g className="wm-knife">
        <g transform={`translate(34 21) rotate(${ANGLE})`}>
          <path d="M0 -2.2 L94 -1.4 L114 0 L94 1.6 L0 2.2 Z" fill={`url(#${id}-g)`} />
          <path className="wm-glint" d="M0 -0.3 L104 -0.1" stroke="#ffffff" strokeWidth="0.5" strokeLinecap="round" />
          <rect x="-3.2" y="-6.2" width="3.2" height="12.4" rx="0.8" fill="#d6d6de" />
          <circle cx="-1.6" cy="-8.6" r="2" fill="none" stroke="#d6d6de" strokeWidth="1.2" />
          <rect x="-24" y="-3.5" width="20.8" height="7" rx="1.5" fill="#26262d" stroke="#55555f" strokeWidth="0.6" />
          <path d="M-20.5 -3.1V3.1M-17 -3.1V3.1M-13.5 -3.1V3.1M-10 -3.1V3.1M-6.5 -3.1V3.1" stroke="#55555f" strokeWidth="0.6" />
          <path d="M-24 -4.2 H-27 Q-28.6 -4.2 -28.6 -2.6 V2.6 Q-28.6 4.2 -27 4.2 H-24 Z" fill="#d6d6de" />
        </g>
      </g>

      {/* the word, cut in two along the blade */}
      <g className="wm-top" clipPath={`url(#${id}-t)`}>
        {text}
      </g>
      <g className="wm-bottom" clipPath={`url(#${id}-b)`}>
        {text}
      </g>
    </svg>
  );
}

/** Nav / footer lockup: sliced wordmark + name. */
export function Brand({ id, sub, role = "Engineer" }: { id: string; sub?: string; role?: string }) {
  return (
    <span className="group/brand flex items-center gap-3.5">
      <span dir="ltr" className="flex">
        <Wordmark id={id} className="h-9 w-auto" animate />
      </span>
      {sub && (
        <span className="hidden border-s border-line ps-3.5 leading-tight sm:block">
          <span className="block text-[12px] font-medium text-fg/90">{sub}</span>
          <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-faint">{role}</span>
        </span>
      )}
    </span>
  );
}
