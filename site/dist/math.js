import katex from './vendor/katex/katex.mjs';

const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const cache = new Map();

/** Native MathML keeps formulas semantic without a font or CDN request. */
function renderMath(source, displayMode) {
  const key = `${displayMode}:${source}`;
  if (!cache.has(key)) {
    const readableSource = displayMode ? source : source.replace(/\\frac(?=[^a-zA-Z]|$)/g, '\\dfrac');
    const markup = katex.renderToString(readableSource, { displayMode, output: 'mathml', throwOnError: true, strict: 'error', trust: false, maxExpand: 500, maxSize: 20 });
    cache.set(key, `<span class="${displayMode ? 'math-display' : 'math-inline'}">${markup}</span>`);
  }
  return cache.get(key);
}

export const displayMath = (source) => renderMath(source, true);

/** Render only explicit TeX spans; escape all surrounding prose. */
export function richText(value = '') {
  const text = String(value);
  const pattern = /\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g;
  let html = '';
  let cursor = 0;
  for (const match of text.matchAll(pattern)) {
    html += escape(text.slice(cursor, match.index));
    html += renderMath(match[1] ?? match[2], match[2] !== undefined);
    cursor = match.index + match[0].length;
  }
  return html + escape(text.slice(cursor));
}
