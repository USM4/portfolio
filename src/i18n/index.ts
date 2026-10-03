import type { Locale } from "./config";
import { en, type Dict } from "./en";
import { fr } from "./fr";
import { ar } from "./ar";
import { es } from "./es";
import { de } from "./de";

export type { Dict };

/** Deep-partial translation shape: same structure as English, any string allowed. */
export type Translation<T = Dict> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? Translation<U>[]
    : T extends object
      ? { [K in keyof T]?: Translation<T[K]> }
      : T;

function merge<T>(base: T, over: unknown): T {
  if (over === undefined || over === null) return base;
  if (Array.isArray(base)) {
    if (!Array.isArray(over)) return base;
    if (base.every((x) => typeof x !== "object" || x === null)) return over as T;
    return base.map((b, i) => merge(b, over[i])) as T;
  }
  if (base && typeof base === "object") {
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const [k, v] of Object.entries(over as Record<string, unknown>)) {
      out[k] = merge((base as Record<string, unknown>)[k], v);
    }
    return out as T;
  }
  return over as T;
}

const translations: Record<Exclude<Locale, "en">, Translation> = { fr, ar, es, de };
const cache = new Map<Locale, Dict>();

export function getDict(lang: Locale): Dict {
  if (lang === "en") return en;
  if (!cache.has(lang)) cache.set(lang, merge(en, translations[lang]));
  return cache.get(lang)!;
}
