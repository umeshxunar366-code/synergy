/* Load packages + testimonials JSON, render, filter, search */
(function () {
  'use strict';

  const DATA_PACKAGES = 'data/packages.json';
  const DATA_TESTIMONIALS = 'data/testimonials.json';

  const fetchJSON = (url) => fetch(url).then((r) => {
    if (!r.ok) throw new Error('Failed: ' + url);
    return r.json();
  });

  const pkgCard = (p) => `
    <article class="card" data-category="${p.category}">
      <div class="card-media">
        <img src="${p.image}" alt="${p.title}" loading="lazy">
        ${p.tag ? `<span class="card-tag">${p.tag}</span>` : ''}
      </div>
      <div class="card-body">
        <h3 class="card-title">${p.title}</h3>
        <p class="pkg-duration"><i class="fa-regular fa-clock"></i> ${p.duration} &nbsp; <span class="pkg-rating">${'★'.repeat(Math.round(p.rating))}</span> ${p.rating}</p>
        <p style="margin-top: 0.5rem;">${p.description}</p>
        <ul class="pkg-includes">${p.includes.map((i) => `<li>${i}</li>`).join('')}</ul>
        <div class="card-meta">
          <span class="card-price">£${p.price.toLocaleString()}</span>
          <a href="booking.html?pkg=${encodeURIComponent(p.title)}" class="btn btn-primary">Book Now</a>
        </div>
      </div>
    </article>`;

  const testimonialCard = (t) => `
    <div class="testimonial-card">
      <div class="testimonial-avatar" style="background: linear-gradient(135deg, ${t.color1}, ${t.color2}); display:grid; place-items:center; color:#fff; font-family:'Poppins'; font-weight:700; font-size:1.5rem;">${t.name.charAt(0)}</div>
      <div class="testimonial-rating">${'★'.repeat(t.rating)}</div>
      <p class="testimonial-quote">"${t.quote}"</p>
      <div class="testimonial-author">${t.name}</div>
      <small style="color: var(--color-muted);">${t.trip}</small>
    </div>`;

  // Packages grid page
  const grid = document.getElementById('packagesGrid');
  const empty = document.getElementById('pkgEmpty');
  const filterBtns = document.querySelectorAll('[data-filter]');
  const search = document.getElementById('pkgSearch');
  let allPackages = [];
  let currentFilter = 'all';
  let currentQuery = '';

  const render = () => {
    if (!grid) return;
    const filtered = allPackages.filter((p) => {
      const okCat = currentFilter === 'all' || p.category === currentFilter;
      const q = currentQuery.trim().toLowerCase();
      const okSearch = !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.destination || '').toLowerCase().includes(q);
      return okCat && okSearch;
    });
    grid.innerHTML = filtered.map(pkgCard).join('');
    if (empty) empty.style.display = filtered.length ? 'none' : 'block';
  };

  if (grid) {
    fetchJSON(DATA_PACKAGES).then((data) => {
      allPackages = data;
      render();
    }).catch(() => {
      grid.innerHTML = '<p style="text-align:center;">Failed to load packages. Please refresh.</p>';
    });

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        currentFilter = btn.getAttribute('data-filter');
        render();
      });
    });

    if (search) {
      let t;
      search.addEventListener('input', (e) => {
        clearTimeout(t);
        t = setTimeout(() => { currentQuery = e.target.value; render(); }, 150);
      });
    }
  }

  // Home page: featured (first 3)
  const featured = document.getElementById('featuredPackages');
  if (featured) {
    fetchJSON(DATA_PACKAGES).then((data) => {
      featured.innerHTML = data.slice(0, 3).map(pkgCard).join('');
    }).catch(() => {});
  }

  // Testimonials
  const tPreview = document.getElementById('testimonialPreview');
  const tGrid = document.getElementById('testimonialsGrid');
  if (tPreview || tGrid) {
    fetchJSON(DATA_TESTIMONIALS).then((data) => {
      if (tPreview) tPreview.innerHTML = data.slice(0, 3).map(testimonialCard).join('');
      if (tGrid) tGrid.innerHTML = data.map(testimonialCard).join('');
    }).catch(() => {});
  }
})();
