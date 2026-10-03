"use client";

import { useEffect } from "react";

/** Keeps <html lang/dir> in sync during client-side navigation between languages. */
export function HtmlLang({ lang, dir }: { lang: string; dir: "ltr" | "rtl" }) {
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);
  return null;
}
