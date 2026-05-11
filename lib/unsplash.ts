/**
 * Build an optimized Unsplash image URL.
 *
 * Unsplash file IDs look like "1682352689072-7b2c0b8580c2" and live at:
 *   https://images.unsplash.com/photo-{fileId}
 *
 * Unsplash's imgix-powered service handles resize/quality/crop via query params.
 */
export function unsplashUrl(
  fileId: string,
  opts: { w?: number; h?: number; q?: number; fit?: 'crop' | 'max' } = {}
) {
  const { w = 1200, h, q = 80, fit = 'crop' } = opts;
  const params = new URLSearchParams({
    auto: 'format',
    fit,
    w: String(w),
    q: String(q),
  });
  if (h) params.set('h', String(h));
  return `https://images.unsplash.com/photo-${fileId}?${params.toString()}`;
}

/** Build an Unsplash search URL for a given query — for credit/source links. */
export function unsplashSearchUrl(query: string) {
  return `https://unsplash.com/s/photos/${encodeURIComponent(query.replace(/\s+/g, '-'))}`;
}
