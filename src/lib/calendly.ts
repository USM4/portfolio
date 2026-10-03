import { links } from "@/content/site";

type CalendlyApi = {
  initInlineWidget: (o: { url: string; parentElement: HTMLElement; resize?: boolean }) => void;
};
declare global {
  interface Window {
    Calendly?: CalendlyApi;
  }
}

/** Dark-theme params (match the site palette). */
export const calendlyUrl = (() => {
  const u = links.calendly;
  if (!u) return "";
  const q = "hide_gdpr_banner=1&background_color=0b0b0f&text_color=f2f2f2&primary_color=c6ff3d";
  return u + (u.includes("?") ? "&" : "?") + q;
})();

let loading: Promise<CalendlyApi> | null = null;

/** Loads Calendly's widget script once, on demand (we use our own styles). */
export function loadCalendly(): Promise<CalendlyApi> {
  if (window.Calendly) return Promise.resolve(window.Calendly);
  if (loading) return loading;
  loading = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    s.onload = () => (window.Calendly ? resolve(window.Calendly) : reject(new Error("calendly")));
    s.onerror = () => {
      loading = null;
      reject(new Error("calendly"));
    };
    document.head.appendChild(s);
  });
  return loading;
}

export const BOOK_EVENT = "usm4:book";

/** Opens the site's own booking dialog (see BookingDialog). */
export function openCalendly() {
  if (!calendlyUrl) return;
  window.dispatchEvent(new Event(BOOK_EVENT));
}
