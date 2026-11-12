import type { CSSProperties } from 'react';
import { asset } from './asset-version';
import { AwardIcon, BookIcon, UsersIcon } from './icons';
import { MediaPlaceholder } from './MediaPlaceholder';
import { Rail, RailImage, type Shot } from './Rail';
import { SectionMasthead } from './SectionMasthead';

/**
 * BEATS 5a / 5b · meet your nutrition & fertility coach (DARK: authority).
 *
 * 5a, the copy's pipe-separated credential line, is a credential set, so it
 * is a pill row. 5b, the bio, is TEXT: prose set as prose.
 * The six media features close the beat as one row moving right to left
 * (the copy's instruction), fixed height so no headline or caption in a
 * scan is cropped. The set repeats once so it outruns a wide screen.
 */
const PHOTO = { src: '/somya/somya-solo.webp', w: 960, h: 1200 };

const CREDS = [
  { Icon: UsersIcon, text: <><b>1.5M+</b> Social Media Following</> },
  { Icon: AwardIcon, text: <>Recognised By Rajasthan CM &amp; Odisha Governor</> },
  { Icon: BookIcon, text: <>Published Author</> },
];

const MEDIA: Shot[] = [
  { src: '/media/media-01.webp', w: 900, h: 675, alt: 'Hindi newspaper feature on Somya Luhadia as a social media fitness influencer' },
  { src: '/media/media-02.webp', w: 803, h: 900, alt: 'Somya Luhadia, winner, Best Health & Fitness Influencer 2021, World Influencers and Bloggers Awards India' },
  { src: '/media/media-03.webp', w: 531, h: 900, alt: 'DNA India article featuring Somya Luhadia' },
  { src: '/media/media-04.webp', w: 562, h: 900, alt: 'Outlook India article featuring Somya Luhadia' },
  { src: '/media/media-05.webp', w: 900, h: 868, alt: 'Announcement of the TV show In Shape With Somya' },
  { src: '/media/media-06.webp', w: 900, h: 852, alt: 'Article listing Somya Luhadia among top female fitness influencers' },
];
const MEDIA_ROW = [...MEDIA, ...MEDIA];

export function Expert() {
  return (
    <section id="expert" className="sdp-coach sdp-dark">
      <div className="sdp-wrap">
        <SectionMasthead
          eyebrow="Meet Your Nutrition & Fertility Coach"
          title={
            <>
              The Nutrition Expert Behind <br className="sdp-br-desk" />
              <em>1,000+ Women&apos;s Health Journeys</em>
            </>
          }
          delay=".06s"
        />

        <div className="sdp-coach-grid">
          <div className="sdp-coach-photo" data-sdp-reveal>
            {PHOTO.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={asset(PHOTO.src)}
                alt="Somya Luhadia"
                width={PHOTO.w}
                height={PHOTO.h}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <MediaPlaceholder
                ratio={`${PHOTO.w} / ${PHOTO.h}`}
                label="Somya's solo picture"
                note="Portrait · 4:5 assumed"
              />
            )}
          </div>

          <div className="sdp-coach-body" data-sdp-reveal style={{ '--d': '.1s' } as CSSProperties}>
            <ul className="sdp-coach-creds" aria-label="Credentials">
              {CREDS.map(({ Icon, text }, i) => (
                <li key={i}>
                  <span className="ic" aria-hidden>
                    <Icon size={15} />
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <p className="lede">
              An engineer-turned-ISSA Certified Nutritionist &amp; Weight Management Specialist,{' '}
              <strong>Somya Luhadia</strong> has spent <strong>11+ years</strong> helping women manage
              stubborn weight gain, PCOD, insulin resistance and hormonal concerns, including women working
              towards conception.
            </p>
            <p>
              Her approach combines personalised nutrition, weight management, exercise and practical meal
              preparation to help busy women improve their health without restrictive diets or complicated
              routines.
            </p>
            <p>
              As the founder of <strong>GGT.Fit (The Glow Girl Tales)</strong> and author of{' '}
              <strong>Meal Prep in India</strong>, she has guided women across India, USA, UK, Australia &amp;
              Europe, including women who have gone on to conceive and embrace motherhood while working on
              their health alongside medical care.
            </p>
          </div>
        </div>
      </div>

      <div className="sdp-media-rail" data-sdp-reveal aria-label="Media features">
        <Rail
          dir="rtl"
          render={(inert) =>
            MEDIA_ROW.map((s, i) => <RailImage key={`${s.src}-${i}`} shot={s} inert={inert || i >= MEDIA.length} />)
          }
        />
      </div>
    </section>
  );
}
