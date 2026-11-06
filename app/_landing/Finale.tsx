import type { CSSProperties } from 'react';
import { SiteFooter } from '@/components/shared/SiteFooter';
import { CtaLockup } from './CtaLockup';

/**
 * BEAT 11 · finale (DARK, the premium peak, closing-stage depth weld).
 * The copy ends at the FAQ with no closing line, so the peak repeats the
 * hero H1 verbatim rather than inventing one. `id="finale"` is what the
 * sticky bar watches to step aside.
 */
export function Finale() {
  return (
    <section id="finale" className="sdp-finale sdp-dark">
      <div className="sdp-wrap sdp-finale-inner">
        <h2 className="sdp-h1" data-sdp-reveal>
          <span className="sdp-h1-pre">I Help Women Trying To Get Pregnant</span>
          <span className="sdp-h1-l1">
            Lose <em>5–15 Kgs</em> In 90 Days,
          </span>
          <span className="sdp-h1-l2">Even With PCOD, Thyroid Issues Or Insulin Resistance.</span>
        </h2>

        <div data-sdp-reveal style={{ '--d': '.1s' } as CSSProperties}>
          <CtaLockup />
        </div>

        <div className="sdp-colophon">
          <SiteFooter folded />
        </div>
      </div>
    </section>
  );
}
