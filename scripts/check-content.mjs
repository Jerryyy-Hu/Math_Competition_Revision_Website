import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { collections, allTopics, topicMap, totals, escapeHtml } from '../site/dist/library.js';
import { homePage, collectionPage, subjectPage, topicPage, reviewPage, indexTree } from '../site/dist/views.js';

const preferences = { saved: [], read: [], last: null };
assert.equal(collections.length, 5);
assert.equal(topicMap.size, allTopics.length, 'Topic routes must be unique.');
assert.equal(totals.topics, 24);
assert.equal(totals.exercises, 30);
const hasChinese = (value) => /[\u3400-\u9fff]/u.test(value);

for (const collection of collections) {
  assert(collection.subjects.length > 0);
  assert(collectionPage(collection, preferences).includes(`<h1>${escapeHtml(collection.name)}</h1>`));
  for (const subject of collection.subjects) {
    assert(subject.topics.length > 0);
    assert(subjectPage(collection, subject, preferences).includes(escapeHtml(subject.name)));
  }
}
for (const topic of allTopics) {
  assert(topicPage(topic, preferences, []).includes(escapeHtml(topic.title)));
  if (topic.collection.scaffold) {
    assert.equal(topic.bullets.length, 0, `No populated notes are authorised for ${topic.collection.name}.`);
    assert.equal(topic.exercises.length, 0, `No populated exercises are authorised for ${topic.collection.name}.`);
    continue;
  }
  assert(topic.bullets.length >= 4);
  assert(topic.exercises.length > 0);
  for (const item of topic.bullets) {
    assert(!hasChinese(item.name), `Terminology should be English: ${topic.key}`);
    assert(hasChinese(item.text), `Explanation should include Chinese: ${topic.key}`);
  }
  for (const problem of topic.exercises) {
    assert(!hasChinese(problem.question), `Question should be English: ${topic.key}`);
    assert(hasChinese(problem.hint), `Hint should include Chinese: ${topic.key}`);
    assert(problem.solution.length >= 2);
    assert(problem.solution.every((step) => step.length > 10 && !hasChinese(step)), `Solution should be in English: ${topic.key}`);
  }
}
for (const file of readdirSync(new URL('../site/dist/', import.meta.url)).filter((name) => name.endsWith('.js'))) {
  execFileSync(process.execPath, ['--check', new URL(`../site/dist/${file}`, import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')], { stdio: 'pipe' });
}
const tree = indexTree('bmo/combinatorics/counting');
for (const topic of allTopics) assert(tree.includes(`href="#/${topic.key}"`), `Missing index destination: ${topic.key}`);
assert(tree.includes('aria-current="page"'));
assert.equal(escapeHtml('<script>"x"</script>'), '&lt;script&gt;&quot;x&quot;&lt;/script&gt;');
assert(homePage(preferences).includes('24 topics'));
assert(reviewPage().includes('BMO1 2024'));
const html = readFileSync(new URL('../site/dist/index.html', import.meta.url), 'utf8');
assert(html.includes('viewport-fit=cover'));
assert(html.includes('type="module"'));
assert(!html.includes('https://cdn'), 'The site must not depend on an external CDN.');
console.log(JSON.stringify({ collections: collections.length, populatedTopics: totals.topics, exercises: totals.exercises, categoryOnlyTopics: allTopics.length - totals.topics, checks: 'passed' }, null, 2));
