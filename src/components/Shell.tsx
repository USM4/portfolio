import { getDict } from "@/i18n";
import { isRtl, type Locale } from "@/i18n/config";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { HtmlLang } from "./HtmlLang";
import { BookingDialog } from "./BookingDialog";

/** Per-language frame: sets lang/dir, renders the localized nav and footer. */
export function Shell({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  const t = getDict(lang);
  const dir = isRtl(lang) ? "rtl" : "ltr";
  return (
    <div lang={lang} dir={dir}>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(lang)};document.documentElement.dir=${JSON.stringify(dir)};`,
        }}
      />
      <HtmlLang lang={lang} dir={dir} />
      <Nav lang={lang} t={{ nav: t.nav, hire: t.hire, cmd: t.cmd }} />
      <main>{children}</main>
      <Footer t={t} lang={lang} />
      <BookingDialog t={t.hire} />
    </div>
  );
}
