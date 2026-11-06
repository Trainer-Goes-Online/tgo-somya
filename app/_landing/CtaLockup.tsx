import { site } from '@/lib/site';
import { CTA_LINES } from './cta';
import { ArrowRightIcon, FlameIcon, PercentBadgeIcon, StarIcon } from './icons';
import { OfferTimer } from './OfferTimer';

/**
 * The CTA lockup, identical at every occurrence: button, the copy's three
 * risk badges, the offer countdown. Badge labels verbatim; emoji become glyphs.
 */
const BADGES = [
  { label: '100% Results Guarantee', Icon: StarIcon, tone: 'sdp-risk-icon-gold' },
  { label: '1000+ Women Guided Globally', Icon: FlameIcon, tone: 'sdp-risk-icon-red' },
  { label: '100% Personalised Fertility Approach', Icon: PercentBadgeIcon, tone: 'sdp-risk-icon-blue' },
] as const;

export function CtaButton() {
  return (
    <a className="sdp-cta" href={site.checkoutUrl} data-cta>
      <span className="cta-label">
        <span className="cta-l">{CTA_LINES[0]}</span> <span className="cta-l">{CTA_LINES[1]}</span>
      </span>
      <span className="arrow" aria-hidden>
        <ArrowRightIcon />
      </span>
    </a>
  );
}

export function CtaLockup() {
  return (
    <div className="sdp-lockup">
      <CtaButton />
      <div className="sdp-risk-strip">
        {BADGES.map(({ label, Icon, tone }) => (
          <span className="sdp-risk-badge" key={label}>
            <span className={`sdp-risk-icon ${tone}`} aria-hidden>
              <Icon />
            </span>
            {label}
          </span>
        ))}
      </div>
      <OfferTimer />
    </div>
  );
}
