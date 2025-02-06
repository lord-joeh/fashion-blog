document.addEventListener('DOMContentLoaded', function () {
  const readPostButtons = document.querySelectorAll('.btn-primary');

  readPostButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const article = this.closest('article');
      const paragraphs = article.querySelectorAll('.post-info');
      const isHidden = paragraphs[0].hidden; 

      paragraphs.forEach((p) => {
        p.hidden = !isHidden;
      });

      this.textContent = isHidden ? 'Collapse post' : 'Read post';

      if (isHidden) {
        article.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
});

const lazyLoader = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      lazyLoader.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach((img) => {
  lazyLoader.observe(img);
});

document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menuToggle');
  const navCollapse = document.querySelector('.nav-collapse');

  menuToggle.addEventListener('click', function () {
    // Toggle active class on both elements
    this.classList.toggle('active');
    navCollapse.classList.toggle('active');

    // Close menu when clicking outside
    if (this.classList.contains('active')) {
      document.addEventListener('click', closeMenuOnClickOutside);
    } else {
      document.removeEventListener('click', closeMenuOnClickOutside);
    }
  });

  function closeMenuOnClickOutside(e) {
    if (!menuToggle.contains(e.target) && !navCollapse.contains(e.target)) {
      menuToggle.classList.remove('active');
      navCollapse.classList.remove('active');
      document.removeEventListener('click', closeMenuOnClickOutside);
    }
  }

  // Close menu when a link is clicked
  navCollapse.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      menuToggle.classList.remove('active');
      this.classList.remove('active');
    }
  });
});
