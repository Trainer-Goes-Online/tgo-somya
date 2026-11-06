import type { Metadata } from 'next';

import '../legal.css';
import { LegalPage, type Clause } from '@/components/legal/LegalPage';
import { EMAIL_LABEL, LEGAL } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How we collect, use and protect your personal and health information.',
  robots: { index: false, follow: false },
};

const Mail = () =>
  LEGAL.email ? <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a> : <>{EMAIL_LABEL}</>;

const CLAUSES: Clause[] = [
  {
    id: 'who-we-are',
    heading: 'Who we are',
    body: (
      <p>
        This website is operated by {LEGAL.entity}
        {LEGAL.tradeName ? `, trading as ${LEGAL.tradeName}` : ''}. Where this
        policy says &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;, it means that
        business. Our full contact details are at the foot of this page, and you can reach us
        about anything in this policy at <Mail />.
      </p>
    ),
  },
  {
    id: 'what-we-collect',
    heading: 'What we collect',
    body: (
      <>
        <p>We collect only what we need to build and run your plan.</p>
        <ul>
          <li>
            <b>Contact details</b> you give us: your name, email address, phone or WhatsApp
            number, and your city and country.
          </li>
          <li>
            <b>Health information</b> you choose to share: your weight history, menstrual
            health, medical reports, history and diagnoses, current medication, supplements and
            fertility treatment, eating habits, sleep, activity levels and your daily routine.
          </li>
          <li>
            <b>Payment information</b> processed by our payment gateway. Card and banking
            details are handled by the gateway and are never stored on our servers.
          </li>
          <li>
            <b>Usage information</b> collected automatically when you visit: pages viewed,
            referring source, approximate location from your IP address, and device and browser
            type.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'health-information',
    heading: 'Your health information',
    body: (
      <>
        <p>
          We use your health information for one purpose: to understand your current health
          picture, build your personalised plan and review your progress.
        </p>
        <ul>
          <li>It is seen only by the people working directly on your plan.</li>
          <li>
            We do not sell it, rent it, or share it with advertisers, and we do not use it to
            target advertising to you.
          </li>
          <li>
            We do not publish your reports, photographs, results or messages anywhere without
            asking you first and getting your agreement in writing.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'how-we-use-it',
    heading: 'How we use your information',
    nav: 'How we use it',
    body: (
      <>
        <p>We use what we collect to:</p>
        <ul>
          <li>review your reports and build your personalised plan;</li>
          <li>
            contact you about your booking, your plan and your progress, including over email,
            phone and WhatsApp;
          </li>
          <li>take payment and issue receipts;</li>
          <li>
            understand how this website is used, so we can improve it and measure which of our
            advertisements are working;
          </li>
          <li>meet our legal and tax obligations.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'cookies',
    heading: 'Cookies, analytics and advertising',
    nav: 'Cookies and advertising',
    body: (
      <>
        <p>
          This website uses cookies and similar technologies. Some are necessary for the site
          and the checkout to work. Others help us measure traffic and advertising performance.
        </p>
        <ul>
          <li>
            <b>Google Analytics</b> and <b>Microsoft Clarity</b>, to understand how people find
            and use the site.
          </li>
          <li>
            <b>Meta (Facebook and Instagram)</b>, to measure the results of our advertising.
            This may include a hashed version of your email address or phone number so Meta can
            match a purchase to an advertisement. We do not send Meta anything describing your
            health.
          </li>
          <li>
            <b>Our video host</b> and <b>our booking calendar</b>, which may set their own
            cookies when the page loads.
          </li>
          <li>
            <b>Our payment gateway</b>, which sets cookies needed to process a payment securely.
          </li>
        </ul>
        <p>
          You can block or delete cookies in your browser settings. If you block the necessary
          ones, the checkout may stop working.
        </p>
      </>
    ),
  },
  {
    id: 'who-we-share-with',
    heading: 'Who we share information with',
    nav: 'Who we share with',
    body: (
      <>
        <p>
          We share your information only with the service providers we need to run the
          business, and only with what they need to do their job: our payment gateway, our
          booking, email and messaging providers, our website hosting, and the analytics and
          advertising platforms named above. We may also disclose information where the law
          requires it.
        </p>
        <p>We do not sell your personal information to anyone.</p>
      </>
    ),
  },
  {
    id: 'how-long-we-keep-it',
    heading: 'How long we keep it',
    body: (
      <p>
        We keep your health information for as long as you are a client and for a reasonable
        period afterwards, so that we can answer questions about your plan. We keep billing
        records for as long as tax law requires. When information is no longer needed for either
        reason, we delete it.
      </p>
    ),
  },
  {
    id: 'your-rights',
    heading: 'Your rights',
    body: (
      <p>
        You can ask us to show you the personal information we hold about you, correct anything
        that is wrong, or delete it, and you can withdraw your consent to our using it at any
        time. Email <Mail /> and we will respond.
      </p>
    ),
  },
  {
    id: 'security',
    heading: 'Security',
    body: (
      <p>
        We take reasonable steps to protect your information, including restricting who can see
        health records and using reputable providers for payment and hosting. No method of
        transmission or storage is completely secure, and we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    id: 'children',
    heading: 'Children',
    body: (
      <p>
        This programme is intended for adults. We do not knowingly collect information from
        anyone under 18. If you believe a child has given us information, contact us and we will
        delete it.
      </p>
    ),
  },
  {
    id: 'changes',
    heading: 'Changes to this policy',
    nav: 'Changes',
    body: (
      <p>
        We may update this policy from time to time. The date at the top of this page shows when
        it was last changed.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy Policy"
      title={
        <>
          How we handle your <em>information</em>
        </>
      }
      lede={
        <p>
          Building your plan means sharing your health history with us. This page
          sets out what we collect, what we do with it, who else sees it and how you can get it
          back or have it deleted.
        </p>
      }
      clauses={CLAUSES}
      close={{
        heading: (
          <>
            Ask us about <em>your information</em>
          </>
        ),
        body: 'You can ask to see what we hold, correct anything that is wrong, or have it deleted.',
      }}
    />
  );
}
