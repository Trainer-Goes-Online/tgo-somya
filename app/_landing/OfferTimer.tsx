'use client';

import { useEffect, useState } from 'react';
import { site } from '@/lib/site';

/**
 * "OFFER ENDS IN": the copy's 5-hour countdown.
 *
 * The deadline is stamped once per visitor in localStorage, so a refresh or
 * a second tab continues the same countdown and every lockup on the page
 * agrees. A visit after the stored deadline gets a fresh window. Renders
 * nothing until mounted, so no server digit can hydrate-mismatch.
 */
const KEY = 'tgo-somya.offer.deadline';

const pad = (n: number) => String(Math.max(0, n)).padStart(2, '0');

export function OfferTimer() {
  const hours = Number(site.offerHours) || 0;
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    if (hours <= 0) return;
    const windowMs = hours * 3600_000;

    let deadline = Number(window.localStorage.getItem(KEY) || 0);
    if (!deadline || deadline <= Date.now() || deadline - Date.now() > windowMs) {
      deadline = Date.now() + windowMs;
      try {
        window.localStorage.setItem(KEY, String(deadline));
      } catch {
        /* private mode */
      }
    }

    const tick = () => setLeft(Math.max(0, deadline - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [hours]);

  if (hours <= 0 || left === null || left <= 0) return null;

  const s = Math.floor(left / 1000);
  const cells = [
    { v: pad(Math.floor(s / 3600)), k: 'Hrs' },
    { v: pad(Math.floor((s % 3600) / 60)), k: 'Min' },
    { v: pad(s % 60), k: 'Sec' },
  ];

  return (
    <div className="sdp-urgency" role="timer" aria-live="off">
      <span className="sdp-urgency-label">Offer ends in</span>
      <span className="sdp-urgency-timer">
        {cells.map((c, i) => (
          <span key={c.k} className="sdp-urgency-group">
            <span className="sdp-urgency-cell">
              <b>{c.v}</b>
              <i>{c.k}</i>
            </span>
            {i < cells.length - 1 && <span className="sdp-urgency-sep" aria-hidden />}
          </span>
        ))}
      </span>
    </div>
  );
}
