document.addEventListener('DOMContentLoaded', function () {
  // ID deiner Collapse-Box (kommt aus deinem HTML: id="navbarNav")
  var navbarCollapse = document.getElementById('navbarNav');
  if (!navbarCollapse) return;

  // Alle Links innerhalb des zusammenklappbaren Menüs
  var navLinks = navbarCollapse.querySelectorAll('.nav-link');

  // Der Toggle-Button (um zu prüfen, ob wir auf Mobile sind)
  var toggler = document.querySelector('.navbar-toggler');

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      // Wenn der Toggler sichtbar ist (also Mobile), dann schliessen
      if (toggler && window.getComputedStyle(toggler).display !== 'none') {
        // Hole bestehende Collapse-Instanz oder erzeuge eine neue
        var collapseInstance = bootstrap.Collapse.getInstance(navbarCollapse);
        if (!collapseInstance) {
          collapseInstance = new bootstrap.Collapse(navbarCollapse, { toggle: false });
        }
        collapseInstance.hide();
      }
    });
  });
});
