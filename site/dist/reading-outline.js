import { readingHeadingIndex } from './study-state.js';

/** Update once per frame; observe layout changes from formulas and disclosures. */
export function createReadingOutline(container) {
  const headings = [...container.querySelectorAll('[data-technique-heading]')];
  const links = [...container.querySelectorAll('[data-outline-link]')];
  if (!headings.length) return () => {};
  const header = document.querySelector('.site-header');
  const sidebar = container.querySelector('.topic-sidebar');
  const disclosure = container.querySelector('[data-page-outline]');
  const label = container.querySelector('[data-reading-label]');
  const practice = container.querySelector('#practice');
  const mobile = matchMedia('(max-width: 760px)');
  let frame = 0;
  let active = -1;
  let disposed = false;

  function update() {
    frame = 0;
    if (disposed) return;
    const boundary = Math.max(0, header?.getBoundingClientRect().bottom || 0, mobile.matches ? sidebar?.getBoundingClientRect().bottom || 0 : 0);
    const index = readingHeadingIndex(headings.map((heading) => heading.getBoundingClientRect()), boundary, window.innerHeight);
    if (label && headings[index]) label.textContent = practice && practice.getBoundingClientRect().top <= boundary + 1 ? 'Practice' : headings[index].querySelector('[lang="zh-CN"]')?.textContent || headings[index].textContent;
    if (index === active) return;
    active = index;
    links.forEach((link, position) => {
      link.classList.toggle('current', position === active);
      if (position === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  function schedule() {
    if (!disposed && !frame) frame = requestAnimationFrame(update);
  }

  function setMode() {
    if (disclosure) disclosure.open = !mobile.matches;
    active = -1;
    schedule();
  }

  function closeOutside(event) {
    if (mobile.matches && disclosure?.open && !sidebar.contains(event.target)) disclosure.open = false;
  }

  function closeAfterJump(event) {
    if (mobile.matches && event.target.closest('[data-outline-link], [data-scroll-practice]')) disclosure.open = false;
  }

  function closeOnEscape(event) {
    if (event.key !== 'Escape' || !mobile.matches || !disclosure?.open) return;
    event.preventDefault();
    disclosure.open = false;
    disclosure.querySelector('summary').focus({ preventScroll: true });
  }

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  const observer = new ResizeObserver(schedule);
  observer.observe(container);
  if (header) observer.observe(header);
  if (sidebar) observer.observe(sidebar);
  mobile.addEventListener('change', setMode);
  document.addEventListener('pointerdown', closeOutside);
  sidebar?.addEventListener('click', closeAfterJump);
  document.addEventListener('keydown', closeOnEscape);
  document.fonts?.ready.then(schedule);
  setMode();
  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    observer.disconnect();
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    mobile.removeEventListener('change', setMode);
    document.removeEventListener('pointerdown', closeOutside);
    sidebar?.removeEventListener('click', closeAfterJump);
    document.removeEventListener('keydown', closeOnEscape);
  };
}
