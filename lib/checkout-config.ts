import { site, feePaise } from '@/lib/site';
import { GA4_ITEM_ID, PRODUCT_LABEL } from '@/lib/offer';

/**
 * Every server-side constant the payment and tracking routes need.
 *
 * SITE_URL is the ONE origin literal in the codebase and it has no fallback:
 * it is Meta's event_source_url, and a guessed host would attribute live
 * events to a domain nobody checked. Before setting it:
 *   curl -sS -o /dev/null -D - https://the-domain | grep -iE '^HTTP/|^location:'
 * A 308 means that host is not canonical. House standard is the apex.
 */
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || '').trim().replace(/\/+$/, '');

export const siteUrlReady = () => Boolean(SITE_URL);

export const CHECKOUT_CONFIG = {
  amountRupees: site.feeInr,
  amountPaise: feePaise,
  currency: 'INR',
  contentName: PRODUCT_LABEL,
  itemId: GA4_ITEM_ID,
  /* Written onto every order and checked by the webhook. Razorpay sends every
     payment on the account to every registered URL. */
  orderKind: 'somya_start',
  fallbackEventSourceUrl: SITE_URL,
  meta: {
    pixelId: process.env.META_PIXEL_ID ?? '',
    accessToken: process.env.META_CAPI_ACCESS_TOKEN ?? '',
    testEventCode: process.env.META_CAPI_TEST_EVENT_CODE ?? '',
  },
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID ?? '',
    keySecret: process.env.RAZORPAY_KEY_SECRET ?? '',
    webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET ?? '',
  },
} as const;

export const capiReady = () =>
  Boolean(CHECKOUT_CONFIG.meta.pixelId && CHECKOUT_CONFIG.meta.accessToken);

/** Derived from the key id, so it cannot drift the way an IS_TEST var does. */
export const isTestMode = () =>
  CHECKOUT_CONFIG.razorpay.keyId.startsWith('rzp_test_') ||
  Boolean(CHECKOUT_CONFIG.meta.testEventCode);
