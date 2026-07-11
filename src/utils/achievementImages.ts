import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { IMAGE_FILE_EXTENSIONS } from './media';

const NUMBERED_RE = new RegExp(`^\\d+\\.(${IMAGE_FILE_EXTENSIONS.join('|')})$`, 'i');

/**
 * Gallery images for an achievement, resolved from
 * `public/images/achievements/<slug>/` — numbered files (`1.*`, `2.*`, …)
 * sorted ascending. Mirrors the project gallery convention.
 */
export function getAchievementGallery(slug: string): string[] {
  const dir = join(process.cwd(), 'public', 'images', 'achievements', slug);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((file) => NUMBERED_RE.test(file))
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map((file) => `/images/achievements/${slug}/${file}`);
}
