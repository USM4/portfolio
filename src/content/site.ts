// ─────────────────────────────────────────────────────────────
//  All portfolio copy lives here. Edit this file, not the components.
//  Values marked TODO need your input before going live.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Oussama Redoine",
  firstName: "Oussama",
  initials: "OR",
  role: "Commerce & Systems Engineer",
  location: "Morocco",
  timezone: "GMT+1",
  domain: "https://ored1.me",
  email: "oussamaredoine06@gmail.com",
  whatsapp: "212775827999",
  // Drop a professional headshot in /public and set e.g. "/me.jpg". null = monogram.
  photo: "/me.jpg" as string | null,
  resume: "/Oussama_Redoine_Resume.pdf",
  available: true,
};

export const links = {
  upwork: "", // TODO: your Upwork profile URL
  fiverr: "", // TODO: your Fiverr profile URL
  calendly: "https://calendly.com/usm4/30min", // your Calendly event URL
  github: "https://github.com/USM4",
  linkedin: "https://www.linkedin.com/in/oussama-redoine-406828210",
};

export const hero = {
  eyebrow: "Full-stack engineer · E-commerce · DevOps",
  title: ["I build commerce", "systems. End to end."],
  lead:
    "High-converting online stores, large-scale web platforms and the cloud infrastructure that runs them - architected, built, deployed and scaled by one engineer.",
};

// TODO: confirm these numbers before publishing.
export const stats = [
  { value: "30+", label: "E-commerce stores shipped" },
  { value: "8", label: "Industries served" },
  { value: "5", label: "Layers - storefront to cloud" },
  { value: "24h", label: "Response time" },
];

export type Stage = {
  id: string;
  code: string;
  name: string;
  title: string;
  lead: string;
  points: string[];
  tech: string[];
};

/** The five stations of the 3D pipeline - in scroll order. */
export const stages: Stage[] = [
  {
    id: "storefront",
    code: "01",
    name: "Storefront",
    title: "Stores built to sell.",
    lead:
      "Complete e-commerce stores from blank install to launch - brand, design system, catalog and every page a store needs to be trusted.",
    points: [
      "Custom WooCommerce & Shopify storefronts",
      "Brand identity and design systems per store",
      "Large catalogs with automated, AI-assisted imports",
      "Google Shopping & Merchant Center ready at launch",
    ],
    tech: ["WooCommerce", "Shopify", "WordPress", "Elementor", "WoodMart"],
  },
  {
    id: "checkout",
    code: "02",
    name: "Checkout",
    title: "Payments that clear.",
    lead:
      "The money path, engineered properly - gateways, checkout flows, order lifecycle and the emails that follow every purchase.",
    points: [
      "Payment gateway integration & checkout optimization",
      "Order lifecycle, notifications & transactional email",
      "B2B pricing tiers and wholesale ordering",
      "Shopify API product & inventory sync",
    ],
    tech: ["Payment gateways", "Shopify API", "WooCommerce", "Webhooks"],
  },
  {
    id: "backend",
    code: "03",
    name: "Backend",
    title: "Platforms that scale.",
    lead:
      "Large web applications with clean architecture - multi-role platforms, real-time features and AI services, built to grow.",
    points: [
      "Laravel, NestJS, Django & FastAPI backends",
      "REST APIs, WebSockets and event broadcasting",
      "Auth, RBAC, JWT & OAuth - security first",
      "Microservices and AI integrations (Gemini)",
    ],
    tech: ["Laravel", "NestJS", "Django", "FastAPI", "Next.js", "TypeScript"],
  },
  {
    id: "data",
    code: "04",
    name: "Data",
    title: "Data that holds.",
    lead:
      "Schemas designed around how the business actually works - so the app stays fast and correct as it grows.",
    points: [
      "PostgreSQL schema design & migrations",
      "Multi-vendor and multi-tenant data models",
      "Redis caching and queue-backed workloads",
      "Data pipelines, imports and integrity audits",
    ],
    tech: ["PostgreSQL", "MySQL / MariaDB", "Redis", "Prisma"],
  },
  {
    id: "cloud",
    code: "05",
    name: "Cloud",
    title: "Infrastructure that stays up.",
    lead:
      "Containerized, secured and automated - I deploy and run what I build, and move live production sites without losing a byte.",
    points: [
      "Docker & Docker Compose environments",
      "NGINX, TLS, Linux VPS hardening & operations",
      "CI/CD pipelines and automated jobs",
      "Live-site migrations, DNS & SSL across hosts",
    ],
    tech: ["Docker", "NGINX", "Linux", "CI/CD", "AWS", "Plesk / HestiaCP"],
  },
];

export type CaseStudy = {
  slug: string;
  title: string;
  kind: "Commerce" | "Platform" | "DevOps" | "Real-time" | "AI" | "Mobile" | "Systems";
  visibility: string;
  year?: string;
  summary: string;
  challenge: string;
  work: string[];
  outcome: string;
  stack: string[];
  github?: string;
  size: "xl" | "lg" | "md";
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "commerce-fleet",
    title: "Multi-Brand Commerce Fleet",
    kind: "Commerce",
    visibility: "Client work · anonymized",
    size: "xl",
    summary:
      "A fleet of independent, fully-branded online stores - all running on one reusable commerce system I designed.",
    challenge:
      "Launch many separate stores fast. Each needs its own brand and identity, but the same reliable catalog, checkout and compliance layer - without copy-paste drift.",
    work: [
      "Architected a reusable WooCommerce store system: shared category tree, product schema and page structure.",
      "Designed a distinct brand identity per store - logo direction, palette, homepage and design system.",
      "Built an 11-page legal & trust suite (shipping, returns, warranty, billing, privacy, security…) restyled per brand.",
      "Automated catalog creation with an AI ingestion pipeline producing import-ready product data.",
      "Shipped every store Google Shopping-ready at launch.",
    ],
    outcome:
      "New branded stores go from blank server to launch-ready on a tested system - consistent quality, fraction of the time.",
    stack: ["WooCommerce", "WordPress", "Elementor", "Python", "Gemini AI", "Merchant Center"],
  },
  {
    slug: "wholesale-hub",
    title: "Wholesale Hub - B2B Marketplace",
    kind: "Platform",
    visibility: "Product build",
    size: "lg",
    summary:
      "A two-sided B2B platform connecting store owners with wholesalers - Shopify sync, tiered pricing and real-time orders.",
    challenge:
      "Store owners and wholesalers need separate experiences on one platform, live catalog sync from Shopify and wholesale-specific pricing.",
    work: [
      "Architected a dual-access platform with a Laravel API and React / Next.js frontend.",
      "Integrated the Shopify API for store connection and automatic product & inventory sync.",
      "Real-time order tracking, notifications and activity logs over WebSockets & event broadcasting.",
      "Secure auth: email verification, password reset, JWT token management.",
      "PostgreSQL model for multi-vendor catalogs, collection visibility and pricing tiers.",
      "Orchestrated Laravel, Next.js, PostgreSQL and Redis with Docker Compose.",
    ],
    outcome: "A complete B2B ordering flow - from connecting a Shopify store to placing tiered wholesale orders.",
    stack: ["Laravel", "Next.js", "PostgreSQL", "Redis", "Shopify API", "WebSockets", "Docker"],
  },
  {
    slug: "dental-lab-platform",
    title: "Dental Lab Operations Platform",
    kind: "Platform",
    visibility: "Client project",
    size: "lg",
    summary:
      "A custom operations platform for a dental laboratory - cases, work types, staff roles and invoicing in one system.",
    challenge:
      "The lab's workflow didn't fit any off-the-shelf software. It needed a purpose-built platform with a data model that mirrors the real order lifecycle.",
    work: [
      "Built the platform on a Laravel backend, PostgreSQL database and Next.js frontend.",
      "Designed and audited the schema: role model, order ↔ work-type relations, invoice financials.",
      "Structured the domain around the lab's real case lifecycle so new modules plug in cleanly.",
    ],
    outcome: "A purpose-built system the business runs on - modelled on how the lab actually works.",
    stack: ["Laravel", "PostgreSQL", "Next.js", "Docker"],
  },
  {
    slug: "production-infrastructure",
    title: "Production Web Infrastructure",
    kind: "DevOps",
    visibility: "Client & personal work",
    size: "md",
    summary:
      "Containerized hosting stacks and live VPS operations - TLS, isolation, automation and production migrations.",
    challenge:
      "Run commerce sites on infrastructure that is secure, reproducible and movable - and migrate live stores between hosts without data loss.",
    work: [
      "Built a hardened container stack from scratch: NGINX (TLS), PHP-FPM and MariaDB in isolated networks with persistent volumes.",
      "Migrated live production stores across Hostinger, Plesk and HestiaCP VPS environments over SSH / rsync.",
      "Resolved production DNS failures, PHP-FPM outages and SSL issuance under pressure.",
      "Automated recurring maintenance with server-side scripts and cron.",
    ],
    outcome: "Reproducible stacks and stores running on their new servers with valid TLS and working DNS.",
    stack: ["Docker", "NGINX", "Linux", "MariaDB", "SSH / rsync", "Plesk", "HestiaCP"],
  },
  {
    slug: "smash-pong",
    title: "Real-time Multiplayer Platform",
    kind: "Real-time",
    visibility: "1337 / 42 Network",
    size: "md",
    summary: "A full-stack multiplayer game platform - live gameplay, social graph, notifications and OAuth.",
    challenge: "Real-time gameplay and social features in one SPA, containerized for deployment.",
    work: [
      "React SPA with a Django REST Framework backend.",
      "Real-time multiplayer over Django Channels & WebSockets.",
      "JWT + OAuth authentication, friendships, requests and notifications.",
      "PostgreSQL via Django ORM, fully Dockerized.",
    ],
    outcome: "A complete real-time web platform shipped as a team.",
    stack: ["React", "Django", "WebSockets", "PostgreSQL", "Docker"],
    github: "https://github.com/USM4/ft_transcendence",
  },
  {
    slug: "brand-guard",
    title: "Brand Guard - AI Compliance Engine",
    kind: "AI",
    visibility: "Product build",
    size: "md",
    summary: "Extracts brand rules from PDF guidelines with AI and audits live websites for violations.",
    challenge: "Brand guidelines live in PDFs; websites drift. Manual compliance checks are slow and inconsistent.",
    work: [
      "React + TypeScript frontend for real-time PDF processing and asset visualization.",
      "FastAPI microservice with PyMuPDF extracting fonts, colors, logos and icons.",
      "Gemini AI separates true brand assets from decorative noise.",
      "Crawler audits live sites against the extracted rules. Dockerized services.",
    ],
    outcome: "A brand PDF in, an automated website compliance audit out.",
    stack: ["React", "TypeScript", "FastAPI", "Python", "Gemini AI", "Docker"],
  },
  {
    slug: "ai-catalog-pipeline",
    title: "AI Catalog Ingestion Pipeline",
    kind: "AI",
    visibility: "Internal tool",
    size: "md",
    summary: "Turns supplier product pages into clean, import-ready store catalogs using Gemini.",
    challenge: "Building large catalogs by hand is slow and error-prone.",
    work: [
      "Python scraper extracting product data from any URL.",
      "Gemini structures raw pages into WooCommerce-compatible fields.",
      "Automated cleanup: deduplication, pricing rules, status and category mapping.",
    ],
    outcome: "Catalog building went from manual data entry to reviewing a generated import.",
    stack: ["Python", "Gemini API", "WooCommerce"],
  },
  {
    slug: "music-room",
    title: "Music Room - Mobile Collaboration App",
    kind: "Mobile",
    visibility: "In progress · team of 3",
    size: "md",
    summary: "A mobile app for collaborative music - track voting, playback delegation and shared playlists.",
    challenge: "Real-time collaborative features across mobile clients with secure identity and paid tiers.",
    work: [
      "Owner of Identity & Access - authentication and authorization across backend and mobile.",
      "Owner of the subscription system - backend and mobile.",
      "Team scope covers all three services: Track Vote, Control Delegation, Playlist Editor.",
    ],
    outcome: "In active development.",
    stack: ["NestJS", "Flutter", "TypeScript"],
  },
  {
    slug: "irc-server",
    title: "High-Concurrency IRC Server",
    kind: "Systems",
    visibility: "1337 / 42 Network",
    size: "md",
    summary: "A multi-client chat server in C++ on non-blocking I/O, compatible with standard IRC clients.",
    challenge: "Serve many concurrent clients from a single process while following the protocol.",
    work: [
      "Event-driven, non-blocking socket server.",
      "JOIN, PART, KICK, INVITE and channel moderation per RFC 1459.",
    ],
    outcome: "A working server that real IRC clients connect to.",
    stack: ["C++", "Sockets", "Non-blocking I/O"],
    github: "https://github.com/USM4/ft_irc",
  },
];

export const stack = [
  { group: "Commerce", items: ["WooCommerce", "Shopify", "WordPress", "Elementor", "Merchant Center"] },
  { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind", "Flutter"] },
  { group: "Backend", items: ["Laravel", "NestJS", "Django", "FastAPI", "PHP", "Python"] },
  { group: "Data", items: ["PostgreSQL", "MySQL", "Redis", "Prisma"] },
  { group: "DevOps", items: ["Docker", "NGINX", "Linux", "CI/CD", "AWS", "Kubernetes"] },
  { group: "AI", items: ["Gemini API", "AI agents", "Automation"] },
];

export const process = [
  { step: "01", title: "Architect", text: "Map the business flow, define the system and agree on milestones." },
  { step: "02", title: "Build", text: "Short cycles with working previews - you see progress, not promises." },
  { step: "03", title: "Ship", text: "Tested end to end, deployed on solid infrastructure, documented." },
  { step: "04", title: "Scale", text: "Monitoring, improvements and support after launch." },
];

export const about = {
  paragraphs: [
    "I'm Oussama - a full-stack engineer from Morocco who builds the entire commerce stack: the store customers see, the platform behind it, and the servers it runs on.",
    "I trained at 1337 (42 Network), the peer-to-peer engineering school, building servers, real-time platforms and container infrastructure from scratch in C, C++, Python and JavaScript - after a DUT in Computer Engineering.",
    "Today I put that engineering depth into client work: stores that look premium and convert, platforms with clean architecture, and infrastructure that doesn't wake anyone up at night.",
  ],
  education: [
    { school: "1337 Coding School - 42 Network", detail: "Software Engineering · 2022 – present" },
    { school: "EST Berrechid", detail: "DUT - Computer Engineering" },
  ],
  languages: ["Arabic", "French", "English"], // TODO: confirm
};

export const brand = {
  handle: "USM4",
  story: "USM4 - named after the M4 bayonet: sharp, reliable, built for the field.",
};

export const principles = [
  { icon: "layers", title: "End-to-end ownership", text: "One engineer from storefront to server - no hand-off gaps, no finger-pointing between freelancers." },
  { icon: "shield", title: "Secure by default", text: "Auth, roles, validated input, TLS and hardened servers are part of the build - not an afterthought." },
  { icon: "boxes", title: "Containerized & reproducible", text: "Every environment runs in Docker. Deploys are predictable, rollbacks are easy, onboarding is instant." },
  { icon: "gauge", title: "Built for performance", text: "Fast pages, cached data and optimized queries - because speed is conversion." },
  { icon: "workflow", title: "Clean architecture", text: "Modular code and typed APIs your next developer will thank you for." },
  { icon: "messages", title: "Transparent delivery", text: "Clear milestones, regular progress reports and documentation at handover." },
] as const;

export const engagements = [
  {
    name: "New build",
    tagline: "Store or platform from zero to launch.",
    points: ["Discovery & architecture", "Design system & build", "Payments, data & integrations", "Deployment & handover docs"],
    cta: "Start a build",
  },
  {
    name: "Monthly retainer",
    tagline: "A senior-minded engineer on call for your business.",
    points: ["Reserved hours every month", "New features & improvements", "Monitoring, updates & backups", "Priority response"],
    cta: "Reserve hours",
    highlight: true,
  },
  {
    name: "Rescue & audit",
    tagline: "Inherited a broken project? I'll take it from here.",
    points: ["Code & infrastructure audit", "Root-cause debugging", "Performance & security fixes", "Finish what was started"],
    cta: "Request an audit",
  },
];

// Add real client quotes here (with permission). Section stays hidden while empty.
export const testimonials: { quote: string; name: string; role: string }[] = [];

export const codeSamples = [
  {
    id: "nest",
    tab: "auth.controller.ts",
    tech: "NestJS",
    lang: "ts",
    code: `@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto): Promise<TokenPair> {
    return this.auth.login(dto.email, dto.password);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refresh(@CurrentUser() user: JwtPayload): Promise<TokenPair> {
    // rotate refresh tokens - a reused token revokes the whole family
    return this.auth.rotate(user.sub, user.refreshId);
  }
}`,
  },
  {
    id: "laravel",
    tab: "WholesaleOrderController.php",
    tech: "Laravel",
    lang: "php",
    code: `final class WholesaleOrderController extends Controller
{
    public function store(PlaceOrderRequest $request, PricingService $pricing): OrderResource
    {
        $order = DB::transaction(function () use ($request, $pricing) {
            $order = $request->user()->store->orders()->create([
                'wholesaler_id' => $request->wholesaler_id,
                'status'        => OrderStatus::Pending,
            ]);

            foreach ($request->items as $item) {
                $order->items()->create([
                    'product_id' => $item['product_id'],
                    'quantity'   => $item['quantity'],
                    'unit_price' => $pricing->tierPrice($item['product_id'], $item['quantity']),
                ]);
            }

            return $order;
        });

        OrderPlaced::dispatch($order); // broadcast to the wholesaler in real time

        return new OrderResource($order->load('items'));
    }
}`,
  },
  {
    id: "docker",
    tab: "compose.yml",
    tech: "Docker",
    lang: "yaml",
    code: `services:
  api:
    build: ./backend          # Laravel API
    env_file: .env
    depends_on: [db, redis]
    networks: [internal]

  web:
    build: ./frontend         # Next.js
    depends_on: [api]
    networks: [internal]

  nginx:
    image: nginx:alpine
    ports: ["443:443"]
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d:ro
      - ./certs:/etc/nginx/certs:ro
    depends_on: [api, web]
    networks: [internal]

  db:
    image: postgres:16-alpine
    volumes: [pgdata:/var/lib/postgresql/data]
    networks: [internal]

  redis:
    image: redis:7-alpine
    networks: [internal]

volumes:
  pgdata:
networks:
  internal:`,
  },
  {
    id: "woo",
    tab: "store-hooks.php",
    tech: "WooCommerce",
    lang: "php",
    code: `<?php
/**
 * Route new-order emails to the right team per category,
 * and flag high-value orders for priority fulfilment.
 */
add_filter('woocommerce_email_recipient_new_order', function (string $to, ?WC_Order $order) {
    if (!$order) return $to;

    $routes = ['mowers' => 'outdoor@store.com', 'generators' => 'power@store.com'];

    foreach ($order->get_items() as $item) {
        foreach ($routes as $category => $email) {
            if (has_term($category, 'product_cat', $item->get_product_id())) {
                $to .= ',' . $email;
            }
        }
    }
    return $to;
}, 10, 2);

add_action('woocommerce_order_status_processing', function (int $order_id) {
    $order = wc_get_order($order_id);

    if ($order->get_total() >= 1000) {
        $order->update_meta_data('_priority', 'high');
        $order->add_order_note('Flagged for priority fulfilment.');
        $order->save();
    }
});`,
  },
];
