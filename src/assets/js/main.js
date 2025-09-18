document.querySelectorAll('.menu a').forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});
