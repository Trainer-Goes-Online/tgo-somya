/**
 * The one declaration of the price. The landing page, the checkout, the
 * Razorpay amount and every Meta / GA4 `value` read the derived values below.
 *
 * `Number(x) || 97`: a .env.local copied from .env.example ships the key
 * present but blank, and Number('') is 0.
 */
export const site = {
  checkoutUrl: '/checkout',
  feeInr: Number(process.env.NEXT_PUBLIC_PRICE_RUPEES ?? '97') || 97,
  /** "OFFER ENDS IN : TIMER OF 5 HOURS" */
  offerHours: 5,
};

export const feePaise = site.feeInr * 100;
export const feeLabel = `₹${site.feeInr.toLocaleString('en-IN')}`;

/** The copy's CTA, verbatim. */
export const CTA_LABEL = 'Click Here To Get My Personalised Fertility & Weight-Loss Plan';
