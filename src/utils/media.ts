/**
 * Media Type Detection Utilities
 * 
 * Centralized logic for detecting media types from file paths.
 */

import type { MediaType } from '../types';

const VIDEO_EXTENSIONS = /\.(mp4|webm|ogg|mov)$/i;
const GIF_EXTENSION = /\.gif$/i;
const IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|webp|avif|svg)$/i;

/**
 * Detect media type from file path
 */
export function getMediaType(src: string): MediaType {
  if (VIDEO_EXTENSIONS.test(src)) return 'video';
  if (GIF_EXTENSION.test(src)) return 'gif';
  return 'image';
}

/**
 * Check if media is a video
 */
export function isVideo(src: string): boolean {
  return VIDEO_EXTENSIONS.test(src);
}

/**
 * Check if media is a GIF
 */
export function isGif(src: string): boolean {
  return GIF_EXTENSION.test(src);
}

/**
 * Check if media is a static image
 */
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

/**
 * Get loading strategy based on media type
 */
export function getLoadingStrategy(type: MediaType): 'eager' | 'lazy' {
  // GIFs should load eagerly as they're often the main content
  return type === 'gif' ? 'eager' : 'lazy';
}

/**
 * Get preload strategy for videos
 */
export function getVideoPreload(priority: boolean = false): 'auto' | 'metadata' | 'none' {
  return priority ? 'auto' : 'metadata';
}
