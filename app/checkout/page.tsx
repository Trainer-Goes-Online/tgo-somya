'use client';

/**
 * /checkout
 *
 *   mount            -> trackBeginCheckout() + trackAddToCart()
 *   submit           -> trackInitiateCheckout() (+ QualifiedLead)
 *                    -> POST /api/razorpay/create-order
 *                    -> new window.Razorpay({...}).open()
 *   handler(payment) -> /book-a-call?p=<payment_id>
 *
 * The handler only navigates. Purchase belongs to the webhook.
 */

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

import { feeLabel } from '@/lib/site';
import { LEGAL } from '@/lib/legal';
import { GUARANTEE_NAME, OFFER_PENDING, START_COVERS, START_SCOPE, START_TITLE, START_WITH } from '@/lib/offer';
import { collectSignals } from '@/lib/client-signals';
import { trackAddToCart, trackBeginCheckout, trackInitiateCheckout } from '@/lib/track';
import { asset } from '@/app/_landing/asset-version';
import { SiteFooter } from '@/components/shared/SiteFooter';
import { PaymentLogos } from '@/components/shared/PaymentLogos';
import {
  AlertIcon,
  ArrowRightIcon,
  CardIcon,
  CheckIcon,
  LockIcon,
  ShieldCheckIcon,
} from '@/components/shared/icons';

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

const PHOTO_SRC = '/somya/somya-circle.webp';

/** ⚠️ No square logo supplied. Razorpay renders `image` in its own iframe, so
 *  it must be an absolute url: `${window.location.origin}${asset(SQUARE_LOGO)}`. */
const SQUARE_LOGO = '';

const RZP_SDK = 'https://checkout.razorpay.com/v1/checkout.js';

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false);
    if (window.Razorpay) return resolve(true);
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${RZP_SDK}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve(true));
      existing.addEventListener('error', () => resolve(false));
      return;
    }
    const el = document.createElement('script');
    el.src = RZP_SDK;
    el.async = true;
    el.onload = () => resolve(true);
    el.onerror = () => resolve(false);
    document.body.appendChild(el);
  });
}

/* ISO-2 travels with the dial code: Meta wants the country as alpha-2. */
const COUNTRIES: { iso: string; dial: string; label: string }[] = [
  { iso: 'in', dial: '+91', label: 'India (+91)' },
  { iso: 'sg', dial: '+65', label: 'Singapore (+65)' },
  { iso: 'ae', dial: '+971', label: 'UAE (+971)' },
  { iso: 'sa', dial: '+966', label: 'Saudi Arabia (+966)' },
  { iso: 'qa', dial: '+974', label: 'Qatar (+974)' },
  { iso: 'om', dial: '+968', label: 'Oman (+968)' },
  { iso: 'kw', dial: '+965', label: 'Kuwait (+965)' },
  { iso: 'bh', dial: '+973', label: 'Bahrain (+973)' },
  { iso: 'us', dial: '+1', label: 'USA (+1)' },
  { iso: 'ca', dial: '+1', label: 'Canada (+1)' },
  { iso: 'gb', dial: '+44', label: 'UK (+44)' },
  { iso: 'ie', dial: '+353', label: 'Ireland (+353)' },
  { iso: 'au', dial: '+61', label: 'Australia (+61)' },
  { iso: 'nz', dial: '+64', label: 'New Zealand (+64)' },
  { iso: 'my', dial: '+60', label: 'Malaysia (+60)' },
  { iso: 'hk', dial: '+852', label: 'Hong Kong (+852)' },
  { iso: 'de', dial: '+49', label: 'Germany (+49)' },
  { iso: 'za', dial: '+27', label: 'South Africa (+27)' },
];

/* The QualifiedLead split. Working professional qualifies: the copy is written
   "For Busy Working Women". One comparison in lib/track.ts and one in
   app/api/meta/event/route.ts. */
const OCCUPATIONS = [
  { value: 'working_professional', label: 'Working professional' },
  { value: 'homemaker', label: 'Homemaker' },
] as const;

type Fields = {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  country: string;
  phone: string;
  occupation: string;
};

export default function CheckoutPage() {
  const [f, setF] = useState<Fields>({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    country: 'in',
    phone: '',
    occupation: '',
  });
  const [touched, setTouched] = useState(false);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState('');
  const [ack, setAck] = useState(false);

  /* The only Meta event a direct arrival gets. Ref-guarded against StrictMode. */
  const arrived = useRef(false);
  useEffect(() => {
    if (arrived.current) return;
    arrived.current = true;
    trackBeginCheckout();
    trackAddToCart();
  }, []);

  const v = useMemo(() => {
    const digits = f.phone.replace(/\D/g, '');
    return {
      firstName: f.firstName.trim().length > 1,
      lastName: f.lastName.trim().length > 0,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()),
      city: f.city.trim().length > 1,
      /* Subscriber number only, the dial code comes from the picker. */
      phone: f.country === 'in' ? digits.length === 10 : digits.length >= 7 && digits.length <= 12,
      occupation: f.occupation !== '',
    };
  }, [f]);
  const valid = v.firstName && v.lastName && v.email && v.city && v.phone && v.occupation;

  const dial = COUNTRIES.find((c) => c.iso === f.country)?.dial ?? '+91';
  const e164 = `${dial}${f.phone}`.replace(/\D/g, '');

  const startPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setFailed('');
    if (!valid || !ack || busy) return;
    setBusy(true);

    trackInitiateCheckout({
      email: f.email.trim(),
      phone: e164,
      firstName: f.firstName.trim(),
      lastName: f.lastName.trim(),
      city: f.city.trim(),
      country: f.country,
      occupation: f.occupation,
    });

    try {
      const sdk = await loadRazorpay();
      if (!sdk) throw new Error('sdk');

      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          firstName: f.firstName.trim(),
          lastName: f.lastName.trim(),
          email: f.email.trim(),
          phone: e164,
          city: f.city.trim(),
          country: f.country,
          occupation: f.occupation,
          dialCode: dial,
          ...collectSignals(),
        }),
      });
      const order = await res.json();

      if (!res.ok || !order?.ok) {
        setBusy(false);
        setFailed(
          order?.reason === 'not-configured'
            ? 'Payments are not switched on yet. Nothing has been charged.'
            : 'We could not start the payment. Please try again.',
        );
        return;
      }

      const rzp = new window.Razorpay!({
        key: order.keyId,
        order_id: order.orderId,
        amount: order.amount,
        currency: order.currency,
        /* The REGISTERED name: it is what appears on the card statement. */
        name: LEGAL.entity,
        ...(SQUARE_LOGO ? { image: `${window.location.origin}${asset(SQUARE_LOGO)}` } : {}),
        description: START_TITLE,
        prefill: {
          name: `${f.firstName.trim()} ${f.lastName.trim()}`.trim(),
          email: f.email.trim(),
          contact: e164,
        },
        theme: { color: readToken('--brand', '#C2416B') },
        modal: { ondismiss: () => setBusy(false) },
        handler: (r: { razorpay_payment_id: string }) => {
          window.location.href = `/book-a-call?p=${encodeURIComponent(r.razorpay_payment_id)}`;
        },
      });
      rzp.open();
    } catch {
      setBusy(false);
      setFailed('We could not start the payment. Please try again.');
    }
  };

  return (
    <div className="sm-pay">
      <div className="checkout-announce" role="region" aria-label="Checkout trust">
        <span className="checkout-announce-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Secure Checkout
        </span>
        <span className="checkout-announce-dot" aria-hidden />
        <span className="checkout-announce-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 2l8 3v7c0 4.97-3.35 9.26-8 10-4.65-.74-8-5.03-8-10V5l8-3z" />
            <polyline points="9 12 11 14 15 10" />
          </svg>
          100% Results Guarantee
        </span>
        <span className="checkout-announce-dot" aria-hidden />
        <span className="checkout-announce-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 12l2 2 4-4" />
          </svg>
          Razorpay Verified · 256-bit SSL
        </span>
      </div>

      <section className="pay-body">
        <div className="wrap">
          {OFFER_PENDING && (
            <div className="pay-pending" role="note">
              <b>Pre-launch · not ready to take money</b>
              <p>
                What this {feeLabel} buys (the call, who takes it, how long it runs and whether
                it is refundable) has not been supplied, so placeholders stand where it should
                be described. Fill <code>lib/offer.ts</code> and set <code>OFFER_PENDING</code>{' '}
                to false.
              </p>
            </div>
          )}

          <div className="pay-mast">
            <span className="pay-pill">
              <ShieldCheckIcon size={13} />
              {GUARANTEE_NAME}
            </span>
            <h1>
              Get your <em>plan</em> started
            </h1>
            <p className="pay-deck">
              Your details are used to arrange your consultation and send your receipt.
            </p>
          </div>

          <div className="pay-grid">
            {/* id is load-bearing: the mobile docked bar submits this form by `form="pay-form"`. */}
            <form id="pay-form" className="pay-card" onSubmit={startPayment} noValidate>
              <p className="pay-eyebrow">YOUR DETAILS</p>
              <h2>Where should we reach you?</h2>
              <p className="pay-hint">We use these to arrange your call and send your receipt.</p>

              <div className="pay-note" role="note">
                <span className="pay-note-chip" aria-hidden>
                  <AlertIcon size={13} />
                </span>
                <p>
                  <strong>Important: please don&rsquo;t close this page after paying.</strong> The
                  moment your payment succeeds, please wait up to <strong>10 seconds</strong>{' '}
                  without closing or refreshing this tab. You&rsquo;ll then be taken automatically
                  to the calendar to <strong>pick your preferred date and time</strong>.{' '}
                  <strong>Leaving early may stop your booking from being completed.</strong>
                </p>
              </div>

              <div className="pay-fields">
                <div className="pay-two">
                  <Field
                    label="First name"
                    type="text"
                    autoComplete="given-name"
                    placeholder="First name"
                    value={f.firstName}
                    onChange={(x) => setF((s) => ({ ...s, firstName: x }))}
                    bad={touched && !v.firstName}
                  />
                  <Field
                    label="Last name"
                    type="text"
                    autoComplete="family-name"
                    placeholder="Last name"
                    value={f.lastName}
                    onChange={(x) => setF((s) => ({ ...s, lastName: x }))}
                    bad={touched && !v.lastName}
                  />
                </div>

                <Field
                  label="Email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={f.email}
                  onChange={(x) => setF((s) => ({ ...s, email: x }))}
                  bad={touched && !v.email}
                  note="Your receipt and booking details go here."
                />

                <Field
                  label="Town / City"
                  type="text"
                  autoComplete="address-level2"
                  placeholder="Your town or city"
                  value={f.city}
                  onChange={(x) => setF((s) => ({ ...s, city: x }))}
                  bad={touched && !v.city}
                />

                <label>
                  <span className="f-label">WhatsApp number</span>
                  <div className="pay-phone">
                    <select
                      autoComplete="tel-country-code"
                      aria-label="Country dialling code"
                      value={f.country}
                      onChange={(e) => setF((s) => ({ ...s, country: e.target.value }))}
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.iso} value={c.iso}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      placeholder="98XXX XXXXX"
                      value={f.phone}
                      onChange={(e) => setF((s) => ({ ...s, phone: e.target.value }))}
                      aria-invalid={(touched && !v.phone) || undefined}
                    />
                  </div>
                  <span className="f-note">We will contact you on this number.</span>
                </label>

                <label>
                  <span className="f-label">You are currently</span>
                  <select
                    value={f.occupation}
                    onChange={(e) => setF((s) => ({ ...s, occupation: e.target.value }))}
                    aria-invalid={(touched && !v.occupation) || undefined}
                  >
                    <option value="">Please choose</option>
                    {OCCUPATIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <span className="f-note">So your plan is built around the hours you actually have.</span>
                </label>
              </div>

              <label className="pay-ack">
                <input
                  type="checkbox"
                  checked={ack}
                  onChange={(e) => setAck(e.target.checked)}
                  aria-invalid={(touched && !ack) || undefined}
                />
                <span>
                  I understand that after payment, I&rsquo;ll wait up to <strong>10 seconds</strong>{' '}
                  for the booking page to open, then pick my preferred date and time.
                </span>
              </label>

              {touched && !valid && (
                <p className="pay-error">
                  Please add your name, a working email, your city, a valid number and choose one
                  option.
                </p>
              )}
              {touched && valid && !ack && (
                <p className="pay-error">
                  Please tick the box above so we know to expect you on the booking page.
                </p>
              )}
              {failed && <p className="pay-error">{failed}</p>}

              <button type="submit" className="pay-cta" disabled={busy}>
                {busy ? <span>Taking you to payment</span> : <CtaLabel />}
                <span className="arrow" aria-hidden>
                  <ArrowRightIcon size={13} />
                </span>
              </button>

              <div className="pay-points">
                <span>
                  <LockIcon />
                  Razorpay Secured
                </span>
                <span className="sep" aria-hidden>
                  &middot;
                </span>
                <span>SSL Encrypted</span>
                <span className="sep" aria-hidden>
                  &middot;
                </span>
                <span>
                  <Link href="/refund">Refund policy</Link>
                </span>
              </div>

              <p className="pay-privacy">
                Your personal data is used to process this payment, to arrange your booking, and
                for the purposes described in our <Link href="/privacy">privacy policy</Link>.
                Your health information is handled under the same policy.
              </p>

              <div className="pay-methods">
                <span className="pay-methods-label">100% secure and safe payments</span>
                <PaymentLogos />
              </div>
            </form>

            <div className="pay-sum-col">
              <OrderSummary />
            </div>
          </div>
        </div>
      </section>

      <div className="pay-stuck" aria-hidden={busy ? true : undefined}>
        <div className="pay-stuck-inner">
          <span className="pay-stuck-fig">
            <span className="pay-stuck-cap">Total due today</span>
            <strong>{feeLabel}</strong>
          </span>
          <button type="submit" form="pay-form" className="pay-stuck-go" disabled={busy}>
            {busy ? <span>Taking you to payment</span> : <CtaLabel />}
            <span className="arrow" aria-hidden>
              <ArrowRightIcon size={12} />
            </span>
          </button>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}

/* Razorpay's sheet takes a literal hex; reading the token keeps it on-theme. */
function readToken(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  try {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return /^#[0-9a-f]{3,8}$/i.test(v) ? v : fallback;
  } catch {
    return fallback;
  }
}

/** One label for the pay button and the docked bar. No list price, so one line. */
function CtaLabel() {
  return <span>Book My Consultation Now - {feeLabel}</span>;
}

function OrderSummary() {
  return (
    <div className="sum">
      <p className="pay-eyebrow">ORDER SUMMARY</p>
      <h2 className="sum-title">What you are paying for</h2>

      <div className="sum-lead">
        {PHOTO_SRC ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="sum-lead-chip" src={asset(PHOTO_SRC)} alt="" aria-hidden width={52} height={52} />
        ) : (
          <span className="sum-lead-chip sum-lead-ph" aria-hidden>
            SL
          </span>
        )}
        <span className="sum-lead-body">
          <b>{START_TITLE}</b>
          <span>{START_WITH}</span>
        </span>
        <span className="sum-lead-price">{feeLabel}</span>
      </div>

      <div className="sum-details">
        <p className="sum-sub">WHAT IS INCLUDED</p>
        {START_COVERS.length > 0 ? (
          <ul className="sum-covers">
            {START_COVERS.map((c) => (
              <li key={c}>
                <span className="ck" aria-hidden>
                  <CheckIcon size={10} />
                </span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="sum-todo">[TODO: the line items this {feeLabel} includes]</p>
        )}
      </div>

      <div className="sum-rule" />

      <div className="sum-total">
        <span className="sum-total-label">Total</span>
        <span className="sum-total-fig">{feeLabel}</span>
      </div>

      <div className="sum-method">
        <CardIcon />
        <span>
          <b>UPI &middot; Cards &middot; NetBanking</b>
          <span>Paid securely through Razorpay.</span>
        </span>
      </div>

      <div className="sum-scope">
        <b>What this {feeLabel} covers</b>
        <p>{START_SCOPE}</p>
      </div>
    </div>
  );
}

function Field({
  label,
  type,
  autoComplete,
  placeholder,
  value,
  onChange,
  bad,
  note,
}: {
  label: string;
  type: string;
  autoComplete: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  bad: boolean;
  note?: string;
}) {
  return (
    <label>
      <span className="f-label">{label}</span>
      <input
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={bad || undefined}
      />
      {note && <span className="f-note">{note}</span>}
    </label>
  );
}
