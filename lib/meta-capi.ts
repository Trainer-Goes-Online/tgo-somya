import crypto from 'crypto';

/**
 * Meta Conversions API primitives, shared by every server-side event route.
 *
 * HEALTH CLASSIFICATION HYGIENE. This offer sells against a condition, and
 * Meta's "Health and wellness condition" restriction binds at the ROOT DOMAIN
 * and is not cleanly reversible. The two removable signals live here:
 *   `custom_data` carries value, currency, order_id and the occupation enum
 *   ONLY. It is unhashed and read: no product name, no category, no UTM.
 *   `event_source_url` is reduced to the ORIGIN, server-side.
 * `user_data` stays maximal (hashed, scored for EMQ, declares nothing), and the
 * standard event NAMES stay, because they are where AEM priority lives.
 */

export type Utm = {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
};

export function originOnly(url: string): string {
  try {
    return new URL(url).origin;
  } catch {
    return url;
  }
}

/** Closed unions: a free-form string is how a health term reaches Meta. */
export type StandardEvent =
  | 'ViewContent'
  | 'AddToCart'
  | 'InitiateCheckout'
  | 'Purchase'
  | 'Schedule';

/** A segment label on InitiateCheckout, never a new funnel stage. */
export type CustomEvent = 'QualifiedLead';

export type SendableEvent = StandardEvent | CustomEvent;

/** The one descriptive value allowed into custom_data. Neither member names a condition. */
export type Occupation = 'working_professional' | 'homemaker';

export function sha256Hex(value: string): string {
  return crypto.createHash('sha256').update(value).digest('hex');
}

/* Empty fields return undefined: a hash of '' would match every other empty field. */
export function hashEmail(v: string) {
  const s = v.trim().toLowerCase();
  return s ? sha256Hex(s) : undefined;
}
export function hashPhone(v: string) {
  const s = v.replace(/\D/g, '');
  return s ? sha256Hex(s) : undefined;
}
export function hashName(v: string) {
  const s = v.trim().toLowerCase();
  return s ? sha256Hex(s) : undefined;
}
export function hashCountry(v: string) {
  const s = v.trim().toLowerCase();
  return s ? sha256Hex(s) : undefined;
}
/* Meta strips spaces and punctuation, so "New Delhi" and "newdelhi" must hash the same. */
export function hashCity(v: string) {
  const s = v.trim().toLowerCase().replace(/[^a-z]/g, '');
  return s ? sha256Hex(s) : undefined;
}

export type UserSignals = {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  city?: string;
  externalId?: string;
  fbc?: string;
  fbp?: string;
  clientIp?: string;
  clientUserAgent?: string;
};

function buildUserData(u: UserSignals) {
  return {
    ...(u.email && { em: [hashEmail(u.email)!] }),
    ...(u.phone && { ph: [hashPhone(u.phone)!] }),
    ...(u.firstName && { fn: [hashName(u.firstName)!] }),
    ...(u.lastName && { ln: [hashName(u.lastName)!] }),
    ...(u.country && { country: [hashCountry(u.country)!] }),
    ...(u.city && { ct: [hashCity(u.city)!] }),
    ...(u.externalId && { external_id: [sha256Hex(u.externalId)] }),
    ...(u.fbc && { fbc: u.fbc }),
    ...(u.fbp && { fbp: u.fbp }),
    ...(u.clientIp && { client_ip_address: u.clientIp }),
    ...(u.clientUserAgent && { client_user_agent: u.clientUserAgent }),
  };
}

/** One event, one POST. Never throws: a failed analytics call must not fail a payment. */
export async function sendCapiEvent(params: {
  pixelId: string;
  accessToken: string;
  eventName: SendableEvent;
  eventId: string;
  eventSourceUrl: string;
  user: UserSignals;
  valueRupees: number;
  currency: string;
  orderId?: string;
  occupation?: Occupation;
  testEventCode?: string;
}): Promise<{ ok: boolean; status: number; body: unknown }> {
  const body = {
    data: [
      {
        event_name: params.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: params.eventId,
        event_source_url: originOnly(params.eventSourceUrl),
        action_source: 'website',
        user_data: buildUserData(params.user),
        /* Nothing is added here without the same review these four got. */
        custom_data: {
          currency: params.currency,
          value: params.valueRupees,
          ...(params.orderId && { order_id: params.orderId }),
          ...(params.occupation && { occupation: params.occupation }),
        },
      },
    ],
    ...(params.testEventCode && { test_event_code: params.testEventCode }),
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${params.pixelId}/events?access_token=${params.accessToken}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      },
    );
    return { ok: res.ok, status: res.status, body: await res.json() };
  } catch (e) {
    return { ok: false, status: 0, body: String(e) };
  }
}
