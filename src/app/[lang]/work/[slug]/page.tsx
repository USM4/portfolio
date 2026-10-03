import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies } from "@/content/site";
import { CaseStudyView } from "@/components/CaseStudyView";
import { isLocale, otherLocales } from "@/i18n/config";
import { caseMetadata } from "@/lib/meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return otherLocales.flatMap((lang) => caseStudies.map((c) => ({ lang, slug: c.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  return isLocale(lang) ? caseMetadata(lang, slug) : {};
}

export default async function LocalizedCaseStudy({ params }: PageProps<"/[lang]/work/[slug]">) {
  const { lang, slug } = await params;
  if (!isLocale(lang) || lang === "en" || !caseStudies.some((c) => c.slug === slug)) notFound();
  return <CaseStudyView lang={lang} slug={slug} />;
}
