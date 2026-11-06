import { asset } from './asset-version';
import { ShieldCheckIcon, StarIcon } from './icons';

/**
 * BEAT 0b · trust row (§12, hairline chip row).
 * "[Photos] ★★★★★ 5.0 Review | 🛡️ 100% Results Guarantee".
 *
 * AVATARS: real clients only, 96px square face crops from the "after" side of
 * ba-02, ba-20, ba-18, ba-15.
 */
const AVATARS: string[] = ['/avatars/av-01.webp', '/avatars/av-02.webp', '/avatars/av-03.webp', '/avatars/av-04.webp'];

export function TrustRow() {
  return (
    <div className="sdp-trust-strip">
      <div className="sdp-trust-avatars" aria-hidden>
        {AVATARS.map((src, i) => (
          <span
            key={i}
            className={`sdp-trust-avatar${src ? '' : ' is-empty'}`}
            style={src ? { backgroundImage: `url("${asset(src)}")` } : undefined}
          />
        ))}
      </div>

      <div className="sdp-trust-item">
        <span className="sdp-trust-stars" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => (
            <StarIcon key={i} size={13} />
          ))}
        </span>
        <span>
          <b>5.0</b> Review
        </span>
      </div>

      <span className="sdp-trust-sep" aria-hidden>
        |
      </span>

      <div className="sdp-trust-item">
        <span className="sdp-trust-check" aria-hidden>
          <ShieldCheckIcon />
        </span>
        <span>
          <b>100%</b> Results Guarantee
        </span>
      </div>
    </div>
  );
}
