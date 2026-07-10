import type { MediaType } from '../types';

const VIDEO_EXT = ['mp4', 'webm', 'ogg', 'mov'];
const GIF_EXT = ['gif'];
const STILL_IMAGE_EXT = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'svg'];

const extensionMatcher = (extensions: string[]): RegExp => new RegExp(`\\.(${extensions.join('|')})$`, 'i');

const VIDEO_EXTENSIONS = extensionMatcher(VIDEO_EXT);
const GIF_EXTENSION = extensionMatcher(GIF_EXT);
const IMAGE_EXTENSIONS = extensionMatcher(STILL_IMAGE_EXT);

/** Every extension that counts as a displayable image asset — still images plus gif. No leading dot. */
export const IMAGE_FILE_EXTENSIONS = [...STILL_IMAGE_EXT, ...GIF_EXT];

export function getMediaType(src: string): MediaType {
  if (VIDEO_EXTENSIONS.test(src)) return 'video';
  if (GIF_EXTENSION.test(src)) return 'gif';
  return 'image';
}

export function isVideo(src: string): boolean {
  return VIDEO_EXTENSIONS.test(src);
}

export function isGif(src: string): boolean {
  return GIF_EXTENSION.test(src);
}

export function isImage(src: string): boolean {
  return IMAGE_EXTENSIONS.test(src) && !isGif(src);
}

export function splitMedia(items: string[]): { images: string[]; videos: string[] } {
  const images: string[] = [];
  const videos: string[] = [];
  for (const item of items) {
    (isVideo(item) ? videos : images).push(item);
  }
  return { images, videos };
}

export function resolveMediaPath(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}

export function getLoadingStrategy(type: MediaType): 'eager' | 'lazy' {
  return type === 'gif' ? 'eager' : 'lazy';
}

export function getVideoPreload(priority: boolean = false): 'auto' | 'metadata' | 'none' {
  return priority ? 'auto' : 'metadata';
}

export function lightboxImages(items: string[]): string[] {
  return splitMedia(items).images;
}
