import { site } from '@/lib/site';
import { CTA_LINES } from './cta';
import { ArrowRightIcon, ShieldCheckIcon, StarIcon } from './icons';

/**
 * BEAT 12 · sticky CTA, the SDP StickyBottomStrip as on Kunal / Sandesh / CSO:
 * pulse + headline + two badges on the left, CTA on the right. Always on, so
 * `.sdp-root` reserves its height (landing.css §16).
 */
export function StickyCta() {
  return (
    <div className="sdp-stuck on">
      <div className="sdp-stuck-inner">
        <div className="sdp-stuck-meta">
          <span className="sdp-stuck-pulse" aria-hidden />
          <div className="sdp-stuck-text">
            <div className="sdp-stuck-h">
              Your Personalised <em>Fertility &amp; Weight-Loss Plan</em>
            </div>
            <div className="sdp-stuck-s">
              <span className="sdp-stuck-badge">
                <ShieldCheckIcon size={13} />
                <span>
                  <b>100%</b> Results Guarantee
                </span>
              </span>
              <span className="sdp-stuck-sep" aria-hidden>
                ·
              </span>
              <span className="sdp-stuck-badge">
                <StarIcon size={13} />
                <span>
                  <b>1000+</b> Women Guided Globally
                </span>
              </span>
            </div>
          </div>
        </div>

        <a className="sdp-stuck-go" href={site.checkoutUrl} data-cta>
          <span className="cta-label">
            <span className="cta-l">{CTA_LINES[0]}</span> <span className="cta-l">{CTA_LINES[1]}</span>
          </span>
          <span className="arrow" aria-hidden>
            <ArrowRightIcon size={12} />
          </span>
        </a>
      </div>
    </div>
  );
}
