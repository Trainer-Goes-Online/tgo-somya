import type { CSSProperties } from 'react';
import { CtaLockup } from './CtaLockup';
import { CheckIcon } from './icons';
import { SectionMasthead } from './SectionMasthead';

/**
 * BEAT 2 · this is for you if (§2, one-sided ✓ self-recognition list).
 * The copy disqualifies nobody, so no ✗ column. Each row's opening clause is
 * set bold at the sentence's own seam; every word is the copy's.
 */
const ITEMS = [
  {
    head: "Every month you're hoping for a positive pregnancy test,",
    body: "but despite trying for so long, you're still waiting for the result you've been praying for.",
  },
  {
    head: 'Your gynaecologist has advised you to lose weight before trying to conceive again,',
    body: "but despite multiple diets and workout plans, you're struggling to lose those stubborn 5–15 kgs.",
  },
  {
    head: "You're dealing with PCOD, insulin resistance, endometriosis or irregular periods,",
    body: 'and want to address these underlying health concerns as part of your conception journey.',
  },
  {
    head: 'You have a demanding job and barely enough time to plan meals, exercise or follow complicated health routines,',
    body: 'even though you know your health needs attention.',
  },
  {
    head: "You're tired of temporary diets",
    body: 'and want a personalised nutrition & lifestyle approach that helps you manage your weight, improve metabolic health and work towards conceiving.',
  },
] as const;

export function ForYouIf() {
  return (
    <section id="for-you" className="sdp-who sdp-light">
      <div className="sdp-wrap">
        <SectionMasthead
          eyebrow="For Busy Working Women Struggling To Get Pregnant"
          title={
            <>
              This Is For You <em>if:</em>
            </>
          }
          delay=".06s"
        />

        <ul className="sdp-who-list">
          {ITEMS.map((it, i) => (
            <li key={it.head} data-sdp-reveal style={{ '--d': `${0.04 + i * 0.05}s` } as CSSProperties}>
              <span className="ck" aria-hidden>
                <CheckIcon />
              </span>
              <span>
                <strong>{it.head}</strong> {it.body}
              </span>
            </li>
          ))}
        </ul>

        <div className="sdp-who-cta" data-sdp-reveal>
          <CtaLockup />
        </div>
      </div>
    </section>
  );
}
