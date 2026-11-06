/**
 * What is being sold, read by the checkout, the booking page, the thank-you and
 * the policy pages. Every string is from funnel-copy/01-landing-vsl.md.
 */
export const OFFER_PENDING = false;

/** The checkout line item and the payment sheet. The CTA's own words. */
export const START_TITLE = 'Your Personalised Fertility & Weight-Loss Plan';

/** Who the buyer meets. FAQ 8: "During your consultation, Somya will..." */
export const START_WITH = 'With Somya Luhadia';

export const START_DURATION = '30 min';

/** What the consultation covers, as line items, from FAQ 8. */
export const START_COVERS: string[] = [
  'Your health history, weight concerns, previous attempts, current lifestyle and conception goals',
  'Which areas may need attention',
  'How the personalised 90-day coaching programme could fit your needs',
  'Clarity on the coaching process, expected commitment and next steps before deciding whether to enrol',
];

/** What the fee is and is not. FAQ 8 places the enrolment decision after the consultation. */
export const START_SCOPE =
  'The ₹97 books your consultation with Somya. Whether to enrol in the 90-Day Fertility & Weight Management Programme is decided after your consultation.';

/* Neutral labels for Razorpay's sheet, the GA4 item and Pabbly. They never reach
   Meta, and are kept apart from START_TITLE so a condition word cannot leak into
   a tracked payload when that is edited. */
export const PRODUCT_LABEL = 'Consultation Booking';
export const GA4_ITEM_ID = 'somya-start';

/* ── Verbatim from funnel-copy/01-landing-vsl.md ─────────────────────────── */

export const PROGRAMME_TITLE = '90-Day Fertility & Weight Management Programme';

export const PROGRAMME_COMPONENTS = [
  'COMPLETE HEALTH & LIFESTYLE ASSESSMENT',
  'PERSONALISED NUTRITION & WEIGHT-LOSS PLAN',
  'SIGNATURE MEAL PREP & PLANNING SYSTEM',
  'PERSONALISED WORKOUT & LIFESTYLE ROUTINE',
  'REGULAR PROGRESS REVIEWS & PLAN ADJUSTMENTS',
  'DIRECT ACCOUNTABILITY & ONGOING SUPPORT',
] as const;

export const GUARANTEE_NAME = '100% Results Guaranteed';

export const GUARANTEE_TERMS =
  "Improve Your Fertility Readiness In 90 Days. Or We'll Continue Coaching You For Free.";

export const GUARANTEE_ASKS: { title: string; body?: string }[] = [
  {
    title: 'Your starting point is assessed on Day 1.',
    body: 'We assess your weight, PCOD, insulin resistance, menstrual health and other relevant fertility-related concerns to understand where you stand.',
  },
  {
    title: 'Your 90-day goals are personalised.',
    body: 'Somya creates a plan with clear weight-loss, hormonal health and fertility-readiness goals based on your starting point.',
  },
  {
    title: 'You follow the programme consistently.',
    body: 'Follow your nutrition and workout plans, attend check-ins and share regular progress updates.',
  },
  {
    title: 'Your progress is tracked throughout.',
    body: 'We review your weight, menstrual health and agreed health markers, adjusting your plan based on how your body responds.',
  },
  { title: 'Your 90 days begin from your programme start date.' },
];

/** FAQ 7, verbatim. The guarantee's own conditions. */
export const FAQ_GOALS = {
  q: "What if I don't achieve my agreed goals within 90 days?",
  a: [
    'Somya offers a results-support guarantee based on the measurable health and weight-management goals agreed upon when you join.',
    "If you've consistently followed the programme but haven't achieved those agreed goals, your coaching can be extended at no additional cost under the programme's extension policy.",
    'Pregnancy itself is not guaranteed, as conception depends on several medical and biological factors beyond nutrition and lifestyle.',
  ],
};

/** FAQ 6, verbatim. Who the buyer works with. */
export const FAQ_WHO = {
  q: 'Will I work directly with Somya during the 90 days?',
  a: [
    "Your programme is personalised under Somya's coaching approach, with ongoing support from the GGT.Fit team.",
    "You'll receive regular progress reviews, plan adjustments, WhatsApp support and personal check-ins with Somya when needed, depending on your individual health concerns and progress.",
    'The exact support schedule will be explained during your consultation.',
  ],
};

/** FAQ 8, verbatim. What the call is. */
export const FAQ_CONSULT = {
  q: 'What happens during the ₹97 consultation?',
  a: [
    'During your consultation, Somya will understand your health history, weight concerns, previous attempts, current lifestyle and conception goals.',
    "She'll help identify which areas may need attention and explain how her personalised 90-day coaching programme could fit your needs.",
    "You'll also get clarity on the coaching process, expected commitment and next steps before deciding whether to enrol.",
  ],
};

/** What to have ready, from the Day 1 assessment list (guarantee) and FAQ 8, in their words. */
export const HAVE_READY: { title: string; body: string }[] = [
  {
    title: 'Your health history',
    body: 'Your weight, PCOD, insulin resistance, menstrual health and other relevant fertility-related concerns.',
  },
  {
    title: 'Your previous attempts',
    body: 'The diets, workout plans and treatments you have already tried.',
  },
  {
    title: 'Your current lifestyle',
    body: 'Food habits, sleep, activity levels and work schedule.',
  },
  {
    title: 'Your conception goals',
    body: 'Where you are in your journey, so the plan is built around your starting point.',
  },
];
