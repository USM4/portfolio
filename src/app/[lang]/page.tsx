import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/HomePage";
import { isLocale, otherLocales } from "@/i18n/config";
import { homeMetadata } from "@/lib/meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return otherLocales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? homeMetadata(lang) : {};
}

export default async function LocalizedHome({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang) || lang === "en") notFound();
  return <HomePage lang={lang} />;
}
