// ---- reveal-on-scroll ----
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

// ---- sliding nav pill under the active section link ----
const navLinks = document.querySelectorAll('.nav-links a');
const navPill = document.getElementById('navPill');
const navSections = document.querySelectorAll('main section[id]');

function movePill(link) {
  if (!navPill || !link) return;
  const parentRect = link.parentElement.getBoundingClientRect();
  const rect = link.getBoundingClientRect();
  navPill.style.left = `${rect.left - parentRect.left}px`;
  navPill.style.width = `${rect.width}px`;
  navPill.style.opacity = '1';
}

if (navLinks.length && navSections.length && 'IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const match = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (match) movePill(match);
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  navSections.forEach((section) => navObserver.observe(section));
}

navLinks.forEach((link) => {
  link.addEventListener('mouseenter', () => movePill(link));
});
document.querySelector('.nav-links')?.addEventListener('mouseleave', () => {
  const activeId = [...navSections].find((s) => {
    const r = s.getBoundingClientRect();
    return r.top < window.innerHeight * 0.5 && r.bottom > window.innerHeight * 0.5;
  });
  const match = activeId && document.querySelector(`.nav-links a[href="#${activeId.id}"]`);
  if (match) movePill(match);
});

// ---- the ambient river: sized to the page, drawn in as you scroll ----
(function () {
  const wrap = document.querySelector('.river-wrap');
  const path = document.getElementById('riverPath');
  if (!wrap || !path) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let length = 0;

  function sizeRiver() {
    wrap.style.height = `${document.documentElement.scrollHeight}px`;
    length = path.getTotalLength();
    if (prefersReduced) {
      path.style.strokeDasharray = 'none';
      path.style.strokeDashoffset = '0';
    } else {
      path.style.strokeDasharray = `${length}`;
      updateDash();
    }
  }

  function updateDash() {
    if (prefersReduced) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
    // ease the reveal slightly ahead of the reader
    const eased = Math.min(progress * 1.15, 1);
    path.style.strokeDashoffset = `${length * (1 - eased)}`;
  }

  window.addEventListener('scroll', updateDash, { passive: true });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(sizeRiver, 200);
  });

  // give layout a moment to settle (fonts, images) before measuring
  window.addEventListener('load', sizeRiver);
  setTimeout(sizeRiver, 300);
})();
