'use client';

import { useState } from 'react';
import { asset } from './asset-version';
import { MediaPlaceholder } from './MediaPlaceholder';
import { PlayIcon } from './icons';

/**
 * A poster that becomes the player on click (skin: the VSL frame), shared by
 * the VSL and the video testimonials. The iframe mounts only once clicked, so
 * five testimonial players never load up front.
 *
 * With no `vimeoId` it is a labelled placeholder at the real ratio with an
 * INERT, unlit disc: a play button that plays nothing would be a lie.
 */
export function ClickToPlay({
  vimeoId,
  poster,
  ratio,
  label,
  note,
  discSize = 26,
}: {
  vimeoId?: string;
  poster?: string;
  /** CSS aspect-ratio of the film, e.g. '16 / 9' */
  ratio: string;
  label: string;
  note?: string;
  discSize?: number;
}) {
  const [playing, setPlaying] = useState(false);

  if (!vimeoId) {
    return (
      <div className="sdp-play" style={{ aspectRatio: ratio }}>
        <MediaPlaceholder ratio={ratio} kind="film" label={label} note={note} />
        <span className="sdp-play-disc pending" aria-hidden>
          <PlayIcon size={discSize} />
        </span>
      </div>
    );
  }

  return (
    <div className={`sdp-play${playing ? ' playing' : ''}`} style={{ aspectRatio: ratio }}>
      {playing ? (
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`}
          title={label}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" className="sdp-play-btn" onClick={() => setPlaying(true)} aria-label={`Play ${label}`}>
          {poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="sdp-play-poster" src={asset(poster)} alt="" decoding="async" />
          ) : (
            <span className="sdp-play-film" />
          )}
          <span className="sdp-play-disc" aria-hidden>
            <PlayIcon size={discSize} />
          </span>
        </button>
      )}
    </div>
  );
}
