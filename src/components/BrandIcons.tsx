import { siGithub, siWhatsapp } from "simple-icons";

type P = { className?: string };

export const GithubIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d={siGithub.path} />
  </svg>
);

export const WhatsappIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d={siWhatsapp.path} />
  </svg>
);

export const LinkedinIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M3 3.5A2.5 2.5 0 0 1 5.5 1h13A2.5 2.5 0 0 1 21 3.5v17a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 20.5zM6.2 9.4v9.2h2.9V9.4zm1.45-4.6a1.68 1.68 0 1 0 0 3.36 1.68 1.68 0 0 0 0-3.36M11 9.4v9.2h2.9v-4.7c0-1.3.4-2.4 1.9-2.4 1.4 0 1.5 1.3 1.5 2.5v4.6h2.9v-5.2c0-2.6-.6-4.2-3.5-4.2-1.4 0-2.4.7-2.8 1.5V9.4z" />
  </svg>
);
