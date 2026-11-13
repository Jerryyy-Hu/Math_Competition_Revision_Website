import assert from 'node:assert/strict';
import { allTopics } from '../site/dist/library.js';
import { richText, displayMath } from '../site/dist/math.js';

let expressions = 0;
const checkText = (value, context) => {
  const output = richText(value);
  assert(!output.includes('katex-error'), context);
  for (const match of value.matchAll(/\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g)) {
    const source = match[1] ?? match[2];
    assert(!source.includes('/'), `Use a stacked fraction: ${context} / ${source}`);
    expressions++;
  }
  const prose = value.replace(/\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/g, '');
  assert(!/[²³⁴⁵⁶⁷⁸⁹⁰₀₁₂₃₄₅₆₇₈₉ⁿᵏ√∛Σ∑∠≡]/u.test(prose), `Unformatted legacy mathematics: ${context} / ${prose}`);
};
for (const topic of allTopics) {
  for (const item of topic.bullets) {
    for (const field of ['text', 'method', 'example', 'pitfall', 'explanation', 'core']) checkText(item[field], `${topic.key} / ${item.name} / ${field}`);
    for (const extension of item.extensions) {
      for (const field of ['text', 'example', 'pitfall']) checkText(extension[field], `${topic.key} / ${item.name} / ${extension.id} / ${field}`);
      if (extension.formula) {
        assert(!extension.formula.includes('/'), `${topic.key} / ${extension.id}`);
        assert(displayMath(extension.formula).includes('<math'));
        expressions++;
      }
    }
    if (item.formula) {
      assert(!item.formula.includes('/'), `${topic.key} / ${item.name}`);
      assert(displayMath(item.formula).includes('<math'));
      expressions++;
    }
  }
  for (const problem of topic.exercises) {
    for (const field of ['question', 'hint']) checkText(problem[field], `${topic.key} / ${problem.id || problem.title} / ${field}`);
    problem.choices?.forEach((choice, index) => checkText(choice, `${problem.id} / choice ${index + 1}`));
    problem.solution.forEach((step, index) => checkText(step, `${topic.key} / ${problem.id || problem.title} / step ${index + 1}`));
  }
}
assert(displayMath('\\frac{a}{b}').includes('<mfrac>'));
assert(displayMath('x^2').includes('<msup>'));
assert(displayMath('\\sqrt{x}').includes('<msqrt>'));
assert.throws(() => displayMath('\\definitelyNotARealCommand{x}'));
assert(!richText('<script>alert(1)</script>').includes('<script>'));
console.log(JSON.stringify({ expressions, rendering: 'KaTeX 0.19.1 to native MathML', errors: 0 }));
