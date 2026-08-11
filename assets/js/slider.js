/* Hero auto-slider with dots, pause on hover, keyboard support */
(function () {
  'use strict';
  const slider = document.getElementById('heroSlider');
  if (!slider) return;
  const slides = slider.querySelectorAll('.slide');
  const dotsWrap = document.getElementById('sliderDots');
  if (slides.length <= 1) return;

  let current = 0;
  let timer = null;
  const INTERVAL = 5000;

  const dots = [];
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.className = 'slider-dot' + (i === 0 ? ' active' : '');
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', `Slide ${i + 1}`);
    b.addEventListener('click', () => go(i));
    dotsWrap && dotsWrap.appendChild(b);
    dots.push(b);
  });

  const go = (i) => {
    slides[current].classList.remove('active');
    dots[current] && dots[current].classList.remove('active');
    current = (i + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current] && dots[current].classList.add('active');
  };

  const next = () => go(current + 1);
  const start = () => { stop(); timer = setInterval(next, INTERVAL); };
  const stop = () => { if (timer) { clearInterval(timer); timer = null; } };

  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);
  slider.addEventListener('focusin', stop);
  slider.addEventListener('focusout', start);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { next(); start(); }
    else if (e.key === 'ArrowLeft') { go(current - 1); start(); }
  });

  start();
})();
