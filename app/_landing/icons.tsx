/**
 * Line glyphs for the landing page. The copy's emoji become one-colour
 * glyphs; the labels beside them stay verbatim.
 */

type IconProps = { size?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  'aria-hidden': true as const,
  focusable: false as const,
});

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/** ⭐ */
export function StarIcon({ size = 16 }: IconProps) {
  return (
    <svg {...base(size)} fill="currentColor">
      <path d="M12 3l2.7 5.7 6.3.8-4.6 4.3 1.2 6.2L12 17l-5.6 3 1.2-6.2L3 9.5l6.3-.8z" />
    </svg>
  );
}

/** 🔥 */
export function FlameIcon({ size = 16 }: IconProps) {
  return (
    <svg {...base(size)} {...stroke}>
      <path d="M12 2.5s5 4.2 5 8.7a5 5 0 0 1-10 0c0-1.6.6-2.9 1.4-4 .3 1 .9 1.8 1.8 2.2.5-3 1.8-5.4 1.8-6.9z" />
      <path d="M12 21.5a3 3 0 0 0 3-3c0-1.9-3-4.2-3-4.2s-3 2.3-3 4.2a3 3 0 0 0 3 3z" />
    </svg>
  );
}

/** 💯 */
export function PercentBadgeIcon({ size = 16 }: IconProps) {
  return (
    <svg {...base(size)} {...stroke}>
      <circle cx="12" cy="12" r="9.2" />
      <path d="M15.5 8.5l-7 7" />
      <circle cx="9.4" cy="9.4" r="1.5" />
      <circle cx="14.6" cy="14.6" r="1.5" />
    </svg>
  );
}

/** 🛡️ */
export function ShieldCheckIcon({ size = 18 }: IconProps) {
  return (
    <svg {...base(size)} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.5l8 3v6.7c0 4.9-3.4 9.2-8 10-4.6-.8-8-5.1-8-10V5.5l8-3z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

export function UsersIcon({ size = 16 }: IconProps) {
  return (
    <svg {...base(size)} {...stroke}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.2 20c0-3.2 2.6-5.6 5.8-5.6s5.8 2.4 5.8 5.6" />
      <path d="M15.6 5.2a3.2 3.2 0 0 1 0 6M17.6 14.6c1.9.7 3.2 2.6 3.2 5.4" />
    </svg>
  );
}

export function AwardIcon({ size = 16 }: IconProps) {
  return (
    <svg {...base(size)} {...stroke}>
      <circle cx="12" cy="9" r="5.6" />
      <path d="M8.6 13.4L7.4 21l4.6-2.6 4.6 2.6-1.2-7.6" />
    </svg>
  );
}

export function BookIcon({ size = 16 }: IconProps) {
  return (
    <svg {...base(size)} {...stroke}>
      <path d="M12 6.4c-1.8-1.4-4.6-2-8-1.8v13.2c3.4-.2 6.2.4 8 1.8 1.8-1.4 4.6-2 8-1.8V4.6c-3.4-.2-6.2.4-8 1.8z" />
      <path d="M12 6.4v13.2" />
    </svg>
  );
}

/** ☑️ */
export function CheckIcon({ size = 13 }: IconProps) {
  return (
    <svg {...base(size)} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function PlayIcon({ size = 26 }: IconProps) {
  return (
    <svg {...base(size)} fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export function PlusIcon({ size = 14 }: IconProps) {
  return (
    <svg {...base(size)} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function ImageGlyph({ size = 30 }: IconProps) {
  return (
    <svg {...base(size)} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <circle cx="8.5" cy="10" r="1.6" />
      <path d="M4 17l4.8-4.6a2 2 0 0 1 2.7-.1L20 19" />
    </svg>
  );
}

export function FilmGlyph({ size = 30 }: IconProps) {
  return (
    <svg {...base(size)} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 9h19M2.5 15h19M7.5 5v14M16.5 5v14" />
    </svg>
  );
}

/* ── The six programme components, in the copy's order ─────────── */

export function ClipboardPulseIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base(size)} {...stroke}>
      <path d="M9 4.5h6M8.5 3.2h7a1.3 1.3 0 0 1 1.3 1.3v.9h1.4A1.8 1.8 0 0 1 20 7.2v12a1.8 1.8 0 0 1-1.8 1.8H5.8A1.8 1.8 0 0 1 4 19.2v-12a1.8 1.8 0 0 1 1.8-1.8h1.4v-.9A1.3 1.3 0 0 1 8.5 3.2z" />
      <path d="M7.6 14h2.2l1.3-2.6 1.8 5 1.3-2.4h2.2" />
    </svg>
  );
}

export function PlateIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base(size)} {...stroke}>
      <circle cx="12" cy="12.6" r="6.6" />
      <circle cx="12" cy="12.6" r="3.4" />
      <path d="M2.6 4v5.2M2.6 9.2v10.6M1.4 4v3.6a1.2 1.2 0 0 0 2.4 0V4" />
      <path d="M21.4 4c-1.2.8-1.8 2.6-1.8 4.8v2.4h1.8v8.6" />
    </svg>
  );
}

export function MealPrepIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base(size)} {...stroke}>
      <rect x="3" y="9" width="18" height="10.6" rx="2" />
      <path d="M2.4 9h19.2M10.2 9v10.6" />
      <path d="M7.2 5.6c0-1 .8-1.8 1.8-1.8h6c1 0 1.8.8 1.8 1.8V9" />
    </svg>
  );
}

export function DumbbellIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base(size)} {...stroke}>
      <path d="M7.6 12h8.8" />
      <rect x="4.4" y="7.4" width="3.2" height="9.2" rx="1" />
      <rect x="16.4" y="7.4" width="3.2" height="9.2" rx="1" />
      <path d="M2.4 9.8v4.4M21.6 9.8v4.4" />
    </svg>
  );
}

export function TrendIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base(size)} {...stroke}>
      <path d="M3.6 3.6v16.8h16.8" />
      <path d="M7.2 15.2l3.6-3.8 3 2.6 5-5.8" />
      <path d="M15.4 8.2h3.4v3.4" />
    </svg>
  );
}

export function ChatSupportIcon({ size = 22 }: IconProps) {
  return (
    <svg {...base(size)} {...stroke}>
      <path d="M20.4 12.6c0 3.8-3.8 6.9-8.4 6.9a10 10 0 0 1-2.6-.34L4.6 20.7l1.3-3.4A6.4 6.4 0 0 1 3.6 12.6c0-3.8 3.8-6.9 8.4-6.9s8.4 3.1 8.4 6.9z" />
      <path d="M8.8 12.4h.01M12 12.4h.01M15.2 12.4h.01" />
    </svg>
  );
}
