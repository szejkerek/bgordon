import type { ImageMetadata } from 'astro';
import { assetsInDirectory, getImageAsset } from './images';

export const PLACEHOLDER_IMAGE = '/project-placeholder.svg';

const NUMBERED_RE = /\/(\d+)\.[^./]+$/;

function projectDirectory(slug: string): string {
  return `/images/projects/${slug}`;
}

/** Thumbnail asset for a project, resolved from `src/assets/images/projects/<slug>/thumbnail.*`. */
export function getThumbnail(slug: string): ImageMetadata | undefined {
  return getImageAsset(`${projectDirectory(slug)}/thumbnail`);
}

/** Gallery assets for a project — numbered files (`1.*`, `2.*`, …) in ascending order. */
export function getGallery(slug: string): ImageMetadata[] {
  return assetsInDirectory(projectDirectory(slug))
    .filter(([path]) => NUMBERED_RE.test(path))
    .sort(([a], [b]) => Number(a.match(NUMBERED_RE)![1]) - Number(b.match(NUMBERED_RE)![1]))
    .map(([, asset]) => asset);
}

export function getProjectMedia(slug: string): {
  thumbnail: ImageMetadata | undefined;
  gallery: ImageMetadata[];
} {
  return { thumbnail: getThumbnail(slug), gallery: getGallery(slug) };
}
