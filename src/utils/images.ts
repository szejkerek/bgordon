import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';
import type { MediaSource } from '../types';

/**
 * Every optimizable image in the project, resolved at build time.
 *
 * Images live in `src/assets/images/` so Astro's asset pipeline owns them:
 * content-hashed URLs, intrinsic width/height, and (where a caller asks for it)
 * responsive variants. Content frontmatter and site JSON still spell paths the
 * public-folder way (`/images/foo/bar.webp`) — this module is the single place
 * that maps that spelling onto a real asset.
 *
 * SVG is deliberately excluded: Astro treats SVG imports as components, not as
 * image metadata. The one placeholder SVG stays in `public/`.
 */
const ASSETS = import.meta.glob<ImageMetadata>(
  '/src/assets/images/**/*.{png,jpg,jpeg,webp,avif,gif}',
  { eager: true, import: 'default' },
);

/** `/images/…` path -> asset */
const byPath = new Map<string, ImageMetadata>();
/** same path minus its extension -> asset, so a stale extension still resolves */
const byStem = new Map<string, ImageMetadata>();

for (const [key, asset] of Object.entries(ASSETS)) {
  const path = key.replace('/src/assets', '');
  byPath.set(path, asset);
  byStem.set(stripExtension(path), asset);
}

function stripExtension(path: string): string {
  return path.replace(/\.[^./]+$/, '');
}

function normalize(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}

/**
 * Resolve a `/images/…` path to its build-time asset. Falls back to matching on
 * the path without its extension, so frontmatter that still says `.png` after a
 * format change keeps working.
 */
export function getImageAsset(path?: string): ImageMetadata | undefined {
  if (!path) return undefined;
  const normalized = normalize(path);
  return byPath.get(normalized) ?? byStem.get(stripExtension(normalized));
}

/** Resolved URL for a `/images/…` path, or undefined when nothing matches. */
export function getImageSrc(path?: string): string | undefined {
  return getImageAsset(path)?.src;
}

/** A fully-resolved {@link MediaSource}: every field present. */
export type Picture = Required<MediaSource>;

interface PictureOptions {
  widths: number[];
  sizes: string;
}

/**
 * Widths and `sizes` per usage site, kept next to each other so a CSS change to
 * one of these slots has one obvious place to be mirrored.
 */
export const IMAGE_PRESETS = {
  /** Homepage project grid: one column under 420px, two on mobile, ~340px cards above. */
  projectThumbnail: {
    widths: [340, 480, 680, 960],
    sizes: '(max-width: 420px) 100vw, (max-width: 768px) 50vw, 340px',
  },
  /** Achievement timeline photo: half the row on desktop, full width once stacked. */
  achievementPhoto: {
    widths: [300, 480, 640, 900],
    sizes: '(max-width: 768px) 100vw, 40vw',
  },
  /** Hero portrait: 380x470 on desktop, 200x250 once the grid stacks. */
  heroPhoto: {
    widths: [200, 380, 400, 760],
    sizes: '(max-width: 900px) 200px, 380px',
  },
  /** Fixed 56px company/school logo. */
  companyLogo: {
    widths: [56, 112],
    sizes: '56px',
  },
  /** Book cover: 165x220 in the grid, 195x293 for the featured card, 130px on mobile. */
  bookCover: {
    widths: [130, 165, 195, 330, 390],
    sizes: '(max-width: 600px) 130px, 195px',
  },
  /** Gallery tile: three columns on desktop, one on narrow screens. */
  galleryThumbnail: {
    widths: [300, 480, 600, 900],
    sizes: '(max-width: 600px) 100vw, 33vw',
  },
  /** Lead image on a project detail page: half the content column, full once stacked. */
  detailHero: {
    widths: [400, 640, 900, 1200],
    sizes: '(max-width: 768px) 100vw, 50vw',
  },
} satisfies Record<string, PictureOptions>;

/**
 * Build responsive variants of an asset.
 *
 * `width`/`height` stay the *intrinsic* dimensions rather than the largest
 * variant: the browser only needs the aspect ratio to reserve the box, and CSS
 * decides the rendered size.
 */
export async function toPicture(
  asset: ImageMetadata,
  { widths, sizes }: { widths: number[]; sizes: string },
): Promise<Picture> {
  // Never upscale — a variant wider than the source just wastes bytes.
  const usable = widths.filter((width) => width <= asset.width);
  const generated = await getImage({
    src: asset,
    widths: usable.length ? usable : [asset.width],
    sizes,
    format: 'webp',
  });

  return {
    src: generated.src,
    srcset: generated.srcSet.attribute,
    sizes,
    width: asset.width,
    height: asset.height,
  };
}

/**
 * Gallery tiles for a set of assets: a small responsive thumbnail to render,
 * plus the full-size URL the lightbox opens. Without the split, a 1920px source
 * would be downloaded just to fill a ~300px tile.
 */
export async function toGalleryItems(
  assets: ImageMetadata[],
): Promise<{ thumbnail: Picture; full: MediaSource }[]> {
  return Promise.all(
    assets.map(async (asset) => ({
      thumbnail: await toPicture(asset, IMAGE_PRESETS.galleryThumbnail),
      full: { src: asset.src, width: asset.width, height: asset.height },
    })),
  );
}

/** The social-preview image for a page, with dimensions that are actually true. */
export interface SocialCard {
  url: string;
  width: number;
  height: number;
  /** Twitter card type matching the shape below. */
  type: 'summary_large_image' | 'summary';
}

const SOCIAL_CARD_WIDTH = 1200;
const SOCIAL_CARD_HEIGHT = 630;

/**
 * Crops an asset to the 1.91:1 card social platforms expect — but only when the
 * source is wide enough to fill it. A narrower source (the portrait profile
 * photo, say) is served at its own size and declared as a small card, rather
 * than upscaled into a blurry banner or described with dimensions it does not
 * have.
 */
export async function toSocialCard(asset?: ImageMetadata): Promise<SocialCard | undefined> {
  if (!asset) return undefined;

  if (asset.width >= SOCIAL_CARD_WIDTH) {
    const cropped = await getImage({
      src: asset,
      width: SOCIAL_CARD_WIDTH,
      height: SOCIAL_CARD_HEIGHT,
      fit: 'cover',
      format: 'webp',
    });
    return {
      url: cropped.src,
      width: SOCIAL_CARD_WIDTH,
      height: SOCIAL_CARD_HEIGHT,
      type: 'summary_large_image',
    };
  }

  const asIs = await getImage({ src: asset, format: 'webp' });
  return { url: asIs.src, width: asset.width, height: asset.height, type: 'summary' };
}

/** Same as {@link toPicture}, but tolerates a missing asset. */
export async function toOptionalPicture(
  asset: ImageMetadata | undefined,
  options: { widths: number[]; sizes: string },
): Promise<Picture | undefined> {
  return asset ? toPicture(asset, options) : undefined;
}

/**
 * Direct children of an `/images/…` directory, as `[path, asset]` pairs.
 * Nested directories are not descended into.
 */
export function assetsInDirectory(directory: string): [string, ImageMetadata][] {
  const prefix = `${normalize(directory).replace(/\/$/, '')}/`;
  return [...byPath.entries()].filter(
    ([path]) => path.startsWith(prefix) && !path.slice(prefix.length).includes('/'),
  );
}
