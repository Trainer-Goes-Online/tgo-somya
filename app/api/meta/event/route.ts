import { NextResponse } from 'next/server';

import { CHECKOUT_CONFIG, capiReady, siteUrlReady } from '@/lib/checkout-config';
import {
  sendCapiEvent,
  sha256Hex,
  type Occupation,
  type SendableEvent,
} from '@/lib/meta-capi';
import { readClientIp, readClientUserAgent } from '@/lib/request-signals';

/**
 * Every event that is not a proven payment. sales is NOT on the allow-list,
 * so this public endpoint cannot forge a sale; the Razorpay webhook owns it.
 *
 * call_booked is here because Cal confirms a booking in the browser and there is
 * no Cal webhook. A forged call_booked inflates a mid-funnel count and carries no
 * value. If Cal webhooks are ever wired, move it server-side and drop it here.
 */
const ALLOWED: SendableEvent[] = [
  'ViewContent',
  'atc_event',
  'ic_event',
  'qualified_form',
  'call_booked',
];

const OCCUPATIONS: Occupation[] = ['working_professional', 'homemaker'];

/* call_booked carries no value: the fee was counted on sales. */
const ZERO_VALUE: SendableEvent[] = ['call_booked'];

export async function POST(req: Request) {
  if (!capiReady()) {
    return NextResponse.json({ ok: false, reason: 'capi-not-configured' });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: 'bad-json' }, { status: 400 });
  }

  const eventName = String(body.eventName ?? '') as SendableEvent;
  if (!ALLOWED.includes(eventName)) {
    return NextResponse.json({ ok: false, reason: 'event-not-allowed' }, { status: 400 });
  }

  const email = typeof body.email === 'string' ? body.email : '';
  const fbp = typeof body.fbp === 'string' ? body.fbp : undefined;

  const rawOccupation = String(body.occupation ?? '') as Occupation;
  const occupation = OCCUPATIONS.includes(rawOccupation) ? rawOccupation : undefined;

  /* Working professional qualifies (the copy is "For Busy Working Women").
     Flipping it is this comparison plus one in lib/track.ts. */
  if (eventName === 'qualified_form' && occupation !== 'working_professional') {
    return NextResponse.json({ ok: false, reason: 'not-qualified' }, { status: 400 });
  }

  const eventSourceUrl =
    (typeof body.eventSourceUrl === 'string' && body.eventSourceUrl) ||
    CHECKOUT_CONFIG.fallbackEventSourceUrl;
  if (!eventSourceUrl) {
    console.error('[meta] no event_source_url: NEXT_PUBLIC_SITE_URL is unset and the caller sent none');
  } else if (!siteUrlReady()) {
    console.warn('[meta] NEXT_PUBLIC_SITE_URL is unset, falling back to the caller url');
  }

  /* Deterministic, so Meta's 48h window collapses double-fires. The payment id
     keys a booking, so two bookings by one buyer are two events. */
  const scheduleKey = typeof body.paymentId === 'string' ? body.paymentId : '';
  const seed = email || fbp || `${Date.now()}_${Math.random()}`;
  const eventId = sha256Hex(`${scheduleKey || seed}|${eventName}`);

  const result = await sendCapiEvent({
    pixelId: CHECKOUT_CONFIG.meta.pixelId,
    accessToken: CHECKOUT_CONFIG.meta.accessToken,
    eventName,
    eventId,
    eventSourceUrl,
    user: {
      email: email || undefined,
      phone: typeof body.phone === 'string' ? body.phone : undefined,
      firstName: typeof body.firstName === 'string' ? body.firstName : undefined,
      lastName: typeof body.lastName === 'string' ? body.lastName : undefined,
      country:
        typeof body.country === 'string' && body.country.length === 2
          ? body.country.toLowerCase()
          : 'in',
      city: typeof body.city === 'string' ? body.city : undefined,
      externalId: typeof body.externalId === 'string' ? body.externalId : undefined,
      fbc: typeof body.fbc === 'string' ? body.fbc : undefined,
      fbp,
      clientIp: readClientIp(req) || undefined,
      clientUserAgent: readClientUserAgent(req) || undefined,
    },
    valueRupees: ZERO_VALUE.includes(eventName) ? 0 : CHECKOUT_CONFIG.amountRupees,
    currency: CHECKOUT_CONFIG.currency,
    occupation,
    testEventCode: CHECKOUT_CONFIG.meta.testEventCode || undefined,
  });

  return NextResponse.json({ ok: result.ok, eventName, eventId });
}
