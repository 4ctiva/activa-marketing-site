import { useEffect, useState } from "react";

/**
 * Phone-only "register your interest" bar in thumb reach. It appears once the
 * hero CTA ([data-hero-cta]) has scrolled away above, and steps aside while
 * the Contact section or the footer is on screen. Dialogs open in the top
 * layer, above it. While hidden it is visibility:hidden, so it is out of the
 * tab order and the accessibility tree.
 */
export default function InterestDock({ label, onOpen }: { label: string; onOpen: () => void }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const cta = document.querySelector("[data-hero-cta]");
    const ends = ["#contact", "footer"].map((s) => document.querySelector(s)).filter((el): el is Element => !!el);
    if (!cta || typeof IntersectionObserver === "undefined") return;

    let ctaPassed = false;
    const near = new Set<Element>();
    const update = () => setShown(ctaPassed && near.size === 0);

    const ctaObserver = new IntersectionObserver(([entry]) => {
      ctaPassed = !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
      update();
    });
    ctaObserver.observe(cta);
    const endObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) near.add(entry.target);
        else near.delete(entry.target);
      }
      update();
    });
    ends.forEach((el) => endObserver.observe(el));
    return () => {
      ctaObserver.disconnect();
      endObserver.disconnect();
    };
  }, []);

  return (
    <div data-interest-dock className={`interest-dock fixed inset-x-0 bottom-0 z-40 md:hidden ${shown ? "is-shown" : ""}`}>
      <button
        type="button"
        onClick={onOpen}
        className="press w-full rounded-full bg-ink px-6 py-4 text-center text-[16px] font-bold text-primary-foreground shadow-[0_10px_24px_rgba(33,43,60,.22)]"
      >
        {label}
      </button>
    </div>
  );
}
