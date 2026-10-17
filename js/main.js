// Sandip Dhakal Portfolio - Main JavaScript
// Lightweight, no source maps, no dependencies

(function () {
  'use strict';

  // Timezone Year Calculation
  function updateNepalYear() {
    try {
      var formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kathmandu',
        year: 'numeric'
      });
      var yearSpan = document.getElementById('nepal-year');
      if (yearSpan) {
        yearSpan.textContent = formatter.format(new Date());
      }
    } catch (err) {
      var yearSpan = document.getElementById('nepal-year');
      if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
      }
    }
  }
  updateNepalYear();

  // Theme Toggle
  var themeBtn = document.getElementById('theme-toggle');
  var svgMoon = document.getElementById('svg-moon');
  var svgSun = document.getElementById('svg-sun');
  var themeText = document.getElementById('theme-text');

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
    } catch (e) { /* private browsing */ }
    syncToggleUI(theme);
  }

  var currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  syncToggleUI(currentTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var activeTheme = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(activeTheme === 'dark' ? 'light' : 'dark');
    });
  }

  // Top Scroll Progress Bar
  var scrollProgressBar = document.getElementById('scroll-progress');
  function updateScrollProgress() {
    if (!scrollProgressBar) return;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    scrollProgressBar.style.width = Math.min(100, Math.max(0, progress)) + '%';
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // Back to Top Button
  var backToTopBtn = document.getElementById('back-to-top');

  function handleBackToTop() {
    if (!backToTopBtn) return;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleBackToTop, { passive: true });
  handleBackToTop();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Spotlight Cursor Tracking
  var spotlightCards = document.querySelectorAll('.spotlight-card');
  for (var i = 0; i < spotlightCards.length; i++) {
    (function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
        card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
      });
    })(spotlightCards[i]);
  }

  // Interactive Syllabus Accordion
  var accordionItems = document.querySelectorAll('#curriculumAccordion .accordion-item');
  for (var j = 0; j < accordionItems.length; j++) {
    (function (item) {
      var header = item.querySelector('.accordion-header');
      if (!header) return;
      header.addEventListener('click', function () {
        var isActive = item.classList.contains('active');
        for (var k = 0; k < accordionItems.length; k++) {
          if (accordionItems[k] !== item && accordionItems[k].classList.contains('active')) {
            accordionItems[k].classList.remove('active');
            var otherBtn = accordionItems[k].querySelector('.accordion-header');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        }
        if (isActive) {
          item.classList.remove('active');
          header.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          header.setAttribute('aria-expanded', 'true');
        }
      });
    })(accordionItems[j]);
  }

  // Scroll Reveal
  var revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      for (var r = 0; r < entries.length; r++) {
        if (entries[r].isIntersecting) {
          entries[r].target.classList.add('is-revealed');
          observer.unobserve(entries[r].target);
        }
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    for (var m = 0; m < revealElements.length; m++) {
      revealObserver.observe(revealElements[m]);
    }
  } else {
    for (var n = 0; n < revealElements.length; n++) {
      revealElements[n].classList.add('is-revealed');
    }
  }

  // Hero Avatar 3D Tilt (only on home page)
  var avatarContainer = document.getElementById('avatarContainer');
  var avatarPhoto = document.getElementById('avatarPhoto');
  if (avatarContainer && avatarPhoto) {
    avatarContainer.addEventListener('mousemove', function (e) {
      var rect = avatarContainer.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;
      var rotateX = ((y - centerY) / centerY) * -10;
      var rotateY = ((x - centerX) / centerX) * 10;
      avatarPhoto.style.transform = 'perspective(600px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.02, 1.02, 1.02)';
    });
    avatarContainer.addEventListener('mouseleave', function () {
      avatarPhoto.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // Curved Photo Canvas Orbit (only on home page)
  var canvas = document.getElementById('curveCanvas');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var angle = 0;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var cx = canvas.width / 2;
      var cy = canvas.height / 2;
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle * 0.006);
      ctx.beginPath();
      ctx.arc(0, 0, 96, 0.2, Math.PI * 1.5);
      ctx.strokeStyle = isDark ? 'rgba(16, 185, 129, 0.4)' : 'rgba(13, 110, 79, 0.25)';
      ctx.lineWidth = 1.6;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(96, 0, 3.8, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? '#34d399' : '#0d6e4f';
      if (isDark) {
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 8;
      }
      ctx.fill();
      ctx.restore();
      angle += 1;
      requestAnimationFrame(draw);
    }
    draw();
  }

  // Mobile Menu Toggle Logic
  var mobileMenuBtn = document.getElementById('mobile-menu-btn');
  var navActions = document.querySelector('.nav-actions');
  var mainNav = document.querySelector('nav[aria-label="Main navigation"]');

  if (mobileMenuBtn && navActions) {
    function setMobileMenu(open) {
      if (open) {
        navActions.classList.add('is-open');
        mobileMenuBtn.classList.add('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        mobileMenuBtn.setAttribute('aria-label', 'Close navigation menu');
      } else {
        navActions.classList.remove('is-open');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.setAttribute('aria-label', 'Open navigation menu');
      }
    }

    mobileMenuBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var willOpen = !navActions.classList.contains('is-open');
      setMobileMenu(willOpen);
    });

    if (mainNav) {
      var navLinks = mainNav.querySelectorAll('a');
      for (var l = 0; l < navLinks.length; l++) {
        navLinks[l].addEventListener('click', function () {
          setMobileMenu(false);
        });
      }
    }

    document.addEventListener('click', function (e) {
      if (navActions.classList.contains('is-open') && !navActions.contains(e.target)) {
        setMobileMenu(false);
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navActions.classList.contains('is-open')) {
        setMobileMenu(false);
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 768 && navActions.classList.contains('is-open')) {
        setMobileMenu(false);
      }
    }, { passive: true });
  }

})();
