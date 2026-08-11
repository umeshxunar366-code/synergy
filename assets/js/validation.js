/* Reusable validators + attach to booking + contact forms */
(function () {
  'use strict';
  window.Voyago = window.Voyago || {};

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const PHONE_RE = /^(\+44\s?|0)7\d{3}\s?\d{6}$/;

  const validators = {
    required: (v) => (v && String(v).trim().length > 0) || 'This field is required.',
    minLength: (n) => (v) => (v && v.trim().length >= n) || `Minimum ${n} characters.`,
    email: (v) => EMAIL_RE.test(v || '') || 'Enter a valid email address.',
    phone: (v) => PHONE_RE.test((v || '').trim()) || 'Enter a valid UK mobile number (e.g. 07344 064688 or +44 7344 064688).',
    positiveInt: (v) => {
      const n = parseInt(v, 10);
      return (Number.isFinite(n) && n > 0) || 'Enter a number greater than zero.';
    },
    futureDate: (v) => {
      if (!v) return 'Pick a date.';
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const d = new Date(v);
      return (d >= today) || 'Travel date must be today or later.';
    },
  };

  const setError = (field, message) => {
    const wrap = field.closest('.field');
    const err = wrap ? wrap.querySelector('.error') : null;
    if (message === true || !message) {
      wrap && wrap.classList.remove('invalid');
      if (err) err.textContent = '';
      field.setAttribute('aria-invalid', 'false');
    } else {
      wrap && wrap.classList.add('invalid');
      if (err) err.textContent = message;
      field.setAttribute('aria-invalid', 'true');
    }
  };

  const runField = (field, rules) => {
    for (const rule of rules) {
      const res = rule(field.value);
      if (res !== true) { setError(field, res); return false; }
    }
    setError(field, true);
    return true;
  };

  const validateForm = (form, schema) => {
    let ok = true;
    Object.entries(schema).forEach(([id, rules]) => {
      const field = form.querySelector('#' + id);
      if (!field) return;
      if (!runField(field, rules)) ok = false;
    });
    return ok;
  };

  const clearValidation = (form) => {
    form.querySelectorAll('.field').forEach((wrap) => wrap.classList.remove('invalid'));
    form.querySelectorAll('.error').forEach((err) => { err.textContent = ''; });
    form.querySelectorAll('[aria-invalid]').forEach((field) => field.setAttribute('aria-invalid', 'false'));
  };

  window.Voyago.validators = validators;
  window.Voyago.validateForm = validateForm;
  window.Voyago.setError = setError;
  window.Voyago.runField = runField;
  window.Voyago.clearValidation = clearValidation;

  // Live validation on blur (booking + contact)
  const bindLive = (form, schema) => {
    Object.entries(schema).forEach(([id, rules]) => {
      const field = form.querySelector('#' + id);
      if (!field) return;
      field.addEventListener('blur', () => runField(field, rules));
      field.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true') runField(field, rules);
      });
    });
    form.addEventListener('reset', () => setTimeout(() => clearValidation(form), 0));
  };

  // Contact form validation + save handled here
  const cForm = document.getElementById('contactForm');
  if (cForm) {
    const schema = {
      cName: [validators.required, validators.minLength(2)],
      cEmail: [validators.required, validators.email],
      cMessage: [validators.required, validators.minLength(10)],
    };
    bindLive(cForm, schema);
    cForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateForm(cForm, schema)) return;
      alert('Thanks! Your message has been sent. We will reply within one business day.');
      cForm.reset();
    });
  }
})();
