import { collections, allTopics, activeTopics, topicMap, totals, collectionSources, escapeHtml as e, routeFor, icons, artwork } from './library.js';
import { methodGroups, evidence, qualifications } from './research.js';

const arrow = '<span class="card-arrow" aria-hidden="true">↗</span>';
const label = (text) => `<span class="eyebrow">${text}</span>`;

export function breadcrumbs(items) {
  return `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="#/">Library</a>${items.map(([text, href]) => `<span aria-hidden="true">/</span>${href ? `<a href="${href}">${e(text)}</a>` : `<span aria-current="page">${e(text)}</span>`}`).join('')}</nav>`;
}

export function sourceLinks(collection) {
  return collectionSources(collection).map((source) => `<a class="source-link" href="${e(source.url)}" target="_blank" rel="noopener noreferrer"><div><strong>${e(source.title)}</strong><p>${e(source.detail)}</p></div><span aria-hidden="true">↗</span></a>`).join('');
}

export function topicCard(topic, index = 0, preferences = {}) {
  const read = preferences.read?.includes(topic.key);
  return `<a class="topic-card" href="${routeFor(topic)}"><span class="topic-number">${String(index + 1).padStart(2, '0')}</span><div class="topic-card-content"><h3>${e(topic.title)}</h3>${topic.description ? `<p lang="zh-CN">${e(topic.description)}</p>` : ''}<div class="topic-tags">${topic.scaffold ? '<span>Category only</span>' : `<span>${topic.bullets.length} techniques</span><span>${topic.exercises.length} practice ${topic.exercises.length === 1 ? 'problem' : 'problems'}</span>`}${read ? '<span class="read-tag">✓ Reviewed</span>' : ''}</div></div>${arrow}</a>`;
}

export function homePage(preferences) {
  const lastTopic = topicMap.get(preferences.last) || topicMap.get('bmo/combinatorics/counting');
  return `<section class="home-heading"><div>${label('THE PERSONAL STUDY LIBRARY')}<h1>Mathematics,<br><em>collected.</em></h1></div><label class="search-box">${icons.search}<input type="search" id="topic-search" placeholder="Find a topic or technique" aria-label="Search topics and techniques" autocomplete="off"></label></section>
    <div id="collection-home"><div class="section-line">${label('YOUR COLLECTIONS')}<span class="count">${totals.topics} topics &nbsp; / &nbsp; ${totals.exercises} practice problems</span></div>
    <div class="collection-grid">${collections.map((collection, index) => {
      const topics = allTopics.filter((topic) => topic.collection.id === collection.id);
      return `<a class="collection-card ${collection.color} ${collection.scaffold ? 'scaffold' : ''}" href="#/${collection.id}"><div class="card-top"><span class="card-number">0${index + 1} / ${collection.scaffold ? 'FRAMEWORK' : 'COLLECTION'}</span>${arrow}</div><div class="card-art">${artwork(collection.symbol)}</div><div class="card-body"><h2>${e(collection.name)}</h2><p class="full-name">${e(collection.fullName)}</p><div class="card-footer"><span>${collection.subjects.length} subjects</span><span class="dot"></span><span>${topics.length} ${collection.scaffold ? 'categories' : 'topics'}</span>${!collection.scaffold ? '<span aria-hidden="true">→</span>' : ''}</div></div></a>`;
    }).join('')}</div>
    <div class="home-bottom"><div class="study-note">${label('A NOTE ON THE NOTES')}<h3>Understand. Then prove.</h3><p lang="zh-CN">讲解与 hints 用中文，术语、题目与解析用英文。练习为原创或经典训练题；官方真题与评分资料另附来源。</p></div><a class="continue-link" href="${routeFor(lastTopic)}"><div class="continue-icon" aria-hidden="true">${preferences.last ? '↗' : '∑'}</div><div class="continue-text">${label(preferences.last ? 'PICK UP WHERE YOU LEFT OFF' : 'A PLACE TO BEGIN')}<h3>${e(lastTopic.title)}</h3><p>${e(lastTopic.collection.name)} &nbsp; / &nbsp; ${e(lastTopic.subject.name)}</p></div><span aria-hidden="true">↗</span></a></div></div><div id="search-results" class="search-results" hidden></div>`;
}

export function collectionPage(collection, preferences) {
  const topics = allTopics.filter((topic) => topic.collection.id === collection.id);
  return `${breadcrumbs([[collection.name]])}<section class="page-heading"><div>${label(collection.fullName)}<h1>${e(collection.name)}</h1><p lang="zh-CN">${collection.id === 'bmo' ? '四个数学方向，一组彼此关联的解题方法。先找到关键观察，再将它写成完整证明。' : e(collection.description)}</p></div><div class="heading-badge"><span>${topics.length}</span><small>${collection.scaffold ? 'categories' : 'topics'}</small></div></section>
    ${collection.subjects.map((subject) => `<section id="subject-${subject.id}" class="subject-section"><div class="subject-heading"><h2><a href="#/${collection.id}/${subject.id}">${e(subject.name)}</a></h2>${subject.description ? `<p>${e(subject.description)}</p>` : ''}</div><div class="topic-grid">${topics.filter((topic) => topic.subject.id === subject.id).map((topic, index) => topicCard(topic, index, preferences)).join('')}</div></section>`).join('')}
    ${collection.id === 'bmo' ? `<aside class="research-callout"><div>${label('OFFICIAL PAPERS → A REFINED TOOLKIT')}<h3>The combinatorics method map</h3><p lang="zh-CN">在原有五类基础上，补充极值、编码与博弈；保留官方真题对应证据。</p></div><a class="button" href="#/bmo/review">Read the review <span aria-hidden="true">↗</span></a></aside>` : ''}
    ${!collection.scaffold ? `<details class="source-section"><summary>Official resources</summary><div class="source-list">${sourceLinks(collection)}</div></details><p class="collection-note">${e(collection.note)}</p>` : '<p class="collection-note" lang="zh-CN">当前仅保留分类结构，尚未填充讲解、练习或真题资料。</p>'}`;
}

export function subjectPage(collection, subject, preferences) {
  const topics = allTopics.filter((topic) => topic.collection.id === collection.id && topic.subject.id === subject.id);
  return `${breadcrumbs([[collection.name, `#/${collection.id}`], [subject.name]])}<section class="page-heading"><div>${label(`${collection.name} / ${collection.scaffold ? 'FRAMEWORK' : 'SUBJECT'}`)}<h1>${e(subject.name)}</h1>${subject.description ? `<p>${e(subject.description)}</p>` : ''}</div><div class="heading-badge"><span>${topics.length}</span><small>${collection.scaffold ? 'categories' : 'topics'}</small></div></section><div class="topic-grid">${topics.map((topic, index) => topicCard(topic, index, preferences)).join('')}</div>${collection.id === 'bmo' && subject.id === 'combinatorics' ? `<div class="research-callout"><div><h3>A broader combinatorics toolkit</h3><p lang="zh-CN">查阅凝练关键词、适用条件与历年官方题目证据。</p></div><a class="button" href="#/bmo/review">Method map ↗</a></div>` : ''}`;
}

export function topicPage(topic, preferences, materials) {
  const siblings = allTopics.filter((item) => item.collection.id === topic.collection.id && item.subject.id === topic.subject.id);
  const next = siblings[siblings.indexOf(topic) + 1];
  const saved = preferences.saved.includes(topic.key);
  const read = preferences.read.includes(topic.key);
  return `${breadcrumbs([[topic.collection.name, `#/${topic.collection.id}`], [topic.subject.name, `#/${topic.collection.id}/${topic.subject.id}`], [topic.title]])}
    <div class="topic-layout"><article><header class="topic-heading">${label(`${topic.collection.name} / ${topic.subject.name}`)}<h1>${e(topic.title)}</h1>${topic.description ? `<p class="description" lang="zh-CN">${e(topic.description)}</p>` : ''}<div class="topic-actions"><button class="button ${saved ? 'is-saved' : ''}" data-save="${topic.key}" aria-pressed="${saved}">${icons.bookmark}${saved ? 'Saved' : 'Save topic'}</button><button class="button" data-add-topic="${topic.key}">${icons.file}Add material</button>${!topic.scaffold ? '<a href="#practice" class="button" data-scroll-practice>Practice ↓</a>' : ''}</div></header>
    ${topic.scaffold ? `<div class="empty-state"><span class="empty-symbol" aria-hidden="true">∅</span><h2>A space for later.</h2><p lang="zh-CN">此处暂时仅保留分类。讲解、题目和解析会在后续补充。</p><a class="button" href="#/${topic.collection.id}">Back to ${e(topic.collection.name)} ↗</a></div>` : `<ul class="technique-list">${topic.bullets.map((item) => `<li><h2>${e(item.name)}</h2><p lang="zh-CN">${e(item.text)}</p>${item.formula ? `<div class="formula" aria-label="Formula">${e(item.formula)}</div>` : ''}</li>`).join('')}</ul>
    <section id="practice" class="practice-section" aria-labelledby="practice-title"><div class="practice-heading"><h2 id="practice-title">Put it into practice.</h2><span>Original / classical exercises</span></div>${topic.exercises.map((problem, index) => `<article class="exercise"><div class="exercise-meta"><span>PROBLEM ${String(index + 1).padStart(2, '0')}</span><span>${problem.proof ? 'PROOF' : 'SHORT ANSWER'}</span></div><h3>${e(problem.title)}</h3><p class="question" lang="en">${e(problem.question)}</p><div class="exercise-buttons"><button class="button" data-hint="${index}" aria-expanded="false" aria-controls="hint-${index}">${icons.hint}Hint</button><button class="button" data-solution="${index}">${problem.proof ? 'View proof' : 'View solution'} <span aria-hidden="true">↗</span></button></div><div class="hint-content" id="hint-${index}" lang="zh-CN" hidden><strong>ONE SMALL NUDGE</strong>${e(problem.hint)}</div></article>`).join('')}</section>
    <div class="read-control"><p lang="zh-CN">${read ? '已标记复习。可以随时取消。' : '理解方法后，再尝试独立写出证明。'}</p><button class="button ${read ? 'button-soft' : ''}" data-read="${topic.key}" aria-pressed="${read}">${icons.check}${read ? 'Reviewed' : 'Mark as reviewed'}</button></div>`}
    <section class="topic-materials"><div class="section-line">${label('YOUR MATERIALS')}<button class="text-button" data-add-topic="${topic.key}">＋ Add material</button></div>${materials.length ? materialRows(materials) : '<p class="sidebar-note" lang="zh-CN">还没有归档到此处的个人资料。</p>'}</section>
    ${next ? `<a class="next-topic" href="${routeFor(next)}"><div>${label('NEXT TOPIC')}<h3>${e(next.title)}</h3></div><span aria-hidden="true">→</span></a>` : ''}</article>
    <aside class="topic-sidebar">${label('IN THIS SUBJECT')}<h3>${e(topic.subject.name)}</h3><ul class="related-links">${siblings.map((item) => `<li><a href="${routeFor(item)}" ${item.key === topic.key ? 'class="current" aria-current="page"' : ''}>${e(item.title)}</a></li>`).join('')}</ul><div class="sidebar-divider"></div>${label(topic.scaffold ? 'CATEGORY ONLY' : 'A SMALL REMINDER')}<p class="sidebar-note" lang="zh-CN">${topic.scaffold ? '这个板块的内容将在后续整理。' : '先独立尝试，再看 hint。读懂解析后，合上它重新写一遍。'}</p>${!topic.collection.scaffold ? `<a class="text-button" href="#/${topic.collection.id}/resources">Official resources ↗</a>` : ''}</aside></div>`;
}

export function savedPage(preferences) {
  const topics = allTopics.filter((topic) => preferences.saved.includes(topic.key));
  return `${breadcrumbs([['Saved']])}<section class="page-heading"><div>${label('YOUR READING LIST')}<h1>Saved ideas.</h1><p lang="zh-CN">把想回顾的知识点留在这里。</p></div><div class="heading-badge"><span>${topics.length}</span><small>saved</small></div></section>${topics.length ? `<div class="topic-grid">${topics.map((topic, index) => topicCard(topic, index, preferences)).join('')}</div>` : '<div class="empty-state"><span class="empty-symbol" aria-hidden="true">⌑</span><h2>Keep an idea close.</h2><p lang="zh-CN">打开任意知识点，点击 Save topic 即可收藏。</p><a class="button" href="#/bmo">Explore BMO ↗</a></div>'}`;
}

export function materialRows(materials) {
  return materials.map((material) => {
    const topic = topicMap.get(material.topic);
    const collection = collections.find((item) => item.id === material.collection);
    return `<article class="material-row"><div class="material-symbol" aria-hidden="true">${icons.file}</div><div class="material-body"><span class="eyebrow">${e(collection?.name || 'PERSONAL')} ${topic ? ` / ${e(topic.title)}` : ''}</span><h3>${e(material.title)}</h3>${material.note ? `<p class="material-note">${e(material.note)}</p>` : ''}<div class="material-links">${material.url ? `<a href="${e(material.url)}" target="_blank" rel="noopener noreferrer">Open link ↗</a>` : ''}${material.file ? `<button data-download="${e(material.id)}">Download ${e(material.file.name)}</button>` : ''}${topic ? `<a href="${routeFor(topic)}">View topic ↗</a>` : ''}</div></div></article>`;
  }).join('');
}

export function materialsPage(materials) {
  return `${breadcrumbs([['Materials']])}<section class="page-heading"><div>${label('YOUR PERSONAL ARCHIVE')}<h1>Materials.</h1><p lang="zh-CN">笔记、链接和文件，归档在同一处。</p></div><button class="button" data-add-topic="">＋ Add material</button></section><p class="storage-note" lang="zh-CN">个人资料仅保存于当前浏览器，不会上传至 GitHub。更换设备或清理浏览器前，请使用页脚的 Export materials 备份，再用 Import 导入。</p><label class="material-filter">Filter by collection<select id="material-filter"><option value="">All collections</option>${collections.map((collection) => `<option value="${collection.id}">${e(collection.name)}</option>`).join('')}</select></label><div id="material-list">${materials.length ? materialRows(materials) : '<div class="empty-state"><span class="empty-symbol" aria-hidden="true">＋</span><h2>Make room for your notes.</h2><p lang="zh-CN">从一份试卷、一个链接或一段自己的思考开始。</p><button class="button" data-add-topic="">Add your first material ↗</button></div>'}</div>`;
}

export function resourcesPage(collection) {
  return `${breadcrumbs([[collection.name, `#/${collection.id}`], ['Official resources']])}<section class="page-heading"><div>${label(collection.name)}<h1>Official resources.</h1><p lang="zh-CN">真题与评分资料链接至主办方原始页面，年份以实际考试日期为准。</p></div></section><div class="source-list">${sourceLinks(collection)}</div>`;
}

export function reviewPage() {
  return `${breadcrumbs([['BMO', '#/bmo'], ['Combinatorics review']])}<section class="page-heading"><div>${label('BMO / RESEARCH NOTE')}<h1>A more complete toolkit.</h1><p lang="zh-CN">原列表已覆盖主干；根据跨年份官方真题与评分报告，建议补充并精确化为以下七类。</p></div></section><article class="research-body"><p lang="zh-CN">这是代表性真题抽查所得的备考框架，不是官方考纲，也不能保证覆盖未来全部题型。方法标签属于整理归纳；题目与报告均来自 UKMT / BMOS 官方。</p><ul class="keyword-list">${methodGroups.map(([en, zh, words]) => `<li><h2>${e(en)} <span class="muted">/ ${e(zh)}</span></h2><p lang="zh-CN">${e(words)}</p></li>`).join('')}</ul><p class="storage-note" lang="zh-CN">Signed counting、Permutation parity、Cliques and independent sets 可作为进阶内容。Generating functions、Probabilistic method、Hall’s theorem、Sprague–Grundy theory 另列拓展，不标为必备。</p><h2 class="section-title">Three important qualifications.</h2><ul class="technique-list">${qualifications.map(([title, note]) => `<li><h2>${e(title)}</h2><p lang="zh-CN">${e(note)}</p></li>`).join('')}</ul><h2 class="section-title">The past-paper evidence.</h2><p lang="zh-CN">下表采用实际考试年份。部分官方文件以赛季结束年命名，例如 bmo1-2025.pdf 对应 2024 年 BMO1。</p><div class="evidence-table-wrap"><table class="evidence-table"><thead><tr><th scope="col">Paper / problem</th><th scope="col">Method</th><th scope="col">Why it matters</th></tr></thead><tbody>${evidence.map(([paper, method, reason, url]) => `<tr><td><a href="${e(url)}" target="_blank" rel="noopener noreferrer">${e(paper)} ↗</a></td><td>${e(method)}</td><td lang="zh-CN">${e(reason)}</td></tr>`).join('')}</tbody></table></div><p class="collection-note" lang="zh-CN">抽查包含 BMO1 2013、2016、2018、2020、2022、2024，以及 BMO2 2011、2015、2019、2021、2022、2023 等年份；并未穷尽历史题库。官方评分说明强调完整、清晰的证明，而不只是正确答案。</p><div class="source-list">${sourceLinks(collections[0])}</div></article>`;
}

export function indexTree(route) {
  const parts = route.split('/').filter(Boolean);
  return collections.map((collection) => `<details class="tree-collection" ${parts[0] === collection.id ? 'open' : ''}><summary>${icons.chevron}<span class="tree-label">${e(collection.name)}</span><small>${collection.scaffold ? 'FRAMEWORK' : String(collection.subjects.length).padStart(2, '0')}</small><a class="tree-jump" href="#/${collection.id}" aria-label="Open ${e(collection.name)}">↗</a></summary>${collection.subjects.map((subject) => `<details class="tree-subject" ${parts[0] === collection.id && parts[1] === subject.id ? 'open' : ''}><summary>${icons.chevron}<span class="tree-label">${e(subject.name)}</span><a class="tree-jump" href="#/${collection.id}/${subject.id}" aria-label="Open ${e(collection.name)} ${e(subject.name)}">↗</a></summary><ul class="tree-topics">${subject.topics.map((topic) => { const key = `${collection.id}/${subject.id}/${topic.id}`; return `<li><a href="#/${key}" ${route === key ? 'aria-current="page"' : ''}>${e(topic.title)}</a></li>`; }).join('')}</ul></details>`).join('')}</details>`).join('');
}

export function searchResults(query, preferences) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const results = allTopics.filter((topic) => {
    const haystack = [topic.title, topic.description, topic.collection.name, topic.subject.name, ...topic.bullets.flatMap((item) => [item.name, item.text])].join(' ').toLowerCase();
    return words.every((word) => haystack.includes(word));
  });
  if (!results.length) return '<div class="empty-state"><h2>No matching ideas yet.</h2><p lang="zh-CN">试试其他术语、知识点或中文关键词。</p></div>';
  return `${label(`${results.length} MATCHING ${results.length === 1 ? 'TOPIC' : 'TOPICS'}`)}<div class="topic-grid">${results.map((topic, index) => topicCard(topic, index, preferences)).join('')}</div>`;
}
