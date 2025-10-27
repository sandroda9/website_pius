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

// --- DSGVO-konformer Cookie-Banner mit Google Analytics ---
function loadAnalytics() {
  const gtagScript = document.createElement('script');
  gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-3P55CB7ZWP";
  gtagScript.async = true;
  document.head.appendChild(gtagScript);

  gtagScript.onload = function() {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-3P55CB7ZWP');
  };
}

window.addEventListener('load', function() {
  const consent = localStorage.getItem('cookie_consent');
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;

  // Wenn bereits Zustimmung erteilt wurde
  if (consent === 'accepted') {
    loadAnalytics();
    banner.style.display = 'none';
  } 
  // Wenn abgelehnt wurde
  else if (consent === 'declined') {
    banner.style.display = 'none';
  } 
  // Wenn keine Entscheidung getroffen wurde → Banner anzeigen
  else {
    banner.style.display = 'block';
  }

  // Buttons verknüpfen
  const acceptBtn = document.getElementById('accept-cookies');
  const declineBtn = document.getElementById('decline-cookies');

  if (acceptBtn) {
    acceptBtn.addEventListener('click', function() {
      localStorage.setItem('cookie_consent', 'accepted');
      loadAnalytics();
      banner.style.display = 'none';
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', function() {
      localStorage.setItem('cookie_consent', 'declined');
      banner.style.display = 'none';
    });
  }
});
