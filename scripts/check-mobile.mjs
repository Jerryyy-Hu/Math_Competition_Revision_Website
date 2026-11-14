/** Deterministic DOM-controller tests; this is not a physical-device test. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createReadingOutline } from '../site/dist/reading-outline.js';
import { availableSearchHeight, createMathScrollRegions } from '../site/dist/mobile-layout.js';
import { topicPage } from '../site/dist/views.js';
import { topicMap } from '../site/dist/library.js';

assert.equal(availableSearchHeight(100, 844), 480);
assert.equal(availableSearchHeight(150, 400), 164);
assert.equal(availableSearchHeight(150, 400, 50), 214);
assert.equal(availableSearchHeight(200, 220), 0, 'Do not force suggestions below a short visual viewport.');
assert.equal(availableSearchHeight(130, 220, 0, 12), 78, 'Compact mode gives the remaining space to matching results.');

class Target {
  listeners = new Map();
  attributes = new Map();
  classes = new Set();
  classList = { toggle: (name, active) => active ? this.classes.add(name) : this.classes.delete(name), contains: (name) => this.classes.has(name) };
  addEventListener(type, listener) { if (!this.listeners.has(type)) this.listeners.set(type, new Set()); this.listeners.get(type).add(listener); }
  removeEventListener(type, listener) { this.listeners.get(type)?.delete(listener); }
  emit(type, event = {}) { this.listeners.get(type)?.forEach((listener) => listener(event)); }
  setAttribute(name, value) { this.attributes.set(name, value); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  removeAttribute(name) { this.attributes.delete(name); }
}
let frames = new Map();
let frameId = 0;
globalThis.requestAnimationFrame = (callback) => { frames.set(++frameId, callback); return frameId; };
globalThis.cancelAnimationFrame = (id) => frames.delete(id);
const flush = () => { const callbacks = [...frames.values()]; frames.clear(); callbacks.forEach((callback) => callback()); };
const observers = [];
globalThis.ResizeObserver = class {
  constructor(callback) { this.callback = callback; observers.push(this); }
  observe() {}
  disconnect() { this.disconnected = true; }
};
const media = new Target();
media.matches = true;
globalThis.matchMedia = () => media;
globalThis.window = new Target();
window.innerHeight = 800;
globalThis.document = new Target();
document.fonts = { ready: Promise.resolve() };
const header = { getBoundingClientRect: () => ({ bottom: 68 }) };
const sidebar = new Target();
sidebar.getBoundingClientRect = () => ({ bottom: 124 });
sidebar.contains = (target) => target === sidebar;
const disclosure = { open: true, querySelector: () => ({ focus: () => { disclosure.focused = true; } }) };
const label = { textContent: '' };
const practice = { top: 2000, getBoundingClientRect() { return { top: this.top }; } };
const heading = (top, name) => ({ top, getBoundingClientRect() { return { top: this.top, bottom: this.top + 40 }; }, querySelector: () => ({ textContent: name }) });
const headings = [heading(105, '第一项'), heading(500, '第二项')];
const links = [new Target(), new Target()];
const container = {
  querySelectorAll: (selector) => selector.includes('heading') ? headings : links,
  querySelector: (selector) => ({ '.topic-sidebar': sidebar, '[data-page-outline]': disclosure, '[data-reading-label]': label, '#practice': practice })[selector],
};
document.querySelector = () => header;
const dispose = createReadingOutline(container);
flush();
assert.equal(disclosure.open, false, 'The mobile outline starts closed.');
assert.equal(links[0].getAttribute('aria-current'), 'location');
assert.equal(label.textContent, '第一项');
headings[0].top = 104;
window.emit('scroll'); flush();
assert.equal(links[1].getAttribute('aria-current'), 'location', 'The reading toolbar must count as an occlusion boundary.');
practice.top = 100;
window.emit('scroll'); flush();
assert.equal(label.textContent, 'Practice', 'The toolbar identifies the exercise section even without a heading-index change.');
disclosure.open = true;
document.emit('pointerdown', { target: sidebar });
assert.equal(disclosure.open, true);
document.emit('pointerdown', { target: {} });
assert.equal(disclosure.open, false);
disclosure.open = true;
sidebar.emit('click', { target: { closest: () => ({}) } });
assert.equal(disclosure.open, false, 'Jumping closes the overlay outline.');
disclosure.open = true;
let prevented = false;
document.emit('keydown', { key: 'Escape', preventDefault: () => { prevented = true; } });
assert(prevented && disclosure.focused && !disclosure.open);
media.matches = false; media.emit('change'); flush();
assert.equal(disclosure.open, true, 'Desktop mode restores the persistent outline.');
dispose();
assert(observers[0].disconnected);
assert.equal(document.listeners.get('pointerdown').size, 0);
assert.equal(media.listeners.get('change').size, 0);

function mathRegion(width, scrollWidth, inline = false) {
  const region = new Target();
  region.clientWidth = width;
  region.scrollWidth = scrollWidth;
  region.parentElement = { closest: () => null };
  region.after = (hint) => { region.hint = hint; };
  if (inline) region.classes.add('math-inline');
  return region;
}
const formula = mathRegion(200, 440);
formula.setAttribute('aria-label', 'Core formula');
const inline = mathRegion(160, 120, true);
const hidden = mathRegion(0, 0);
document.createElement = () => new Target();
const disposeMath = createMathScrollRegions({ querySelectorAll: () => [formula, inline, hidden] });
flush();
assert.equal(formula.getAttribute('tabindex'), '0');
assert.equal(formula.getAttribute('role'), 'region');
assert(formula.getAttribute('aria-label').includes('scroll horizontally'));
assert.equal(formula.hint.hidden, false);
assert.equal(inline.getAttribute('tabindex'), null);
assert.equal(hidden.hint, undefined);
formula.clientWidth = 480;
hidden.clientWidth = 200; hidden.scrollWidth = 500;
observers[1].callback(); flush();
assert.equal(formula.getAttribute('tabindex'), null);
assert.equal(formula.getAttribute('aria-label'), 'Core formula');
assert.equal(formula.hint.hidden, true);
assert.equal(hidden.getAttribute('tabindex'), '0', 'Revealed solutions receive their scroll affordance.');
disposeMath();
assert(observers[1].disconnected);

const html = topicPage(topicMap.get('bmo/combinatorics/graphs'), { saved: [], read: [], markedTechniques: [], reviewedProblems: [] }, []);
assert(html.includes('data-page-outline'));
assert(html.includes('data-reading-label'));
assert(html.includes('review-label-short" aria-hidden="true"'));
assert(!readFileSync(new URL('../site/dist/index.html', import.meta.url), 'utf8').includes('user-scalable=no'));
console.log('Mobile outline mode changes, occlusion, dismissal, formula overflow, and visual-viewport calculations passed.');
