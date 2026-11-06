'use client';

/**
 *   checkout -> PAYMENT -> /book-a-call?p=<payment_id> -> BOOKING -> /thank-you
 *
 * The first page after a payment: it fires GA4's purchase keyed on the payment
 * id (Meta's Purchase is the webhook's), ViewContent on arrival, and Schedule
 * from Cal's bookingSuccessful callback before handing over to /thank-you.
 */

import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { SiteFooter } from '@/components/shared/SiteFooter';
import { feeLabel } from '@/lib/site';
import { EMAIL_LABEL, LEGAL, PHONE_DIGITS } from '@/lib/legal';
import { FAQ_CONSULT, FAQ_WHO, HAVE_READY, START_TITLE } from '@/lib/offer';
import { AlertIcon, WhatsappIcon } from '@/components/shared/icons';
import { trackPurchase, trackSchedule, trackViewItem } from '@/lib/track';
import { CAL_LINK, PAY_KEY } from '@/lib/booking';

const CAL_ORIGIN = 'https://app.cal.com';
/** cal.com namespaces per event, so the namespace is the slug. */
const CAL_NS = CAL_LINK.split('/')[1] ?? '';
const CAL_URL = CAL_LINK ? `https://cal.com/${CAL_LINK}` : '';

type CalQueue = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  ns?: Record<string, (...args: unknown[]) => void>;
  q?: unknown[][];
  config?: { forwardQueryParams?: boolean };
};

/* Cal's own loader snippet. window.Cal is a queue straight away, so calls made
   before the script lands are replayed when it does. */
function loadCal(scriptSrc: string) {
  const C = window as unknown as { Cal?: CalQueue; document: Document };
  const p = (a: { q?: unknown[][] }, ar: unknown[]) => {
    (a.q = a.q || []).push(ar);
  };
  const d = C.document;
  C.Cal =
    C.Cal ||
    function (this: unknown, ...ar: unknown[]) {
      const cal = C.Cal as CalQueue;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        (d.head.appendChild(d.createElement('script')) as HTMLScriptElement).src = scriptSrc;
        cal.loaded = true;
      }
      if (ar[0] === 'init') {
        const api = function (...a: unknown[]) {
          p(api as unknown as { q?: unknown[][] }, a);
        } as unknown as ((...a: unknown[]) => void) & { q?: unknown[][] };
        const namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === 'string') {
          cal.ns![namespace] = cal.ns![namespace] || (api as (...a: unknown[]) => void);
          p(cal.ns![namespace] as unknown as { q?: unknown[][] }, ar);
          p(cal as unknown as { q?: unknown[][] }, ['initNamespace', namespace]);
        } else {
          p(cal as unknown as { q?: unknown[][] }, ar);
        }
        return;
      }
      p(cal as unknown as { q?: unknown[][] }, ar);
    };
  return C.Cal as CalQueue;
}

const RESCUE_WA_TEXT = encodeURIComponent(
  "Hi, I've paid for my consultation but none of the listed slots work for me. My details: Name: | Email: | Phone: | Preferred day and time:",
);
const RESCUE_MAILTO = LEGAL.email
  ? `mailto:${LEGAL.email}?subject=${encodeURIComponent('Consultation booking: preferred slot request')}&body=${encodeURIComponent(
      'Name:\nEmail:\nPhone:\nPreferred day and time:\n',
    )}`
  : '';

const REASSURANCES = [
  ['Confirmation by email', 'It arrives the moment you book, with the joining details.'],
  ['Reschedule if life happens', 'Your confirmation email carries the link to move your slot.'],
] as const;

const FAQS = [FAQ_CONSULT, FAQ_WHO];

export default function BookACallPage() {
  return (
    <Suspense fallback={null}>
      <BookACall />
    </Suspense>
  );
}

function BookACall() {
  const paymentId = useSearchParams().get('p') ?? '';
  const [state, setState] = useState<'loading' | 'ready' | 'failed' | 'unset'>(
    CAL_LINK ? 'loading' : 'unset',
  );

  const payRef = useRef(paymentId);
  payRef.current = paymentId;

  useEffect(() => {
    if (paymentId) trackPurchase(paymentId);
  }, [paymentId]);

  /* A UPI buyer can come back hours later straight onto this page. */
  const arrived = useRef(false);
  useEffect(() => {
    if (arrived.current) return;
    arrived.current = true;
    trackViewItem();
  }, []);

  useEffect(() => {
    if (!paymentId) return;
    try {
      sessionStorage.setItem(PAY_KEY, paymentId);
    } catch {
      /* private mode */
    }
  }, [paymentId]);

  /* Cal's `inline` MOUNTS an embed; a second call stacks a second one on top
     and the two fight. StrictMode runs this effect twice in development, so
     the ref guards the boot, the callback reads refs, and deps stay empty. */
  const calBooted = useRef(false);
  useEffect(() => {
    if (!CAL_LINK) return;
    let cancelled = false;
    const started = Date.now();
    const poll = window.setInterval(() => {
      if (cancelled) return;
      if (document.querySelector('#sm-cal iframe')) {
        setState('ready');
        window.clearInterval(poll);
      } else if (Date.now() - started > 9000) {
        setState('failed');
        window.clearInterval(poll);
      }
    }, 300);

    if (!calBooted.current) {
      calBooted.current = true;
      try {
        const Cal = loadCal(`${CAL_ORIGIN}/embed/embed.js`);
        Cal('init', CAL_NS, { origin: CAL_ORIGIN });
        Cal.config = Cal.config || {};
        Cal.config.forwardQueryParams = true;
        const ns = Cal.ns![CAL_NS];
        ns('inline', {
          elementOrSelector: '#sm-cal',
          config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
          calLink: CAL_LINK,
        });
        const brand =
          getComputedStyle(document.documentElement).getPropertyValue('--brand').trim() || '#C2416B';
        ns('ui', {
          cssVarsPerTheme: { light: { 'cal-brand': brand }, dark: { 'cal-brand': brand } },
          theme: 'light',
          hideEventTypeDetails: false,
          layout: 'month_view',
        });
        ns('on', {
          action: 'bookingSuccessful',
          callback: () => {
            let id = payRef.current;
            try {
              id = id || sessionStorage.getItem(PAY_KEY) || '';
            } catch {
              /* private mode */
            }
            trackSchedule(id);
            const q = id ? `?p=${encodeURIComponent(id)}&booked=1` : '?booked=1';
            window.location.href = `/thank-you${q}`;
          },
        });
      } catch {
        if (!cancelled) setState('failed');
        window.clearInterval(poll);
      }
    }

    return () => {
      cancelled = true;
      window.clearInterval(poll);
    };
  }, []);

  return (
    <div className="sm-book">
      <div className="bk-strip">
        <span className="bk-strip-tick" aria-hidden>
          ✓
        </span>
        Payment received
        <span className="bk-strip-sep" aria-hidden>
          ·
        </span>
        1 step left
      </div>

      <section className="bk-body">
        <div className="wrap">
          <ol className="bk-steps" aria-label="Progress">
            <li className="done">
              <span className="bk-dot" aria-hidden>
                ✓
              </span>
              Paid
            </li>
            <li className="now" aria-current="step">
              <span className="bk-dot" aria-hidden>
                2
              </span>
              Pick your time
            </li>
          </ol>

          <div className="bk-mast">
            <span className="bk-pill">One step left</span>
            <h1>
              Pick a time. <em>Meet Somya.</em>
            </h1>
            <p className="bk-deck">
              Your {feeLabel} is in. Now put a date against your consultation, so Somya can
              understand your starting point and what needs attention first.
            </p>
          </div>

          <div className="bk-card bk-wide" id="calendar">
            <div className="bk-card-head">
              <h2>Pick a slot that works for you</h2>
              <p>All times are shown in your own time zone.</p>
            </div>

            <div className={state === 'ready' ? 'bk-cal-inset ready' : 'bk-cal-inset'}>
              {state !== 'ready' && (
                <p className={state === 'loading' ? 'bk-cal-note' : `bk-cal-note ${state}`}>
                  {state === 'unset'
                    ? '[TODO: booking calendar] The calendar is not connected yet. Use the options below and we will set up your slot personally.'
                    : state === 'failed'
                      ? 'The calendar could not load here. Use the direct link below and your booking will work exactly the same.'
                      : 'Loading the calendar.'}
                </p>
              )}
              <div className="bk-cal" id="sm-cal" />
            </div>

            {CAL_URL ? (
              <p className="bk-direct">
                Calendar not showing?{' '}
                <a href={CAL_URL} target="_blank" rel="noopener noreferrer">
                  Open the booking page directly
                </a>
                .
              </p>
            ) : null}

            <ul className="bk-reassure">
              {REASSURANCES.map(([t, b]) => (
                <li key={t}>
                  <span className="bk-check" aria-hidden>
                    ✓
                  </span>
                  <span>
                    <b>{t}.</b> {b}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bk-rescue bk-wide">
            <span className="bk-rescue-eyebrow">
              <AlertIcon size={14} />
              Preferred slot not available?
            </span>
            <h2>Cannot find a time that works for you?</h2>
            <p>
              You have already paid and your place is held, so you will not lose it. If none of
              the times above suit you, send us your{' '}
              <strong>name, email, phone number and your preferred day and time</strong>, and we
              will set up your slot personally.
            </p>
            <div className="bk-rescue-acts">
              {PHONE_DIGITS ? (
                <a
                  className="bk-rescue-wa"
                  href={`https://wa.me/${PHONE_DIGITS}?text=${RESCUE_WA_TEXT}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsappIcon size={17} />
                  Message us on WhatsApp
                </a>
              ) : null}
              {RESCUE_MAILTO ? (
                <a className="bk-rescue-mail" href={RESCUE_MAILTO}>
                  Email us
                </a>
              ) : null}
            </div>
            <p className="bk-rescue-direct">
              {PHONE_DIGITS ? <a href={`https://wa.me/${PHONE_DIGITS}`}>{LEGAL.phone}</a> : LEGAL.phone}
              <span aria-hidden> · </span>
              {LEGAL.email ? <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a> : EMAIL_LABEL}
            </p>
          </div>

          <h2 className="bk-h2">
            What to have <em>ready</em>
          </h2>
          <p className="bk-h2-sub">What Somya will want to understand on the call.</p>
          <ol className="bk-value">
            {HAVE_READY.map((w, i) => (
              <li key={w.title}>
                <span className="bk-ord">{String(i + 1).padStart(2, '0')}</span>
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </li>
            ))}
          </ol>

          <div className="bk-nudge">
            <h2>
              The slot is the part people leave <em>for Monday.</em>
            </h2>
            <p>
              Paying was the decision. Booking is the one that puts a date on it. {START_TITLE}{' '}
              is already paid for; it just needs a time against it.
            </p>
            <a className="bk-btn" href="#calendar">
              Pick my slot
              <span aria-hidden>&nbsp;&rarr;</span>
            </a>
          </div>

          <h2 className="bk-h2">Two quick questions before you book</h2>
          <div className="bk-faq">
            {FAQS.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                {f.a.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </details>
            ))}
          </div>

          <div className="bk-final">
            <h2>
              You&rsquo;ve paid. Now <em>lock the time.</em>
            </h2>
            <p>One slot, and your consultation with Somya is set.</p>
            <a className="bk-btn lg" href="#calendar">
              Take me to the calendar
              <span aria-hidden>&nbsp;&rarr;</span>
            </a>
          </div>

          <p className="bk-help">
            Trouble booking? Write to{' '}
            {LEGAL.email ? <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a> : EMAIL_LABEL} or call{' '}
            {LEGAL.phoneHref ? <a href={`tel:${LEGAL.phoneHref}`}>{LEGAL.phone}</a> : LEGAL.phone}.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
