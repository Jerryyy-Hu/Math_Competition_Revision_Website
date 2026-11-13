import assert from 'node:assert/strict';
import { collections, allTopics, topicMap } from '../site/dist/library.js';
import { collectionPage, topicPage } from '../site/dist/views.js';
import { searchKnowledge } from '../site/dist/search.js';

const preferences = { saved: [], read: [], markedTechniques: [], reviewedProblems: [] };
const admissions = allTopics.filter((topic) => ['tmua', 'step'].includes(topic.collection.id));
assert.equal(admissions.length, 37);
assert.equal(allTopics.filter((topic) => ['bmo', 'bmt'].includes(topic.collection.id)).length, 26);
assert.equal(allTopics.filter((topic) => topic.scaffold).length, 7);
assert(allTopics.filter((topic) => topic.scaffold).every((topic) => topic.collection.id === 'interview'));

const legacyRoutes = [
  'tmua/algebra-functions/expressions', 'tmua/algebra-functions/functions', 'tmua/algebra-functions/sequences',
  'tmua/geometry-calculus/coordinates', 'tmua/geometry-calculus/calculus', 'tmua/logic-proof/statements', 'tmua/logic-proof/proof',
  'step/pure/algebra-proof', 'step/pure/calculus', 'step/pure/complex', 'step/pure/vectors',
  'step/mechanics/motion', 'step/mechanics/energy', 'step/probability-statistics/distributions', 'step/probability-statistics/conditional',
];
for (const route of legacyRoutes) assert(topicMap.has(route), `Existing category route was removed: ${route}`);

const visited = new Set();
function visit(topic, ancestors = new Set()) {
  assert(!ancestors.has(topic.key), `Prerequisite cycle at ${topic.key}`);
  if (visited.has(topic.key)) return;
  const next = new Set([...ancestors, topic.key]);
  for (const key of topic.prerequisites) {
    const prerequisite = topicMap.get(`${topic.collection.id}/${key}`);
    assert(prerequisite && !prerequisite.scaffold, `Missing prerequisite: ${topic.key} -> ${key}`);
    visit(prerequisite, next);
  }
  visited.add(topic.key);
}

const originalIds = new Set();
for (const topic of admissions) {
  visit(topic);
  assert(topic.references.length && topic.scope);
  assert(topic.bullets.length >= 4 && topic.exercises.length === 2);
  const html = topicPage(topic, preferences, []);
  assert(html.includes('syllabus-meta') && html.includes('Prerequisites'));
  assert(html.includes('Original drill') && !html.includes('A space for later.'));
  for (const item of topic.bullets) {
    assert(item.scope);
    if (topic.scope === 'STEP 3') assert.equal(item.scope, 'STEP 3');
  }
  for (const problem of topic.exercises) {
    assert(!originalIds.has(problem.id), `Repeated original exercise: ${problem.id}`);
    originalIds.add(problem.id);
    assert.equal(problem.origin, 'original');
    assert.equal(problem.source, undefined, 'Original drills must not masquerade as sourced past papers.');
    assert(problem.id.startsWith(`${topic.collection.id}-original-`));
    if (topic.scope === 'STEP 3') assert.equal(problem.scope, 'STEP 3');
    if (topic.collection.id === 'tmua') {
      assert.equal(problem.choices.length, 5);
      assert.equal(new Set(problem.choices).size, 5);
      assert(/^[A-E]$/.test(problem.answer));
      assert(problem.solution.some((step) => step.includes(`correct option is ${problem.answer}`)));
      assert(html.includes(`Answer: ${problem.answer}`));
      assert(html.includes('aria-label="Answer choices"'));
    } else {
      assert(problem.question.includes('(i)') && problem.question.includes('(ii)') || problem.id === 'step-original-resonant-equation');
    }
  }
}
assert.equal(originalIds.size, 74);

for (const id of ['tmua', 'step']) {
  const collection = collections.find((entry) => entry.id === id);
  const html = collectionPage(collection, preferences);
  assert(html.indexOf('Knowledge framework') < html.indexOf('class="subject-section"'));
  assert(html.includes('Topic map') && html.includes('2026-11-13'));
  assert(collection.sources.every((source) => source.url.startsWith('https://')));
}
const tmuaReferences = admissions.filter((topic) => topic.collection.id === 'tmua').flatMap((topic) => topic.references).join(';');
for (const code of [...Array.from({ length: 8 }, (_, i) => `MM${i + 1}`), ...Array.from({ length: 7 }, (_, i) => `M${i + 1}`), 'Arg1–Arg4', 'Prf1–Prf5', 'Err1–Err2']) {
  assert(new RegExp(`(?<![A-Za-z0-9])${code}(?![0-9])`).test(tmuaReferences), `Unmapped TMUA family: ${code}`);
}

for (const [query, collectionId] of [['TMUA 逆否', 'tmua'], ['TMUA 频数密度', 'tmua'], ['STEP 棣莫弗', 'step'], ['STEP 积分因子', 'step']]) {
  const results = searchKnowledge(query).results;
  assert(results.length && results.every((result) => result.topic.collection.id === collectionId), query);
}
const stepTechniques = admissions.filter((topic) => topic.collection.id === 'step').flatMap((topic) => topic.bullets);
for (const name of ['De Moivre and multiple angles', 'Three-by-three systems and geometry', 'Plane equations and line-plane angles', 'Integrating factors for linear equations']) {
  assert.equal(stepTechniques.find((item) => item.name === name)?.scope, 'STEP 3');
}
for (const name of ['The exponential series in STEP 2', 'Three-dimensional elementary transformations', 'Inverse trigonometric derivatives', 'Reduction formulae with base cases']) {
  assert.equal(stepTechniques.find((item) => item.name === name)?.scope, 'STEP 2 & 3');
}

// Independent enumeration and equation residuals check key mathematical answers and edge cases.
const approx = (actual, expected, tolerance = 1e-10) => assert(Math.abs(actual - expected) < tolerance, `${actual} != ${expected}`);
const problems = new Map(admissions.flatMap((topic) => topic.exercises.map((problem) => [problem.id, problem])));
function checkChoice(id, value) {
  const problem = problems.get(`tmua-original-${id}`);
  assert.equal(problem.choices[problem.answer.charCodeAt(0) - 65], value);
}
const pairs = Array.from({ length: 5 }, (_, i) => Array.from({ length: i }, (_, j) => [i, j])).flat();
const mixedPairs = pairs.filter(([i, j]) => (i < 2) !== (j < 2));
approx(mixedPairs.length / pairs.length, 3 / 5);
checkChoice('mixed-colours', '\\(\\frac35\\)');
const tosses = Array.from({ length: 8 }, (_, bits) => bits.toString(2).split('1').length - 1);
approx(tosses.filter((heads) => heads === 2).length / tosses.filter((heads) => heads > 0).length, 3 / 7);
checkChoice('coin-conditioning', '\\(\\frac37\\)');
checkChoice('units-speed', String(72 * 1000 / 3600 * 2.5));
checkChoice('mean-replacement', String((5 * 8 - 2 + 12) / 5));
checkChoice('binomial-coefficient', String((5 * 4 / 2) * 2 ** 2));
assert.equal(2 * 12 / 10 / (18 / 10), 4 / 3);

const strictTailN = Array.from({ length: 150 }, (_, i) => i + 1).find((n) => 1 / (n + 1) < 1 / 100);
assert.equal(strictTailN, 100);
const dice = Array.from({ length: 6 }, (_, i) => i + 1);
const outcomes = dice.flatMap((x) => dice.map((y) => 2 * x - y + 3));
const mean = outcomes.reduce((sum, x) => sum + x, 0) / outcomes.length;
const variance = outcomes.reduce((sum, x) => sum + (x - mean) ** 2, 0) / outcomes.length;
approx(mean, 13 / 2);
approx(variance, 175 / 12);
const sixTosses = Array.from({ length: 64 }, (_, bits) => bits.toString(2).split('1').length - 1);
approx(sixTosses.filter((heads) => heads >= 5).length / 64, 7 / 64);
approx(sixTosses.filter((heads) => heads === 6).length / 64, 1 / 64);

for (const e of [0, 0.3, 0.5, 0.8, 1]) {
  const v1 = (1 - 2 * e) / 3;
  const v2 = (1 + e) / 3;
  approx(v1 + 2 * v2, 1);
  approx(v2 - v1, e);
  approx(0.5 - 0.5 * v1 ** 2 - v2 ** 2, (1 - e ** 2) / 3);
}
for (const x of [-2, -0.3, 0, 0.7, 2]) {
  const y = Math.exp(2 * x) - (1 + x) * Math.exp(x);
  const dy = 2 * Math.exp(2 * x) - (2 + x) * Math.exp(x);
  const ddy = 4 * Math.exp(2 * x) - (3 + x) * Math.exp(x);
  approx(ddy - 3 * dy + 2 * y, Math.exp(x));
}
approx(1 / 5 - (1 / 3) ** 2, 4 / 45);
approx(1 / 2 - (2 / 3) ** 2, 1 / 18);
console.log(JSON.stringify({ topics: admissions.length, originalExercises: originalIds.size, preservedCategoryRoutes: legacyRoutes.length, prerequisiteGraph: 'acyclic', scopeAndMathematicalChecks: 'passed' }, null, 2));
