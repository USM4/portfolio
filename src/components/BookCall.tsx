"use client";

import { CalendarDays } from "lucide-react";
import { links } from "@/content/site";
import { loadCalendly, openCalendly } from "@/lib/calendly";

/** Link that opens the Calendly popup (plain link without JS). */
export function BookCall({
  children,
  className = "",
  icon = true,
}: {
  children: React.ReactNode;
  className?: string;
  icon?: boolean;
}) {
  if (!links.calendly) return null;
  return (
    <a
      href={links.calendly}
      target="_blank"
      rel="noopener noreferrer"
      onPointerEnter={() => void loadCalendly().catch(() => {})}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        openCalendly();
      }}
      className={className}
    >
      {icon && <CalendarDays aria-hidden className="h-4 w-4" />}
      {children}
    </a>
  );
}
