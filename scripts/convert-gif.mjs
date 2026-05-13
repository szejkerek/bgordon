import { createRequire } from 'module';
import { stat, readFile, writeFile } from 'fs/promises';
import { readFileSync, statSync } from 'fs';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const src = 'public/images/games/arkanoid/5.gif';
const dst = 'public/images/games/arkanoid/5.webp';

const before = statSync(src).size;

try {
  await sharp(src, { animated: true })
    .webp({ quality: 80, loop: 0 })
    .toFile(dst);

  const after = statSync(dst).size;
  console.log(`5.gif: ${Math.round(before/1024)}KB → ${Math.round(after/1024)}KB (-${((before-after)/before*100).toFixed(1)}%)`);

  // Update markdown reference
  const mdPath = 'src/content/games/arkanoid-game-clone.md';
  try {
    let content = await readFile(mdPath, 'utf-8');
    if (content.includes('/images/games/arkanoid/5.gif')) {
      content = content.replaceAll('/images/games/arkanoid/5.gif', '/images/games/arkanoid/5.webp');
      await writeFile(mdPath, content, 'utf-8');
      console.log('Updated arkanoid-game-clone.md');
    }
  } catch {}
} catch (e) {
  console.log('Animated WebP failed:', e.message);
  console.log('GIF stays as-is');
}
