/**
 * Every business fact the footer, the policy pages, the checkout sheet and the
 * booking fallback need, in one place.
 *
 * ⚠️ EVERY `[TODO]` IS A LAUNCH BLOCKER AND RENDERS ON THE PAGE. None may be
 * invented. Razorpay's merchant review looks for the entity, address, phone
 * and email ON THE SITE, not inside one policy page.
 */
export const LEGAL = {
  entity: 'Spark Dance and Health Academy',
  legalName: 'Somya Luhadia',
  tradeName: 'GGTFIT',
  /** As it should read in a sentence, lower case: 'a sole proprietorship',
   *  'a private limited company'. Empty means the terms page names no structure. */
  structure: '',
  address: '51/88 Spark Tower, Sec 5, Pratap Nagar, Tonk Road, Jaipur 302033',
  /** As it should be read, e.g. '98XXX XXXXX'. */
  phone: '78773 72774',
  /** Digits with the country code, e.g. '+9198XXXXXXXX'. Empty disables tel: and wa.me links. */
  phoneHref: '+917877372774',
  /** Refund and data requests land here. Empty disables mailto: links. */
  email: 'somyaluhadia17@gmail.com',
  /** The state or district court seat. Read as "the courts in …". */
  jurisdiction: 'Rajasthan',
  /** The date the policies are published under. */
  effectiveDate: '6 November 2026',
  brand: 'Somya Luhadia',
} as const;

export const EMAIL_LABEL = LEGAL.email || '[TODO: email]';
export const PHONE_DIGITS = LEGAL.phoneHref.replace(/\D/g, '');
export const STRUCTURE_KNOWN = LEGAL.structure.trim().length > 0;

export const LEGAL_DISCLAIMER =
  'The information on this website is for general educational purposes and is not a substitute for medical advice, diagnosis or treatment. GGTFIT’s programmes are nutrition and lifestyle coaching and do not replace care from your gynaecologist, fertility specialist or doctor. Do not stop or change any prescribed medication or fertility treatment without consulting your doctor. Pregnancy depends on several medical and biological factors and is not guaranteed. Results shown are individual client outcomes and are not typical or guaranteed; what anyone achieves depends on their health history, adherence and other factors. This website is not affiliated with or endorsed by Meta. FACEBOOK and INSTAGRAM are trademarks of Meta Platforms, Inc.';
