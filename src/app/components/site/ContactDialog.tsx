import { useEffect, useRef, useState } from "react";
import { useLang } from "../../i18n";
import { AUDIENCES, CONTACT, mailtoHref, whatsappHref, type Audience } from "../../lib/audience";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { InstagramIcon, MailIcon, WhatsAppIcon } from "./icons";

/** Builds the visitor's own email/WhatsApp message from their selections (nothing is sent by the site). */
export function useContactMessage(audience: Audience | null, areas: string[]) {
  const { t } = useLang();
  const as = audience ? t.audiences[audience].short : t.contact.notChosen;
  const lines = [t.contact.greeting, `${t.contact.asLine} ${as}.`];
  if (areas.length) lines.push(`${t.contact.areasLine} ${areas.join(", ")}.`);
  const text = lines.join("\n");
  return {
    email: mailtoHref(audience ? `${t.contact.subject} · ${as}` : t.contact.subject, `${text}\n\n`),
    whatsapp: whatsappHref(text),
  };
}

const ROW =
  "press glass-quiet glass-frost glass-hover flex items-center justify-between gap-4 px-[22px] py-[18px] transition-colors duration-200 hover:text-[#3d4a61]";
const ICON = "flex size-[42px] shrink-0 items-center justify-center rounded-full border border-[rgba(33,43,60,.15)] text-muted-foreground";

/** Email / WhatsApp / Instagram rows, shared by the contact section and the dialog. */
export function ContactAlternatives({ audience, areas }: { audience: Audience | null; areas: string[] }) {
  const { t } = useLang();
  const msg = useContactMessage(audience, areas);
  return (
    <>
      <a href={msg.email} className={ROW}>
        <span className="flex min-w-0 items-center gap-4">
          <span className={ICON}>
            <MailIcon size={17} />
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="text-sm font-bold">Esteban Baltodano</span>
            {/* only ever break after the @, never inside the domain */}
            <span className="text-xs text-[#70685c]">
              {CONTACT.email.split("@")[0]}@<wbr />
              {CONTACT.email.split("@")[1]}
            </span>
          </span>
        </span>
        <ArrowRight aria-hidden="true" size={16} strokeWidth={1.75} className="btn-arrow shrink-0 text-[#70685c]" />
      </a>
      <a href={msg.whatsapp} target="_blank" rel="noopener noreferrer" className={ROW}>
        <span className="flex items-center gap-4">
          <span className={ICON}>
            <WhatsAppIcon size={15} />
          </span>
          <span className="flex flex-col">
            <span className="text-sm font-bold">
              WhatsApp <span className="sr-only">{t.common.newTab}</span>
            </span>
            <span className="text-xs text-[#70685c]">{CONTACT.whatsappLabel}</span>
          </span>
        </span>
        <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.75} className="btn-arrow-out shrink-0 text-[#70685c]" />
      </a>
      <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className={ROW}>
        <span className="flex items-center gap-4">
          <span className={ICON}>
            <InstagramIcon size={17} />
          </span>
          <span className="flex flex-col">
            <span className="text-sm font-bold">
              Instagram <span className="sr-only">{t.common.newTab}</span>
            </span>
            <span className="text-xs text-[#70685c]">{CONTACT.instagramHandle}</span>
          </span>
        </span>
        <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.75} className="btn-arrow-out shrink-0 text-[#70685c]" />
      </a>
    </>
  );
}

/** Native radio group styled as pills: arrow keys, checked state and grouping come from the platform. */
export function AudiencePills({
  name,
  legend,
  value,
  onChange,
  allLabel,
}: {
  name: string;
  legend: string;
  value: Audience | "all" | null;
  onChange: (next: Audience | "all") => void;
  allLabel?: string;
}) {
  const { t } = useLang();
  const options: { key: Audience | "all"; label: string }[] = [
    ...(allLabel ? [{ key: "all" as const, label: allLabel }] : []),
    ...AUDIENCES.map((key) => ({ key, label: t.audiences[key].name })),
  ];
  return (
    <fieldset className="m-0 min-w-0 border-0 p-0">
      <legend className="mb-3 p-0 text-[13px] font-semibold">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.key} className="pill-choice">
            <input
              type="radio"
              name={name}
              value={o.key}
              checked={value === o.key}
              onChange={() => onChange(o.key)}
              className="sr-only"
            />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

const FORM_SLOW_MS = 12000;

/**
 * Pilot-interest dialog. Native <dialog> + showModal(): the page behind is inert,
 * Escape closes it, and focus returns to the opener. The embedded Google Form is
 * cross-origin, so the page cannot tell whether it rendered or was submitted:
 * the loading state only means "the frame has not loaded yet", and no success
 * state is ever shown. The form currently requires a Google sign-in (HTTP 401
 * when checked 2026-11-03), so the new-tab link and alternatives stay visible.
 */
export default function ContactDialog({
  open,
  onClose,
  audience,
  onAudience,
  areas,
}: {
  open: boolean;
  onClose: () => void;
  audience: Audience | null;
  onAudience: (a: Audience) => void;
  areas: string[];
}) {
  const { t } = useLang();
  const ref = useRef<HTMLDialogElement>(null);
  const [frame, setFrame] = useState<"loading" | "slow" | "loaded">("loading");

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (!open) {
      if (dialog.open) dialog.close();
      return;
    }
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setFrame("loading");
    dialog.showModal();
    document.body.style.overflow = "hidden";
    const slow = window.setTimeout(() => setFrame((f) => (f === "loading" ? "slow" : f)), FORM_SLOW_MS);
    return () => {
      window.clearTimeout(slow);
      document.body.style.overflow = "";
      if (dialog.open) dialog.close();
      opener?.focus();
    };
  }, [open]);

  // keep Tab cycling inside the dialog instead of escaping to the browser chrome
  const onKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key !== "Tab" || !ref.current) return;
    // a radio group is one tab stop: its checked radio, or its first one when none is checked
    const radios = [...ref.current.querySelectorAll<HTMLInputElement>("input[type=radio]")];
    const radioStop = radios.find((r) => r.checked) ?? radios[0];
    const focusable = [...ref.current.querySelectorAll<HTMLElement>("a[href], button, input, iframe")].filter(
      (el) => !(el instanceof HTMLInputElement && el.type === "radio") || el === radioStop,
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last?.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first?.focus();
    }
  };

  return (
    <dialog
      ref={ref}
      aria-labelledby="contact-dialog-title"
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onKeyDown={onKeyDown}
      onClick={(e) => {
        // a click on the backdrop lands on the <dialog> element itself
        if (e.target === e.currentTarget) onClose();
      }}
      className="contact-dialog m-auto h-[min(92dvh,900px)] w-[min(680px,calc(100%-24px))] max-w-none overflow-hidden rounded-2xl border-0 bg-background p-0 text-foreground"
    >
      {open && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 border-b border-border px-[clamp(16px,4vw,26px)] py-[14px]">
            <h2 id="contact-dialog-title" className="m-0 text-[15px] font-semibold">
              {t.contact.dialogTitle}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label={t.common.close}
              className="flex size-9 items-center justify-center rounded-full text-[18px] text-muted-foreground hover:text-ink"
            >
              <X aria-hidden="true" size={20} strokeWidth={1.75} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col gap-5 px-[clamp(16px,4vw,26px)] py-5">
              <AudiencePills
                name="dialog-audience"
                legend={t.contact.audienceLegend}
                value={audience}
                onChange={(a) => a !== "all" && onAudience(a)}
              />
              <p className="m-0 text-[12.5px] leading-[1.6] text-muted-foreground">{t.contact.audienceNote}</p>
              {areas.length > 0 && (
                <p className="m-0 text-[12.5px] leading-[1.6] text-muted-foreground">
                  <span className="font-semibold text-ink">{t.contact.areasLine}</span> {areas.join(", ")}
                </p>
              )}
              <a
                href={CONTACT.form}
                target="_blank"
                rel="noopener noreferrer"
                className="press rounded-full bg-ink px-5 py-3.5 text-center text-sm font-bold text-primary-foreground hover:bg-[#2c3a52] focus-visible:bg-[#2c3a52]"
              >
                {t.contact.openForm}
                <ArrowUpRight aria-hidden="true" size={16} strokeWidth={2} className="btn-arrow-out ml-1.5 inline-block align-[-3px]" />
                <span className="sr-only"> {t.common.newTab}</span>
              </a>
              <p className="m-0 text-[12.5px] leading-[1.6] text-muted-foreground">{t.contact.formHelp}</p>
              <section aria-labelledby="contact-dialog-alt" className="flex flex-col gap-2.5">
                <h3 id="contact-dialog-alt" className="m-0 text-[13px] font-semibold">
                  {t.contact.altTitle}
                </h3>
                <ContactAlternatives audience={audience} areas={areas} />
              </section>
            </div>
            <div className="relative border-t border-border">
              {frame !== "loaded" && (
                <div
                  role="status"
                  className="absolute inset-x-0 top-0 flex flex-col items-center gap-3 px-6 py-10 text-center text-[13px] text-muted-foreground"
                >
                  {frame === "loading" && <span aria-hidden="true" className="form-spinner" />}
                  <span>{frame === "loading" ? t.contact.loading : t.contact.slow}</span>
                </div>
              )}
              <iframe
                src={`${CONTACT.form}?embedded=true`}
                title={t.contact.embedTitle}
                onLoad={() => setFrame("loaded")}
                className="block h-[1400px] w-full border-0"
              />
            </div>
          </div>
          {/* Tab pressed inside the cross-origin iframe never reaches onKeyDown;
              this guard catches focus leaving it and wraps to the first control */}
          <span tabIndex={0} onFocus={() => ref.current?.querySelector<HTMLElement>("button")?.focus()} />
        </div>
      )}
    </dialog>
  );
}
