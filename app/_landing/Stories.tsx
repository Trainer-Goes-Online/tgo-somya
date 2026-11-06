import type { CSSProperties } from 'react';
import { ClickToPlay } from './ClickToPlay';
import { StarIcon } from './icons';
import { Rail } from './Rail';
import { SectionMasthead } from './SectionMasthead';

/**
 * BEATS 3 / 4 · proof A: their stories (LIGHT-ALT).
 *
 * Two forms, as the copy separates them:
 *  · five video testimonials, one below the other (the copy's instruction).
 *  · seven named written stories, moving left to right. Each is a paragraph,
 *    so the row runs slowly and holds still on hover or tap (every card takes
 *    focus), letting a reader stop on one. The stories carry figures inside
 *    sentences, so they stay sentences: no stat ledger is lifted out of them.
 *
 * TO FILL (videos): give each a Vimeo id and a poster, and the real ratio if
 * the films are not 9:16. Bump ASSET_V when posters land.
 */
type Testimonial = { label: string; vimeoId?: string; poster?: string };

const VIDEOS: Testimonial[] = [
  { label: 'Video Testimonial 1', vimeoId: '1242682102', poster: '/video-testimonials/vt-01.webp' },
];
const VIDEO_RATIO = '9 / 16';

type Story = { name: string; meta: string; story: string };

const STORIES: Story[] = [
  {
    name: 'Kanmani',
    meta: '30 | Chennai',
    story:
      'Kanmani lost 16 kgs in 7 months, going from 85 kg to 69 kg. Her personalised dairy-free nutrition plan included familiar South Indian meals and simple home workouts, helping her lose weight without crash diets or cooking separate meals.',
  },
  {
    name: 'Sasi',
    meta: '29 | USA',
    story:
      'Despite struggling with PCOD, hypothyroidism, high cholesterol and irregular periods, Sasi conceived during her coaching journey with Somya and has now welcomed her baby. Her personalised nutrition plan focused on regular meals, balanced nutrition and healthier daily habits, alongside her ongoing thyroid medication and medical care.',
  },
  {
    name: 'Rashmi',
    meta: '32 | Mumbai',
    story:
      'Despite working long office hours and dealing with fatty liver, gallstones and frequent migraines, Rashmi lost 12 kgs, going from 75 kg to 63 kg, and has successfully maintained her weight. Her personalised nutrition plan worked around her office schedule and favourite foods, helping her achieve lasting results without crash diets or restrictive eating.',
  },
  {
    name: 'Namrata',
    meta: '29 | Bangalore',
    story:
      "Despite struggling with PCOD, irregular periods, constant fatigue and long working hours, Namrata conceived after her wedding while following Somya's personalised nutrition and lifestyle programme alongside medical care. She continued coaching throughout her pregnancy and has now welcomed a healthy baby boy through a normal delivery.",
  },
  {
    name: 'Pavithra',
    meta: '31 | UK',
    story:
      "Despite long working hours, constant fatigue, sugar cravings and relying on takeaways, Pavithra began feeling more energetic within the first few weeks of following Somya's personalised nutrition plan. She conceived during her coaching journey and has now welcomed a baby girl, while continuing to build healthier habits alongside her medical care.",
  },
  {
    name: 'Maneesha',
    meta: '27 | Germany',
    story:
      "Despite struggling with PCOD, irregular periods, high cholesterol and repeated failed diets, Maneesha lost 22 kgs, going from 89 kg to 67 kg, while following Somya's personalised vegetarian nutrition and lifestyle plan. Her menstrual cycles became regular, and she was so satisfied with her progress that she returned for a second coaching programme.",
  },
  {
    name: 'Seetha',
    meta: '35 | Cuddalore',
    story:
      "Despite PCOD, weight gain and demanding workdays that often stretched until 11 PM, Seetha lost 10 kgs in just 3 months, going from 77 kg to 67 kg. After struggling with restrictive diets, Somya's personalised nutrition plan helped her achieve results while enjoying her favourite foods.",
  },
];

function StoryCard({ s, inert }: { s: Story; inert: boolean }) {
  return (
    <article className="sdp-story" tabIndex={inert ? -1 : 0} aria-label={inert ? undefined : `${s.name}'s story`}>
      <header className="sdp-story-head">
        <div>
          <h3 className="sdp-story-name">{s.name}</h3>
          <span className="sdp-story-meta">{s.meta}</span>
        </div>
        <span className="sdp-story-stars" role="img" aria-label="5 out of 5 stars">
          {[0, 1, 2, 3, 4].map((n) => (
            <StarIcon key={n} size={14} />
          ))}
        </span>
      </header>
      <p className="sdp-story-text">{s.story}</p>
    </article>
  );
}

export function Stories() {
  return (
    <section id="stories" className="sdp-proof sdp-light-alt">
      <div className="sdp-wrap">
        <SectionMasthead
          title={
            <>
              Before You Lose Hope Of Getting Pregnant Because Of Hormonal Issues Or Excess Weight,{' '}
              <em>See Their Stories.</em>
            </>
          }
          sub="From managing PCOD and hormonal concerns to conceiving and welcoming their babies."
          delay=".06s"
        />

        <ol className="sdp-vt-list" aria-label="Video testimonials">
          {VIDEOS.map((v, i) => (
            <li className="sdp-vt" key={v.label} data-sdp-reveal style={{ '--d': `${0.04 + i * 0.04}s` } as CSSProperties}>
              <ClickToPlay
                vimeoId={v.vimeoId}
                poster={v.poster}
                ratio={VIDEO_RATIO}
                label={v.label}
                note="9:16 assumed · video + poster frame"
                discSize={20}
              />
            </li>
          ))}
        </ol>
      </div>

      <div className="sdp-story-rail" data-sdp-reveal>
        <Rail
          dir="ltr"
          seconds={120}
          className="sdp-story-row"
          render={(inert) => STORIES.map((s) => <StoryCard key={s.name} s={s} inert={inert} />)}
        />
      </div>
    </section>
  );
}
