import { links } from "@/content/site";

type CalendlyApi = {
  initPopupWidget: (o: { url: string }) => void;
  initInlineWidget: (o: { url: string; parentElement: HTMLElement; resize?: boolean }) => void;
};
declare global {
  interface Window {
    Calendly?: CalendlyApi;
  }
}

/** Dark-theme params (applied on paid Calendly plans, ignored otherwise). */
export const calendlyUrl = (() => {
  const u = links.calendly;
  if (!u) return "";
  const q = "hide_gdpr_banner=1&background_color=0b0b0f&text_color=f2f2f2&primary_color=c6ff3d";
  return u + (u.includes("?") ? "&" : "?") + q;
})();

let loading: Promise<CalendlyApi> | null = null;

/** Loads Calendly's widget script + css once, on demand. */
export function loadCalendly(): Promise<CalendlyApi> {
  if (window.Calendly) return Promise.resolve(window.Calendly);
  if (loading) return loading;
  loading = new Promise((resolve, reject) => {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(css);
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

/** Opens the booking popup; falls back to a new tab if the script is blocked. */
export function openCalendly() {
  if (!calendlyUrl) return;
  loadCalendly()
    .then((c) => c.initPopupWidget({ url: calendlyUrl }))
    .catch(() => window.open(links.calendly, "_blank", "noopener"));
}
