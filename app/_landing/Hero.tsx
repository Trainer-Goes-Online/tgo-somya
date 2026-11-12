import type { CSSProperties } from 'react';
import { feeLabel } from '@/lib/site';
import { asset } from './asset-version';
import { CtaLockup } from './CtaLockup';

/**
 * BEAT 1 · hero.
 *
 * Copy order, fixed: the question as the audience pill, three-tier H1
 * (who she helps, the result, the qualifier), deck, lead, the copy's two
 * rows of four concerns, Somya's portrait in a circle, CTA lockup,
 * credibility table. The copy has
 * no outcome-pill row and no watch cue, so neither is built.
 */
const CHIP_ROWS = [
  ['Irregular Cycles', 'Excess Weight', 'Fibroids', 'Thyroid'],
  ['Insulin Resistance', 'Low AMH', 'PCOD', 'Endometriosis'],
] as const;

const CREDS = [
  { num: '1000+ Women', lbl: 'Guided Globally' },
  { num: '11+ Years', lbl: 'Coaching Experience' },
  { num: '100%', lbl: 'Personalised Fertility Approach' },
] as const;

const d = (s: string) => ({ '--d': s }) as CSSProperties;

export function Hero() {
  return (
    <section id="top" className="sdp-hero">
      <div className="sdp-wrap sdp-hero-inner">
        <div className="sdp-eyebrow-pill">
          <span className="glowdot" aria-hidden />
          <span>Struggling To Get Pregnant Because Of PCOD, Insulin Resistance Or Excess Weight?</span>
        </div>

        <h1 className="sdp-h1" data-sdp-reveal style={d('.06s')}>
          <span className="sdp-h1-pre">I Help Women Trying To Get Pregnant</span>
          <span className="sdp-h1-l1">
            Lose <em>5–15 Kgs</em> In 90 Days,
          </span>
          <span className="sdp-h1-l2">Even With PCOD, Thyroid Issues Or Insulin Resistance.</span>
        </h1>

        <p className="sdp-hero-sub" data-sdp-reveal style={d('.12s')}>
          Through a <strong>personalised 90-day nutrition &amp; lifestyle programme</strong> designed to
          address excess weight, improve hormonal &amp; metabolic health, and help increase your chances of
          getting pregnant.
        </p>

        <p className="sdp-hero-lead" data-sdp-reveal style={d('.15s')}>
          <strong>1,000+ clients across India, USA, UK, Australia, Ireland &amp; Germany</strong> have
          improved their weight &amp; overall health while managing concerns such as:
        </p>

        <div
          className="sdp-hero-markers"
          data-sdp-reveal
          style={d('.17s')}
          aria-label="Concerns clients were managing"
        >
          {CHIP_ROWS.map((row, r) => (
            <div className="sdp-hero-markers-row" key={r}>
              {row.map((m) => (
                <span className="sdp-marker-chip" key={m}>
                  <span className="sdp-marker-dot" aria-hidden />
                  {m}
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className="sdp-hero-portrait" data-sdp-reveal style={d('.22s')}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset('/somya/somya-circle.webp')} alt="Somya Luhadia" width={640} height={640} decoding="async" />
        </div>

        <div data-sdp-reveal style={d('.26s')}>
          <CtaLockup />
        </div>

        <div className="sdp-cred-row" data-sdp-reveal style={d('.34s')}>
          {CREDS.map((c) => (
            <div className="sdp-cred-card" key={c.num}>
              <div className="sdp-cred-num">{c.num}</div>
              <div className="sdp-cred-lbl">{c.lbl}</div>
            </div>
          ))}
          <div className="sdp-cred-card is-price">
            <div className="sdp-cred-num">{feeLabel}</div>
            <div className="sdp-cred-lbl">To Start</div>
          </div>
        </div>
      </div>
    </section>
  );
}
