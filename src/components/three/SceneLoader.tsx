"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

/** Fixed full-screen WebGL backdrop. Loads after hydration, fades in. */
export function SceneLoader({ rtl = false }: { rtl?: boolean }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 250);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 -z-10 transition-opacity duration-[1500ms] ${ready ? "opacity-100" : "opacity-0"}`}
    >
      <div className="pointer-events-auto h-full w-full">
        <Scene rtl={rtl} />
      </div>
    </div>
  );
}
