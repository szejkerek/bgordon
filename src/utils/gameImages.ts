import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const EXTS = ['png', 'jpg', 'jpeg', 'webp', 'gif'];
const NUMBERED_RE = /^\d+\.(png|jpg|jpeg|webp|gif)$/;

function gameDir(slug: string): string {
  return join(process.cwd(), 'public', 'images', 'games', slug);
}

export function getThumbnail(slug: string): string | undefined {
  const dir = gameDir(slug);
  for (const ext of EXTS) {
    if (existsSync(join(dir, `thumbnail.${ext}`))) {
      return `/images/games/${slug}/thumbnail.${ext}`;
    }
  }
}

export function getGallery(slug: string): string[] {
  const dir = gameDir(slug);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter(f => NUMBERED_RE.test(f))
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map(f => `/images/games/${slug}/${f}`);
}
