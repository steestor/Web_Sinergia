document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  var overlay = document.getElementById('navOverlay');

  function closeMenu() {
    toggle.classList.remove('is-open');
    nav.classList.remove('is-open');
    overlay.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function openMenu() {
    toggle.classList.add('is-open');
    nav.classList.add('is-open');
    overlay.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  toggle.addEventListener('click', function () {
    if (nav.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener('click', closeMenu);

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });

  // Marca como activo el enlace de navegación de la sección visible
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.main-nav a');

  if ('IntersectionObserver' in window && sections.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px' });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // Revela con una animación suave los bloques marcados con data-reveal.
  // La clase js-reveal solo se activa aquí: si algo falla más abajo, el
  // contenido se queda visible por defecto (nunca oculto sin salvavidas).
  var revealEls = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window && revealEls.length) {
    document.documentElement.classList.add('js-reveal');

    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });

    // Salvavidas: si algo impide que el observer dispare (fallo en un
    // plugin de WordPress, etc.), el contenido se revela igualmente.
    window.setTimeout(function () {
      revealEls.forEach(function (el) {
        el.classList.add('is-visible');
      });
    }, 4000);
  }

  // Pestañas genéricas: cada grupo [data-tabs] controla sus propios
  // botones .tabs-btn y paneles .tabs-panel a través de data-tab-target.
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    var buttons = group.querySelectorAll('.tabs-btn');
    var panels = group.querySelectorAll('.tabs-panel');

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-tab-target');

        buttons.forEach(function (b) {
          var active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-selected', active ? 'true' : 'false');
        });

        panels.forEach(function (panel) {
          panel.classList.toggle('is-active', '#' + panel.id === target);
        });
      });
    });
  });

  // Filtro de categorías del blog: al pulsar una categoría se muestran
  // solo los artículos con la misma categoría (data-category).
  var categoryCards = document.querySelectorAll('[data-filter-category]');
  var articleCards = document.querySelectorAll('[data-article-category]');
  var filterStatus = document.querySelector('.blog-filter-status');
  var filterStatusLabel = document.querySelector('.blog-filter-status strong');
  var filterReset = document.querySelector('.blog-filter-status button');
  var blogEmpty = document.querySelector('.blog-empty');

  function applyBlogFilter(category, label) {
    var visibleCount = 0;

    articleCards.forEach(function (card) {
      var match = !category || card.getAttribute('data-article-category') === category;
      card.style.display = match ? '' : 'none';
      if (match) { visibleCount++; }
    });

    categoryCards.forEach(function (card) {
      card.classList.toggle('is-active', category && card.getAttribute('data-filter-category') === category);
    });

    if (filterStatus) {
      filterStatus.classList.toggle('is-active', Boolean(category));
      if (filterStatusLabel) { filterStatusLabel.textContent = label || ''; }
    }

    if (blogEmpty) {
      blogEmpty.classList.toggle('is-active', category && visibleCount === 0);
    }
  }

  categoryCards.forEach(function (card) {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');

    function toggleCategory() {
      var isActive = card.classList.contains('is-active');
      var category = card.getAttribute('data-filter-category');
      var label = card.querySelector('h3') ? card.querySelector('h3').textContent : '';
      applyBlogFilter(isActive ? null : category, label);
    }

    card.addEventListener('click', toggleCategory);
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleCategory();
      }
    });
  });

  if (filterReset) {
    filterReset.addEventListener('click', function () {
      applyBlogFilter(null, '');
    });
  }
});
