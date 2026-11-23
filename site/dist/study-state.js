/** Stable identifiers keep marks and review status independent of list order. */
export function contentSlug(value) {
  return String(value).normalize('NFKD').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export const techniqueId = (item) => `technique-${item.id || contentSlug(item.name)}`;
export const techniqueKey = (topic, item) => `${topic.key}::${item.id || contentSlug(item.name)}`;
export const problemId = (problem) => problem.id || contentSlug(problem.title);
export const problemKey = (topic, problem) => `${topic.key}::${problemId(problem)}`;
export const problemRoute = (topicKey, problem) => `#/${topicKey}?problem=${encodeURIComponent(problemId(problem))}`;

export const reviewStates = {
  '': { label: 'Not reviewed', button: 'Review', short: 'Review' },
  reviewed: { label: 'Reviewed', button: 'Marked as reviewed', short: 'Reviewed' },
  independent: { label: 'Solved independently', button: 'Solved independently', short: 'Independent' },
  'with-hint': { label: 'Solved with a hint', button: 'Solved with a hint', short: 'With a hint' },
};

export const isSolvedOutcome = (value) => value === 'independent' || value === 'with-hint';

export function problemReview(preferences, key) {
  return preferences.problemOutcomes?.[key] || (preferences.reviewedProblems?.includes(key) ? 'reviewed' : '');
}

export function setProblemReview(preferences, key, state) {
  if (!Object.hasOwn(reviewStates, state)) return;
  if (isSolvedOutcome(state)) preferences.problemOutcomes[key] = state;
  else delete preferences.problemOutcomes[key];

  const reviewed = preferences.reviewedProblems.includes(key);
  if (state && !reviewed) preferences.reviewedProblems.push(key);
  if (!state && reviewed) preferences.reviewedProblems = preferences.reviewedProblems.filter((item) => item !== key);
}

/** Prefer the first visible heading until its upper half is occluded. */
export function readingHeadingIndex(rectangles, topBoundary, viewportHeight) {
  if (!rectangles.length) return -1;
  const visible = rectangles.findIndex((rect) => rect.top < viewportHeight && (rect.top + rect.bottom) / 2 > topBoundary);
  if (visible !== -1) return visible;
  const preceding = rectangles.findLastIndex((rect) => (rect.top + rect.bottom) / 2 <= topBoundary);
  return preceding === -1 ? 0 : Math.min(preceding + 1, rectangles.length - 1);
}
