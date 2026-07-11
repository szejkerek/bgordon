import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { IMAGE_FILE_EXTENSIONS } from './media';

const EXTS = IMAGE_FILE_EXTENSIONS;
const NUMBERED_RE = new RegExp(`^\\d+\\.(${EXTS.join('|')})$`, 'i');

export const PLACEHOLDER_IMAGE = '/images/placeholder.svg';

function projectDir(slug: string): string {
  return join(process.cwd(), 'public', 'images', 'projects', slug);
}

export function getThumbnail(slug: string): string {
  const dir = projectDir(slug);
  for (const ext of EXTS) {
    if (existsSync(join(dir, `thumbnail.${ext}`))) {
      return `/images/projects/${slug}/thumbnail.${ext}`;
    }
  }
  return PLACEHOLDER_IMAGE;
}

export function getGallery(slug: string): string[] {
  const dir = projectDir(slug);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter(f => NUMBERED_RE.test(f))
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map(f => `/images/projects/${slug}/${f}`);
}

export function getProjectMedia(slug: string): { thumbnail: string; gallery: string[] } {
  return { thumbnail: getThumbnail(slug), gallery: getGallery(slug) };
}
