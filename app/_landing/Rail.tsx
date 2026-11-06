import type { CSSProperties, ReactNode } from 'react';
import { asset } from './asset-version';

/**
 * One counter-scrolling row (§6 rails). The set renders twice and the track
 * slides by exactly -50%, so the loop is seamless; the second copy is hidden
 * from AT and never focusable. Spacing is margin-right on every card, never
 * flex gap, or the second set starts half a gap off and the loop jumps.
 *
 * `ltr` moves left to right, `rtl` right to left, as the copy names them.
 * Each row pauses on hover and while anything in it has focus.
 */
export function Rail({
  dir,
  render,
  className = '',
  seconds = 60,
}: {
  dir: 'ltr' | 'rtl';
  render: (inert: boolean) => ReactNode;
  className?: string;
  seconds?: number;
}) {
  return (
    <div className={`sdp-wa-row ${dir}${className ? ` ${className}` : ''}`} style={{ '--dur': `${seconds}s` } as CSSProperties}>
      <div className="sdp-wa-track">
        {render(false)}
        <div className="sdp-wa-dup" aria-hidden>
          {render(true)}
        </div>
      </div>
    </div>
  );
}

export type Shot = { src: string; w: number; h: number; alt: string };

/**
 * Fixed height, width from the file's own ratio, never cropped: the supplied
 * artwork carries its own names, labels and captions.
 */
export function RailImage({ shot, inert }: { shot: Shot; inert?: boolean }) {
  return (
    <div className="sdp-wa-card" style={{ '--ar': (shot.w / shot.h).toFixed(4) } as CSSProperties}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(shot.src)}
        alt={inert ? '' : shot.alt}
        width={shot.w}
        height={shot.h}
        loading="eager"
        fetchPriority="low"
        decoding="async"
      />
    </div>
  );
}
