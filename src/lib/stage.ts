/**
 * Scroll → continuous "stage" value that drives the 3D camera and the HUD.
 *  -1 = hero overview · 0..4 = pipeline stations · 5 = final pull-back.
 * Elements opt in with data-stage="<n>". Camera rests while a panel is centered.
 */
const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export function readStage(): number {
  if (typeof window === "undefined") return -1;
  const els = Array.from(document.querySelectorAll<HTMLElement>("[data-stage]"));
  if (!els.length) return -1;
  const mid = window.innerHeight * 0.5;
  const pts = els
    .map((el) => {
      const r = el.getBoundingClientRect();
      return { s: Number(el.dataset.stage), c: r.top + Math.min(r.height, window.innerHeight) / 2 };
    })
    .sort((a, b) => a.s - b.s);
  if (mid <= pts[0].c) return pts[0].s;
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i],
      b = pts[i + 1];
    if (mid >= a.c && mid < b.c) return a.s + (b.s - a.s) * smooth(0.3, 0.7, (mid - a.c) / (b.c - a.c));
  }
  return pts[pts.length - 1].s;
}

/** Tiny event bus so the terminal can "deploy" and speed up the 3D traffic. */
export const pulse = { boost: 0 };
