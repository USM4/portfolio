import type { Metadata } from "next";
import { profile } from "@/content/site";
import { getDict } from "@/i18n";
import { locales, lp, ogLocale, type Locale } from "@/i18n/config";

/** hreflang alternates for a path that exists in every language. */
export function alternates(lang: Locale, path = "/"): Metadata["alternates"] {
  return {
    canonical: lp(lang, path),
    languages: Object.fromEntries([...locales.map((l) => [l, lp(l, path)]), ["x-default", lp("en", path)]]),
  };
}

export function homeMetadata(lang: Locale): Metadata {
  const t = getDict(lang);
  return {
    title: { absolute: t.meta.title },
    description: t.meta.description,
    alternates: alternates(lang),
    openGraph: {
      type: "website",
      url: `${profile.domain}${lp(lang, "/")}`,
      title: t.meta.title,
      description: t.meta.description,
      siteName: profile.name,
      locale: ogLocale[lang],
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
  };
}

export function caseMetadata(lang: Locale, slug: string): Metadata {
  const t = getDict(lang);
  const c = t.caseStudies.find((x) => x.slug === slug);
  if (!c) return {};
  return {
    title: c.title,
    description: c.summary,
    alternates: alternates(lang, `/work/${slug}`),
    openGraph: { title: c.title, description: c.summary, locale: ogLocale[lang] },
  };
}
