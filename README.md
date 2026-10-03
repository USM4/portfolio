# USM4 - Oussama Redoine

Personal portfolio of **Oussama Redoine (USM4)** - e-commerce, full-stack & DevOps engineer.
Live: **https://ored1.me**

Built with Next.js 16 (App Router, static export) · TypeScript · Tailwind CSS v4 · React Three Fiber · Shiki.

## Highlights
- **The Pipeline** - scroll-driven 3D system (Storefront → Checkout → Backend → Data → Cloud) with live order traffic.
- **Interactive console** - a playable terminal (`help`, `deploy`, `hire`…).
- **⌘K command menu**, scroll-spy navbar, sliced USM4 bayonet wordmark, code showcase, case-study pages.

## Develop
```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build      # static site in ./out
npm run preview    # serve ./out locally
```
Requires Node ≥ 20.9.

## Content
All copy lives in `src/content/site.ts` (profile, links, stats, pipeline stages, case studies, principles, engagements, testimonials, code samples).
- Photo: `public/me.jpg` · Résumé: `public/Oussama_Redoine_Resume.pdf` · Favicon: `public/icon.svg`
- Upwork / Fiverr: set `links.upwork` / `links.fiverr` - the "Hire me" buttons switch automatically.
- Testimonials stay hidden until the array has entries.

## Structure
```
src/
  app/            routes: /, /work/[slug], sitemap, robots, OG image
  components/     sections, Nav, CommandMenu, Terminal, Logo …
  components/three/  3D scene (Scene.tsx) + client loader
  content/site.ts all site content
  lib/            scroll-stage mapping, nav config, code highlighter
```

## Deploy (Vercel)
Import the repo in Vercel → framework **Next.js** → defaults (build `next build`). No env vars needed.
Add the domain `ored1.me` under Project → Settings → Domains.

Previous version (Vite/React, 2024) is tagged **`v1`**.
