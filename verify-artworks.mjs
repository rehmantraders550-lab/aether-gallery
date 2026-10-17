import { createHash } from 'node:crypto';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const original = join(root, 'public/artworks/CALIGRAPHY-original.webp');
const expectedOriginalSHA256 = 'd4f69e36fbb61fb3c525acd84eac2de11946013d866c0ee31a797ea2a1726c0e';
const files = [
  'CALIGRAPHY-original.webp',
  'triptych-study.webp',
  'subhan-allah-study.webp',
  'alhamdulillah-study.webp',
  'allahu-akbar-study.webp',
  'material-detail.webp'
];
let failed = false;
for (const name of files) {
  const path = join(root, 'public/artworks', name);
  if (!existsSync(path)) {
    console.error(`Missing artwork: ${name}`);
    failed = true;
    continue;
  }
  const bytes = readFileSync(path);
  if (bytes.length < 128 || bytes.toString('ascii', 0, 4) !== 'RIFF' || bytes.toString('ascii', 8, 12) !== 'WEBP') {
    console.error(`Invalid WebP signature or empty file: ${name}`);
    failed = true;
  }
  console.log(`Verified ${name} (${bytes.length} bytes)`);
}
if (existsSync(original)) {
  const actual = createHash('sha256').update(readFileSync(original)).digest('hex');
  if (actual !== expectedOriginalSHA256) {
    console.error(`Original artwork integrity check failed: expected ${expectedOriginalSHA256}, got ${actual}`);
    failed = true;
  } else {
    console.log('Original uploaded artwork SHA-256 is unchanged');
  }
}
if (failed) process.exit(1);
