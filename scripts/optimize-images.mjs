/**
 * One-shot source-asset optimizer.
 *
 * Reads every image under `public/images/` and writes an optimized copy into
 * `src/assets/images/`, preserving the folder layout. From there Astro's image
 * pipeline (`astro:assets`) takes over: hashed URLs, intrinsic dimensions and
 * responsive `srcset` per usage site.
 *
 * - png / jpg / jpeg -> WebP q82, longest edge capped at MAX_EDGE
 * - gif              -> animated WebP when that is smaller, else copied as-is
 * - webp / avif     -> copied verbatim (already efficient)
 * - svg              -> skipped; SVG imports as a component, so it stays in public/
 *
 * Run once after adding new art:  npm run images:optimize
 */
import { createRequire } from 'node:module';
import { readdir, stat, mkdir, copyFile, readFile, writeFile } from 'node:fs/promises';
import { join, dirname, extname, relative } from 'node:path';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const SRC_DIR = 'public/images';
const OUT_DIR = 'src/assets/images';
const CONTENT_DIR = 'src/content';
const MAX_EDGE = 1920;
const WEBP_QUALITY = 82;

const RASTER = new Set(['.png', '.jpg', '.jpeg']);
const COPY_AS_IS = new Set(['.webp', '.avif']);
// SVG is not an Astro image asset (it imports as a component), so it stays in public/.
const SKIP = new Set(['.svg']);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

function kb(bytes) {
  return `${Math.round(bytes / 1024)}KB`.padStart(8);
}

/** Public-relative URL of a file under public/, e.g. /images/foo/bar.png */
function publicRef(file) {
  return '/' + relative('public', file).split(/[\\/]/).join('/');
}

async function toWebp(file) {
  return sharp(file)
    .resize(MAX_EDGE, MAX_EDGE, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY, effort: 5 })
    .toBuffer();
}

/**
 * Animated GIF -> animated WebP. Deliberately not resized: sharp exposes an
 * animation as one tall filmstrip, so `fit: inside` would squash every frame
 * into a single one and silently kill the animation.
 */
async function toAnimatedWebp(file) {
  return sharp(file, { animated: true })
    .webp({ quality: WEBP_QUALITY, effort: 5, loop: 0 })
    .toBuffer();
}

const files = await walk(SRC_DIR);
console.log(`Optimizing ${files.length} images: ${SRC_DIR} -> ${OUT_DIR}\n`);

/** old public ref -> new public ref, for rewriting frontmatter */
const renames = {};
/** output path -> source path, to catch two sources normalizing onto one name */
const written = new Map();
let before = 0;
let after = 0;

for (const file of files) {
  const ext = extname(file).toLowerCase();
  if (SKIP.has(ext)) continue;
  const rel = relative(SRC_DIR, file);
  const sizeBefore = (await stat(file)).size;
  before += sizeBefore;

  let outRel = rel;
  let buffer = null;

  if (RASTER.has(ext)) {
    outRel = rel.replace(/\.(png|jpe?g)$/i, '.webp');
    buffer = await toWebp(file);
  } else if (ext === '.gif') {
    const webp = await toAnimatedWebp(file).catch(() => null);
    if (webp && webp.length < sizeBefore) {
      outRel = rel.replace(/\.gif$/i, '.webp');
      buffer = webp;
    }
  } else if (!COPY_AS_IS.has(ext)) {
    console.log(`? ${rel} — unknown extension, copied as-is`);
  }

  const outFile = join(OUT_DIR, outRel);
  // Two sources can normalize onto one name (e.g. 5.gif and 5.png -> 5.webp).
  // Fail loudly instead of letting whichever runs last win silently.
  if (written.has(outFile)) {
    throw new Error(
      `Output collision: "${rel}" and "${written.get(outFile)}" both map to "${outRel}". ` +
        `Delete or rename one of the sources.`,
    );
  }
  written.set(outFile, rel);
  await mkdir(dirname(outFile), { recursive: true });

  if (buffer) {
    await writeFile(outFile, buffer);
  } else {
    await copyFile(file, outFile);
  }

  const sizeAfter = (await stat(outFile)).size;
  after += sizeAfter;

  if (outRel !== rel) {
    renames[publicRef(file)] = '/' + ['images', ...outRel.split(/[\\/]/)].join('/');
  }

  const delta = sizeBefore > 0 ? ((sizeBefore - sizeAfter) / sizeBefore) * 100 : 0;
  console.log(`${buffer ? '✓' : '='} ${rel.padEnd(52)} ${kb(sizeBefore)} -> ${kb(sizeAfter)} (-${delta.toFixed(1)}%)`);
}

console.log(
  `\nTotal: ${kb(before)} -> ${kb(after)} (-${(((before - after) / before) * 100).toFixed(1)}%)`,
);

// Rewrite frontmatter paths whose extension changed. The resolver in
// src/utils/images.ts also falls back to a by-stem lookup, so a stale
// extension degrades to a warning rather than a missing image.
const markdown = (await walk(CONTENT_DIR)).filter((f) => f.endsWith('.md'));
let updated = 0;
for (const file of markdown) {
  let text = await readFile(file, 'utf8');
  let changed = false;
  for (const [from, to] of Object.entries(renames)) {
    if (text.includes(from)) {
      text = text.replaceAll(from, to);
      changed = true;
    }
  }
  if (changed) {
    await writeFile(file, text, 'utf8');
    updated++;
  }
}
console.log(`Rewrote image paths in ${updated} markdown file(s).`);
