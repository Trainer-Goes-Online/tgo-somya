import type { CSSProperties } from 'react';
import { CtaLockup } from './CtaLockup';
import { Rail, RailImage, type Shot } from './Rail';
import { SectionMasthead } from './SectionMasthead';

/**
 * BEAT 4b · proof B: the conversation wall (§6 volume, LIGHT-ALT). The claim
 * is the count, so the form is the counter-scrolling wall: Chat 1 to 7 left
 * to right, Chat 8 to 14 right to left, as the copy asks.
 *
 * A row loops by sliding half its track, so one set must be wider than the
 * widest screen: each row's seven repeat once inside the set.
 */
const SIZE: Record<number, [number, number]> = {
  1: [468, 1040],
  7: [1077, 1040],
  8: [466, 1040],
  11: [1290, 740],
  12: [468, 1040],
  13: [468, 1040],
  14: [468, 1040],
};

const chat = (n: number): Shot => {
  const id = String(n).padStart(2, '0');
  const [w, h] = SIZE[n] ?? [480, 1040];
  return { src: `/client-chats/chat-${id}.webp`, w, h, alt: `Client conversation ${n}` };
};

const range = (from: number) => Array.from({ length: 7 }, (_, i) => chat(from + i));
const ROW_1 = [...range(1), ...range(1)];
const ROW_2 = [...range(8), ...range(8)];

export function ConversationWall() {
  return (
    <section id="conversations" className="sdp-wa sdp-light-alt">
      <div className="sdp-wrap">
        <SectionMasthead
          title={
            <>
              Thousands Of Lives Touched. <br className="sdp-br-desk" />
              Hundreds Of Health <em>Transformations.</em>
            </>
          }
          sub="Here's a small glimpse into our clients' journeys."
          delay=".06s"
        />
      </div>

      <div className="sdp-wa-rows" data-sdp-reveal style={{ '--d': '.12s' } as CSSProperties}>
        <Rail
          dir="ltr"
          render={(inert) => ROW_1.map((s, i) => <RailImage key={`${s.src}-${i}`} shot={s} inert={inert || i >= 7} />)}
        />
        <Rail
          dir="rtl"
          render={(inert) => ROW_2.map((s, i) => <RailImage key={`${s.src}-${i}`} shot={s} inert={inert || i >= 7} />)}
        />
      </div>

      <div className="sdp-wrap">
        <div className="sdp-proof-cta" data-sdp-reveal>
          <CtaLockup />
        </div>
      </div>
    </section>
  );
}
