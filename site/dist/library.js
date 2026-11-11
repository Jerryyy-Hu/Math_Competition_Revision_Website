import { collections as bmoCollections, sources } from './content.js';
import { additionalCollections } from './additional-content.js';
import { applyBmoNotes } from './notes-zh.js';
import { applyTechniqueDetails } from './technique-details.js';

export const collections = applyTechniqueDetails([applyBmoNotes(bmoCollections[0]), ...additionalCollections]);
export const allTopics = collections.flatMap((collection) => collection.subjects.flatMap((subject) => subject.topics.map((topic) => ({
  ...topic, collection, subject, key: `${collection.id}/${subject.id}/${topic.id}`,
}))));
export const topicMap = new Map(allTopics.map((topic) => [topic.key, topic]));
export const activeTopics = allTopics.filter((topic) => !topic.scaffold);
export const totals = {
  topics: activeTopics.length,
  exercises: activeTopics.reduce((sum, topic) => sum + topic.exercises.length, 0),
};
export const collectionSources = (collection) => collection.scaffold ? [] : sources[collection.id] || [];
export const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
export const routeFor = (topic) => `#/${topic.key}`;

export const icons = {
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>',
  bookmark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h12v17l-6-4-6 4z"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>',
  hint: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 21h4M8 13a6 6 0 1 1 8 0c-1.2 1-1.5 2-1.5 3h-5c0-1-.3-2-1.5-3Z"/></svg>',
  file: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h8l4 4v14H6zM14 3v5h4M9 12h6M9 16h4"/></svg>',
  chevron: '<svg class="tree-chevron" viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5"/></svg>',
};

export function artwork(kind) {
  if (kind === 'graph') return '<svg viewBox="0 0 210 180" aria-hidden="true"><path d="M40 115 105 22 177 77 152 153 40 115 177 77 105 22 152 153 105 102 40 115M105 102 177 77M105 22v80"/><g fill="#d5ccdf" stroke-width="1"><circle cx="40" cy="115" r="4"/><circle cx="105" cy="22" r="4"/><circle cx="177" cy="77" r="4"/><circle cx="152" cy="153" r="4"/><circle cx="105" cy="102" r="4"/></g><text x="27" y="141" font-size="13">v</text></svg>';
  if (kind === 'geometry') return '<svg viewBox="0 0 210 180" aria-hidden="true"><circle cx="113" cy="90" r="65"/><path d="m113 25 56 98H57l56-98v130M57 123l112-66M57 57l112 66"/><circle cx="113" cy="90" r="32"/><circle cx="113" cy="90" r="2" fill="#7a8a6f"/></svg>';
  if (kind === 'curve') return '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M12 78h77M27 14v75M15 69C32 69 37 12 52 26S65 91 87 19" stroke-width="1.4"/></svg>';
  if (kind === 'integral') return '<svg viewBox="0 0 100 100" aria-hidden="true"><text x="25" y="79">∫</text></svg>';
  return '<svg viewBox="0 0 100 100" aria-hidden="true"><text x="13" y="71">∞</text></svg>';
}
