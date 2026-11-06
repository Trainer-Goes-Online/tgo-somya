import type { Metadata } from 'next';

import '../legal.css';
import { LegalPage, type Clause } from '@/components/legal/LegalPage';
import { LEGAL } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'The ₹97 booking fee and the 100% Results Guarantee.',
  robots: { index: false, follow: false },
};

/* Client-supplied policy text, verbatim. Do not rewrite. */
const CLAUSES: Clause[] = [
  {
    id: 'booking-fee',
    heading: 'The ₹97 Booking Fee',
    body: (
      <>
        <p>The ₹97 paid on this website is a one-time booking fee for your initial 1-on-1 consultation.</p>
        <p>
          Because this amount secures your consultation slot, it is non-refundable, except where a refund is
          required by applicable law.
        </p>
        <p>
          This booking fee is separate from the 90-day coaching programme, which you may choose to enrol in
          after your consultation.
        </p>
      </>
    ),
  },
  {
    id: 'results-guarantee',
    heading: 'Our 90-Day Results Guarantee',
    body: (
      <>
        <p>At the beginning of your programme, we assess your starting point across areas such as:</p>
        <ul>
          <li>Current weight and weight-loss history</li>
          <li>PCOD, insulin resistance, thyroid and other existing health concerns</li>
          <li>Hormonal and menstrual health</li>
          <li>Relevant health reports and markers, where available</li>
          <li>Nutrition, sleep, exercise and daily lifestyle habits</li>
          <li>Individual health and conception-related goals</li>
        </ul>
        <p>
          Based on this assessment, Somya and her team will establish realistic and measurable goals for your
          90-day programme.
        </p>
        <p>
          These may include improvements in weight, metabolic health, menstrual health, lifestyle habits and
          other relevant health indicators.
        </p>
        <p>If you:</p>
        <ul>
          <li>Complete your initial 90-day programme</li>
          <li>Follow your personalised nutrition and lifestyle plan consistently</li>
          <li>Attend the required check-ins and reviews</li>
          <li>Share requested progress updates and information</li>
          <li>Implement the agreed recommendations throughout the programme</li>
        </ul>
        <p>
          and do not achieve your agreed health goals, you may qualify for continued coaching at no additional
          cost under our Results Guarantee.
        </p>
        <p>This guarantee provides additional coaching support, not a refund of the programme fee.</p>
      </>
    ),
  },
  {
    id: 'eligibility',
    heading: 'Eligibility Requirements',
    body: (
      <>
        <p>To qualify for complimentary coaching extensions, you must:</p>
        <ul>
          <li>Follow your personalised nutrition and workout plans consistently.</li>
          <li>Attend scheduled check-ins and progress reviews.</li>
          <li>Submit requested meal pictures, weight updates and other progress information.</li>
          <li>Follow the lifestyle recommendations provided by Somya and her team.</li>
          <li>Complete the initial 90-day programme from your official start date.</li>
          <li>Remain actively engaged and communicate any difficulties that may affect your progress.</li>
        </ul>
        <p>
          The guarantee applies when the agreed programme has been followed consistently and the established
          goals remain unmet.
        </p>
      </>
    ),
  },
  {
    id: 'health-goals',
    heading: 'Your Personalised Health Goals',
    body: (
      <>
        <p>The same weight-loss targets and health improvements are not appropriate for every woman.</p>
        <p>
          For one client, the focus may be on losing excess weight and improving insulin resistance. For
          another, it may involve managing PCOD-related concerns, improving menstrual health or establishing
          healthier metabolic markers.
        </p>
        <p>
          Your goals will be established based on your individual starting point, health history and what is
          realistic for your situation.
        </p>
        <p>
          The goals agreed upon at the beginning of your programme will form the basis of your Results
          Guarantee.
        </p>
        <p>Pregnancy or conception within a specific timeline is not a guaranteed outcome of the programme.</p>
      </>
    ),
  },
  {
    id: 'extensions',
    heading: 'Complimentary Coaching Extensions',
    body: (
      <>
        <p>
          If you have completed the initial 90-day programme, consistently fulfilled the participation
          requirements and have not achieved your agreed health goals, Somya and her team will review your
          progress to determine the additional coaching support required.
        </p>
        <p>The extension will be personalised based on factors such as:</p>
        <ul>
          <li>Your initial health condition and agreed goals</li>
          <li>Progress achieved during the first 90 days</li>
          <li>Your body&rsquo;s response to the programme</li>
          <li>Consistency in following the recommended plan</li>
          <li>Any relevant health or lifestyle circumstances affecting your progress</li>
        </ul>
        <p>
          The duration and structure of the complimentary extension will be determined by Somya and the GGT.Fit
          team based on your individual situation and progress.
        </p>
        <p>There is no fixed extension duration applicable to every client.</p>
        <p>
          Extensions are intended to provide continued guidance towards your agreed health goals and do not
          constitute a guarantee of pregnancy or any specific medical outcome.
        </p>
      </>
    ),
  },
  {
    id: 'refunds-cancellations',
    heading: 'Refunds & Cancellations',
    body: (
      <>
        <p>The ₹97 consultation booking fee is non-refundable, subject to applicable law.</p>
        <p>
          Once you enrol in the 90-day coaching programme, your personalised assessment, programme planning and
          coaching services begin.
        </p>
        <p>
          Accordingly, programme fees are not refundable under the 100% Results Guarantee. Eligible clients who
          meet the requirements but do not achieve their agreed health goals will instead receive complimentary
          coaching extensions as described above.
        </p>
        <p>
          Requests for cancellation or refunds will be reviewed in accordance with the applicable terms of
          enrolment and any rights provided by law.
        </p>
      </>
    ),
  },
  {
    id: 'guarantee-exclusions',
    heading: 'Situations Where the Results Guarantee Does Not Apply',
    nav: 'When the guarantee does not apply',
    body: (
      <>
        <p>Complimentary coaching extensions may not be available if:</p>
        <ul>
          <li>The personalised nutrition or lifestyle plan was not followed consistently.</li>
          <li>Scheduled check-ins or progress reviews were repeatedly missed.</li>
          <li>Required meal pictures, weight updates or other progress information were not submitted.</li>
          <li>Recommendations provided by Somya and her team were repeatedly not implemented.</li>
          <li>The programme was discontinued before completing the initial 90 days.</li>
          <li>The client became inactive or did not provide the information needed to assess progress.</li>
        </ul>
        <p>
          If your programme is interrupted because of travel, work commitments, pregnancy, illness or other
          personal circumstances, Somya and her team will review the situation individually to determine
          whether an adjustment, pause or extension is appropriate.
        </p>
        <p>
          Any changes to the programme schedule or guarantee eligibility must be agreed upon with the GGT.Fit
          team.
        </p>
      </>
    ),
  },
  {
    id: 'medical-care',
    heading: 'Fertility Outcomes & Medical Care',
    body: (
      <>
        <p>
          Our programme focuses on improving nutrition, weight management, hormonal and metabolic health, and
          lifestyle factors that may influence fertility.
        </p>
        <p>
          It does not replace medical diagnosis, prescribed medication, fertility treatment or advice from your
          gynaecologist or other qualified healthcare professional.
        </p>
        <p>
          Because pregnancy depends on several medical and biological factors, conception or pregnancy within
          90 days, or any other specific timeline, cannot be guaranteed.
        </p>
        <p>
          Our Results Guarantee applies to the agreed and measurable health goals established at the beginning
          of your programme, not to pregnancy itself.
        </p>
      </>
    ),
  },
  {
    id: 'guarantee-review',
    heading: 'How To Request A Results Guarantee Review',
    nav: 'Requesting a guarantee review',
    body: (
      <>
        <p>
          If you have completed your 90-day programme and believe you qualify for continued coaching, please
          contact the GGT.Fit support team through your existing programme support channel or at:
        </p>
        <p>
          <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>
        </p>
        <p>Somya and her team will review:</p>
        <ul>
          <li>Your initial assessment and agreed goals</li>
          <li>Your progress throughout the programme</li>
          <li>Your participation and adherence records</li>
          <li>The outcomes achieved against your starting point</li>
        </ul>
        <p>
          If you meet the eligibility requirements and your agreed goals remain unmet, the team will
          communicate the next steps for your complimentary coaching extension.
        </p>
      </>
    ),
  },
  {
    id: 'commitment',
    heading: 'Our Commitment',
    body: (
      <>
        <p>We believe meaningful health transformations require commitment from both sides.</p>
        <p>
          From our side, we commit to providing personalised nutrition and lifestyle coaching, ongoing
          guidance, regular progress reviews and adjustments based on your needs.
        </p>
        <p>
          From your side, we ask that you follow the agreed programme consistently, remain engaged and complete
          the required participation steps.
        </p>
        <p>
          If you fulfil your commitments but do not achieve your agreed health goals within the initial 90
          days, we will continue supporting you through complimentary coaching, with the extension determined
          according to your individual circumstances.
        </p>
        <p>That is our 100% Results Guarantee.</p>
      </>
    ),
  },
];

export default function RefundPage() {
  return (
    <LegalPage
      eyebrow="Refund Policy"
      title={
        <>
          Refund <em>Policy</em>
        </>
      }
      lede={
        <>
          <p>
            Our goal is to help you improve your weight, hormonal health, metabolic health and relevant
            fertility-related health factors through a personalised 90-day nutrition and lifestyle programme.
          </p>
          <p>
            Because every woman begins with different health conditions, weight-loss needs and lifestyle
            challenges, we do not promise identical results for everyone.
          </p>
          <p>
            Instead, we assess your starting point, establish realistic and measurable health goals, and create
            a personalised 90-day plan to help you work towards them.
          </p>
          <p>
            That is why we back our programme with a 100% Results Guarantee, where eligible clients who do not
            achieve their agreed health goals receive continued coaching at no additional cost.
          </p>
        </>
      }
      clauses={CLAUSES}
      close={{
        heading: (
          <>
            Questions about the <em>guarantee</em>?
          </>
        ),
        body: 'Write to us at the email address below.',
      }}
    />
  );
}
