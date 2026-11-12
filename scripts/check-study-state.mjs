import assert from 'node:assert/strict';
import { readingHeadingIndex, techniqueId, techniqueKey, problemKey } from '../site/dist/study-state.js';
import { readPreferences, writePreferences } from '../site/dist/storage.js';

const rect = (top, height = 40) => ({ top, bottom: top + height });
assert.equal(readingHeadingIndex([], 96, 900), -1);
assert.equal(readingHeadingIndex([rect(150), rect(500)], 96, 900), 0);
assert.equal(readingHeadingIndex([rect(77), rect(500)], 96, 900), 0, 'Keep a heading with more than half visible.');
assert.equal(readingHeadingIndex([rect(76), rect(500)], 96, 900), 1, 'Advance exactly when half a heading is occluded.');
assert.equal(readingHeadingIndex([rect(-300), rect(500)], 96, 900), 1);
assert.equal(readingHeadingIndex([rect(75), rect(1100)], 96, 900), 1, 'Advance even when a long section puts the next heading below the viewport.');
assert.equal(readingHeadingIndex([rect(-900), rect(-100)], 96, 900), 1, 'Keep the final technique after passing its heading.');
assert.equal(readingHeadingIndex([rect(76), rect(130)], 77, 700), 0, 'Use the actual sticky header boundary on mobile.');

const topic = { key: 'bmo/combinatorics/graphs' };
const technique = { name: 'Degrees & the handshake lemma' };
assert.equal(techniqueId(technique), 'technique-degrees-the-handshake-lemma');
assert.equal(techniqueKey(topic, technique), 'bmo/combinatorics/graphs::degrees-the-handshake-lemma');
assert.equal(problemKey(topic, { id: 'bmo1-2003-q3', title: 'A different display title' }), 'bmo/combinatorics/graphs::bmo1-2003-q3');

let stored = '{}';
globalThis.localStorage = {
  getItem: () => stored,
  setItem: (key, value) => { assert.equal(key, 'lemma-preferences-v1'); stored = value; },
};
const initial = readPreferences();
assert.deepEqual(initial.markedTechniques, []);
assert.deepEqual(initial.reviewedProblems, []);
initial.markedTechniques = [techniqueKey(topic, technique)];
initial.reviewedProblems = [problemKey(topic, { title: 'A graph problem' })];
initial.reviewVersion = 1;
writePreferences(initial);
assert.deepEqual(readPreferences(), initial, 'Marks and per-problem reviews survive a storage round trip.');
stored = '{"saved":["bmo",7,"bmo"],"markedTechniques":[null,"x","x"],"reviewedProblems":null}';
assert.deepEqual(readPreferences().saved, ['bmo']);
assert.deepEqual(readPreferences().markedTechniques, ['x']);
assert.deepEqual(readPreferences().reviewedProblems, []);
stored = '{invalid';
assert.deepEqual(readPreferences().markedTechniques, []);
console.log('Reading outline thresholds, stable identifiers, and preference persistence passed.');
