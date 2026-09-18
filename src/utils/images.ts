import type { ImageMetadata } from 'astro';

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
