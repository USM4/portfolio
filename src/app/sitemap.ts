import type { MetadataRoute } from "next";
import { caseStudies, profile } from "@/content/site";
import { locales, lp } from "@/i18n/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [{ path: "/", priority: 1 }, ...caseStudies.map((c) => ({ path: `/work/${c.slug}`, priority: 0.7 }))];
  return paths.flatMap(({ path, priority }) =>
    locales.map((l) => ({
      url: `${profile.domain}${lp(l, path)}`,
      priority: l === "en" ? priority : Math.round((priority - 0.1) * 10) / 10,
      alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${profile.domain}${lp(x, path)}`])) },
    })),
  );
}
