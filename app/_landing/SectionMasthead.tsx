import type { CSSProperties, ReactNode } from 'react';

/** Eyebrow, display H2 (one lit phrase via <em>), deck. Identical at every beat. */
export function SectionMasthead({
  eyebrow,
  title,
  sub,
  delay = '0s',
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  delay?: string;
}) {
  const d = { '--d': delay } as CSSProperties;
  return (
    <>
      {eyebrow && (
        <div className="sdp-eyebrow center" data-sdp-reveal>
          {eyebrow}
        </div>
      )}
      <h2 className="sdp-h2" data-sdp-reveal style={d}>
        {title}
      </h2>
      {sub && (
        <p className="sdp-sub" data-sdp-reveal style={d}>
          {sub}
        </p>
      )}
    </>
  );
}
