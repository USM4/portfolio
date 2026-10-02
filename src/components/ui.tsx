import Link from "next/link";
import { links, profile } from "@/content/site";

export const primaryHire = links.upwork
  ? { href: links.upwork, label: "Hire me on Upwork", external: true }
  : { href: `mailto:${profile.email}`, label: "Start a project", external: true };

export const whatsappHref = `https://wa.me/${profile.whatsapp}`;

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`font-mono text-[11px] uppercase tracking-[0.18em] text-muted ${className}`}>{children}</span>
  );
}

export function SectionHead({
  index,
  label,
  title,
  lead,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  lead?: string;
}) {
  return (
    <div className="reveal mb-12 grid gap-6 md:mb-16 md:grid-cols-12">
      <div className="md:col-span-4">
        <Label>
          <span className="text-accent">{index}</span> / {label}
        </Label>
      </div>
      <div className="md:col-span-8">
        <h2 className="text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-fg sm:text-5xl">
          {title}
        </h2>
        {lead && <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{lead}</p>}
      </div>
    </div>
  );
}

type BtnProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
};

export function Button({ href, children, variant = "primary", external, className = "" }: BtnProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
  const styles =
    variant === "primary"
      ? "bg-accent text-accent-ink hover:bg-[#d8ff7a] hover:shadow-[0_0_30px_-4px_rgba(198,255,61,0.6)]"
      : "border border-line-strong text-fg hover:border-fg/40 hover:bg-white/[0.03]";
  const cls = `${base} ${styles} ${className}`;
  const inner = (
    <>
      {children}
      <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">
        →
      </span>
    </>
  );
  if (external)
    return (
      <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {inner}
      </a>
    );
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-[3px] border border-line px-2 py-1 font-mono text-[11px] text-muted">
      {children}
    </span>
  );
}
