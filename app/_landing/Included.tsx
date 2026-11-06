import type { CSSProperties, ReactNode } from 'react';
import { CtaLockup } from './CtaLockup';
import {
  ChatSupportIcon,
  ClipboardPulseIcon,
  DumbbellIcon,
  MealPrepIcon,
  PlateIcon,
  TrendIcon,
} from './icons';
import { SectionMasthead } from './SectionMasthead';

/**
 * BEAT 7 · what's included (§3 accumulation, LIGHT). Six components that
 * run together, so one distinct glyph per card and NO ordinal (blueprint
 * beat 7). Titles and descriptions verbatim.
 */
const ITEMS: { title: string; desc: string; icon: ReactNode }[] = [
  {
    title: 'COMPLETE HEALTH & LIFESTYLE ASSESSMENT',
    desc: 'We begin by understanding your weight history, PCOD, insulin resistance, menstrual cycles, existing health concerns, food habits, sleep, activity levels and work schedule to identify what needs attention and build a plan around your starting point.',
    icon: <ClipboardPulseIcon />,
  },
  {
    title: 'PERSONALISED NUTRITION & WEIGHT-LOSS PLAN',
    desc: 'Get a personalised nutrition plan based on your health conditions, weight-loss goals, food preferences and daily routine, designed to help you manage excess weight and metabolic health without crash diets, starving yourself or giving up your regular meals.',
    icon: <PlateIcon />,
  },
  {
    title: 'SIGNATURE MEAL PREP & PLANNING SYSTEM',
    desc: "Learn Somya's practical Meal Prep System, which helps you plan and prepare ingredients in advance so you can eat healthy throughout the week without spending hours cooking, preparing separate diet meals or disrupting your work schedule.",
    icon: <MealPrepIcon />,
  },
  {
    title: 'PERSONALISED WORKOUT & LIFESTYLE ROUTINE',
    desc: 'Receive workouts suited to your fitness level, health concerns and daily schedule, along with personalised guidance on sleep, movement, daily activity and supplementation where appropriate. No compulsory gym visits or exhausting workout routines.',
    icon: <DumbbellIcon />,
  },
  {
    title: 'REGULAR PROGRESS REVIEWS & PLAN ADJUSTMENTS',
    desc: 'Your weight, eating habits, activity levels and overall progress are regularly reviewed, with nutrition and lifestyle adjustments based on how your body responds. Personal check-ins with Somya are scheduled according to your individual needs.',
    icon: <TrendIcon />,
  },
  {
    title: 'DIRECT ACCOUNTABILITY & ONGOING SUPPORT',
    desc: 'Stay connected through a dedicated WhatsApp support group where you can share progress updates, ask questions, address challenges and receive ongoing guidance, helping you stay consistent even with a demanding work schedule.',
    icon: <ChatSupportIcon />,
  },
];

export function Included() {
  return (
    <section id="included" className="sdp-prog sdp-light">
      <div className="sdp-wrap">
        <SectionMasthead
          title={
            <>
              What&apos;s Included In Your <em>90-Day</em> Fertility &amp; <br className="sdp-br-desk" />
              Weight Management Programme
            </>
          }
          sub="Six personalised components designed to help you lose excess weight, improve hormonal & metabolic health, and work towards conception without complicated diets or routines."
          delay=".06s"
        />

        <div className="sdp-prog-grid">
          {ITEMS.map((it, i) => (
            <article
              className="sdp-prog-card"
              key={it.title}
              data-sdp-reveal
              style={{ '--d': `${0.04 + (i % 3) * 0.06}s` } as CSSProperties}
            >
              <span className="sdp-prog-icon" aria-hidden>
                {it.icon}
              </span>
              <h3 className="sdp-prog-title">{it.title}</h3>
              <p className="sdp-prog-desc">{it.desc}</p>
            </article>
          ))}
        </div>

        <div className="sdp-prog-cta" data-sdp-reveal>
          <CtaLockup />
        </div>
      </div>
    </section>
  );
}
