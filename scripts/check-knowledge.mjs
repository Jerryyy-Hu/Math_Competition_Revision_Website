import assert from 'node:assert/strict';
import { activeTopics, totals } from '../site/dist/library.js';
import { searchKnowledge, normaliseSearch } from '../site/dist/search.js';
import { topicPage, searchResults } from '../site/dist/views.js';
import { techniqueId } from '../site/dist/study-state.js';

const preferences = { saved: [], read: [], markedTechniques: [], reviewedProblems: [] };
const techniques = activeTopics.flatMap((topic) => topic.bullets);
const hasChinese = (value) => /[\u3400-\u9fff]/u.test(value);
for (const topic of activeTopics) {
  const html = topicPage(topic, preferences, []);
  assert.equal((html.match(/class="technique-core"/g) || []).length, topic.bullets.length, `Every technique needs a visible core: ${topic.key}`);
  assert.equal((html.match(/<summary lang="zh-CN">拓展<\/summary>/g) || []).length, topic.bullets.filter((item) => item.extensions.length).length);
  assert(!/<details[^>]*data-extensions[^>]*\bopen(?:\s|>|=)/u.test(html), 'Extensions must start collapsed.');
  for (const item of topic.bullets) {
    assert(item.explanation.length >= 15 && hasChinese(item.explanation), `${topic.key}: missing plain explanation`);
    assert(item.core.length >= 10 && hasChinese(item.core), `${topic.key}: missing memorable conclusion`);
    assert(item.keywords.length >= 2 && item.keywords.every((word) => typeof word === 'string' && word.trim()), `${topic.key}: missing keywords`);
    assert.equal(new Set(item.extensions.map((extension) => extension.id)).size, item.extensions.length);
    for (const extension of item.extensions) {
      assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(extension.id), 'Extension identifiers must be safe and stable.');
      assert(hasChinese(extension.nameZh) && extension.name && hasChinese(extension.text));
      assert(extension.keywords.length >= 2);
      assert(html.includes(`id="${techniqueId(item)}--${extension.id}"`));
    }
  }
}

const scenarios = [
  ['因式分解', 'Factorisation'], ['factorization', 'Factorisation'],
  ['因子数', 'Divisor count'], ['因子和', 'Divisor sum'], ['因子积', 'Divisor product'],
  ['Cauchy-Schwarz', 'Cauchy–Schwarz'], ['费马', 'Fermat’s little theorem'],
  ['Sophie Germain', 'Factorisation', 'sophie-germain'],
  ["Euler's cube identity", 'Factorisation', 'euler-cube'],
  ['cyclic difference', 'Factorisation', 'cyclic-difference'],
  ['欧拉公式', 'Fermat’s little theorem', 'euler-totient'],
  ['权方和', 'Cauchy–Schwarz', 'power-sum'], ['幂平均', 'Cauchy–Schwarz', 'power-means'],
  ['柯西不等式', 'Cauchy–Schwarz'], ['正因数个数', 'Divisor count'], ['因数和', 'Divisor sum'], ['因数积', 'Divisor product'],
  ['海伦公式', 'Sine and cosine rules', 'triangle-area'],
];
for (const [query, itemName, extensionId] of scenarios) {
  const { results } = searchKnowledge(query, Infinity);
  assert(results.length >= 2, `Both competitions should be discoverable: ${query}`);
  assert.deepEqual(results.slice(0, 2).map((result) => result.topic.collection.id), ['bmo', 'bmt'], query);
  for (const result of results.slice(0, 2)) {
    assert.equal(result.item.name, itemName, query);
    assert.equal(result.extension?.id, extensionId, query);
    assert(result.href.includes(`technique=${techniqueId(result.item)}`));
    if (extensionId) assert(result.href.includes(`extension=${extensionId}`));
  }
  assert(results.every((result, index) => !index || result.score <= results[index - 1].score));
  const html = searchResults(query, preferences);
  assert(html.includes('competition-tag lavender">BMO</span>'));
  assert(html.includes('competition-tag sage">BMT</span>'));
}
const scoped = searchKnowledge('BMT 因子和', Infinity).results;
assert(scoped.length && scoped.every((result) => result.topic.collection.id === 'bmt'));
assert.equal(scoped[0].item.name, 'Divisor sum');
assert.equal(normaliseSearch('  Hölder — Cauchy–Schwarz  '), 'holder cauchy schwarz');
assert.deepEqual(searchKnowledge('   '), { total: 0, results: [] });
assert.equal(searchKnowledge('zzzzzz-no-such-mathematics').total, 0);
assert(!searchResults('<img src=x onerror=alert(1)>', preferences).includes('<img'));
assert.equal(totals.topics, 63, 'The 26 existing chapters and 37 admissions chapters must be available.');
console.log(JSON.stringify({ techniques: techniques.length, techniquesWithExtensions: techniques.filter((item) => item.extensions.length).length, extensions: techniques.flatMap((item) => item.extensions).length, keywordAndRankingScenarios: scenarios.length, checks: 'passed' }, null, 2));
