import { createRequire } from 'module';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const PUBLIC_DIR = 'public/images';
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1920;
const PROFILE_MAX_WIDTH = 640;

async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...await getFiles(full));
    else if (/\.(png|jpg|jpeg)$/i.test(e.name)) files.push(full);
  }
  return files;
}

async function compress(file) {
  const before = (await stat(file)).size;
  const ext = extname(file).toLowerCase();
  const name = basename(file);
  const isProfile = name === 'profilePicture.jpg';
  const maxW = isProfile ? PROFILE_MAX_WIDTH : MAX_WIDTH;

  const img = sharp(file);
  const meta = await img.metadata();

  const needsResize = (meta.width ?? 0) > maxW || (meta.height ?? 0) > MAX_HEIGHT;

  let pipeline = img;
  if (needsResize) {
    pipeline = pipeline.resize(maxW, MAX_HEIGHT, { fit: 'inside', withoutEnlargement: true });
  }

  if (ext === '.jpg' || ext === '.jpeg') {
    pipeline = pipeline.jpeg({ quality: 82, mozjpeg: true });
  } else if (ext === '.png') {
    pipeline = pipeline.png({ compressionLevel: 9, adaptiveFiltering: true });
  }

  const buf = await pipeline.toBuffer();
  const after = buf.length;

  if (after < before) {
    const { writeFile } = await import('fs/promises');
    await writeFile(file, buf);
    const saved = ((before - after) / before * 100).toFixed(1);
    console.log(`✓ ${name.padEnd(30)} ${kb(before)} → ${kb(after)} (-${saved}%)`);
  } else {
    console.log(`= ${name.padEnd(30)} ${kb(before)} (no gain, skipped)`);
  }
}

function kb(bytes) {
  return `${Math.round(bytes / 1024)}KB`.padStart(8);
}

const files = await getFiles(PUBLIC_DIR);
console.log(`Compressing ${files.length} images...\n`);

let total = { before: 0, after: 0 };
for (const f of files) {
  const before = (await stat(f)).size;
  await compress(f);
  const after = (await stat(f)).size;
  total.before += before;
  total.after += after;
}

console.log(`\nTotal: ${kb(total.before)} → ${kb(total.after)} (-${((total.before - total.after) / total.before * 100).toFixed(1)}%)`);
