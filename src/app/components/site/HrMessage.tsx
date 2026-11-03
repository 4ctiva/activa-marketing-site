import { useEffect, useRef, useState } from "react";
import { useLang } from "../../i18n";

/**
 * Editable message an employee can copy and send to HR themselves.
 * Nothing is sent or stored; the text follows the language until edited.
 * Rendered inside a disclosure whose summary carries the title (t.hr.title).
 */
export default function HrMessage() {
  const { t } = useLang();
  const [text, setText] = useState(t.hr.message);
  const [edited, setEdited] = useState(false);
  const [status, setStatus] = useState<"" | "copied" | "failed">("");
  const areaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!edited) setText(t.hr.message);
  }, [t, edited]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      areaRef.current?.select();
      setStatus("failed");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <p id="hr-help" className="m-0 text-[12.5px] leading-[1.6] text-muted-foreground">
        {t.hr.body}
      </p>
      <label htmlFor="hr-message" className="text-[12.5px] font-semibold">
        {t.hr.label}
      </label>
      <textarea
        id="hr-message"
        ref={areaRef}
        aria-describedby="hr-help"
        value={text}
        rows={6}
        onChange={(e) => {
          setText(e.target.value);
          setEdited(true);
          setStatus("");
        }}
        className="w-full resize-y rounded-xl border border-[rgba(33,43,60,.2)] bg-white/70 p-3 text-[13px] leading-[1.55] text-ink"
      />
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={copy}
          className="rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-primary-foreground"
        >
          {t.hr.copy}
        </button>
        <a
          href={`mailto:?subject=${encodeURIComponent(t.hr.subject)}&body=${encodeURIComponent(text)}`}
          className="rounded-full border-[1.5px] border-ink px-5 py-2.5 text-[13px] font-semibold"
        >
          {t.hr.email}
        </a>
        <span role="status" className="text-[12.5px] text-muted-foreground">
          {status === "copied" ? t.hr.copied : status === "failed" ? t.hr.copyFailed : ""}
        </span>
      </div>
    </div>
  );
}
