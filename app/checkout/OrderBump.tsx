'use client';

/**
 * The checkout order bump: the 4-guide pack (GGT_Guide1..4).
 * Controlled by the page: the same `on` drives this card, the order summary,
 * the docked mobile toggle and the amount create-order charges.
 */

import { bumpLabel } from '@/lib/site';
import { BUMP_GUIDES, BUMP_IMAGE, BUMP_TITLE } from '@/lib/offer';
import { asset } from '@/app/_landing/asset-version';
import { CheckIcon } from '@/components/shared/icons';

export function OrderBump({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <section className={`bump${on ? ' is-on' : ''}`} aria-label="Optional add-on">
      <span className="bump-ribbon">
        <span className="live-dot" aria-hidden />
        Recommended
      </span>

      <div className="bump-head">
        <p className="bump-eyebrow">One-time add-on</p>
        <span className="bump-price" aria-label={`Adds ${bumpLabel}`}>
          <span className="bump-price-plus">+</span>
          {bumpLabel}
        </span>
      </div>

      <div className="bump-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="bump-img"
          src={asset(BUMP_IMAGE)}
          alt="The 4-guide bundle: Pre-Pregnancy Weight-Loss Foods, PCOD-Friendly Recipes, Hormone-Friendly Drinks and Healthy Eating-Out guides"
          width={640}
          height={640}
          loading="lazy"
          decoding="async"
        />
        <h3 className="bump-title">{BUMP_TITLE}</h3>
      </div>

      <ul className="bump-list">
        {BUMP_GUIDES.map((g) => (
          <li key={g.title}>
            <span className="ck" aria-hidden>
              <CheckIcon size={10} />
            </span>
            <span>
              <b>{g.title}</b>
              <span>{g.sub}</span>
            </span>
          </li>
        ))}
      </ul>

      <label className="bump-toggle">
        <input type="checkbox" checked={on} onChange={(e) => onChange(e.target.checked)} />
        <span className="bump-toggle-text">
          {on ? (
            <>Added to your order &middot; {bumpLabel}</>
          ) : (
            <>Tap to add for {bumpLabel} more</>
          )}
        </span>
      </label>
    </section>
  );
}

/** The docked-bar version on mobile: one line, same state. */
export function OrderBumpMini({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className={`bump-mini${on ? ' is-on' : ''}`}>
      <input type="checkbox" checked={on} onChange={(e) => onChange(e.target.checked)} />
      <span className="bump-mini-text">
        <span className="live-dot" aria-hidden />
        {on ? 'Guide pack added' : 'Add the 4-guide pack'}
      </span>
      <span className="bump-mini-price">+{bumpLabel}</span>
    </label>
  );
}
