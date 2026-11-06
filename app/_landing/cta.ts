import { CTA_LABEL } from '@/lib/site';

/**
 * The CTA label split into the two lines it takes on a phone, derived from
 * CTA_LABEL (never retyped) at the word boundary that makes the longer line
 * shortest.
 */
function balance(label: string): [string, string] {
  const words = label.trim().split(/\s+/);
  if (words.length < 2) return [label, ''];
  let cut = 1;
  let best = Infinity;
  for (let i = 1; i < words.length; i++) {
    const longer = Math.max(words.slice(0, i).join(' ').length, words.slice(i).join(' ').length);
    if (longer < best) {
      best = longer;
      cut = i;
    }
  }
  return [words.slice(0, cut).join(' '), words.slice(cut).join(' ')];
}

export const CTA_LINES = balance(CTA_LABEL);
