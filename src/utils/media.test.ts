import { describe, it, expect } from 'vitest';
import { lightboxImages } from './media';

describe('lightboxImages', () => {
  it('keeps images and drops videos so a lightbox never renders a broken frame', () => {
    const media = [
      '/a.png',
      '/clip.mp4',
      '/b.jpg',
      '/loop.webm',
    ];

    expect(lightboxImages(media)).toEqual(['/a.png', '/b.jpg']);
  });

  it('keeps gifs (they render in an img) and preserves order', () => {
    expect(lightboxImages(['/x.gif', '/v.mov', '/y.png'])).toEqual(['/x.gif', '/y.png']);
  });

  it('returns an empty array for empty input', () => {
    expect(lightboxImages([])).toEqual([]);
  });
});
