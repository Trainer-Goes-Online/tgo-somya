'use client';

/**
 *   checkout -> PAYMENT -> /book-a-call -> BOOKING -> /thank-you
 *
 * The buyer has paid AND booked, so this page prepares them for the call.
 * It FIRES NOTHING: GA4's purchase went from the booking page keyed on the
 * payment id, Meta's Purchase from the webhook, and Schedule from Cal's
 * bookingSuccessful on /book-a-call. There is no CTA to book here; on a page
 * reached only by booking, that is a bug.
 */

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import { SiteFooter } from '@/components/shared/SiteFooter';
import { EMAIL_LABEL, LEGAL } from '@/lib/legal';
import {
  HAVE_READY,
  OFFER_PENDING,
  START_COVERS,
  START_DURATION,
  START_TITLE,
  START_WITH,
} from '@/lib/offer';
import { CheckIcon, SealCheckIcon } from '@/components/shared/icons';

export default function ThankYouPage() {
  return (
    <Suspense fallback={null}>
      <ThankYou />
    </Suspense>
  );
}

function ThankYou() {
  /* `booked=1` is not required: a confirmation that accuses a real buyer of
     not having booked is worse than one that simply confirms. */
  useSearchParams();

  return (
    <div className="sm-ty">
      <section className="ty-sec ty-dark ty-hero">
        <div className="ty-wrap">
          <span className="ty-seal" aria-hidden>
            <SealCheckIcon />
          </span>
          <span className="ty-badge">Booking confirmed</span>
          <h1 className="ty-h1">
            Your call is <em>booked.</em>
          </h1>
          <p className="ty-sub">
            The details are on their way to the email address you booked with. Put it in your
            calendar now, while it is in front of you.
          </p>

          <ul className="ty-chips">
            <li>
              <span className="ty-tick" aria-hidden>
                <CheckIcon />
              </span>
              Confirmation by email, with your joining details
            </li>
            <li>
              <span className="ty-tick" aria-hidden>
                <CheckIcon />
              </span>
              {START_WITH}
              {START_DURATION ? ` · ${START_DURATION}` : ''}
            </li>
          </ul>
        </div>
      </section>

      <section className="ty-sec ty-light">
        <div className="ty-wrap">
          <span className="ty-eyebrow center">WHAT THIS CALL ACTUALLY IS</span>
          <h2 className="ty-h2">
            <em>{START_TITLE}</em>
          </h2>

          {OFFER_PENDING || START_COVERS.length === 0 ? (
            <div className="ty-pending" role="note">
              <b>Pre-launch · this section is not written yet</b>
              <p>
                The copy does not say what the call covers, what it is not, or how long it runs,
                so this page says nothing about it rather than inventing it. Fill{' '}
                <code>START_COVERS</code>, <code>START_WITH</code> and <code>START_DURATION</code>{' '}
                in <code>lib/offer.ts</code> and set <code>OFFER_PENDING</code> to false.
              </p>
            </div>
          ) : (
            <ol className="ty-ord-grid">
              {START_COVERS.map((c, i) => (
                <li key={c}>
                  <span className="ty-ord">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{c}</h3>
                </li>
              ))}
            </ol>
          )}

          <p className="ty-note">
            This is not the programme itself. It is where Somya understands your starting point
            and you decide whether to enrol. Please join on time: your slot is held for you, and
            a late start shortens the call.
          </p>
        </div>
      </section>

      <section className="ty-sec ty-tint">
        <div className="ty-wrap">
          <span className="ty-eyebrow center">BEFORE THE CALL</span>
          <h2 className="ty-h2">
            What to keep <em>ready.</em>
          </h2>
          <p className="ty-sub">
            Your plan is built around your starting point, so the more of this you have to hand,
            the further the time goes.
          </p>

          <ul className="ty-ready">
            {HAVE_READY.map((w) => (
              <li key={w.title}>
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </li>
            ))}
          </ul>

          <p className="ty-note">
            You do not need perfect data. Bring what you have, and anything missing can be
            worked out together.
          </p>
        </div>
      </section>

      <section className="ty-sec ty-dark ty-close">
        <div className="ty-wrap">
          <h2 className="ty-h2">
            See you <em>then.</em>
          </h2>
          <p className="ty-sub">
            Something come up, or the confirmation not arrived? Write to{' '}
            {LEGAL.email ? <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a> : EMAIL_LABEL} or call{' '}
            {LEGAL.phoneHref ? <a href={`tel:${LEGAL.phoneHref}`}>{LEGAL.phone}</a> : LEGAL.phone}.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
