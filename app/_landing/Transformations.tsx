import { Rail, RailImage, type Shot } from './Rail';
import { SectionMasthead } from './SectionMasthead';

/**
 * BEAT 3b · from stubborn weight to visible transformations (§6 counter-
 * scrolling before/after rails, LIGHT). Row 1 left to right, row 2 right
 * to left, as the copy asks.
 *
 * Every card is a finished graphic (name, story title, BEFORE / AFTER chips
 * and the @somya_luhadia credit are in the artwork), so the page adds no
 * labels of its own. ba-28 is the one square, hand-dated pair; fixed height
 * and natural width keep it whole beside the 4:5 cards.
 *
 * The copy asks for 15 per row; 28 files are cleared for use (three more are
 * held until the faces are edited), so the rows are 14 and 14.
 */
const n2 = (n: number) => String(n).padStart(2, '0');

const card = (n: number): Shot => ({
  src: `/before-after/ba-${n2(n)}.webp`,
  w: 720,
  h: n === 28 ? 720 : 900,
  alt: `Client before and after transformation ${n}`,
});

const ROW_1 = Array.from({ length: 14 }, (_, i) => card(i + 1));
const ROW_2 = Array.from({ length: 14 }, (_, i) => card(i + 15));

export function Transformations() {
  return (
    <section id="transformations" className="sdp-proof sdp-light">
      <div className="sdp-wrap">
        <SectionMasthead
          title={
            <>
              From Stubborn Weight To <br className="sdp-br-desk" />
              <em>Visible Transformations</em>
            </>
          }
          delay=".06s"
        />
      </div>

      <div className="sdp-ba-rails" data-sdp-reveal>
        <Rail dir="ltr" render={(inert) => ROW_1.map((s) => <RailImage key={s.src} shot={s} inert={inert} />)} />
        <Rail dir="rtl" render={(inert) => ROW_2.map((s) => <RailImage key={s.src} shot={s} inert={inert} />)} />
      </div>
    </section>
  );
}
