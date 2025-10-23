<script>
document.querySelectorAll('.navbar-collapse a').forEach(function(navLink) {
  navLink.addEventListener('click', function() {
    const navbar = document.querySelector('.navbar-collapse');
    if (navbar.classList.contains('show')) {
      const bsCollapse = new bootstrap.Collapse(navbar, { toggle: true });
    }
  });
});
</script>
