import type { MetadataRoute } from "next";
import { profile } from "@/content/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `USM4 — ${profile.name}`,
    short_name: "USM4",
    description: "Commerce stores, web platforms and cloud infrastructure — engineered end to end.",
    start_url: "/",
    display: "standalone",
    background_color: "#07070a",
    theme_color: "#07070a",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
