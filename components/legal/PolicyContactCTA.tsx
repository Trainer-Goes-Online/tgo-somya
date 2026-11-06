import type { ReactNode } from 'react';

import { EMAIL_LABEL, LEGAL } from '@/lib/legal';

/** The dark contact close on every policy page. No offer, no price. */
export function PolicyContactCTA({ heading, body }: { heading: ReactNode; body: ReactNode }) {
  return (
    <section className="contact">
      <div className="wrap">
        <span className="contact-icon" aria-hidden>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 5h16v14H4z" />
            <path d="m4 6 8 6 8-6" />
          </svg>
        </span>
        <h2>{heading}</h2>
        <p>{body}</p>
        <p className="contact-lines">
          {LEGAL.email ? <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a> : EMAIL_LABEL}
          <span className="contact-sep" aria-hidden>
            ·
          </span>
          {LEGAL.phoneHref ? <a href={`tel:${LEGAL.phoneHref}`}>{LEGAL.phone}</a> : LEGAL.phone}
        </p>
        <a href="/" className="home-link">
          Back to the programme
        </a>
      </div>
    </section>
  );
}
