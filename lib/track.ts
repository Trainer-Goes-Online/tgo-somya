'use client';

import { site } from '@/lib/site';
import { GA4_ITEM_ID, PRODUCT_LABEL } from '@/lib/offer';
import { collectSignals } from '@/lib/client-signals';
import type { SendableEvent } from '@/lib/meta-capi';
import {
  ga4AddPaymentInfo,
  ga4AddToCart,
  ga4BeginCheckout,
  ga4GenerateLead,
  ga4Purchase,
  ga4ViewItem,
  once,
  type Ga4Item,
} from '@/lib/ga4';

/**
 * The one place a page records something: Meta by its standard name through
 * the CAPI route, GA4 by its own recommended name. The value is the start fee;
 * the programme is sold on the call, so it is never reported here.
 */

const VALUE = site.feeInr;

/* GA4 only. The item name never reaches Meta. */
const ITEM: Ga4Item = {
  item_id: GA4_ITEM_ID,
  item_name: PRODUCT_LABEL,
  price: VALUE,
  quantity: 1,
};
const money = { value: VALUE, currency: 'INR', items: [ITEM] };

type Person = {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  country?: string;
  occupation?: string;
  paymentId?: string;
};

/** Fire-and-forget, keepalive so it survives the navigation a click causes. */
function capi(eventName: SendableEvent, person: Person = {}) {
  const s = collectSignals();
  try {
    void fetch('/api/meta/event', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ eventName, ...s, ...person }),
      keepalive: true,
    });
  } catch {
    /* ignore */
  }
}

/** The offer has been seen. Once per SESSION. */
export function trackViewItem() {
  once('view_item', () => {
    capi('ViewContent');
    ga4ViewItem(money);
  });
}

/** Checkout ARRIVAL, from the checkout's mount only. Never a CTA click. */
export function trackAddToCart() {
  capi('atc_event');
  ga4AddToCart(money);
}

export function trackBeginCheckout() {
  ga4BeginCheckout(money);
}

/**
 * Details valid and the sheet is opening. qualified_form is its own call, for
 * the qualifying answer only: Meta dedupes on name + id and the route derives
 * a different id per name.
 */
export function trackInitiateCheckout(person: Person) {
  capi('ic_event', person);
  if (person.occupation === 'working_professional') {
    capi('qualified_form', person);
  }
  ga4AddPaymentInfo({ value: VALUE, currency: 'INR' });
}

/** GA4 only. Meta's sales comes from the webhook. */
export function trackPurchase(transactionId: string) {
  once(`purchase_${transactionId}`, () => {
    ga4Purchase({ transactionId, ...money });
  });
}

/** Booked, from Cal's bookingSuccessful callback only. No value: the fee counted on sales. */
export function trackSchedule(paymentId: string) {
  once(`schedule_${paymentId || 'anon'}`, () => {
    capi('call_booked', { paymentId });
    ga4GenerateLead({ value: 0, currency: 'INR' });
  });
}
