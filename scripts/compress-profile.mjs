import { createRequire } from 'module';
import { rename, unlink } from 'fs/promises';
import { join } from 'path';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const src = 'public/images/profilePicture.jpg';
const tmp = 'public/images/profilePicture.tmp.jpg';

const before = (await import('fs')).statSync(src).size;

await sharp(src)
  .resize(640, 800, { fit: 'inside', withoutEnlargement: true })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(tmp);

const after = (await import('fs')).statSync(tmp).size;

if (after < before) {
  await unlink(src);
  await rename(tmp, src);
  console.log(`profilePicture.jpg: ${Math.round(before/1024)}KB → ${Math.round(after/1024)}KB (-${((before-after)/before*100).toFixed(1)}%)`);
} else {
  await unlink(tmp);
  console.log(`profilePicture.jpg: no gain (${Math.round(before/1024)}KB)`);
}
