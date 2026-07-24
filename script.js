// Highlight the active "tab" in the nav based on scroll position
const sections = document.querySelectorAll('main section[id]');
const tabs = document.querySelectorAll('.tab');

const setActive = (id) => {
  tabs.forEach(t => {
    t.classList.toggle('active', t.getAttribute('href') === `#${id}`);
  });
};

if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

  sections.forEach(section => observer.observe(section));
}

// ---- ambient background: a slow-drifting data-node network ----
(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let w, h, nodes, dpr;
  const COLORS = ['#D9AE52', '#A6AEBB', '#C17A4E'];
  const LINK_DIST = 150;

  function sizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth = window.innerWidth;
    h = canvas.clientHeight = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makeNodes() {
    const density = Math.max(24, Math.min(70, Math.floor((w * h) / 26000)));
    nodes = Array.from({ length: density }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.4 + 0.6,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
  }

  function step() {
    ctx.clearRect(0, 0, w, h);

    // links between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          ctx.strokeStyle = `rgba(140,150,165,${0.10 * (1 - dist / LINK_DIST)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // nodes
    nodes.forEach((n) => {
      ctx.beginPath();
      ctx.fillStyle = n.c + '55';
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();

      if (!prefersReduced) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
    });

    if (!prefersReduced) requestAnimationFrame(step);
  }

  function init() {
    sizeCanvas();
    makeNodes();
    step();
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(init, 200);
  });

  init();
})();
const statuses = [
  'status: pipelines green, coffee low',
  'status: 200 OK, mentally 404',
  'status: one query away from a breakthrough',
  'status: currently normalizing something that did not need it',
  'status: compiling excuses for the SSIS package',
];
const statusText = document.getElementById('statusText');
if (statusText) {
  let i = 0;
  setInterval(() => {
    i = (i + 1) % statuses.length;
    statusText.style.opacity = 0;
    setTimeout(() => {
      statusText.textContent = statuses[i];
      statusText.style.opacity = 1;
    }, 250);
  }, 4200);
}

// ---- profile.json titlebar dots: click to re-run and joke about status ----
const jsonStatuses = [
  '"open_to_data_engineering_roles"',
  '"probably_debugging_something"',
  '"send_coffee_not_meetings"',
  '"query_optimized_ego_unoptimized"',
];
const configDots = document.getElementById('configDots');
const jsonStatus = document.getElementById('jsonStatus');
if (configDots && jsonStatus) {
  let j = 0;
  configDots.addEventListener('click', () => {
    j = (j + 1) % jsonStatuses.length;
    jsonStatus.textContent = jsonStatuses[j];
  });
}

// ---- decorative GitHub-style activity heatmap (purely for looks) ----
const heatmapGrid = document.getElementById('heatmapGrid');
if (heatmapGrid) {
  const weeks = 18, days = 7;
  let html = '';
  for (let w = 0; w < weeks; w++) {
    html += '<div class="heatmap-col">';
    for (let d = 0; d < days; d++) {
      const level = Math.floor(Math.random() * 5);
      html += `<span class="heatmap-cell" data-level="${level}"></span>`;
    }
    html += '</div>';
  }
  heatmapGrid.innerHTML = html;
}
