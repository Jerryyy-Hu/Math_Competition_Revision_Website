import { activeTopics } from './library.js';
import { techniqueId } from './study-state.js';

/** Normalise bilingual keywords, diacritics, possessives and common punctuation. */
export function normaliseSearch(value = '') {
  return String(value).normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase()
    .replace(/[’']s\b/g, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim().replace(/\s+/g, ' ');
}

function record(topic, item = null, extension = null) {
  const content = extension || item || topic;
  const names = [content.nameZh, content.name, !item && topic.title].filter(Boolean);
  const keywords = item ? content.keywords || [] : [];
  const summary = content.explanation || content.text || topic.description || '';
  const body = [summary, content.core, content.method, content.example, content.pitfall, content.formula].filter(Boolean);
  if (!item) body.push(...topic.keywords);
  const context = [topic.collection.name, topic.collection.fullName, topic.subject.name, topic.title, ...(item ? [item.nameZh, item.name, ...item.keywords] : [])];
  const anchor = item ? techniqueId(item) : '';
  const params = new URLSearchParams();
  if (anchor) params.set('technique', anchor);
  if (extension) params.set('extension', extension.id);
  return {
    topic, item, extension, names, summary,
    href: `#/${topic.key}${params.size ? `?${params}` : ''}`,
    title: names[0], term: item ? content.name : '',
    fields: {
      names: names.map(normaliseSearch), keywords: keywords.map(normaliseSearch),
      body: body.map(normaliseSearch), context: context.map(normaliseSearch),
    },
  };
}

const records = activeTopics.flatMap((topic) => [record(topic), ...topic.bullets.flatMap((item) => [record(topic, item), ...item.extensions.map((extension) => record(topic, item, extension))])]);

function matchScore(values, term, weight) {
  let best = 0;
  for (const value of values) {
    if (value === term) best = Math.max(best, weight);
    else if (value.startsWith(term)) best = Math.max(best, weight * 0.8);
    else if (value.includes(term)) best = Math.max(best, weight * 0.6);
  }
  return best;
}

/** Return only complete keyword matches, with direct names above incidental prose. */
export function searchKnowledge(query, limit = 12) {
  const phrase = normaliseSearch(query);
  if (!phrase) return { total: 0, results: [] };
  const terms = [...new Set(phrase.split(' '))];
  const matches = [];
  for (const entry of records) {
    let score = 0;
    for (const term of terms) {
      const part = Math.max(
        matchScore(entry.fields.names, term, 120), matchScore(entry.fields.keywords, term, 100),
        matchScore(entry.fields.context, term, 25), matchScore(entry.fields.body, term, 8),
      );
      if (!part) { score = 0; break; }
      score += part;
    }
    if (!score) continue;
    score += Math.max(matchScore(entry.fields.names, phrase, 140), matchScore(entry.fields.keywords, phrase, 110));
    matches.push({ ...entry, score });
  }
  matches.sort((a, b) => b.score - a.score || a.topic.key.localeCompare(b.topic.key) || a.href.localeCompare(b.href));
  return { total: matches.length, results: matches.slice(0, limit) };
}
