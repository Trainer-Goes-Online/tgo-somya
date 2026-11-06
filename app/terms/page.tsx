import type { Metadata } from 'next';

import '../legal.css';
import { LegalPage, type Clause } from '@/components/legal/LegalPage';
import { EMAIL_LABEL, LEGAL, STRUCTURE_KNOWN } from '@/lib/legal';
import { feeLabel } from '@/lib/site';
import {
  GUARANTEE_NAME,
  GUARANTEE_TERMS,
  PROGRAMME_COMPONENTS,
  PROGRAMME_TITLE,
  START_SCOPE,
} from '@/lib/offer';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'The terms on which the programme is provided.',
  robots: { index: false, follow: false },
};

const CLAUSES: Clause[] = [
  {
    id: 'these-terms',
    heading: 'These terms',
    body: (
      <p>
        These terms apply when you use this website, pay the {feeLabel} to start, or join the{' '}
        {PROGRAMME_TITLE} provided by {LEGAL.entity}
        {STRUCTURE_KNOWN ? `, ${LEGAL.structure},` : ''}
        {LEGAL.tradeName ? ` trading as ${LEGAL.tradeName}` : ''}. By paying
        you accept these terms. If you do not accept them, please do not pay.
      </p>
    ),
  },
  {
    id: 'health-disclaimer',
    heading: 'Health disclaimer',
    body: (
      <>
        <p>
          This is a nutrition and lifestyle programme. It is not medical treatment, and nothing
          on this website or in your plan is a medical diagnosis or a prescription.
        </p>
        <ul>
          <li>It does not replace your doctor or any other treating clinician.</li>
          <li>
            <b>
              Do not start, stop or change any prescribed medication or treatment because of
              anything we tell you.
            </b>{' '}
            Those decisions are for your treating doctor.
          </li>
          <li>
            Tell us about your medical conditions and medication before you begin, and keep us
            updated if they change.
          </li>
          <li>If you feel unwell at any point, stop and seek medical attention.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'results',
    heading: 'Results',
    body: (
      <p>
        The stories and figures shown on this website are outcomes reported by individual
        clients. They are examples, not a promise of what you will achieve. Results differ from
        person to person and depend on your starting point, your health history and how
        consistently a plan is followed.
      </p>
    ),
  },
  {
    id: 'the-start-fee',
    heading: `The ${feeLabel} you pay to start`,
    nav: `The ${feeLabel} start fee`,
    body: <p>{START_SCOPE}</p>,
  },
  {
    id: 'the-programme',
    heading: `The ${PROGRAMME_TITLE}`,
    nav: 'The programme',
    body: (
      <>
        <p>If you join, you receive the components described on the landing page:</p>
        <ul>
          {PROGRAMME_COMPONENTS.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <p>
          The programme is not sold or priced on this website. The only amount this site
          charges is the {feeLabel} described above.
        </p>
      </>
    ),
  },
  {
    id: 'guarantee',
    heading: GUARANTEE_NAME,
    nav: 'The guarantee',
    body: (
      <p>
        {GUARANTEE_TERMS} The conditions that apply are set out on the Refund Policy
        page, which forms part of these terms.
      </p>
    ),
  },
  {
    id: 'payment',
    heading: 'Payment',
    body: (
      <p>
        Payments are taken through our payment gateway. Prices are shown in Indian Rupees. We do
        not see or store your card details.
      </p>
    ),
  },
  {
    id: 'our-materials',
    heading: 'Our materials',
    body: (
      <p>
        The plans, guides and other materials we give you are licensed to you for your personal
        use. Please do not copy, publish or distribute them.
      </p>
    ),
  },
  {
    id: 'liability',
    heading: 'Limitation of liability',
    body: (
      <p>
        To the extent permitted by law, our total liability to you is limited to the amount you
        have paid us. Nothing in these terms limits liability that cannot be limited by law.
      </p>
    ),
  },
  {
    id: 'governing-law',
    heading: 'Governing law',
    body: (
      <p>
        These terms are governed by the laws of India. The courts in {LEGAL.jurisdiction} have
        exclusive jurisdiction over any dispute arising from them.
      </p>
    ),
  },
  {
    id: 'contact',
    heading: 'Contact',
    body: (
      <p>
        Questions about these terms go to{' '}
        {LEGAL.email ? <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a> : EMAIL_LABEL}. Our full
        business details are below.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms & Conditions"
      title={
        <>
          The <em>terms</em> we work with you on
        </>
      }
      lede={
        <p>
          These terms cover what you pay for, the programme itself, and the limits of what a
          nutrition and lifestyle programme can do.
        </p>
      }
      clauses={CLAUSES}
      close={{
        heading: (
          <>
            Ask before you <em>pay</em>
          </>
        ),
        body: 'If anything on this page is unclear, put the question to us first.',
      }}
    />
  );
}
