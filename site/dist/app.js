import { collections, allTopics, topicMap, escapeHtml as e, icons } from './library.js';
import * as views from './views.js';
import { getMaterials, saveMaterial, readPreferences, writePreferences, exportMaterials, importMaterials } from './storage.js';
import { createNavigation } from './navigation.js';

const main = document.querySelector('main');
const preferences = readPreferences();
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
let currentTopic = null;
let materialCache = [];
let routeVersion = 0;
let pageAnimation;
let toastTimer;
const dialogVersions = new WeakMap();
const navigation = createNavigation();

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
  return location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
}

async function renderRoute({ initial = false, preserveScroll = false, instant = false } = {}) {
  const version = ++routeVersion;
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
  if (!initial) main.focus({ preventScroll: true });
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
  const read = event.target.closest('[data-read]');
  if (read) {
    const key = read.dataset.read;
    const exists = preferences.read.includes(key);
    preferences.read = exists ? preferences.read.filter((item) => item !== key) : [...preferences.read, key];
    persistPreferences();
    read.innerHTML = `${icons.check}${exists ? 'Mark as reviewed' : 'Reviewed'}`;
    read.classList.toggle('button-soft', !exists);
    read.setAttribute('aria-pressed', String(!exists));
    read.parentElement.querySelector('p').textContent = exists ? '理解方法后，再尝试独立写出证明。' : '已标记复习。可以随时取消。';
    return;
  }
  const hint = event.target.closest('[data-hint]');
  if (hint) {
    const content = document.getElementById(hint.getAttribute('aria-controls'));
    const expanded = hint.getAttribute('aria-expanded') === 'true';
    hint.setAttribute('aria-expanded', String(!expanded));
    content.hidden = expanded;
    if (!expanded && event.detail !== 0) content.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 150 });
    return;
  }
  const solution = event.target.closest('[data-solution]');
  if (solution && currentTopic) {
    const problem = currentTopic.exercises[Number(solution.dataset.solution)];
    document.querySelector('#solution-content').innerHTML = `<div class="modal-top"><span class="eyebrow">${problem.proof ? 'A COMPLETE PROOF' : 'WORKED SOLUTION'}</span><button class="icon-button" data-close="solution-dialog" aria-label="Close solution">×</button></div><h2 id="solution-title">${e(problem.title)}</h2><p class="solution-question" lang="en">${e(problem.question)}</p><ol class="solution-steps" lang="en">${problem.solution.map((step) => `<li>${e(step)}</li>`).join('')}</ol>${problem.proof ? '<div class="solution-end" aria-label="End of proof">□</div>' : ''}`;
    openDialog('solution-dialog', event.detail === 0);
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

document.addEventListener('input', (event) => {
  if (event.target.id !== 'topic-search') return;
  const query = event.target.value.trim();
  document.querySelector('#collection-home').hidden = Boolean(query);
  const results = document.querySelector('#search-results');
  results.hidden = !query;
  results.innerHTML = query ? views.searchResults(query, preferences) : '';
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
    const count = await importMaterials(await file.text(), new Set(topicMap.keys()), new Set(collections.map((collection) => collection.id)));
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
