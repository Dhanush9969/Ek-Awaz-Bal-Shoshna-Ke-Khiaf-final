/* ══ SHARED PARTIALS ══ */

document.addEventListener('DOMContentLoaded', function () {

const EMERGENCY_BAR = `
<div id="emergency-bar">
  <div class="emergency-inner">
    <span class="blink-dot"></span>
    <span class="emergency-text">
      🆘 <strong>Child Helpline India:</strong>
      <a href="tel:1098">1098</a>
      &nbsp;|&nbsp; Ek Awaj Direct: <a href="tel:+917888801753">+91-7888801753</a>
      &nbsp;|&nbsp; 24/7 Free &amp; Confidential
    </span>
    <span class="emergency-right"><span class="live-dot"></span> LIVE SUPPORT</span>
  </div>
</div>`;

const NAV = `
<nav id="navbar">
  <div class="nav-container">
    <a href="index.html" class="nav-logo">
      <img src="logo.png" alt="Ek Awaj Logo" class="logo-img" onerror="this.style.display='none'" />
      <div class="logo-text">
        <span class="logo-main">Ek Awaj</span>
        <span class="logo-sub">Baal Shoshan Khilaf</span>
      </div>
    </a>
    <button class="hamburger" id="hamburger" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
    <ul class="nav-links" id="nav-links">
      <li><a href="index.html"     class="nav-link" data-page="index">Home</a></li>
      <li><a href="issue.html"     class="nav-link" data-page="issue">The Issue</a></li>
      <li><a href="work.html"      class="nav-link" data-page="work">Our Work</a></li>
      <li class="dropdown">
        <a href="resources.html" class="nav-link dropdown-toggle" data-page="resources">
          Resources <span class="caret">▾</span>
        </a>
        <ul class="dropdown-menu">
          <li><a href="resources.html?filter=parents">For Parents</a></li>
          <li><a href="resources.html?filter=teachers">For Teachers</a></li>
          <li><a href="resources.html?filter=children">For Children</a></li>
          <li><a href="resources.html?filter=all">All Resources</a></li>
        </ul>
      </li>
      <li><a href="contact.html" class="nav-link nav-cta" data-page="contact">Get Help</a></li>
    </ul>
  </div>
</nav>`;

const FOOTER = `
<footer id="footer">
  <div class="footer-main">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="footer-logo">
            <img src="logo.png" alt="Ek Awaj" class="footer-logo-img" onerror="this.style.display='none'" />
            <div>
              <div class="footer-org-name">Ek Awaj</div>
              <div class="footer-org-sub">Baal Shoshan Khilaf</div>
            </div>
          </div>
          <p class="footer-tagline">Prevention through awareness,<br/>protection, and healing.</p>
          <div class="footer-emergency">
            <a href="tel:1098" class="footer-helpline">
              📞 Childline: <strong>1098</strong>
            </a>
            <a href="tel:+917888801753" class="footer-helpline" style="margin-top:8px;">
              📱 Direct: <strong>+91-7888801753</strong>
            </a>
            <span class="footer-helpline-note">Free · 24/7 · Confidential</span>
          </div>
          <div class="footer-social">
            <a href="https://www.instagram.com/ekawajbaalshoshan" target="_blank" rel="noopener" class="social-link" aria-label="Instagram">
              <i data-lucide="instagram"></i>
            </a>
            <a href="mailto:eabsk2024@gmail.com" class="social-link" aria-label="Email">
              <i data-lucide="mail"></i>
            </a>
            <a href="tel:+917888801753" class="social-link" aria-label="Phone">
              <i data-lucide="phone"></i>
            </a>
          </div>
        </div>
        <div class="footer-nav-col">
          <h4 class="footer-nav-title">Navigate</h4>
          <ul class="footer-nav-list">
            <li><a href="index.html">Home</a></li>
            <li><a href="issue.html">The Issue</a></li>
            <li><a href="work.html">Our Work</a></li>
            <li><a href="resources.html">Resources</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div class="footer-nav-col">
          <h4 class="footer-nav-title">Legal &amp; Policy</h4>
          <ul class="footer-nav-list">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">POCSO Guidelines</a></li>
            <li><a href="#">Annual Report</a></li>
            <li><a href="contact.html">Volunteer With Us</a></li>
          </ul>
        </div>
        <div class="footer-nav-col">
          <h4 class="footer-nav-title">Contact Us</h4>
          <ul class="footer-nav-list">
            <li><a href="tel:1098">📞 Childline: 1098</a></li>
            <li><a href="tel:+917888801753">📱 +91-7888801753</a></li>
            <li><a href="mailto:eabsk2024@gmail.com">✉️ eabsk2024@gmail.com</a></li>
            <li><a href="https://www.instagram.com/ekawajbaalshoshan" target="_blank">📸 Instagram</a></li>
            <li><span style="color:var(--text-muted)">📍 Ludhiana, Punjab</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="container footer-bottom-inner">
      <span>© 2024 Ek Awaj Baal Shoshan Khilaf · Ludhiana, Punjab</span>
      <span class="footer-safe-note">🔐 Safe for children to access</span>
      <span>Registered NGO · POCSO Compliant</span>
    </div>
  </div>
</footer>`;

const QUICK_EXIT = `<button id="quick-exit" onclick="quickExit()" title="Quick Exit (Press ESC)">⚡ Quick Exit</button>`;
const TOAST      = `<div id="toast" class="toast" style="display:none;"></div>`;

function injectPartials() {
  document.body.insertAdjacentHTML('afterbegin', EMERGENCY_BAR + NAV);
  document.body.insertAdjacentHTML('beforeend', FOOTER + QUICK_EXIT + TOAST);
  const page = document.body.dataset.page;
  document.querySelectorAll('.nav-link[data-page]').forEach(a => {
    if (a.dataset.page === page) a.classList.add('active');
  });
}

injectPartials();

}); // end DOMContentLoaded
