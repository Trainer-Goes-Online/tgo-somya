import type { CSSProperties } from 'react';
import { ClickToPlay } from './ClickToPlay';

/**
 * BEAT 1 focal · the VSL frame (§8). The copy's THUMBNAIL is the poster.
 *
 * TO FILL: put the Vimeo id in VIMEO_ID and the thumbnail at
 * public/vsl/thumbnail.webp (1600x900 or larger), then set POSTER and bump
 * ASSET_V. If the film is not 16:9, change RATIO.
 */
const VIMEO_ID = '';
const POSTER = '';
const RATIO = '16 / 9';

export function VslFrame() {
  return (
    <div className="sdp-vsl-frame" id="vsl" data-sdp-reveal style={{ '--d': '.22s' } as CSSProperties}>
      <div className="sdp-vsl">
        <ClickToPlay
          vimeoId={VIMEO_ID}
          poster={POSTER}
          ratio={RATIO}
          label="VSL video + thumbnail · Somya Luhadia"
          note="16:9 · Vimeo link + thumbnail image"
        />
      </div>
    </div>
  );
}
