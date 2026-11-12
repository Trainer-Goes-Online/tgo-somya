# tgo-somya · PENDING

VSL funnel for Somya Luhadia (GGT.Fit): ₹97 consultation into the 90-Day
Fertility & Weight Management Programme. Built by LAUNCH (VSL mode) on
2026-11-05. Copy source: `funnel-copy/01-landing-vsl.md` (verbatim from Atul).

Surfaces: `/` landing · `/checkout` · `/book-a-call` · `/thank-you` ·
`/privacy` · `/terms` · `/refund` · one `SiteFooter` on every surface.

Nothing below is invented. Every item is UNKNOWN until Atul or the client supplies it.

---

## 1 · Client facts: DONE (2026-11-06)

- Entity, legal name, trading name, address, phone, email, jurisdiction in `lib/legal.ts`.
- Policy date `effectiveDate` = 6 November 2026; change to the go-live date if it differs.
- Footer disclaimer follows the house structure (tgo-dhvani VSL pattern) with a fertility line.
- Business structure and logo are not needed for launch (Atul). Not blockers.

## 2 · Offer: DONE (2026-11-06), `OFFER_PENDING = false`

- `/refund` is the client's own Refund Policy, verbatim. Its "[Insert Official Support Email]" is `LEGAL.email`.
- Consultation: 30 min, with Somya herself.

## 3 · Booking: DONE

- Cal.com `ggfit/1-on-1-consultation` (the client snippet said `ggfit/30min`, which 404s) (`CAL_LINK` in `lib/booking.ts`), embed settings match the client's snippet.
- In Cal's dashboard, leave the event type's own **redirect EMPTY**. If set it wins over `bookingSuccessful`, `call_booked` never fires and the buyer skips `/thank-you`.

## 4 · Brand

- Palette: Blush Rose light theme. Rose `#C2416B` primary, deep rose `#8E2550`, blush ground `#FDF4F6`, plum ink `#2A1520`, deep plum `#2B0F1E` for the dark bands. Token block in `app/globals.css` only.

## 5 · Assets

Originals are in `assets-source/` (gitignored, never shipped). Shipped WebP derivatives are in `public/`. Every `/public` reference goes through `asset()`; bump `ASSET_V` in `app/_landing/asset-version.ts` on any in-place swap.

### Downloaded from Drive and wired

| Section | Drive folder | Shipped |
|---|---|---|
| B/A rails ("From Stubborn Weight To Visible Transformations") | https://drive.google.com/drive/folders/1hTxiDz_1G9wYEg65E6_PJc2so8JGDuY1 | `public/before-after/ba-01..28.webp` |
| Chat wall ("Thousands Of Lives Touched") | https://drive.google.com/drive/folders/1PGUZ3qfx6Dm4_UKW5rC4QW_uyBs0aJWb | `public/client-chats/chat-01..14.webp` |
| Media features | https://drive.google.com/drive/folders/1iE1DZK6Bfded-iD22rUT7D2HoDUpPQvE | `public/media/media-01..06.webp` |

B/A mapping (shipped ← Drive filename): ba-01..05 ← 1..5.jpg · ba-06 ← 9.jpg · ba-07..27 ← 10..30.jpg · ba-28 ← "WhatsApp Image 2026-10-27 at 3.53.10 PM.jpeg". Drive has no 6.jpg, 7.jpg or 8.jpg.

Media: the copy asks for 6, Drive has 14 unique files (16 with two duplicates). LAUNCH picked the six press / recognition items: media-01 Hindi newspaper feature (WA0017) · media-02 "Best Health & Fitness Influencer 2021" (WA0023) · media-03 DNA India (WA0021) · media-04 Outlook India (WA0024) · media-05 "In Shape With Somya" TV show (WA0025) · media-06 "Top Female Fitness Influencers" (WA0020). The other eight (radio studio photos, award stills, a video call grab) are in `assets-source/media/` if Atul prefers a different six.

### Needs Atul before it can ship

- [ ] **3 B/A files marked "hide her face"** (`hide her face.jpg` x2, `hide the face.jpg`, all Maneesha's "Story of Conviction") are WITHHELD. Edit the faces out, then drop them in as ba-29..31.
- [ ] **ba-28** (WhatsApp image, weights handwritten "72.2 KG 6 JAN 25" / "63.10 kg 29 march 2025") shows the client's face and has no name. Confirm consent and whose story it is.
- [ ] **Chat screenshots show client names, and chat-11 shows a full phone number (+91 93065 74765).** Confirm consent / blur before launch.
- Video testimonials play from Vimeo only, never downloaded. Add each new Vimeo id to `VIDEOS` in `app/_landing/Stories.tsx`.
- [x] **Hero has no VSL** (Atul 2026-11-12): Somya's portrait in a circle instead, `public/somya/somya-circle.webp` (square crop of 192A3629.JPEG).
- [x] **Hero "[Photos]"**: face crops from the "after" side of ba-02, ba-20, ba-18, ba-15 (Atul 2026-11-06), `public/avatars/av-01..04.webp`.
- [x] **Video testimonial 1**: Vimeo 1242682102 (the 86 MB Drive video, 9:16, 6:52), poster `public/video-testimonials/vt-01.webp` from Vimeo's thumbnail. The section shows only real videos; add more to `VIDEOS` in `app/_landing/Stories.tsx` as they are hosted (the 2.8 MB Drive video is not on Vimeo yet).
- [x] **Somya's photo** (192A3629.JPEG): 4:5 crop in the About section (`public/somya/somya-solo.webp`), the circle crop also on the checkout order-summary chip.
- Bump `ASSET_V` in `app/_landing/asset-version.ts` whenever any of these lands.

## 6 · Copy flags (not edited, for Atul)

- "5.0 Review" and the fertility-readiness claims: cleared by Atul 2026-11-06, kept as written.
- "One below the other" is read as the 5 videos in a single column at every width (about 2,700px of scroll on desktop). If side by side on desktop was meant, it's a one-rule CSS change.
- The 7 written stories move left to right as the copy asks. The row is slowed to a 120s loop and stops on hover or tap so the paragraphs can be read.
- B/A rows are 14 + 14, not 15 + 15: 3 files are held back for face edits.
- What's Included: the copy numbers the six items 1 to 6. The page shows one icon per card and drops the numbers (house rule for this beat). The FAQ keeps its numbers.
- The CTA appears more often than the copy shows it: after the chats, after What's Included, after the guarantee and at the finale (same as the Dhvani build).
- The copy has no closing line, so the finale repeats the hero headline.
- "1000+" and "1,000+" are both used. Each is kept as written.
- Before/after alt text is generic ("Client before and after transformation N") because the names are only in the artwork.
- Several B/A cards are titled "POST PARTUM JOURNEY" / "PCOD & GUT ISSUES MANAGED", which is the client's own artwork, shipped as supplied.

## 7 · Env (`.env.example` → `.env.local`)

13 vars, verified both directions (every var is read, every `process.env` is declared): `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_PRICE_RUPEES`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, `NEXT_PUBLIC_META_PIXEL_ID`, `META_PIXEL_ID`, `META_CAPI_ACCESS_TOKEN`, `META_CAPI_TEST_EVENT_CODE`, `NEXT_PUBLIC_GA4_ID`, `GA4_API_SECRET`, `NEXT_PUBLIC_CLARITY_ID`, `PABBLY_WEBHOOK_URL`. All unknown. The domain is unknown too.

## 8 · To go live

1. `npm install` (the project has no `node_modules`), then `npm run build`. `tsc --noEmit --incremental false` passed on 2026-11-05 against tgo-dhvani's identical dependency set.
2. Domain: set the apex as Vercel's primary, then `curl -sS -o /dev/null -D - https://<domain> | grep -iE '^HTTP/|^location:'`; `NEXT_PUBLIC_SITE_URL` = the host that returns 200, no trailing slash.
3. Fill `.env.local` and Vercel env.
4. Razorpay → Settings → Webhooks: register `https://<domain>/api/razorpay/webhook` for `payment.captured`; its secret is `RAZORPAY_WEBHOOK_SECRET`. The webhook only acts on orders with `notes.kind = 'somya_start'` (`lib/checkout-config.ts`) and returns 200 for anything else on the account.
5. Meta: send a test purchase with `META_CAPI_TEST_EVENT_CODE`, check `sales` in Test Events, then **delete the test code**. Meta events are custom names (`atc_event`, `ic_event`, `sales`, `call_booked`, `qualified_form`; ViewContent stays standard): create a custom conversion on `sales` to optimise campaigns for it.
6. Pabbly: POST a sample payload with `is_test: true`, map every column, then one with `is_test: false` to confirm the live branch.
7. GA4 + Clarity ids into env (`components/shared/Analytics.tsx` renders both; Clarity script id is `ms-clarity`).
8. Clear every `[TODO]` in §1 to §4, set `OFFER_PENDING = false`, remove `robots: noindex` from `app/layout.tsx` when the claims are signed off.
9. Run one real ₹97 payment end to end: checkout → Razorpay → `/book-a-call` → Cal booking → `/thank-you`.
