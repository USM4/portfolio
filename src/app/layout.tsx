import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { profile, links } from "@/content/site";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Intro } from "@/components/Intro";
import "./globals.css";


const title = `${profile.name} - E-commerce, Full-Stack & DevOps Engineer`;
const description =
  "I build commerce systems end to end: WooCommerce & Shopify stores, large web platforms with Laravel, NestJS and Next.js, and Docker-based cloud infrastructure.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.domain),
  title: { default: title, template: `%s - USM4 · ${profile.name}` },
  description,
  keywords: [
    "WooCommerce developer",
    "Shopify developer",
    "WordPress developer",
    "Laravel developer",
    "Next.js developer",
    "Google Merchant Center",
    "freelance web developer Morocco",
  ],
  authors: [{ name: profile.name, url: profile.domain }],
  openGraph: {
    type: "website",
    url: profile.domain,
    title,
    description,
    siteName: profile.name,
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = { themeColor: "#07070a" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: profile.domain,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressCountry: "MA" },
  sameAs: Object.values(links).filter(Boolean),
  knowsAbout: ["WooCommerce", "Shopify", "WordPress", "Laravel", "Next.js", "PostgreSQL", "Docker"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Intro />
        <Nav />
        <main>{children}</main>
        <Footer />
        <Reveal />
      </body>
    </html>
  );
}
