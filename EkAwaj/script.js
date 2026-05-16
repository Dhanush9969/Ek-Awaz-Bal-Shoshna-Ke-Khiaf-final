/* ══════════════════════════════════════════════
   EK AWAJ — BAAL SHOSHAN KHILAF
   Main JavaScript
══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  initNavbar();
  initHamburger();
  initDropdownLinks();
  initCounters();
  initResourceFilter();
  initContactForm();
  initSafetyProtocol();
  initSmoothScroll();
});

/* ── NAVBAR SCROLL EFFECT ── */
function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ── HAMBURGER MENU ── */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });
}

/* ── RESOURCES DROPDOWN FILTER LINKS ── */
function initDropdownLinks() {
  document.querySelectorAll('.dropdown-menu a[data-filter]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const filter = link.dataset.filter;
      document.querySelector(`#resources`).scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => applyFilter(filter), 500);
    });
  });
}

/* ══ ANIMATED COUNTERS ══ */
function initCounters() {
  const cards = document.querySelectorAll('.impact-card[data-target]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  cards.forEach(card => observer.observe(card));
}

function animateCounter(card) {
  const target  = parseInt(card.dataset.target, 10);
  const suffix  = card.dataset.suffix || '';
  const counter = card.querySelector('.impact-counter');
  const duration = 2000;
  const startTime = performance.now();

  function update(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const eased    = 1 - Math.pow(1 - progress, 3);
    const value    = Math.floor(eased * target);
    counter.textContent = value.toLocaleString('en-IN') + (progress >= 1 ? suffix : '');
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* ══ RESOURCE FILTER ══ */
function initResourceFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  });
}

function applyFilter(filter) {
  // Sync button state
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === filter);
  });

  const cards = document.querySelectorAll('.resource-card');
  cards.forEach(card => {
    const match = filter === 'all' || card.dataset.category === filter;
    card.style.transition = 'opacity .3s, transform .3s';
    if (match) {
      card.classList.remove('hidden');
      card.style.opacity = '1';
      card.style.transform = 'scale(1)';
    } else {
      card.style.opacity = '0';
      card.style.transform = 'scale(0.95)';
      setTimeout(() => card.classList.add('hidden'), 300);
    }
  });
}

/* ══ CONTACT FORM ══ */
function initContactForm() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  const error   = document.getElementById('form-error');
  const btn     = document.getElementById('form-submit-btn');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    btn.textContent = 'Sending…';
    btn.disabled = true;
    success.style.display = 'none';
    error.style.display   = 'none';

    try {
      const data = new FormData(form);
      const res  = await fetch(form.action, {
        method:  'POST',
        body:    data,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        success.style.display = 'block';
        form.reset();
        showToast('✅ Message sent! We\'ll be in touch within 24 hours.');
      } else {
        throw new Error('Server error');
      }
    } catch {
      error.style.display = 'block';
      showToast('❌ Could not send. Please call 1098 directly.');
    } finally {
      btn.textContent = 'Send Securely 🔒';
      btn.disabled = false;
    }
  });
}

/* ══ SAFETY PROTOCOL ══ */
function initSafetyProtocol() {
  // ESC key → quick exit
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') quickExit();
  });
}

// Exposed globally for the onclick in HTML
window.quickExit = function () {
  // Replace history so back button doesn't return here
  window.location.replace('https://www.google.com');
};

/* ══ SMOOTH SCROLL ══ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ══ TOAST NOTIFICATION ══ */
function showToast(msg, duration = 4000) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.style.display = 'block';
  setTimeout(() => { toast.style.display = 'none'; }, duration);
}
