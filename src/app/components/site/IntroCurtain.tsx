import { useEffect, useRef, useState } from "react";
import { introPending, markIntroDone } from "../../lib/motion";
import logoFull from "../../../../assets/logo-full.png";

/**
 * One-time page-load curtain: the logo fades in on a cream cover, then the
 * cover slides up to reveal the page (once per tab session). Hidden entirely
 * without JS or under prefers-reduced-motion via motion.css.
 */
export default function IntroCurtain() {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"idle" | "leaving" | "gone">(() =>
    typeof window !== "undefined" && introPending() ? "idle" : "gone",
  );

  useEffect(() => {
    // mount-only: the timers drive phase transitions and must survive them
    if (phase === "gone") return;
    markIntroDone();
    // while the opaque cover is up, keyboard focus must not wander behind it
    // (setAttribute: React 18 does not render the inert prop)
    const wrapper = ref.current?.parentElement;
    wrapper?.setAttribute("inert", "");
    const clearInert = () => wrapper?.removeAttribute("inert");
    const leave = window.setTimeout(() => {
      clearInert();
      setPhase("leaving");
    }, 1000);
    const gone = window.setTimeout(() => setPhase("gone"), 1950);
    return () => {
      window.clearTimeout(leave);
      window.clearTimeout(gone);
      clearInert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === "gone") return null;

  return (
    <div ref={ref} className={`intro-curtain ${phase === "leaving" ? "is-done" : ""}`} aria-hidden="true">
      <img src={logoFull} alt="" />
    </div>
  );
}
