"use client";

import { useEffect, useRef, useState } from "react";

/** Animates the leading number of a value like "30+" or "24h" once, when visible. */
export function CountUp({ value }: { value: string }) {
  const match = /^(\d+)(.*)$/.exec(value);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : value;
  const [n, setN] = useState(target);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !target || done.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let delay = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || done.current) return;
        done.current = true;
        io.disconnect();
        // wait for the brand intro to lift before counting
        const wait = document.querySelector("[data-intro]") ? 2300 : 150;
        setN(0);
        delay = window.setTimeout(() => {
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / 1600);
            setN(Math.round(target * (1 - Math.pow(1 - p, 4))));
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }, wait);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(delay);
      cancelAnimationFrame(raf);
    };
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      {match ? n : ""}
      {suffix}
    </span>
  );
}
