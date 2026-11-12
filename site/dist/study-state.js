/** Stable identifiers keep marks and review status independent of list order. */
export function contentSlug(value) {
  return String(value).normalize('NFKD').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export const techniqueId = (item) => `technique-${item.id || contentSlug(item.name)}`;
export const techniqueKey = (topic, item) => `${topic.key}::${item.id || contentSlug(item.name)}`;
export const problemKey = (topic, problem) => `${topic.key}::${problem.id || contentSlug(problem.title)}`;

/** Prefer the first visible heading until its upper half is occluded. */
export function readingHeadingIndex(rectangles, topBoundary, viewportHeight) {
  if (!rectangles.length) return -1;
  const visible = rectangles.findIndex((rect) => rect.top < viewportHeight && (rect.top + rect.bottom) / 2 > topBoundary);
  if (visible !== -1) return visible;
  const preceding = rectangles.findLastIndex((rect) => (rect.top + rect.bottom) / 2 <= topBoundary);
  return preceding === -1 ? 0 : Math.min(preceding + 1, rectangles.length - 1);
}
