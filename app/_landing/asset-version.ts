/**
 * Every /public reference goes through `asset()`. The path is the cache key in
 * the browser, at the CDN edge and in Next's image optimizer, so bump ASSET_V
 * in the same pass as any artwork swap.
 */
export const ASSET_V = '5';

export function asset(path: string): string {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${clean}${clean.includes('?') ? '&' : '?'}v=${ASSET_V}`;
}
