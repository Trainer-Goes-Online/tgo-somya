import { CtaLockup } from './CtaLockup';
import { CheckIcon, ShieldCheckIcon } from './icons';

/**
 * BEAT 8 · guarantee (seal card, DARK: risk).
 * The promise is an assurance, so it is type. "What We Ask In Return" is a
 * set of terms, so it earns rows. The fifth term has no explanation in the
 * copy and gets none.
 */
const ASKS = [
  {
    head: 'Your starting point is assessed on Day 1.',
    body: 'We assess your weight, PCOD, insulin resistance, menstrual health and other relevant fertility-related concerns to understand where you stand.',
  },
  {
    head: 'Your 90-day goals are personalised.',
    body: 'Somya creates a plan with clear weight-loss, hormonal health and fertility-readiness goals based on your starting point.',
  },
  {
    head: 'You follow the programme consistently.',
    body: 'Follow your nutrition and workout plans, attend check-ins and share regular progress updates.',
  },
  {
    head: 'Your progress is tracked throughout.',
    body: 'We review your weight, menstrual health and agreed health markers, adjusting your plan based on how your body responds.',
  },
  { head: 'Your 90 days begin from your programme start date.' },
] as const;

export function Guarantee() {
  return (
    <section id="guarantee" className="sdp-guar sdp-dark">
      <div className="sdp-wrap">
        <div className="sdp-guarantee-card" data-sdp-reveal>
          <div className="sdp-guarantee-icon" aria-hidden>
            <ShieldCheckIcon size={42} />
          </div>

          <h2 className="sdp-h2 sdp-guarantee-h">
            100% <em>Results</em> Guaranteed
          </h2>

          <p className="sdp-guarantee-promise">
            Improve Your Fertility Readiness In 90 Days. <br />
            Or We&apos;ll Continue Coaching You For Free.
          </p>

          <div className="sdp-ask">
            <h3 className="sdp-ask-title">What We Ask In Return</h3>
            <ul>
              {ASKS.map((a) => (
                <li className="sdp-ask-row" key={a.head}>
                  <span className="sdp-ask-ck" aria-hidden>
                    <CheckIcon />
                  </span>
                  <div>
                    <strong className="sdp-ask-head">{a.head}</strong>
                    {'body' in a && <p>{a.body}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="sdp-guar-cta" data-sdp-reveal>
          <CtaLockup />
        </div>
      </div>
    </section>
  );
}
