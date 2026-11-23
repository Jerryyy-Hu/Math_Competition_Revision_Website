import { activeTopics } from './library.js';
import { problemRoute, techniqueId } from './study-state.js';

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

function normaliseProblemSearch(value) {
  return normaliseSearch(value.normalize('NFKC')
    .replace(/\b(?:question|q)[\s.#]*(?=\d)/gi, 'q')
    .replace(/\bbmo[\s-]+([12])\b/gi, 'bmo$1')
    .replace(/(\d)\.(?=\d)/g, '$1dot'));
}

function problemRecord(topic, problem) {
  const { source } = problem;
  const competition = topic.collection;
  const contest = normaliseSearch([competition.name, competition.fullName, source?.round].filter(Boolean).join(' '));
  const references = source ? [
    [source.competition, source.year, source.round, source.question],
    [source.competition, source.round, source.year, source.question],
    [source.round, source.year, source.question],
  ].map((parts) => normaliseProblemSearch(parts.join(' '))) : [];
  return {
    topic, problem, title: problem.title, href: problemRoute(topic.key, problem),
    names: [normaliseProblemSearch(problem.title)], contestTerms: new Set(contest.split(' ')), references,
    year: source ? String(source.year) : '',
    question: source ? normaliseProblemSearch(source.question) : '',
  };
}

const problems = activeTopics.flatMap((topic) => topic.exercises.map((problem) => problemRecord(topic, problem)));

function matchScore(values, term, weight) {
  let best = 0;
  for (const value of values) {
    if (value === term) best = Math.max(best, weight);
    else if (value.startsWith(term)) best = Math.max(best, weight * 0.8);
    else if (value.includes(term)) best = Math.max(best, weight * 0.6);
  }
  return best;
}

function scoreProblem(entry, phrase, terms) {
  let score = 0;
  for (const term of terms) {
    const matchesReference = term === entry.year || term === entry.question || term === entry.question.slice(1);
    const part = Math.max(matchScore(entry.names, term, 165), matchesReference ? 175 : 0, entry.contestTerms.has(term) ? 40 : 0);
    if (!part) return 0;
    score += part;
  }
  return score + Math.max(matchScore(entry.names, phrase, 240), entry.references.includes(phrase) ? 240 : 0);
}

/** Rank practice titles and references alongside complete knowledge matches. */
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
  const problemPhrase = normaliseProblemSearch(String(query));
  const problemTerms = [...new Set(problemPhrase.split(' '))];
  for (const entry of problems) {
    const score = scoreProblem(entry, problemPhrase, problemTerms);
    if (score) matches.push({ ...entry, score });
  }
  matches.sort((a, b) => b.score - a.score || a.topic.key.localeCompare(b.topic.key) || a.href.localeCompare(b.href));
  return { total: matches.length, results: matches.slice(0, limit) };
}
