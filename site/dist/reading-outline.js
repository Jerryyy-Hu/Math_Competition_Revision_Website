import { readingHeadingIndex } from './study-state.js';

/** Update once per frame; observe layout changes from formulas and disclosures. */
export function createReadingOutline(container) {
  const headings = [...container.querySelectorAll('[data-technique-heading]')];
  const links = [...container.querySelectorAll('[data-outline-link]')];
  if (!headings.length) return () => {};
  const header = document.querySelector('.site-header');
  let frame = 0;
  let active = -1;
  let disposed = false;

  function update() {
    frame = 0;
    if (disposed) return;
    const boundary = Math.max(0, header?.getBoundingClientRect().bottom || 0);
    const index = readingHeadingIndex(headings.map((heading) => heading.getBoundingClientRect()), boundary, window.innerHeight);
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

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  const observer = new ResizeObserver(schedule);
  observer.observe(container);
  if (header) observer.observe(header);
  document.fonts?.ready.then(schedule);
  schedule();
  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    observer.disconnect();
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
  };
}
