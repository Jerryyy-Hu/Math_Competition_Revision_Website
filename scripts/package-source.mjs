/** Emit only the explicitly selected publishable source files for the GitHub connector. */
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const files = [
  '.gitignore', '.github/workflows/pages.yml', 'package.json', 'README.md',
  'research/bmo-combinatorics.md', 'research/bmo-practice-sources.md', 'research/bmt-format-sources.md', 'research/verification.md',
  'scripts/check-content.mjs', 'scripts/check-math.mjs', 'scripts/check-study-state.mjs', 'scripts/check-browser.mjs', 'scripts/check-sources.mjs',
  'scripts/vendor-katex.mjs', 'scripts/serve.mjs', 'scripts/package-source.mjs',
  ...readdirSync('site/dist', { recursive: true, withFileTypes: true }).filter((entry) => entry.isFile()).map((entry) => resolve(entry.parentPath, entry.name).slice(resolve('.').length + 1).replaceAll('\\', '/')).sort(),
];
if (process.argv[2] === '--manifest') { console.log(JSON.stringify(files)); process.exit(0); }
if (process.argv[2] === '--chunk') {
  const path = process.argv[3];
  if (!files.includes(path)) throw new Error('Only publishable sources may be read.');
  const source = readFileSync(resolve(path), 'utf8');
  const index = Number(process.argv[4]);
  const size = 36_000;
  console.log(JSON.stringify({ path, index, count: Math.ceil(source.length / size), content: source.slice(index * size, (index + 1) * size) }));
  process.exit(0);
}
if (process.argv[2] === '--file') {
  const path = process.argv[3];
  if (!files.includes(path)) throw new Error('Only publishable sources may be read.');
  console.log(JSON.stringify({ path, mode: '100644', type: 'blob', content: readFileSync(resolve(path), 'utf8') }));
  process.exit(0);
}
const batch = Number(process.argv[2] || 0);
const selected = batch ? files.slice((batch - 1) * 5, batch * 5) : files;
console.log(JSON.stringify(selected.map((path) => ({ path, mode: '100644', type: 'blob', content: readFileSync(resolve(path), 'utf8') }))));
