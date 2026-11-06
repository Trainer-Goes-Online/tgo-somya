import { feeLabel } from '@/lib/site';
import { SectionMasthead } from './SectionMasthead';
import { PlusIcon } from './icons';

/**
 * BEAT 10 · FAQ (§5 ruled ledger, LIGHT). Native <details>, so it works
 * with no JS. Q1 opens on load. No "Most asked" pill: nobody has measured
 * which question is asked most. Each answer keeps the copy's paragraphs.
 */
const QA: { q: string; a: string[] }[] = [
  {
    q: 'Can this programme help me if I have PCOD, insulin resistance or endometriosis?',
    a: [
      'Yes. The programme is personalised around your existing health concerns, including PCOD, insulin resistance, hormonal imbalances and excess weight.',
      'Somya works on nutrition, weight management, exercise and daily lifestyle habits that can influence your metabolic and reproductive health, while you continue any necessary medical treatment.',
      'The goal is to improve the health factors that may be affecting your fertility rather than giving everyone the same diet plan.',
    ],
  },
  {
    q: "I've already tried IVF/IUI or fertility medications. Is this programme still suitable for me?",
    a: [
      'Yes & Yes. Many women want to work on their nutrition, weight and underlying health alongside or after fertility treatments.',
      "Somya's programme focuses on improving the lifestyle and metabolic factors within your control, particularly when concerns like PCOD, insulin resistance or excess weight are involved.",
      'However, coaching does not replace fertility treatment, and whether further medical intervention is needed depends on your individual situation.',
    ],
  },
  {
    q: 'Do I need to lose 5–15 kgs to conceive?',
    a: [
      "Not necessarily. Every woman's ideal weight and health requirements are different.",
      'Somya assesses your starting weight, health conditions and personal goals before setting a realistic target.',
      'For women carrying excess weight, appropriate weight loss may help improve metabolic health and certain fertility-related factors. But losing a specific number of kilos is not a requirement for pregnancy.',
    ],
  },
  {
    q: 'I work full-time and barely have time to cook or exercise. Will I be able to follow this programme?',
    a: [
      'Absolutely. The programme is designed to fit around your existing schedule, not force you to reorganise your entire life.',
      "Through Somya's Meal Prep System, you'll learn how to plan and prepare meals efficiently using everyday ingredients, without cooking separate diet meals or spending hours in the kitchen.",
      'Your workouts and daily routines are also personalised around your work commitments and fitness level.',
    ],
  },
  {
    q: 'Will I need to follow a strict diet, give up rice and roti or join a gym?',
    a: [
      'No. You can continue eating familiar home-cooked foods like roti, rice, dal and sabzi, with portions and combinations adjusted to your needs.',
      'There are no compulsory gym visits or extreme workout routines. Your exercise plan is built around your health, preferences and available time.',
      'The focus is on changes you can maintain consistently.',
    ],
  },
  {
    q: 'Will I work directly with Somya during the 90 days?',
    a: [
      "Your programme is personalised under Somya's coaching approach, with ongoing support from the GGT.Fit team.",
      "You'll receive regular progress reviews, plan adjustments, WhatsApp support and personal check-ins with Somya when needed, depending on your individual health concerns and progress.",
      'The exact support schedule will be explained during your consultation.',
    ],
  },
  {
    q: "What if I don't achieve my agreed goals within 90 days?",
    a: [
      'Somya offers a results-support guarantee based on the measurable health and weight-management goals agreed upon when you join.',
      "If you've consistently followed the programme but haven't achieved those agreed goals, your coaching can be extended at no additional cost under the programme's extension policy.",
      'Pregnancy itself is not guaranteed, as conception depends on several medical and biological factors beyond nutrition and lifestyle.',
    ],
  },
  {
    q: `What happens during the ${feeLabel} consultation?`,
    a: [
      'During your consultation, Somya will understand your health history, weight concerns, previous attempts, current lifestyle and conception goals.',
      "She'll help identify which areas may need attention and explain how her personalised 90-day coaching programme could fit your needs.",
      "You'll also get clarity on the coaching process, expected commitment and next steps before deciding whether to enrol.",
    ],
  },
];

export function Faq() {
  return (
    <section id="faq" className="sdp-faq sdp-light">
      <div className="sdp-wrap">
        <SectionMasthead
          title={
            <>
              Everything You Need To Know <br className="sdp-br-desk" />
              <em>Before Getting Started</em>
            </>
          }
          delay=".06s"
        />

        <div className="sdp-faq-list">
          {QA.map((item, i) => (
            <details className="sdp-q" key={item.q} open={i === 0}>
              <summary className="sdp-q-head">
                <span className="sdp-q-text">
                  <span className="qn">{i + 1}.</span>
                  {item.q}
                </span>
                <span className="ic" aria-hidden>
                  <PlusIcon />
                </span>
              </summary>
              <div className="sdp-q-inner">
                {item.a.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
