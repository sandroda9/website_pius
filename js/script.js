// --- Navbar Collapse Mobile ---
document.addEventListener('DOMContentLoaded', function () {
  var navbarCollapse = document.getElementById('navbarNav');
  if (!navbarCollapse) return;

  var navLinks = navbarCollapse.querySelectorAll('.nav-link');
  var toggler = document.querySelector('.navbar-toggler');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (toggler && window.getComputedStyle(toggler).display !== 'none') {
        var collapseInstance = bootstrap.Collapse.getInstance(navbarCollapse);
        if (!collapseInstance) {
          collapseInstance = new bootstrap.Collapse(navbarCollapse, { toggle: false });
        }
        collapseInstance.hide();
      }
    });
  });
});

// --- Consent Mode (Basic) + Banner/Modal Logik ---
// GA-ID hier einmalig definieren
const GA_MEASUREMENT_ID = 'G-3P55CB7ZWP';
const CONSENT_KEY = 'cookieConsentV1';

function gtag(){ window.dataLayer = window.dataLayer || []; window.dataLayer.push(arguments); }

// GA4 erst nach Einwilligung laden (Basic-Mode)
function loadGA4() {
  if (document.getElementById('ga4-src')) return; // doppelt vermeiden
  const s = document.createElement('script');
  s.id = 'ga4-src';
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(s);
  s.onload = function(){
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
  };
}

// gespeicherte Entscheidung anwenden (vor Banneranzeige)
function applyStoredConsent() {
  try {
    const s = JSON.parse(localStorage.getItem(CONSENT_KEY));
    if (!s) return;
    // Consent-Status an Google melden
    gtag('consent', 'update', {
      analytics_storage: s.analytics ? 'granted' : 'denied'
    });
    // Bei Zustimmung GA laden
    if (s.analytics) loadGA4();
  } catch(e){}
}

// UI-Helfer
function openCookieModal() {
  const modal = document.getElementById('cookie-modal');
  const s = JSON.parse(localStorage.getItem(CONSENT_KEY) || '{}');
  const opt = document.getElementById('opt-analytics');
  if (opt) opt.checked = !!s.analytics;
  if (modal) modal.style.display = 'flex';
}
function closeCookieModal() {
  const modal = document.getElementById('cookie-modal');
  if (modal) modal.style.display = 'none';
}

window.addEventListener('DOMContentLoaded', function() {
  // vorhandene Entscheidung anwenden
  applyStoredConsent();

  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('accept-cookies');
  const declineBtn = document.getElementById('decline-cookies');
  const linkInline = document.getElementById('cookie-settings-link-inline');
  const linkFooter = document.getElementById('cookie-settings-link-footer');
  const btnSave = document.getElementById('btn-save-modal');
  const btnCancel = document.getElementById('btn-cancel-modal');

  // Banner anzeigen, wenn noch keine Entscheidung
  if (banner && !localStorage.getItem(CONSENT_KEY)) {
    banner.style.display = 'block';
  }

  if (acceptBtn) acceptBtn.addEventListener('click', function() {
    // Consent aktualisieren (analytics = granted)
    gtag('consent', 'update', { analytics_storage: 'granted' });
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics: true, ts: Date.now() }));
    loadGA4();
    banner.style.display = 'none';
  });

  if (declineBtn) declineBtn.addEventListener('click', function() {
    gtag('consent', 'update', { analytics_storage: 'denied' });
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics: false, ts: Date.now() }));
    banner.style.display = 'none';
  });

  function attachSettingsLink(el) {
    if (!el) return;
    el.addEventListener('click', function(e){
      e.preventDefault();
      openCookieModal();
    });
  }
  attachSettingsLink(linkInline);
  attachSettingsLink(linkFooter);

  if (btnSave) btnSave.addEventListener('click', function(){
    const allow = !!document.getElementById('opt-analytics')?.checked;
    gtag('consent', 'update', { analytics_storage: allow ? 'granted' : 'denied' });
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics: allow, ts: Date.now() }));
    if (allow) loadGA4();
    closeCookieModal();
  });

  if (btnCancel) btnCancel.addEventListener('click', function(){
    closeCookieModal();
  });
});