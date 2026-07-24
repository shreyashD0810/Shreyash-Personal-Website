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

// ---- witty rotating status line in the hero ----
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
