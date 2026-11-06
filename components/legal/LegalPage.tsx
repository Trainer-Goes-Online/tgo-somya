import type { ReactNode } from 'react';

import { PolicyHero } from './PolicyHero';
import { PolicyToc, type TocItem } from './PolicyToc';
import { PolicyContactCTA } from './PolicyContactCTA';
import { SiteFooter } from '@/components/shared/SiteFooter';
import { EMAIL_LABEL, LEGAL } from '@/lib/legal';

/**
 * The policy page shell. A clause marked `pending` is a term the client has
 * not confirmed, and it announces itself three times: a banner at the top of
 * the body, a dot in the rail, and a callout in the clause.
 */
export type Clause = {
  id: string;
  heading: string;
  nav?: string;
  body: ReactNode;
  pending?: ReactNode;
};

const BUSINESS_ID = 'business-details';

export function LegalPage({
  eyebrow,
  title,
  lede,
  clauses,
  close,
  updated = LEGAL.effectiveDate,
}: {
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  clauses: Clause[];
  close: { heading: ReactNode; body: ReactNode };
  /** A page whose supplied copy carries its own date. */
  updated?: string;
}) {
  const pending = clauses.filter((c) => c.pending);

  const toc: TocItem[] = [
    ...clauses.map((c) => ({ id: c.id, label: c.nav ?? c.heading, pending: !!c.pending })),
    { id: BUSINESS_ID, label: 'Business details' },
  ];

  return (
    <div className="sm-policy">
      <PolicyHero
        eyebrow={eyebrow}
        title={title}
        lede={lede}
        updated={updated}
        operator={LEGAL.entity}
      />

      <section className="legal">
        <div className="wrap">
          <div className="legal-grid">
            <PolicyToc items={toc} />

            <article className="legal-body">
              {pending.length > 0 ? (
                <div className="legal-intro pending" role="note">
                  <span className="legal-intro-tag">
                    Pending · client confirmation required before launch
                  </span>
                  <p>
                    {pending.length === 1
                      ? 'One term on this page is not confirmed and must not go live as written.'
                      : `${pending.length} terms on this page are not confirmed and must not go live as written.`}{' '}
                    Each is flagged in the clause it belongs to:
                  </p>
                  <ul className="legal-intro-jump">
                    {pending.map((c) => (
                      <li key={c.id}>
                        <a href={`#${c.id}`}>{c.nav ?? c.heading}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {clauses.map((c, i) => (
                <section className="legal-section" id={c.id} key={c.id}>
                  <span className="l-mark">
                    <span className="l-bar" aria-hidden />
                    <span className="l-ord">{String(i + 1).padStart(2, '0')}</span>
                  </span>
                  <h2>{c.heading}</h2>

                  {c.pending ? (
                    <div className="l-pending">
                      <span className="l-pending-tag">
                        Pending · client confirmation required before launch
                      </span>
                      <p>{c.pending}</p>
                    </div>
                  ) : null}

                  {c.body}
                </section>
              ))}

              <section className="legal-section" id={BUSINESS_ID} aria-label="Business details">
                <span className="l-mark">
                  <span className="l-bar" aria-hidden />
                  <span className="l-ord">Details</span>
                </span>
                <h2>Business details</h2>
                <dl className="l-dl">
                  <dt>Registered name</dt>
                  <dd>{LEGAL.entity}</dd>

                  <dt>Legal name</dt>
                  <dd>{LEGAL.legalName}</dd>

                  {LEGAL.tradeName && (
                    <>
                      <dt>Trading name</dt>
                      <dd>{LEGAL.tradeName}</dd>
                    </>
                  )}

                  <dt>Registered address</dt>
                  <dd>{LEGAL.address}</dd>

                  <dt>Phone</dt>
                  <dd>
                    {LEGAL.phoneHref ? <a href={`tel:${LEGAL.phoneHref}`}>{LEGAL.phone}</a> : LEGAL.phone}
                  </dd>

                  <dt>Email</dt>
                  <dd>{LEGAL.email ? <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a> : EMAIL_LABEL}</dd>

                  <dt>Jurisdiction</dt>
                  <dd>{LEGAL.jurisdiction}</dd>
                </dl>
              </section>
            </article>
          </div>
        </div>
      </section>

      <PolicyContactCTA heading={close.heading} body={close.body} />
      <SiteFooter />
    </div>
  );
}
