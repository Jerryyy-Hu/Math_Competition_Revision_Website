import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { collections, allTopics, topicMap, totals, escapeHtml, resolveTopicKey } from '../site/dist/library.js';
import { homePage, collectionPage, subjectPage, topicPage, reviewPage, indexTree } from '../site/dist/views.js';
import { richText, displayMath } from '../site/dist/math.js';
import { techniqueId, techniqueKey, problemKey } from '../site/dist/study-state.js';

const preferences = { saved: [], read: [], markedTechniques: [], reviewedProblems: [], last: null };
assert.equal(collections.length, 5);
assert.equal(topicMap.size, allTopics.length, 'Topic routes must be unique.');
assert.equal(totals.topics, 26);
assert(totals.exercises >= 74);
assert.deepEqual(collections.find((collection) => collection.id === 'bmt').subjects.map((subject) => subject.name), ['Algebra', 'Calculus', 'Discrete', 'Geometry', 'Team Rounds']);
assert.equal(resolveTopicKey('bmt/number-theory/congruences'), 'bmt/discrete/discrete-structures');
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
  const renderedTopic = topicPage(topic, preferences, []);
  assert(renderedTopic.includes(escapeHtml(topic.title)));
  if (topic.collection.scaffold) {
    assert.equal(topic.bullets.length, 0, `No populated notes are authorised for ${topic.collection.name}.`);
    assert.equal(topic.exercises.length, 0, `No populated exercises are authorised for ${topic.collection.name}.`);
    continue;
  }
  assert(topic.bullets.length >= 4);
  assert(topic.exercises.filter((problem) => problem.source).length >= 2, `Each populated topic needs at least two official practice assignments: ${topic.key}`);
  assert.equal(new Set(topic.bullets.map(techniqueId)).size, topic.bullets.length, `Technique anchor collision: ${topic.key}`);
  assert.equal(new Set(topic.exercises.map((problem) => problemKey(topic, problem))).size, topic.exercises.length, `Exercise identity collision: ${topic.key}`);
  assert(renderedTopic.includes('>Practice</h2>'));
  assert(!renderedTopic.includes('View solution'));
  assert(renderedTopic.includes('data-outline-link'));
  assert(renderedTopic.includes('data-review-problem'));
  assert(!renderedTopic.includes('katex-error'), `Invalid math in ${topic.key}`);
  for (const item of topic.bullets) {
    assert(!hasChinese(item.name), `Terminology should be English: ${topic.key}`);
    assert(hasChinese(item.nameZh), `Technique needs a Chinese name: ${topic.key} / ${item.name}`);
    assert(hasChinese(item.text), `Explanation should include Chinese: ${topic.key}`);
    for (const field of ['method', 'example', 'pitfall']) {
      assert(typeof item[field] === 'string' && item[field].length >= 15 && hasChinese(item[field]), `Missing detailed ${field}: ${topic.key} / ${item.name}`);
      assert(renderedTopic.includes(richText(item[field])), `Detailed ${field} must be rendered: ${topic.key} / ${item.name}`);
    }
  }
  for (const problem of topic.exercises) {
    assert(!hasChinese(problem.question), `Question should be English: ${topic.key}`);
    assert(hasChinese(problem.hint), `Hint should include Chinese: ${topic.key}`);
    assert(problem.solution.length >= 1);
    assert(problem.solution.every((step) => step.length > 10 && !hasChinese(step)), `Solution should be in English: ${topic.key}`);
    if (problem.source) {
      const source = problem.source;
      assert.equal(source.competition.toLowerCase(), topic.collection.id);
      assert(Number.isInteger(source.year) && source.year >= 1960 && source.year <= 2026);
      assert(/^Q\d+(?:\.\d+)*(?:[a-z])?$/i.test(source.question), `Invalid official question reference: ${problem.id}`);
      assert(['bmos.ukmt.org.uk', 'ukmt.org.uk', 'berkeley.mt'].includes(new URL(source.url).hostname));
      assert(renderedTopic.includes(escapeHtml(source.url)));
      assert.equal(source.restated, true);
    }
  }
}
for (const file of readdirSync(new URL('../site/dist/', import.meta.url)).filter((name) => name.endsWith('.js'))) {
  execFileSync(process.execPath, ['--check', new URL(`../site/dist/${file}`, import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')], { stdio: 'pipe' });
}
const tree = indexTree('bmo/combinatorics/counting');
for (const topic of allTopics) assert(tree.includes(`href="#/${topic.key}"`), `Missing index destination: ${topic.key}`);
assert(tree.includes('aria-current="page"'));
assert.equal(escapeHtml('<script>"x"</script>'), '&lt;script&gt;&quot;x&quot;&lt;/script&gt;');
assert(homePage(preferences).includes('26 topics'));
assert(reviewPage().includes('BMO1 2024'));
const html = readFileSync(new URL('../site/dist/index.html', import.meta.url), 'utf8');
assert(html.includes('viewport-fit=cover'));
assert(html.includes('type="module"'));
assert(!html.includes('https://cdn'), 'The site must not depend on an external CDN.');
assert(!html.includes('solution-dialog'), 'Solutions must remain inline.');
assert(displayMath('\\frac{1}{2}').includes('<math'), 'Fractions need accessible mathematical markup.');
assert(!richText('<img src=x onerror=alert(1)>').includes('<img'), 'Prose must remain escaped.');
const sample = topicMap.get('bmo/combinatorics/graphs');
const marked = { ...preferences, markedTechniques: [techniqueKey(sample, sample.bullets[0])], reviewedProblems: [problemKey(sample, sample.exercises[0])] };
const markedHtml = topicPage(sample, marked, []);
assert(markedHtml.includes('technique is-marked'));
assert(markedHtml.includes('aria-label="Marked" >'));
assert(markedHtml.includes('Marked as reviewed'));
const official = allTopics.flatMap((topic) => topic.exercises.filter((problem) => problem.source));
console.log(JSON.stringify({ collections: collections.length, populatedTopics: totals.topics, expandedTechniques: allTopics.reduce((sum, topic) => sum + topic.bullets.length, 0), exercises: totals.exercises, officialPracticeAssignments: official.length, uniqueOfficialProblems: new Set(official.map((problem) => problem.id)).size, categoryOnlyTopics: allTopics.length - totals.topics, checks: 'passed' }, null, 2));
