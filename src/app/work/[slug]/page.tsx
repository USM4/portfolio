import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies } from "@/content/site";
import { CaseStudyView } from "@/components/CaseStudyView";
import { caseMetadata } from "@/lib/meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return caseMetadata("en", slug);
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  if (!caseStudies.some((c) => c.slug === slug)) notFound();
  return <CaseStudyView lang="en" slug={slug} />;
}
