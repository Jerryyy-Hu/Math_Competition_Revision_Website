/** Emit only the explicitly selected publishable source files for the GitHub connector. */
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const files = [
  '.gitignore', '.github/workflows/pages.yml', 'package.json', 'README.md',
  'research/bmo-combinatorics.md', 'research/verification.md', 'scripts/check-content.mjs', 'scripts/serve.mjs', 'scripts/package-source.mjs',
  ...readdirSync('site/dist').map((file) => `site/dist/${file}`),
];
const batch = Number(process.argv[2] || 0);
const selected = batch ? files.slice((batch - 1) * 5, batch * 5) : files;
console.log(JSON.stringify(selected.map((path) => ({ path, mode: '100644', type: 'blob', content: readFileSync(resolve(path), 'utf8') }))));
