import Link from 'next/link';

import { EMAIL_LABEL, LEGAL, LEGAL_DISCLAIMER } from '@/lib/legal';

/**
 * One footer, every surface. It carries the four facts Razorpay's merchant
 * review looks for on the site: entity, postal address, phone and email.
 * `folded` drops the band so it sits inside the landing finale's dark stage.
 */
const LEGAL_LINKS = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
  { href: '/refund', label: 'Refund Policy' },
] as const;

export function SiteFooter({ folded = false }: { folded?: boolean }) {
  return (
    <footer className={folded ? 'sm-foot sm-foot-folded' : 'sm-foot'}>
      <div className="sm-foot-wrap">
        <p className="sm-foot-lines">
          <span className="sm-foot-entity">{LEGAL.entity}</span>
          <br />
          {LEGAL.tradeName && (
            <>
              Trading as {LEGAL.tradeName}
              <br />
            </>
          )}
          {LEGAL.address}
          <br />
          {LEGAL.phoneHref ? <a href={`tel:${LEGAL.phoneHref}`}>{LEGAL.phone}</a> : LEGAL.phone}
          <span className="sm-foot-sep" aria-hidden>
            ·
          </span>
          {LEGAL.email ? <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a> : EMAIL_LABEL}
        </p>

        <nav className="sm-foot-links" aria-label="Legal">
          {LEGAL_LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>

        <p className="sm-foot-note">{LEGAL_DISCLAIMER}</p>

        <p className="sm-foot-copy">
          &copy; {new Date().getFullYear()} {LEGAL.entity}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
