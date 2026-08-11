/* localStorage helpers + newsletter + recent-destination tracker */
(function () {
  'use strict';
  window.Voyago = window.Voyago || {};

  const KEYS = {
    theme: 'voyago:theme',
    bookings: 'voyago:bookings',
    newsletter: 'voyago:newsletter',
    recentDest: 'voyago:recentDest',
  };

  const safeGet = (k, fallback) => {
    try {
      const raw = localStorage.getItem(k);
      return raw === null ? fallback : JSON.parse(raw);
    } catch { return fallback; }
  };
  const safeSet = (k, v) => {
    try { localStorage.setItem(k, JSON.stringify(v)); return true; }
    catch { return false; }
  };
  const remove = (k) => localStorage.removeItem(k);

  const storage = {
    KEYS,
    get: safeGet,
    set: safeSet,
    remove,
    addBooking: (b) => {
      const list = safeGet(KEYS.bookings, []);
      list.unshift(Object.assign({ id: 'BK-' + Date.now().toString(36).toUpperCase(), createdAt: new Date().toISOString() }, b));
      safeSet(KEYS.bookings, list.slice(0, 20));
      return list[0];
    },
    getBookings: () => safeGet(KEYS.bookings, []),
    clearBookings: () => remove(KEYS.bookings),
    trackDestination: (d) => {
      if (!d) return;
      const list = safeGet(KEYS.recentDest, []);
      const filtered = list.filter((x) => x !== d);
      filtered.unshift(d);
      safeSet(KEYS.recentDest, filtered.slice(0, 5));
    },
  };

  window.Voyago.storage = storage;

  // Newsletter form (present on index)
  const nf = document.getElementById('newsletterForm');
  if (nf) {
    nf.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletterEmail').value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      const list = safeGet(KEYS.newsletter, []);
      if (!list.includes(email)) list.push(email);
      safeSet(KEYS.newsletter, list);
      nf.reset();
      alert('Thanks for subscribing!');
    });
  }
})();
