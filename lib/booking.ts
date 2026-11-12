/** sessionStorage key carrying the payment id from /book-a-call to
 *  /thank-you, in case Cal's success callback cannot read it. */
export const PAY_KEY = 'sm_payment_id';

/**
 * Cal.com "handle/event-slug". In Cal's dashboard, leave the event type's own
 * redirect EMPTY, or it wins over bookingSuccessful and call_booked never fires.
 */
export const CAL_LINK = 'ggfit/1-on-1-consultation';
