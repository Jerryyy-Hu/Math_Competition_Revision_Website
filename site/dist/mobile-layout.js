/** Leave room for the result count and footer above the software keyboard. */
export function availableSearchHeight(fieldBottom, viewportHeight, viewportOffset = 0, reservedHeight = 86) {
  return Math.max(0, Math.min(480, viewportHeight + viewportOffset - fieldBottom - reservedHeight));
}

export function createSearchViewport() {
  let frame = 0;
  function update() {
    frame = 0;
    const field = document.querySelector('.search-field');
    if (!field) return;
    const viewport = window.visualViewport;
    const bottom = field.getBoundingClientRect().bottom;
    const viewportHeight = viewport?.height || window.innerHeight;
    const viewportOffset = viewport?.offsetTop || 0;
    const compact = viewportHeight + viewportOffset - bottom < 200;
    field.classList.toggle('is-search-compact', compact);
    const height = availableSearchHeight(bottom, viewportHeight, viewportOffset, compact ? 12 : 86);
    field.style.setProperty('--search-results-height', `${height}px`);
  }
  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('scroll', schedule, { passive: true });
  window.visualViewport?.addEventListener('resize', schedule, { passive: true });
  window.visualViewport?.addEventListener('scroll', schedule, { passive: true });
  return schedule;
}

/** Keep large formulas readable and make their own scroll area discoverable. */
export function createMathScrollRegions(container) {
  const regions = [...container.querySelectorAll('.formula, .math-display, .math-inline')].filter((element) => !element.parentElement.closest('.formula, .math-display, .math-inline'));
  const originalLabels = new Map(regions.map((region) => [region, region.getAttribute('aria-label')]));
  const hints = new Map();
  let frame = 0;
  let disposed = false;

  function update() {
    frame = 0;
    if (disposed) return;
    for (const region of regions) {
      const overflowing = region.clientWidth > 0 && region.scrollWidth > region.clientWidth + 1;
      region.classList.toggle('math-scrollable', overflowing);
      if (overflowing) {
        region.setAttribute('tabindex', '0');
        region.setAttribute('role', 'region');
        region.setAttribute('aria-label', `${originalLabels.get(region) || 'Math expression'}; scroll horizontally to read in full`);
      } else {
        region.removeAttribute('tabindex');
        region.removeAttribute('role');
        if (originalLabels.get(region)) region.setAttribute('aria-label', originalLabels.get(region));
        else region.removeAttribute('aria-label');
      }
      if (!region.classList.contains('math-inline') && overflowing && !hints.has(region)) {
        const hint = document.createElement('span');
        hint.className = 'math-scroll-hint';
        hint.lang = 'zh-CN';
        hint.setAttribute('aria-hidden', 'true');
        hint.textContent = '左右滑动公式 ↔';
        region.after(hint);
        hints.set(region, hint);
      }
      if (hints.has(region)) hints.get(region).hidden = !overflowing;
    }
  }
  function schedule() {
    if (!disposed && !frame) frame = requestAnimationFrame(update);
  }
  const observer = new ResizeObserver(schedule);
  regions.forEach((region) => observer.observe(region));
  document.fonts?.ready.then(schedule);
  schedule();
  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    observer.disconnect();
  };
}
