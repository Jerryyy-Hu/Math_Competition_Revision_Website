/** Keep desktop navigation non-modal and use a native modal drawer below 1024px. */
export function createNavigation() {
  const root = document.documentElement;
  const dialog = document.querySelector('#index-dialog');
  const trigger = document.querySelector('#index-button');
  const shell = document.querySelector('#page-shell');
  const desktop = matchMedia('(min-width: 1024px)');
  let expanded = false;
  let version = 0;

  function setInstant(instant) {
    root.classList.toggle('navigation-instant', instant);
  }

  function updateTrigger() {
    trigger.setAttribute('aria-expanded', String(expanded));
    trigger.setAttribute('aria-label', expanded ? 'Close navigation index' : 'Open navigation index');
  }

  function showInCurrentMode() {
    dialog.setAttribute('aria-modal', String(!desktop.matches));
    if (desktop.matches) dialog.show();
    else dialog.showModal();
  }

  function open(instant = false) {
    const current = ++version;
    expanded = true;
    setInstant(instant);
    if (!dialog.open) showInCurrentMode();
    updateTrigger();
    // Establish the off-screen starting style before the first visible frame.
    dialog.getBoundingClientRect();
    requestAnimationFrame(() => {
      if (current !== version || !expanded) return;
      root.setAttribute('data-navigation-open', '');
      dialog.setAttribute('data-visible', '');
    });
  }

  async function close(instant = false) {
    if (!dialog.open) return;
    const current = ++version;
    expanded = false;
    setInstant(instant);
    root.removeAttribute('data-navigation-open');
    dialog.removeAttribute('data-visible');
    updateTrigger();
    if (!instant) {
      await Promise.allSettled([...dialog.getAnimations(), ...shell.getAnimations()].map((animation) => animation.finished));
    }
    if (current !== version || expanded) return;
    const restoreFocus = dialog.contains(document.activeElement);
    dialog.close();
    if (restoreFocus) trigger.focus({ preventScroll: true });
  }

  trigger.addEventListener('click', (event) => {
    if (expanded) close(event.detail === 0);
    else open(event.detail === 0);
  });
  dialog.addEventListener('cancel', (event) => { event.preventDefault(); close(true); });
  dialog.addEventListener('click', (event) => {
    if (desktop.matches || event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && expanded && desktop.matches && !document.querySelector('dialog:modal')) {
      event.preventDefault();
      close(true);
    }
  });
  desktop.addEventListener('change', () => {
    if (!expanded) return;
    if (document.querySelector('dialog:modal:not(#index-dialog)')) { close(true); return; }
    const focused = dialog.contains(document.activeElement) ? document.activeElement : null;
    const scroll = dialog.scrollTop;
    setInstant(true);
    dialog.close();
    showInCurrentMode();
    dialog.scrollTop = scroll;
    focused?.focus({ preventScroll: true });
  });

  return {
    get isOpen() { return expanded; },
    get isModal() { return !desktop.matches; },
    close,
  };
}
