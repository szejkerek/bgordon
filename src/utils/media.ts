import type { MediaType } from '../types';

const VIDEO_EXTENSIONS = /\.(mp4|webm|ogg|mov)$/i;
const GIF_EXTENSION = /\.gif$/i;
const IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|webp|avif|svg)$/i;

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

export function collectLightboxImages(cover: string | undefined, gallery: string[]): string[] {
  return [...(cover ? [cover] : []), ...splitMedia(gallery).images];
}
