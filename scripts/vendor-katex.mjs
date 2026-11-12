/** Vendor the approved, integrity-pinned KaTeX ES module without lifecycle scripts. */
import { mkdirSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { gunzipSync } from 'node:zlib';

const version = '0.19.1';
const integrity = 'sha512-jG8uKntjSEcm2EpQOh0XturpPuuC9r3Sq5HLHdsFdWZT27E672SF19QEi+of0/YeOy15lDgRhKvr5614uRrEfA==';
const url = `https://registry.npmjs.org/katex/-/katex-${version}.tgz`;
const response = await fetch(url, { signal: AbortSignal.timeout(30_000) });
if (!response.ok) throw new Error(`KaTeX download failed: ${response.status}`);
const archive = Buffer.from(await response.arrayBuffer());
if (`sha512-${createHash('sha512').update(archive).digest('base64')}` !== integrity) throw new Error('KaTeX integrity mismatch.');
const tar = gunzipSync(archive);
const wanted = new Map([['package/dist/katex.mjs', 'katex.mjs'], ['package/LICENSE', 'LICENSE']]);
const extracted = [];
const directory = new URL('../site/dist/vendor/katex/', import.meta.url);
mkdirSync(directory, { recursive: true });
for (let offset = 0; offset + 512 <= tar.length;) {
  const header = tar.subarray(offset, offset + 512);
  if (header.every((byte) => byte === 0)) break;
  const name = header.subarray(0, 100).toString().split('\0')[0];
  const size = parseInt(header.subarray(124, 136).toString().replace(/\0/g, '').trim(), 8);
  if (!Number.isFinite(size) || size < 0) throw new Error('Invalid package archive entry.');
  const body = tar.subarray(offset + 512, offset + 512 + size);
  if (wanted.has(name)) {
    const file = wanted.get(name);
    writeFileSync(new URL(file, directory), body);
    extracted.push({ file, bytes: body.length, sha256: createHash('sha256').update(body).digest('hex') });
  }
  offset += 512 + Math.ceil(size / 512) * 512;
}
if (extracted.length !== wanted.size) throw new Error('Expected KaTeX source or license is missing.');
writeFileSync(new URL('provenance.json', directory), `${JSON.stringify({ version, url, integrity, output: 'mathml', license: 'MIT', files: extracted }, null, 2)}\n`);
console.log(JSON.stringify({ version, files: extracted.map(({ file, bytes }) => ({ file, bytes })) }));
