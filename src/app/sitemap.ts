import type { MetadataRoute } from "next";
import { caseStudies, profile } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: profile.domain, priority: 1 },
    ...caseStudies.map((c) => ({ url: `${profile.domain}/work/${c.slug}`, priority: 0.7 })),
  ];
}
