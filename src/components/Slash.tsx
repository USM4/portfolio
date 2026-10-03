"use client";

import { useEffect } from "react";

/** Bayonet slash: a quick lime cut where the visitor clicks (mouse only). */
export function Slash() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      const el = document.createElement("span");
      el.className = "slash";
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      el.style.setProperty("--a", `${-30 - Math.random() * 25}deg`);
      document.body.appendChild(el);
      el.addEventListener("animationend", () => el.remove(), { once: true });
    };
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);
  return null;
}
