import {
  siDjango, siDocker, siElementor, siFastapi, siFlutter, siGithubactions, siGooglegemini, siKubernetes, siLaravel,
  siLinux, siMysql, siNestjs, siNextdotjs, siNginx, siPhp, siPostgresql, siPython, siReact, siRedis, siShopify,
  siTailwindcss, siTypescript, siWoocommerce, siWordpress,
} from "simple-icons";

const icons = [
  siWoocommerce, siShopify, siWordpress, siElementor, siLaravel, siNestjs, siNextdotjs, siReact, siTypescript,
  siPhp, siPython, siDjango, siFastapi, siFlutter, siPostgresql, siMysql, siRedis, siDocker, siKubernetes, siNginx,
  siLinux, siGithubactions, siTailwindcss, siGooglegemini,
];

/** Infinite logo strip - the stack I ship with. */
export function TechMarquee() {
  const row = (aria: boolean) => (
    <ul className="marquee-track flex shrink-0 items-center gap-12 pr-12" aria-hidden={aria}>
      {icons.map((i) => (
        <li key={i.slug} className="group flex items-center gap-2.5 text-faint transition-colors hover:text-fg">
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current transition-colors" role="img" aria-label={i.title}>
            <path d={i.path} />
          </svg>
          <span className="whitespace-nowrap text-sm font-medium">{i.title}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <section dir="ltr" aria-label="Technologies" className="relative border-y border-line bg-bg/80 py-7 backdrop-blur-md">
      <div className="marquee flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
