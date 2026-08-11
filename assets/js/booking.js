/* Booking form: prefill from ?dest= / ?pkg=, validate, save, show summary + modal + history */
(function () {
  'use strict';
  const form = document.getElementById('bookingForm');
  if (!form) return;

  const V = window.Voyago && window.Voyago.validators;
  const validateForm = window.Voyago && window.Voyago.validateForm;
  const bindLive = (fields) => {
    fields.forEach(([id, rules]) => {
      const el = form.querySelector('#' + id);
      if (!el) return;
      el.addEventListener('blur', () => window.Voyago.runField(el, rules));
      el.addEventListener('input', () => {
        if (el.getAttribute('aria-invalid') === 'true') window.Voyago.runField(el, rules);
      });
    });
  };

  const schema = {
    fullName: [V.required, V.minLength(2)],
    email: [V.required, V.email],
    phone: [V.required, V.phone],
    travelers: [V.required, V.positiveInt],
    destination: [V.required],
    pkg: [V.required],
    travelDate: [V.required, V.futureDate],
  };
  bindLive(Object.entries(schema));
  form.addEventListener('reset', () => {
    setTimeout(() => {
      if (window.Voyago.clearValidation) window.Voyago.clearValidation(form);
      const alertBox = document.getElementById('alertBox');
      if (alertBox) alertBox.innerHTML = '';
    }, 0);
  });

  // Set min date to today
  const dateInput = document.getElementById('travelDate');
  if (dateInput) {
    const t = new Date();
    const yyyy = t.getFullYear();
    const mm = String(t.getMonth() + 1).padStart(2, '0');
    const dd = String(t.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  // Prefill from query string
  const params = new URLSearchParams(window.location.search);
  const dest = params.get('dest');
  const pkg = params.get('pkg');
  if (dest) {
    const sel = document.getElementById('destination');
    if (sel) {
      const opt = Array.from(sel.options).find((o) => o.text.toLowerCase().includes(dest.toLowerCase()));
      if (opt) sel.value = opt.value;
    }
  }
  if (pkg) {
    const psel = document.getElementById('pkg');
    if (psel) {
      const opt = Array.from(psel.options).find((o) => o.text.toLowerCase() === pkg.toLowerCase() || pkg.toLowerCase().includes(o.text.toLowerCase()));
      if (opt) psel.value = opt.value;
    }
  }

  const alertBox = document.getElementById('alertBox');
  const summaryWrap = document.getElementById('bookingSummaryWrap');
  const summaryList = document.getElementById('summaryList');
  const modal = document.getElementById('successModal');
  const modalClose = document.getElementById('successClose');

  const renderSummary = (booking) => {
    if (!summaryList || !summaryWrap) return;
    const rows = [
      ['Booking ID', booking.id],
      ['Name', booking.fullName],
      ['Email', booking.email],
      ['Phone', booking.phone],
      ['Destination', booking.destination],
      ['Package', booking.pkg],
      ['Travel Date', new Date(booking.travelDate).toLocaleDateString()],
      ['Travelers', booking.travelers],
      ['Special Requests', booking.notes || '—'],
    ];
    summaryList.innerHTML = rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('');
    summaryWrap.style.display = 'block';
    summaryWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const renderHistory = () => {
    const wrap = document.getElementById('bookingHistory');
    if (!wrap) return;
    const list = window.Voyago.storage.getBookings();
    if (!list.length) {
      wrap.innerHTML = '<p style="color: var(--color-muted);">No bookings yet.</p>';
      return;
    }
    wrap.innerHTML = list.map((b) => `
      <div class="booking-summary" style="margin-bottom: var(--sp-3);">
        <strong>${b.id}</strong> — ${b.destination} · ${b.pkg} · ${new Date(b.travelDate).toLocaleDateString()}<br />
        <small style="color: var(--color-muted);">${b.fullName} · ${b.email} · booked ${new Date(b.createdAt).toLocaleString()}</small>
      </div>`).join('');
  };
  renderHistory();

  const clearBtn = document.getElementById('clearHistory');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Clear all saved bookings?')) {
        window.Voyago.storage.clearBookings();
        renderHistory();
      }
    });
  }

  const openModal = () => {
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => modalClose && modalClose.focus(), 100);
  };
  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };
  modalClose && modalClose.addEventListener('click', closeModal);
  modal && modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (alertBox) alertBox.innerHTML = '';

    if (!validateForm(form, schema)) {
      if (alertBox) alertBox.innerHTML = '<div class="alert alert-error"><i class="fa-solid fa-triangle-exclamation"></i> Please fix the highlighted fields.</div>';
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    const saved = window.Voyago.storage.addBooking(data);
    window.Voyago.storage.trackDestination(data.destination);

    if (alertBox) alertBox.innerHTML = `<div class="alert alert-success"><i class="fa-solid fa-circle-check"></i> Booking <strong>${saved.id}</strong> received and saved locally.</div>`;

    renderSummary(saved);
    renderHistory();
    openModal();
    form.reset();
  });
})();
