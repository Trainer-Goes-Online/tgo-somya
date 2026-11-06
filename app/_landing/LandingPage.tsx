import './landing.css';

import { AnnounceStrip } from './AnnounceStrip';
import { ConversationWall } from './ConversationWall';
import { Expert } from './Expert';
import { Faq } from './Faq';
import { Finale } from './Finale';
import { ForYouIf } from './ForYouIf';
import { Guarantee } from './Guarantee';
import { Hero } from './Hero';
import { Included } from './Included';
import { ScrollReveal } from './ScrollReveal';
import { StickyCta } from './StickyCta';
import { Stories } from './Stories';
import { Transformations } from './Transformations';
import { TrustRow } from './TrustRow';

/**
 * Somya Luhadia · GGT.Fit fertility and weight-management VSL. SDP VSL skin:
 *
 *   0a announcement strip   §11 chrome                    brand bar
 *   0b trust row            §12                           light-alt strip
 *   1  hero / VSL           §8 focal media                stage
 *   2  this is for you if   §2 one-sided ✓ list           LIGHT
 *   3/4 their stories       video column + story rail     LIGHT-ALT
 *   3b transformations      §6 counter-scrolling rails    LIGHT
 *   4b conversation wall    §6 volume                     LIGHT-ALT
 *   5  coach                pills + TEXT + media rail     DARK
 *   7  what's included      §3 programme grid             LIGHT
 *   8  guarantee            seal card + terms             DARK
 *   10 faq                  §5 ruled ledger               LIGHT
 *   11 finale               the peak                      DARK
 *   12 sticky cta           chrome
 *
 * Beats 6 (Mechanism) and 9 (Two Choices) are absent: the copy has neither.
 */
export default function LandingPage() {
  return (
    <main className="sdp-root">
      <ScrollReveal />
      <AnnounceStrip />
      <TrustRow />
      <Hero />
      <ForYouIf />
      <Stories />
      <Transformations />
      <ConversationWall />
      <Expert />
      <Included />
      <Guarantee />
      <Faq />
      <Finale />
      <StickyCta />
    </main>
  );
}
