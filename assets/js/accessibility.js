/* Small a11y helpers: keyboard trap for open modals, focus outline on tab */
(function () {
  'use strict';

  // Show focus rings only when using keyboard
  let usingKeyboard = false;
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      usingKeyboard = true;
      document.body.classList.add('using-keyboard');
    }
  });
  document.addEventListener('mousedown', () => {
    usingKeyboard = false;
    document.body.classList.remove('using-keyboard');
  });

  // Trap focus inside modal / lightbox
  const trapFocus = (container) => {
    const selectors = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const focusable = Array.from(container.querySelectorAll(selectors));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    container.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    });
  };
  document.querySelectorAll('.modal, .lightbox').forEach(trapFocus);
})();
