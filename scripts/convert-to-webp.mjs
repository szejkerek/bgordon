// Convert large PNGs (> 1MB) to WebP and update all markdown frontmatter references
import { createRequire } from 'module';
import { readdir, stat, readFile, writeFile, unlink } from 'fs/promises';
import { join, extname, basename, dirname, relative } from 'path';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const PUBLIC_DIR = 'public/images';
const CONTENT_DIR = 'src/content';
const SIZE_THRESHOLD = 1024 * 1024; // 1MB

async function getFiles(dir, exts) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...await getFiles(full, exts));
    else if (exts.some(ext => e.name.toLowerCase().endsWith(ext))) files.push(full);
  }
  return files;
}

// Find large PNGs that need conversion
const allPngs = await getFiles(PUBLIC_DIR, ['.png']);
const largePngs = [];
for (const f of allPngs) {
  const s = await stat(f);
  if (s.size > SIZE_THRESHOLD) largePngs.push(f);
}

if (largePngs.length === 0) {
  console.log('No large PNGs found. All good!');
  process.exit(0);
}

console.log(`Converting ${largePngs.length} large PNGs to WebP...\n`);

// Convert each PNG to WebP
const conversions = {}; // old path → new path (public-relative)
for (const f of largePngs) {
  const before = (await stat(f)).size;
  const webpPath = f.replace(/\.png$/i, '.webp');

  await sharp(f)
    .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(webpPath);

  const after = (await stat(webpPath)).size;
  const saved = ((before - after) / before * 100).toFixed(1);

  // Public-relative paths for frontmatter
  const oldRef = '/' + relative('public', f).replace(/\\/g, '/');
  const newRef = '/' + relative('public', webpPath).replace(/\\/g, '/');
  conversions[oldRef] = newRef;

  console.log(`✓ ${basename(f).padEnd(20)} ${Math.round(before/1024)}KB → ${Math.round(after/1024)}KB (-${saved}%)`);
  await unlink(f); // remove original
}

// Update markdown frontmatter references
console.log('\nUpdating markdown references...');
const mdFiles = await getFiles(CONTENT_DIR, ['.md']);

let updatedFiles = 0;
for (const mdFile of mdFiles) {
  let content = await readFile(mdFile, 'utf-8');
  let changed = false;

  for (const [oldRef, newRef] of Object.entries(conversions)) {
    if (content.includes(oldRef)) {
      content = content.replaceAll(oldRef, newRef);
      changed = true;
    }
  }

  if (changed) {
    await writeFile(mdFile, content, 'utf-8');
    console.log(`  Updated: ${basename(mdFile)}`);
    updatedFiles++;
  }
}

console.log(`\nDone. Updated ${updatedFiles} markdown files.`);
console.log('Conversion map:');
for (const [o, n] of Object.entries(conversions)) {
  console.log(`  ${o} → ${n}`);
}
