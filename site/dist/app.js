import { collections, allTopics, topicMap, resolveTopicKey, escapeHtml as e, icons } from './library.js';
import * as views from './views.js';
import { getMaterials, saveMaterial, readPreferences, writePreferences, exportMaterials, importMaterials } from './storage.js';
import { createNavigation } from './navigation.js';
import { createReadingOutline } from './reading-outline.js';
import { problemKey, techniqueId } from './study-state.js';

const main = document.querySelector('main');
const preferences = readPreferences();
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
let currentTopic = null;
let materialCache = [];
let routeVersion = 0;
let pageAnimation;
let toastTimer;
let disposeOutline = () => {};
const dialogVersions = new WeakMap();
const navigation = createNavigation();

preferences.saved = [...new Set(preferences.saved.map(resolveTopicKey))];
preferences.read = [...new Set(preferences.read.map(resolveTopicKey))];
if (preferences.last) preferences.last = resolveTopicKey(preferences.last);
if (!preferences.reviewVersion) {
  preferences.reviewedProblems = preferences.read.flatMap((key) => {
    const topic = topicMap.get(key);
    return topic ? topic.exercises.filter((problem) => !problem.source).map((problem) => problemKey(topic, problem)) : [];
  });
  preferences.read = preferences.read.filter((key) => {
    const topic = topicMap.get(key);
    return topic?.exercises.every((problem) => preferences.reviewedProblems.includes(problemKey(topic, problem)));
  });
  preferences.reviewVersion = 1;
}

function toast(message) {
  clearTimeout(toastTimer);
  const element = document.querySelector('#toast');
  element.textContent = message;
  element.classList.add('visible');
  toastTimer = setTimeout(() => element.classList.remove('visible'), 4000);
}

function persistPreferences() {
  try { writePreferences(preferences); }
  catch { toast('浏览器未能保存状态；本次会话仍可继续使用。'); }
  document.querySelector('#saved-count').textContent = preferences.saved.length ? String(preferences.saved.length) : '';
}

function openDialog(id, instant = false) {
  const dialog = document.getElementById(id);
  dialogVersions.set(dialog, (dialogVersions.get(dialog) || 0) + 1);
  if (!dialog.open) dialog.showModal();
  dialog.style.transitionDuration = instant ? '0ms' : '';
  requestAnimationFrame(() => { if (dialog.open) dialog.setAttribute('data-visible', ''); });
}

async function closeDialog(id, instant = false) {
  const dialog = document.getElementById(id);
  if (!dialog.open) return;
  const version = (dialogVersions.get(dialog) || 0) + 1;
  dialogVersions.set(dialog, version);
  dialog.style.transitionDuration = instant ? '0ms' : '';
  dialog.removeAttribute('data-visible');
  if (!instant) await Promise.allSettled(dialog.getAnimations().map((animation) => animation.finished));
  if (dialogVersions.get(dialog) === version) dialog.close();
}

for (const dialog of document.querySelectorAll('dialog:not(#index-dialog)')) {
  dialog.addEventListener('cancel', (event) => { event.preventDefault(); closeDialog(dialog.id, true); });
  dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) closeDialog(dialog.id);
  });
}

function routeParts() {
  const route = location.hash.split('?')[0].replace(/^#\/?/, '').split('/').filter(Boolean).join('/');
  return resolveTopicKey(route).split('/').filter(Boolean);
}

function focusSearchTarget(topic) {
  if (!topic) return;
  const params = new URLSearchParams(location.hash.split('?')[1] || '');
  const item = topic.bullets.find((entry) => techniqueId(entry) === params.get('technique'));
  if (!item) return;
  const extension = item.extensions.find((entry) => entry.id === params.get('extension'));
  const target = document.getElementById(`${techniqueId(item)}${extension ? `--${extension.id}` : ''}`);
  if (!target) return;
  const details = target.closest('[data-extensions]');
  if (details) details.open = true;
  target.classList.add('is-search-target');
  target.focus({ preventScroll: true });
  target.scrollIntoView({ behavior: 'instant', block: 'start' });
}

async function renderRoute({ initial = false, preserveScroll = false, instant = false } = {}) {
  const version = ++routeVersion;
  disposeOutline();
  const parts = routeParts();
  currentTopic = null;
  pageAnimation?.cancel();
  if (!initial && !instant) {
    pageAnimation = main.animate([{ opacity: 1 }, { opacity: 0 }], { duration: reduceMotion.matches ? 50 : 80, fill: 'forwards' });
    await pageAnimation.finished.catch(() => {});
  }
  if (version !== routeVersion) return;
  try { materialCache = await getMaterials(); }
  catch { materialCache = []; }
  if (version !== routeVersion) return;
  materialCache = materialCache.map((material) => ({ ...material, topic: resolveTopicKey(material.topic || '') }));
  materialCache.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  let html;
  let title = 'Mathematics library';
  if (!parts.length) html = views.homePage(preferences);
  else if (parts.length === 1 && parts[0] === 'saved') { html = views.savedPage(preferences); title = 'Saved ideas'; }
  else if (parts.length === 1 && parts[0] === 'materials') { html = views.materialsPage(materialCache); title = 'Materials'; }
  else {
    const collection = collections.find((item) => item.id === parts[0]);
    const subject = collection?.subjects.find((item) => item.id === parts[1]);
    const topic = topicMap.get(parts.join('/'));
    if (collection && parts.length === 1) { html = views.collectionPage(collection, preferences); title = collection.name; }
    else if (collection?.id === 'bmo' && parts.length === 2 && parts[1] === 'review') { html = views.reviewPage(); title = 'BMO combinatorics review'; }
    else if (collection && !collection.scaffold && parts.length === 2 && parts[1] === 'resources') { html = views.resourcesPage(collection); title = `${collection.name} resources`; }
    else if (subject && parts.length === 2) { html = views.subjectPage(collection, subject, preferences); title = `${collection.name} · ${subject.name}`; }
    else if (topic) {
      currentTopic = topic;
      html = views.topicPage(topic, preferences, materialCache.filter((material) => material.topic === topic.key));
      title = `${collection.name} · ${topic.title}`;
      if (!topic.scaffold) { preferences.last = topic.key; persistPreferences(); }
    }
    else html = '<div class="empty-state"><h1>This page is not in the index.</h1><p>Choose a collection to continue.</p><a class="button" href="#/">Back to library ↗</a></div>';
  }
  main.innerHTML = html;
  document.title = `${title} — Lemma`;
  document.querySelectorAll('[data-header-link]').forEach((link) => link.classList.toggle('active', link.dataset.headerLink === (parts[0] === 'saved' ? 'saved' : parts[0] === 'materials' ? 'materials' : 'library')));
  document.querySelector('#index-tree').innerHTML = views.indexTree(parts.join('/'));
  pageAnimation?.cancel();
  if (!preserveScroll) window.scrollTo({ top: 0, behavior: 'instant' });
  disposeOutline = createReadingOutline(main);
  if (!initial) main.focus({ preventScroll: true });
  focusSearchTarget(currentTopic);
  if (!initial && !instant) {
    pageAnimation = main.animate(reduceMotion.matches ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: 0, transform: 'translateY(5px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: reduceMotion.matches ? 100 : 180, easing: 'cubic-bezier(.23,1,.32,1)' });
  }
}

document.querySelector('#add-button').addEventListener('click', () => showMaterialForm(currentTopic?.key || ''));

document.addEventListener('click', async (event) => {
  if (event.target.closest('.skip-link')) { event.preventDefault(); main.focus({ preventScroll: true }); main.scrollIntoView({ behavior: 'instant' }); return; }
  const close = event.target.closest('[data-close]');
  if (close) {
    if (close.dataset.close === 'index-dialog') navigation.close(event.detail === 0);
    else closeDialog(close.dataset.close, event.detail === 0);
    return;
  }
  const practice = event.target.closest('[data-scroll-practice]');
  if (practice) { event.preventDefault(); document.querySelector('#practice')?.scrollIntoView({ behavior: reduceMotion.matches || event.detail === 0 ? 'instant' : 'smooth', block: 'start' }); return; }
  const outline = event.target.closest('[data-outline-link]');
  if (outline) {
    event.preventDefault();
    const heading = document.getElementById(outline.dataset.outlineLink);
    heading?.focus({ preventScroll: true });
    heading?.scrollIntoView({ behavior: reduceMotion.matches || event.detail === 0 ? 'instant' : 'smooth', block: 'start' });
    return;
  }
  const link = event.target.closest('a[href^="#/"]');
  if (link && !event.ctrlKey && !event.metaKey && !event.shiftKey && event.button === 0) {
    event.preventDefault();
    if (navigation.isOpen && navigation.isModal) await navigation.close(event.detail === 0);
    const hash = link.getAttribute('href');
    if (location.hash === hash) renderRoute({ instant: event.detail === 0 });
    else {
      nextRouteInstant = event.detail === 0;
      location.hash = hash;
    }
    return;
  }
  const save = event.target.closest('[data-save]');
  if (save) {
    const key = save.dataset.save;
    const exists = preferences.saved.includes(key);
    preferences.saved = exists ? preferences.saved.filter((item) => item !== key) : [...preferences.saved, key];
    persistPreferences();
    save.innerHTML = `${icons.bookmark}${exists ? 'Save topic' : 'Saved'}`;
    save.classList.toggle('is-saved', !exists);
    save.setAttribute('aria-pressed', String(!exists));
    toast(exists ? '已取消收藏' : '已加入 Saved');
    return;
  }
  const mark = event.target.closest('[data-mark-technique]');
  if (mark) {
    const key = mark.dataset.markTechnique;
    const exists = preferences.markedTechniques.includes(key);
    preferences.markedTechniques = exists ? preferences.markedTechniques.filter((item) => item !== key) : [...preferences.markedTechniques, key];
    persistPreferences();
    mark.closest('[data-technique-key]').classList.toggle('is-marked', !exists);
    mark.classList.toggle('is-marked', !exists);
    mark.setAttribute('aria-pressed', String(!exists));
    mark.setAttribute('aria-label', mark.getAttribute('aria-label').replace(/^(Unmark|Mark)/, exists ? 'Mark' : 'Unmark'));
    mark.querySelector('span').textContent = exists ? 'Mark' : 'Marked';
    main.querySelectorAll('[data-mark-key]').forEach((link) => {
      if (link.dataset.markKey !== key) return;
      link.classList.toggle('is-marked', !exists);
      link.querySelector('.outline-mark').hidden = exists;
    });
    return;
  }
  const review = event.target.closest('[data-review-problem]');
  if (review && currentTopic) {
    const key = review.dataset.reviewProblem;
    const exists = preferences.reviewedProblems.includes(key);
    preferences.reviewedProblems = exists ? preferences.reviewedProblems.filter((item) => item !== key) : [...preferences.reviewedProblems, key];
    const allReviewed = currentTopic.exercises.every((problem) => preferences.reviewedProblems.includes(problemKey(currentTopic, problem)));
    preferences.read = preferences.read.filter((item) => item !== currentTopic.key);
    if (allReviewed) preferences.read.push(currentTopic.key);
    persistPreferences();
    review.classList.toggle('is-reviewed', !exists);
    review.closest('.exercise').classList.toggle('is-reviewed', !exists);
    review.setAttribute('aria-pressed', String(!exists));
    review.querySelector('span').textContent = exists ? 'Mark as reviewed' : 'Marked as reviewed';
    return;
  }
  const disclosure = event.target.closest('[data-disclosure]');
  if (disclosure) {
    const content = document.getElementById(disclosure.getAttribute('aria-controls'));
    const expanded = disclosure.getAttribute('aria-expanded') === 'true';
    disclosure.setAttribute('aria-expanded', String(!expanded));
    content.hidden = expanded;
    if (!expanded && event.detail !== 0 && !reduceMotion.matches) content.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 150 });
    return;
  }
  const add = event.target.closest('[data-add-topic]');
  if (add) { showMaterialForm(add.dataset.addTopic); return; }
  const download = event.target.closest('[data-download]');
  if (download) {
    const material = materialCache.find((item) => item.id === download.dataset.download);
    if (material?.file) downloadBlob(material.file, material.file.name || 'material');
  }
});

function closeSearch() {
  const input = document.querySelector('#topic-search');
  const results = document.querySelector('#search-results');
  if (!input || !results) return;
  input.setAttribute('aria-expanded', 'false');
  input.removeAttribute('aria-activedescendant');
  results.hidden = true;
}

function updateSearch() {
  const input = document.querySelector('#topic-search');
  if (!input) return;
  const query = input.value.trim();
  const results = document.querySelector('#search-results');
  results.innerHTML = query ? views.searchResults(query, preferences) : '<div id="search-options" role="listbox" aria-label="Matching knowledge"></div>';
  results.hidden = !query;
  input.setAttribute('aria-expanded', String(Boolean(query)));
  input.removeAttribute('aria-activedescendant');
  const count = results.querySelectorAll('[data-search-result]').length;
  document.querySelector('#search-status').textContent = query ? `${count} 条匹配，按关联度排序。使用上下方向键选择，Enter 打开。` : '';
}

document.addEventListener('input', (event) => {
  if (event.target.id === 'topic-search' && !event.isComposing) updateSearch();
});
document.addEventListener('compositionend', (event) => { if (event.target.id === 'topic-search') updateSearch(); });
document.addEventListener('focusin', (event) => { if (event.target.id === 'topic-search') updateSearch(); });
document.addEventListener('focusout', (event) => {
  if (event.target.closest('.search-field') && !event.target.closest('.search-field').contains(event.relatedTarget)) closeSearch();
});
document.addEventListener('pointerdown', (event) => { if (!event.target.closest('.search-field')) closeSearch(); });
document.addEventListener('click', (event) => {
  if (event.target.id === 'topic-search' && document.querySelector('#search-results')?.hidden) updateSearch();
});
document.addEventListener('keydown', (event) => {
  if (event.target.id !== 'topic-search' || event.isComposing || event.keyCode === 229) return;
  if (event.key === 'Escape' || event.key === 'Tab') { closeSearch(); return; }
  if (!['ArrowDown', 'ArrowUp', 'Enter'].includes(event.key)) return;
  const input = event.target;
  const results = document.querySelector('#search-results');
  if (results.hidden) updateSearch();
  const options = [...results.querySelectorAll('[data-search-result]')];
  if (!options.length) return;
  event.preventDefault();
  let index = options.findIndex((option) => option.id === input.getAttribute('aria-activedescendant'));
  if (event.key === 'Enter') { options[Math.max(index, 0)].click(); return; }
  index = event.key === 'ArrowDown' ? (index + 1) % options.length : (index <= 0 ? options.length : index) - 1;
  options.forEach((option, position) => option.setAttribute('aria-selected', String(position === index)));
  input.setAttribute('aria-activedescendant', options[index].id);
  options[index].scrollIntoView({ behavior: 'instant', block: 'nearest' });
});

document.addEventListener('change', (event) => {
  if (event.target.id === 'material-filter') {
    const records = materialCache.filter((item) => !event.target.value || item.collection === event.target.value);
    document.querySelector('#material-list').innerHTML = records.length ? views.materialRows(records) : '<div class="empty-state"><h2>No materials here yet.</h2><p lang="zh-CN">可以更换分类，或添加第一份资料。</p></div>';
  }
});

const collectionSelect = document.querySelector('#material-collection');
const topicSelect = document.querySelector('#material-topic');
collectionSelect.innerHTML = collections.map((collection) => `<option value="${collection.id}">${e(collection.name)}</option>`).join('');

function populateTopicSelect(selected = '') {
  const topics = allTopics.filter((topic) => topic.collection.id === collectionSelect.value);
  topicSelect.innerHTML = '<option value="">Collection-level material</option>' + topics.map((topic) => `<option value="${topic.key}">${e(topic.subject.name)} / ${e(topic.title)}</option>`).join('');
  topicSelect.value = selected;
}
collectionSelect.addEventListener('change', () => populateTopicSelect());

function showMaterialForm(topicKey) {
  const form = document.querySelector('#material-form');
  form.reset();
  document.querySelector('#material-error').textContent = '';
  const topic = topicMap.get(topicKey);
  collectionSelect.value = topic?.collection.id || collections.find((collection) => collection.id === routeParts()[0])?.id || 'bmo';
  populateTopicSelect(topicKey);
  openDialog('material-dialog');
}

document.querySelector('#material-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const button = form.querySelector('[type="submit"]');
  const error = document.querySelector('#material-error');
  const title = data.get('title').trim();
  const urlText = data.get('url').trim();
  const file = data.get('file');
  error.textContent = '';
  if (!title) { error.textContent = '请填写资料名称。'; return; }
  let url = '';
  try {
    if (urlText) {
      const parsed = new URL(urlText);
      if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('Only HTTP and HTTPS links are supported.');
      url = parsed.href;
    }
    if (file.size > 20 * 1024 * 1024) throw new Error('文件大小不能超过 20 MB。');
    button.disabled = true;
    await saveMaterial({ id: crypto.randomUUID(), title, collection: collectionSelect.value, topic: topicSelect.value, url, note: data.get('note').trim(), file: file.size ? file : null, createdAt: new Date().toISOString() });
    await closeDialog('material-dialog');
    toast('已保存到当前浏览器');
    await renderRoute({ preserveScroll: true, instant: true });
  } catch (failure) {
    error.textContent = failure.message || '无法保存，请检查浏览器存储空间。';
  } finally { button.disabled = false; }
});

function downloadBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = name;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

document.querySelector('#backup-button').addEventListener('click', async (event) => {
  event.target.disabled = true;
  try {
    const date = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Shanghai' });
    downloadBlob(new Blob([await exportMaterials()], { type: 'application/json' }), `lemma-materials-${date}.json`);
    toast('备份文件已生成，包含个人笔记、链接与附件。');
  } catch { toast('无法导出；请检查浏览器是否允许存储。'); }
  finally { event.target.disabled = false; }
});

document.querySelector('#import-input').addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    if (file.size > 80 * 1024 * 1024) throw new Error('备份文件不能超过 80 MB。');
    const backup = JSON.parse(await file.text());
    if (Array.isArray(backup.materials)) backup.materials.forEach((material) => {
      if (material && typeof material.topic === 'string') material.topic = resolveTopicKey(material.topic);
    });
    const count = await importMaterials(JSON.stringify(backup), new Set(topicMap.keys()), new Set(collections.map((collection) => collection.id)));
    toast(`已导入 ${count} 份资料。`);
    await renderRoute({ preserveScroll: true, instant: true });
  } catch (error) { toast(error.message || '无法导入该备份文件。'); }
  finally { event.target.value = ''; }
});

let nextRouteInstant = false;
window.addEventListener('hashchange', () => {
  const instant = nextRouteInstant;
  nextRouteInstant = false;
  renderRoute({ instant });
});
persistPreferences();
renderRoute({ initial: true });
