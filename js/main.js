// Timezone Year Calculation
function updateNepalYear() {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kathmandu',
      year: 'numeric'
    });
    const yearSpan = document.getElementById('nepal-year');
    if (yearSpan) {
      yearSpan.textContent = formatter.format(new Date());
    }
  } catch (err) {
    const yearSpan = document.getElementById('nepal-year');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  }
}
updateNepalYear();

// Theme Toggle
const themeBtn = document.getElementById('theme-toggle');
const svgMoon = document.getElementById('svg-moon');
const svgSun = document.getElementById('svg-sun');
const themeText = document.getElementById('theme-text');

function syncToggleUI(theme) {
  if (!svgMoon || !svgSun || !themeText || !themeBtn) return;
  if (theme === 'dark') {
    svgMoon.style.display = 'none';
    svgSun.style.display = 'inline';
    themeText.textContent = 'Light';
    themeBtn.setAttribute('title', 'Switch to Light Mode');
  } else {
    svgMoon.style.display = 'inline';
    svgSun.style.display = 'none';
    themeText.textContent = 'Dark';
    themeBtn.setAttribute('title', 'Switch to Night Mode');
  }
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem('sandip-portfolio-theme', theme);
  } catch (e) {}
  syncToggleUI(theme);
}

const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
syncToggleUI(currentTheme);

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(activeTheme === 'dark' ? 'light' : 'dark');
  });
}

// Top Scroll Progress Bar
const scrollProgressBar = document.getElementById('scroll-progress');
function updateScrollProgress() {
  if (!scrollProgressBar) return;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  scrollProgressBar.style.width = Math.min(100, Math.max(0, progress)) + '%';
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });
window.addEventListener('resize', updateScrollProgress, { passive: true });
updateScrollProgress();

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');
const teachingSection = document.getElementById('teaching');

function handleBackToTop() {
  if (!backToTopBtn || !teachingSection) return;
  const teachingTop = teachingSection.getBoundingClientRect().top;
  if (teachingTop <= window.innerHeight * 0.75) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}

window.addEventListener('scroll', handleBackToTop, { passive: true });
window.addEventListener('resize', handleBackToTop, { passive: true });
handleBackToTop();

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Spotlight Cursor Tracking
const spotlightCards = document.querySelectorAll('.spotlight-card');
spotlightCards.forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

// Interactive Syllabus Accordion
const accordionItems = document.querySelectorAll('#curriculumAccordion .accordion-item');
accordionItems.forEach((item) => {
  const header = item.querySelector('.accordion-header');
  if (!header) return;

  header.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    accordionItems.forEach((other) => {
      if (other !== item && other.classList.contains('active')) {
        other.classList.remove('active');
        const otherBtn = other.querySelector('.accordion-header');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      }
    });

    if (isActive) {
      item.classList.remove('active');
      header.setAttribute('aria-expanded', 'false');
    } else {
      item.classList.add('active');
      header.setAttribute('aria-expanded', 'true');
    }
  });
});

// Scroll Reveal
const revealElements = document.querySelectorAll('.reveal-on-scroll');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    }
  );

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });
} else {
  revealElements.forEach((el) => {
    el.classList.add('is-revealed');
  });
}

// Hero Avatar 3D Tilt
const avatarContainer = document.getElementById('avatarContainer');
const avatarPhoto = document.getElementById('avatarPhoto');
if (avatarContainer && avatarPhoto) {
  avatarContainer.addEventListener('mousemove', (e) => {
    const rect = avatarContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    avatarPhoto.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  avatarContainer.addEventListener('mouseleave', () => {
    avatarPhoto.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
}

// Curved Photo Canvas Orbit
(function () {
  const canvas = document.getElementById('curveCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let angle = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle * 0.006);

    ctx.beginPath();
    ctx.arc(0, 0, 96, 0.2, Math.PI * 1.5);
    ctx.strokeStyle = isDark ? 'rgba(245, 158, 11, 0.4)' : 'rgba(180, 83, 9, 0.25)';
    ctx.lineWidth = 1.6;
    ctx.setLineDash([5, 5]);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(96, 0, 3.8, 0, Math.PI * 2);
    ctx.fillStyle = isDark ? '#fbbf24' : '#b45309';
    if (isDark) {
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 8;
    }
    ctx.fill();
    ctx.restore();

    angle += 1;
    requestAnimationFrame(draw);
  }
  draw();
})();
