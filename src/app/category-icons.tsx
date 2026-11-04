import type { ComponentType, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/* ────────────────────────────────────────────────────────────────
 * CATEGORY ICONS — inline SVGs copied verbatim from the design
 * handoff (`Activa Site (5c).dc.html`, #categories tiles), except
 * Pilates and Boxing, redrawn in the same style on 2026-11-04.
 *
 * The array order MUST match `categories.items` in src/app/i18n.tsx:
 *   0 Gyms / Gimnasios        5 Recovery
 *   1 Yoga                    6 Massage / Masajes
 *   2 Pilates                 7 Physiotherapy / Fisioterapia
 *   3 Boxing / Boxeo          8 Wellness
 *   4 Functional / Funcional
 * ──────────────────────────────────────────────────────────────── */

function base(props: IconProps): IconProps {
  return {
    viewBox: "0 0 24 24",
    width: 30,
    height: 30,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...props,
  };
}

export const CATEGORY_ICONS: ComponentType<IconProps>[] = [
  // 0 · Gyms / Gimnasios — dumbbell
  (props) => (
    <svg {...base(props)}>
      <path d="M14.4 14.4 9.6 9.6" />
      <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" />
      <path d="m21.5 21.5-1.4-1.4" />
      <path d="M3.9 3.9 2.5 2.5" />
      <path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" />
    </svg>
  ),
  // 1 · Yoga — lotus figure
  (props) => (
    <svg {...base(props)}>
      <path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1" />
      <circle cx="12" cy="8" r="2" />
      <path d="M12 10v12" />
      <path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z" />
      <path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z" />
    </svg>
  ),
  // 2 · Pilates — teaser (V-sit) on a mat; replaces the heartbeat line (2026-11-04)
  (props) => (
    <svg {...base(props)}>
      <circle cx="5" cy="6.5" r="2" />
      <path d="m6.5 10.25 3 7.75 9.5-9" />
      <path d="m7.25 12.25 6.25-2.5" />
      <rect x="2" y="19.5" width="20" height="2" rx="1" />
    </svg>
  ),
  // 3 · Boxing / Boxeo — boxing glove with cuff seam; replaces crossed swords (2026-11-04)
  (props) => (
    <svg {...base(props)}>
      <path d="M7.5 16.75C5.25 14.75 4 12.75 4 9.75c0-4 3-7.25 7.25-7.25h2.25c3.75 0 6.5 2.75 6.5 6.5v2.25c0 3.25-2.25 5.5-5 5.5" />
      <path d="M20 10.5h-3.5a3 3 0 0 0-3 3v.75c0 1.25.5 2 1.5 2.5" />
      <rect x="6.5" y="16.75" width="9.5" height="5" rx="1" />
      <path d="M6.5 19.25h9.5" />
    </svg>
  ),
  // 4 · Functional / Funcional — bolt
  (props) => (
    <svg {...base(props)}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  // 5 · Recovery — tub
  (props) => (
    <svg {...base(props)}>
      <path d="M10 4 8 6" />
      <path d="M17 19v2" />
      <path d="M2 12h20" />
      <path d="M7 19v2" />
      <path d="M9 5 7.621 3.621A2.121 2.121 0 0 0 4 5v7" />
      <path d="M19 12v5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-5" />
    </svg>
  ),
  // 6 · Massage / Masajes — hand
  (props) => (
    <svg {...base(props)}>
      <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
      <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </svg>
  ),
  // 7 · Physiotherapy / Fisioterapia — bone
  (props) => (
    <svg {...base(props)}>
      <path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z" />
    </svg>
  ),
  // 8 · Wellness — sparkles
  (props) => (
    <svg {...base(props)}>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </svg>
  ),
];
