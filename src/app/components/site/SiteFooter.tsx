import { translations, type Lang, PRIMARY_EMAIL } from "../../i18n";
import { MailIcon, WhatsAppIcon } from "./icons";
import logoFull from "../../../../assets/logo-full.png";

const APP_ORIGIN = import.meta.env.DEV ? "http://localhost:3000" : "https://app.4ctiva.com";

/**
 * Footer shared by the main site and the Activa para Todos page.
 * `anchorPrefix` is "" on the main page (in-page anchors) and "/" on
 * standalone pages so nav links jump back to the main page sections.
 */
export default function SiteFooter({ lang, anchorPrefix = "" }: { lang: Lang; anchorPrefix?: string }) {
  const t = translations[lang];

  const legalLinks = [
    { label: t.footer.memberTerms, href: `${APP_ORIGIN}/legal/terms` },
    { label: t.footer.partnerTerms, href: `${APP_ORIGIN}/legal/partner-terms` },
    { label: t.footer.privacyNotice, href: `${APP_ORIGIN}/legal/privacy` },
    { label: t.footer.photoConsent, href: `${APP_ORIGIN}/legal/photo-consent` },
  ];

  const navLinks = [
    { label: t.nav.home, href: `${anchorPrefix}#home` },
    { label: t.nav.about, href: `${anchorPrefix}#about` },
    { label: t.nav.memberships, href: `${anchorPrefix}#benefits` },
    { label: t.nav.contact, href: `${anchorPrefix}#contact` },
  ];

  const linkCls = "text-[#a89f8c] transition-colors duration-200 hover:text-[#f5f1e8]";

  return (
    <footer className="bg-navy text-light">
      <div className="mx-auto box-content max-w-[1280px] px-12 pb-8 pt-[72px]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-[clamp(28px,4vw,48px)] border-b border-[rgba(245,241,232,.12)] pb-11">
          <div>
            <img src={logoFull} alt="Activa" loading="lazy" decoding="async" className="block h-5 w-auto brightness-0 invert" />
          </div>
          <div>
            <div className="mb-4 font-mono text-[10.5px] uppercase tracking-[.22em] text-[#8f887d]">
              {t.footer.legalLabel}
            </div>
            <div className="flex flex-col gap-2.5 text-[13.5px]">
              {legalLinks.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-4 font-mono text-[10.5px] uppercase tracking-[.22em] text-[#8f887d]">
              {t.footer.navLabel}
            </div>
            <div className="flex flex-col gap-2.5 text-[13.5px]">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className={linkCls}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-4 font-mono text-[10.5px] uppercase tracking-[.22em] text-[#8f887d]">
              {t.footer.contactLabel}
            </div>
            <div className="flex flex-col gap-2.5 text-[13.5px] text-[#a89f8c]">
              <a href={`mailto:${PRIMARY_EMAIL}`} className={`flex items-center gap-[9px] ${linkCls}`}>
                <MailIcon size={15} className="shrink-0" />
                {PRIMARY_EMAIL}
              </a>
              <a
                href="https://wa.me/16073196214"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-[9px] ${linkCls}`}
              >
                <WhatsAppIcon size={15} className="shrink-0" />
                +1 (607) 319-6214
              </a>
              <span>{t.footer.location}</span>
            </div>
          </div>
        </div>
        <div className="pt-6 text-[11.5px] text-[#8f887d]">{t.footer.rights}</div>
      </div>
    </footer>
  );
}
