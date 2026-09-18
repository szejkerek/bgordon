import type { ImageMetadata } from 'astro';
import { assetsInDirectory } from './images';

const NUMBERED_RE = /\/(\d+)\.[^./]+$/;

/**
 * Gallery assets for an achievement, resolved from
 * `src/assets/images/achievements/<slug>/` — numbered files (`1.*`, `2.*`, …)
 * in ascending order. Mirrors the project gallery convention.
 */
export function getAchievementGallery(slug: string): ImageMetadata[] {
  return assetsInDirectory(`/images/achievements/${slug}`)
    .filter(([path]) => NUMBERED_RE.test(path))
    .sort(([a], [b]) => Number(a.match(NUMBERED_RE)![1]) - Number(b.match(NUMBERED_RE)![1]))
    .map(([, asset]) => asset);
}
