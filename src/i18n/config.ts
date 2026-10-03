export const locales = ["en", "fr", "ar", "es", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const otherLocales = locales.filter((l) => l !== defaultLocale) as Exclude<Locale, "en">[];

export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  ar: "العربية",
  es: "Español",
  de: "Deutsch",
};

export const ogLocale: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  ar: "ar_MA",
  es: "es_ES",
  de: "de_DE",
};

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);
export const isRtl = (l: Locale) => l === "ar";

/** Localized path: English lives at the root, others under /fr, /ar, … */
export function lp(lang: Locale, path = "/") {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (lang === defaultLocale) return p;
  return p === "/" ? `/${lang}` : `/${lang}${p}`;
}

/** Strip a locale prefix from a pathname → { lang, rest } */
export function splitPath(pathname: string): { lang: Locale; rest: string } {
  const seg = pathname.split("/")[1] ?? "";
  if (isLocale(seg) && seg !== defaultLocale) {
    const rest = pathname.slice(seg.length + 1) || "/";
    return { lang: seg, rest };
  }
  return { lang: defaultLocale, rest: pathname || "/" };
}
