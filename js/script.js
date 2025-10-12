// ==============================
// Navbar Shrink beim Scrollen
// ==============================
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('shrink');
  } else {
    navbar.classList.remove('shrink');
  }
});

// ==============================
// Smooth Scroll für interne Links
// ==============================
document.querySelectorAll('a.nav-link').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ==============================
// AOS (Animate on Scroll) Initialisierung
// ==============================
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 800,
    once: true
  });
}

// ==============================
// GLightbox Initialisierung für Carousels
// ==============================
const lightbox = GLightbox({
  selector: '.carousel .carousel-item img',
  touchNavigation: true,
  loop: true,
  zoomable: true,
  keyboardNavigation: true
});

// ==============================
// Hover-Effekte auf CTA-Buttons
// ==============================
document.querySelectorAll('.cta-btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => btn.style.transform = 'scale(1.05)');
  btn.addEventListener('mouseleave', () => btn.style.transform = 'scale(1)');
});
