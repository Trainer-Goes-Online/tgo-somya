import { FilmGlyph, ImageGlyph } from './icons';

/**
 * A slot for artwork that does not exist yet: sized at the real asset's
 * ratio so nothing reflows when it lands, and labelled with what belongs
 * there.
 */
export function MediaPlaceholder({
  ratio,
  label,
  note,
  kind = 'image',
  className = '',
}: {
  /** CSS aspect-ratio of the real asset, e.g. '16 / 9'. */
  ratio: string;
  label: string;
  note?: string;
  kind?: 'image' | 'film';
  className?: string;
}) {
  const Glyph = kind === 'film' ? FilmGlyph : ImageGlyph;

  return (
    <div
      className={`sdp-ph${className ? ` ${className}` : ''}`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={`Placeholder: ${label}`}
    >
      <div className="sdp-ph-inner">
        <span className="sdp-ph-icon">
          <Glyph />
        </span>
        <span className="sdp-ph-label">{label}</span>
        {note && <span className="sdp-ph-note">{note}</span>}
      </div>
    </div>
  );
}
