import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { useLang } from "../../i18n";
import aptLogo from "../../../../assets/optimized/apt-logo-270w.webp";

/**
 * Phone navigation: a Menu button that opens a native modal <dialog> sheet
 * (Escape closes, the page behind is inert, focus returns to the button).
 * Following a link closes the sheet and lets the browser move to the section.
 */
export default function MobileMenu() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDialogElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef(true);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (!open) return;
    restoreFocus.current = true;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      if (dialog.open) dialog.close();
      if (restoreFocus.current) buttonRef.current?.focus();
    };
  }, [open]);

  // close the sheet if the viewport grows past the phone layout
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const follow = () => {
    // the fragment navigation moves focus to the section; don't pull it back
    restoreFocus.current = false;
    setOpen(false);
  };

  const links = [
    { href: "#home", label: t.nav.home },
    { href: "#how", label: t.hero.ctaSecondary },
    { href: "#faq", label: t.faq.label },
    { href: "#about", label: t.nav.about },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={t.nav.menu}
        className="press flex size-10 items-center justify-center rounded-full border border-[rgba(33,43,60,.25)] text-ink transition-colors duration-300 md:hidden group-data-[over-dark=true]/header:border-[rgba(245,241,232,.3)] group-data-[over-dark=true]/header:text-[#f5f1e8]"
      >
        <Menu aria-hidden="true" size={18} strokeWidth={1.75} />
      </button>
      <dialog
        ref={ref}
        id="mobile-menu"
        aria-label={t.nav.menu}
        onClose={() => setOpen(false)}
        onCancel={(e) => {
          e.preventDefault();
          setOpen(false);
        }}
        onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        // max-h divides by the body zoom (theme.css) so the sheet never outgrows the viewport
        className="sheet-dialog inset-x-0 top-0 bottom-auto m-0 h-auto max-h-[calc(100dvh/1.15)] w-full max-w-none overflow-y-auto rounded-b-[28px] border-0 bg-background p-0 text-foreground md:hidden"
      >
        {open && (
          <div className="flex flex-col px-5 pb-7 pt-3">
            <div className="flex items-center justify-between">
              <span className="eyebrow">{t.nav.menu}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t.common.close}
                className="press flex size-10 items-center justify-center rounded-full text-muted-foreground hover:text-ink"
              >
                <X aria-hidden="true" size={20} strokeWidth={1.75} />
              </button>
            </div>
            <nav aria-label={t.nav.main} className="mt-2">
              <ul className="m-0 list-none p-0">
                {links.map((l) => (
                  <li key={l.href} className="border-b border-border">
                    <a
                      href={l.href}
                      onClick={follow}
                      className="flex items-center justify-between py-3.5 font-display text-[24px] font-light leading-tight text-ink"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
                <li className="border-b border-border">
                  <a href="/para-todos/" className="flex items-center justify-between py-3.5">
                    <img src={aptLogo} alt="Activa para Todos" width={73} height={32} className="block h-8 w-auto" />
                    <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} className="text-muted-foreground" />
                  </a>
                </li>
              </ul>
            </nav>
            <a
              href="#contact"
              onClick={follow}
              className="press mt-6 rounded-full bg-ink px-6 py-3.5 text-center text-[14px] font-bold text-primary-foreground"
            >
              {t.nav.cta}
            </a>
          </div>
        )}
      </dialog>
    </>
  );
}
