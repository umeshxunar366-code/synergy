/* Gallery filter + lightbox */
(function () {
  'use strict';
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  const items = grid.querySelectorAll('.gallery-item');
  const filters = document.querySelectorAll('[data-gfilter]');
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightboxContent');
  const lightboxClose = document.getElementById('lightboxClose');

  // Filter
  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-gfilter');
      filters.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      items.forEach((it) => {
        const show = cat === 'all' || it.getAttribute('data-cat') === cat;
        it.style.display = show ? '' : 'none';
      });
    });
  });

  // Lightbox
  const openLightbox = (item) => {
    if (!lightbox || !lightboxContent) return;
    const img = item.querySelector('img');
    const src = img ? img.getAttribute('src') : '';
    const title = item.getAttribute('data-title') || 'Photo';
    lightboxContent.innerHTML = `
      <figure style="max-width: min(90vw, 1100px); max-height: 85vh; margin:0;">
        <img src="${src}" alt="${title}" style="width:100%; height:auto; max-height:80vh; object-fit:contain; border-radius:12px; display:block;">
        <figcaption style="color:#fff; font-family:'Poppins',sans-serif; font-size:1.15rem; font-weight:600; margin-top:0.75rem; text-align:center;">${title}</figcaption>
      </figure>`;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };
  items.forEach((it) => it.addEventListener('click', () => openLightbox(it)));
  lightboxClose && lightboxClose.addEventListener('click', closeLightbox);
  lightbox && lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
})();
