import assert from 'node:assert/strict';
import { allTopics } from '../site/dist/library.js';

const urls = [...new Set(allTopics.flatMap((topic) => topic.exercises.flatMap((problem) => problem.source ? [problem.source.url, problem.source.solutionUrl].filter(Boolean) : [])))];
const results = [];
for (let offset = 0; offset < urls.length; offset += 6) {
  const batch = await Promise.allSettled(urls.slice(offset, offset + 6).map(async (url) => {
    const response = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(15_000) });
    assert(response.ok, `${response.status}: ${url}`);
    assert(response.headers.get('content-type')?.includes('pdf'), `Expected official PDF: ${url}`);
    return { url, status: response.status };
  }));
  results.push(...batch);
}
const failures = results.flatMap((result, index) => result.status === 'rejected' ? [{ url: urls[index], error: String(result.reason) }] : []);
console.log(JSON.stringify({ officialPdfLinks: urls.length, passed: results.length - failures.length, failures }, null, 2));
assert.equal(failures.length, 0);
