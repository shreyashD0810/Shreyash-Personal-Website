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

// ---- scroll progress bar ----
const progressBar = document.getElementById('scrollProgress');
if (progressBar) {
  const updateProgress = () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    progressBar.style.width = `${pct}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();
}

// ---- rotating status line in the hero pill ----
const statuses = [
  'Currently at HCLTech · Transamerica Account',
  'Currently untangling a stubborn SSIS package',
  'Currently: pipelines calm, coffee optional',
  'Currently reading Snowflake docs for fun',
];
const statusText = document.getElementById('statusText');
if (statusText) {
  let sIdx = 0;
  setInterval(() => {
    sIdx = (sIdx + 1) % statuses.length;
    statusText.style.transition = 'opacity .3s ease';
    statusText.style.opacity = 0;
    setTimeout(() => {
      statusText.textContent = statuses[sIdx];
      statusText.style.opacity = 1;
    }, 300);
  }, 4500);
}

// ---- count-up stats when scrolled into view ----
const statNums = document.querySelectorAll('.stat-num');
if ('IntersectionObserver' in window && statNums.length) {
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.target);
      const isDecimal = el.dataset.decimal === 'true';
      const duration = 1200;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        el.textContent = isDecimal ? value.toFixed(2) : Math.round(value);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = isDecimal ? target.toFixed(2) : target;
      }
      requestAnimationFrame(tick);
      statObserver.unobserve(el);
    });
  }, { threshold: 0.4 });
  statNums.forEach((el) => statObserver.observe(el));
}

// ---- gentle 3D tilt on project cards ----
const tiltCards = document.querySelectorAll('.project-card:not(.cta-card)');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -6;
      const rotateY = ((x / rect.width) - 0.5) * 6;
      card.style.transform = `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1400px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

// ---- witty footer, click to cycle ----
const footerFacts = [
  'fun fact: this site has no cliché stock photos',
  'fun fact: 8.68 CGPA, 0 all-nighters regretted',
  'fun fact: I debug faster with tea than coffee',
  'fun fact: the calm theme took longer than the loud one',
];
const footerBtn = document.getElementById('footerJoke');
const footerText = document.getElementById('footerJokeText');
if (footerBtn && footerText) {
  let fIdx = 0;
  footerBtn.addEventListener('click', () => {
    fIdx = (fIdx + 1) % footerFacts.length;
    footerText.textContent = footerFacts[fIdx];
  });
}
