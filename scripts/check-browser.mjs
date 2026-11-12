/** Test only this site's isolated browser profile; no personal browser data is used. */
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { allTopics, resolveTopicKey } from '../site/dist/library.js';

const base = process.argv[2] || 'http://127.0.0.1:4174/';
assert(['127.0.0.1', 'jerryyy-hu.github.io'].includes(new URL(base).hostname));
const executable = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
assert(existsSync(executable), 'The existing Edge installation is required.');
const profile = resolve(`artifacts/browser-profile-${Date.now()}`);
mkdirSync(profile, { recursive: true });
const child = spawn(executable, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--disable-background-networking', '--disable-sync', '--disable-extensions', '--remote-debugging-address=127.0.0.1', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { windowsHide: true, stdio: 'ignore' });
const sleep = (duration) => new Promise((done) => setTimeout(done, duration));
let socket;
let browserUrl;
let id = 0;
const pending = new Map();
const errors = [];
const results = [];

async function send(method, params = {}) {
  return new Promise((resolvePromise, reject) => {
    const requestId = ++id;
    const timer = setTimeout(() => { pending.delete(requestId); reject(new Error(`CDP timeout: ${method}`)); }, 15_000);
    pending.set(requestId, { resolve: resolvePromise, reject, timer });
    socket.send(JSON.stringify({ id: requestId, method, params }));
  });
}

async function evaluate(expression) {
  const result = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  return result.result?.value;
}

async function waitFor(expression) {
  for (let attempt = 0; attempt < 150; attempt++) {
    if (await evaluate(expression)) return;
    await sleep(50);
  }
  throw new Error(`Browser condition timed out: ${expression}`);
}

const click = (selector) => evaluate(`document.querySelector(${JSON.stringify(selector)}).dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,detail:1,button:0}))`);
const metrics = (width, height = 1000) => send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 760 });
async function screenshot(name) {
  const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  writeFileSync(resolve(`artifacts/${name}.png`), Buffer.from(shot.data, 'base64'));
}
async function route(key) {
  await evaluate(`location.hash=${JSON.stringify(`#/${key}`)}`);
  await waitFor(`document.querySelector('[data-save]')?.dataset.save===${JSON.stringify(resolveTopicKey(key))}`);
}

try {
  let port;
  for (let attempt = 0; attempt < 100; attempt++) {
    try {
      const lines = readFileSync(resolve(profile, 'DevToolsActivePort'), 'utf8').trim().split(/\r?\n/);
      port = Number(lines[0]);
      browserUrl = `ws://127.0.0.1:${port}${lines[1]}`;
      break;
    } catch { await sleep(100); }
  }
  if (!port) throw new Error('The isolated Edge process did not expose its testing endpoint.');
  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const page = targets.find((target) => target.type === 'page' && target.url === 'about:blank');
  assert(page, 'An isolated blank page is required.');
  socket = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((done, reject) => { socket.addEventListener('open', done, { once: true }); socket.addEventListener('error', reject, { once: true }); });
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const request = pending.get(message.id);
      pending.delete(message.id);
      clearTimeout(request.timer);
      if (message.error) request.reject(new Error(message.error.message));
      else request.resolve(message.result);
    } else if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);
    else if (message.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(message.params.type)) errors.push(message.params.args.map((argument) => argument.value || argument.description).join(' '));
  });
  await send('Page.enable');
  await send('Runtime.enable');
  await metrics(1440);
  await send('Page.navigate', { url: `${base}#/bmo/combinatorics/graphs` });
  await waitFor(`document.querySelectorAll('[data-technique-heading]').length>0`);
  await sleep(200);
  assert.equal(await evaluate(`document.querySelector('.topic-sidebar h3').textContent`), 'Graph theory');
  assert.equal(await evaluate(`document.querySelectorAll('[data-outline-link]').length`), await evaluate(`document.querySelectorAll('[data-technique-heading]').length`));
  await click('[data-mark-technique]');
  assert.equal(await evaluate(`document.querySelector('.technique').classList.contains('is-marked') && document.querySelector('[data-outline-link]').classList.contains('is-marked') && !document.querySelector('.outline-mark').hidden`), true);
  await send('Page.reload');
  await waitFor(`document.querySelector('[data-mark-technique]')?.getAttribute('aria-pressed')==='true'`);
  results.push('Technique and outline marks persist after reload.');

  await evaluate(`{ const h=document.querySelector('[data-technique-heading]');const r=h.getBoundingClientRect();const edge=document.querySelector('.site-header').getBoundingClientRect().bottom;window.scrollTo({top:window.scrollY+r.top+r.height/2-edge-1,behavior:'instant'}); }`);
  await sleep(80);
  assert.equal(await evaluate(`document.querySelector('[data-outline-link][aria-current]')?.dataset.outlineLink===document.querySelector('[data-technique-heading]').id`), true);
  await evaluate(`window.scrollBy({top:2,behavior:'instant'})`);
  await sleep(80);
  assert.equal(await evaluate(`document.querySelector('[data-outline-link][aria-current]')?.dataset.outlineLink===document.querySelectorAll('[data-technique-heading]')[1].id`), true);
  await click('[data-outline-link]');
  await sleep(650);
  const jump = await evaluate(`({top:document.querySelector('[data-technique-heading]').getBoundingClientRect().top,header:document.querySelector('.site-header').getBoundingClientRect().bottom})`);
  assert(jump.top >= jump.header && jump.top <= jump.header + 40);
  await evaluate(`document.activeElement?.blur()`);
  await screenshot('revision-desktop');
  results.push('Outline follows the exact half-heading threshold and links scroll below the header.');

  await click('.hint-button');
  await click('.solution-button');
  await click('.review-button');
  assert.equal(await evaluate(`!document.querySelector('.hint-content').hidden && !document.querySelector('.solution-content').hidden && !document.querySelector('dialog:modal')`), true);
  assert.equal(await evaluate(`getComputedStyle(document.querySelector('.hint-content')).backgroundColor!==getComputedStyle(document.querySelector('.solution-content')).backgroundColor`), true);
  assert.equal(await evaluate(`document.querySelector('.review-button').getAttribute('aria-pressed')`), 'true');
  assert(await evaluate(`document.querySelectorAll('math').length>0`));
  await evaluate(`document.querySelector('#practice').scrollIntoView({behavior:'instant'})`);
  await sleep(250);
  await screenshot('revision-practice');
  await send('Page.reload');
  await waitFor(`document.querySelector('.review-button')?.getAttribute('aria-pressed')==='true'`);
  results.push('Hint and Solution expand inline with distinct colours; individual review status persists.');

  await evaluate(`window.scrollTo({top:0,behavior:'instant'})`);
  const before = await evaluate(`({width:document.querySelector('main').getBoundingClientRect().width,left:document.querySelector('main').getBoundingClientRect().left})`);
  await click('#index-button');
  await sleep(180);
  const rotating = await evaluate(`({opacity:Number(getComputedStyle(document.querySelector('.index-menu')).opacity),duration:getComputedStyle(document.querySelector('.index-menu')).transitionDuration})`);
  assert(rotating.opacity > 0 && rotating.opacity < 1);
  assert(rotating.duration.includes('0.48s'));
  await sleep(500);
  const opened = await evaluate(`({width:document.querySelector('main').getBoundingClientRect().width,left:document.querySelector('main').getBoundingClientRect().left,modal:document.querySelector('#index-dialog').matches(':modal'),radius:getComputedStyle(document.querySelector('#index-button')).borderRadius})`);
  assert.equal(opened.width, before.width);
  assert(Math.abs(opened.left - before.left - 144) < 1);
  assert.equal(opened.modal, false);
  assert.equal(opened.radius, '6px');
  await click('#index-button');
  await sleep(600);
  await evaluate(`for(let i=0;i<6;i++)document.querySelector('#index-button').dispatchEvent(new MouseEvent('click',{bubbles:true,detail:1}))`);
  await sleep(600);
  assert.equal(await evaluate(`document.querySelector('#index-button').getAttribute('aria-expanded')`), 'false');
  assert.equal(await evaluate(`document.querySelector('#index-dialog').open`), false);
  results.push('Desktop slide preserves content width, shifts by 144px, uses slower interruptible icons and a square hover target.');

  await route('bmt/number-theory/congruences');
  await waitFor(`document.querySelector('[data-save]')?.dataset.save==='bmt/discrete/discrete-structures'`);
  results.push('Old BMT Number Theory topic links resolve to Discrete.');

  let stackedFractions = false;
  for (const width of [1440, 1024, 391, 320]) {
    await metrics(width, 900);
    for (const topic of allTopics.filter((item) => !item.scaffold)) {
      await route(topic.key);
      const layout = await evaluate(`({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth,math:document.querySelectorAll('math').length,fractions:document.querySelectorAll('mfrac').length,buttons:[...document.querySelector('.exercise-buttons').children].map(x=>({top:x.getBoundingClientRect().top,height:x.getBoundingClientRect().height}))})`);
      assert(layout.scroll <= layout.width + 1, `Page overflow at ${width}px: ${topic.key}`);
      assert(layout.math > 0, `Math not rendered: ${topic.key}`);
      stackedFractions ||= layout.fractions > 0;
      const centres = layout.buttons.map((button) => button.top + button.height / 2);
      assert(Math.max(...centres) - Math.min(...centres) < 2, `Practice actions left their shared row at ${width}px: ${topic.key}`);
    }
    results.push(`All 26 populated topics render at ${width}px without page overflow; practice controls share one row.`);
  }
  assert(stackedFractions, 'The browser must contain native stacked fractions.');

  await metrics(1440);
  await route('bmo/algebra/inequalities');
  await evaluate(`document.querySelectorAll('[data-technique-heading]')[2].scrollIntoView({behavior:'instant'})`);
  await sleep(200);
  await screenshot('revision-math');

  await metrics(391, 850);
  await route('bmo/combinatorics/graphs');
  const mobileBefore = await evaluate(`document.querySelector('main').getBoundingClientRect().left`);
  await click('#index-button');
  await sleep(400);
  assert.equal(await evaluate(`document.querySelector('#index-dialog').matches(':modal')`), true);
  assert.equal(await evaluate(`document.querySelector('main').getBoundingClientRect().left`), mobileBefore);
  await screenshot('revision-mobile');
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: 380, y: 200, button: 'left', clickCount: 1 });
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: 380, y: 200, button: 'left', clickCount: 1 });
  await sleep(500);
  assert.equal(await evaluate(`document.querySelector('#index-dialog').open`), false);
  results.push('Mobile drawer overlays the page, leaves content position unchanged, and dismisses on backdrop click.');
  assert.deepEqual(errors, []);
  const report = { base, results, browserErrors: errors, physicalPhoneTested: false };
  writeFileSync(resolve('artifacts/browser-verification.json'), `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report, null, 2));
} catch (error) {
  if (socket?.readyState === WebSocket.OPEN) await screenshot('revision-browser-failure').catch(() => {});
  throw error;
} finally {
  socket?.close();
  if (browserUrl) {
    const browser = new WebSocket(browserUrl);
    await new Promise((done) => { browser.addEventListener('open', () => { browser.send(JSON.stringify({ id: 1, method: 'Browser.close' })); done(); }, { once: true }); browser.addEventListener('error', done, { once: true }); setTimeout(done, 1500); });
    browser.close();
  }
  if (child.exitCode === null) child.kill();
}
