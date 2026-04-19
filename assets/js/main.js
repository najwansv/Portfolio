(function () {
  'use strict';

  // ===== CURSOR GLOW =====
  const cursorGlow = document.getElementById('cursor-glow');
  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Portfolio card mouse gradient
    const card = e.target.closest('.portfolio-wrap');
    if (card) {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
    }
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    if (cursorGlow) {
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
    }
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  // ===== TYPING EFFECT =====
  const typedEl = document.getElementById('typed-text');
  const phrases = [
    'End to End AI Engineer',
    'Computer Vision Specialist',
    'IoT Systems Architect',
    'Embedded Systems Developer',
    'Data Analyst'
  ];
  let phraseIdx = 0, charIdx = 0, deleting = false;

  function typeLoop() {
    if (!typedEl) return;
    const current = phrases[phraseIdx];
    if (!deleting) {
      typedEl.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
      setTimeout(typeLoop, 60);
    } else {
      typedEl.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(typeLoop, 300);
        return;
      }
      setTimeout(typeLoop, 35);
    }
  }
  setTimeout(typeLoop, 800);

  // ===== SCROLL REVEAL =====
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // ===== TILT EFFECT ON PORTFOLIO CARDS =====
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -6;
      const rotY = ((x - cx) / cx) * 6;
      card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    });
  });

  // ===== NAVBAR ACTIVE LINK ON SCROLL =====
  const navLinks = document.querySelectorAll('#navbar .scrollto');
  const sections = document.querySelectorAll('section[id], div[id]');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      if (
        scrollPos >= section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + section.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('.scrollto').forEach(link => {
    link.addEventListener('click', function (e) {
      const hash = this.getAttribute('href');
      if (hash && hash.startsWith('#')) {
        const target = document.querySelector(hash);
        if (target) {
          e.preventDefault();
          const header = document.getElementById('header');
          const offset = header ? header.offsetHeight + 20 : 80;
          window.scrollTo({
            top: target.offsetTop - offset,
            behavior: 'smooth'
          });
          // Close mobile nav
          const nav = document.getElementById('navbar');
          const tog = document.querySelector('.mobile-nav-toggle');
          nav.classList.remove('navbar-mobile');
          if (tog) { tog.classList.add('bi-list'); tog.classList.remove('bi-x'); }
        }
      }
    });
  });

  // ===== MOBILE NAV TOGGLE =====
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navbar = document.getElementById('navbar');
  if (mobileToggle && navbar) {
    mobileToggle.addEventListener('click', () => {
      navbar.classList.toggle('navbar-mobile');
      mobileToggle.classList.toggle('bi-list');
      mobileToggle.classList.toggle('bi-x');
    });
  }

  // ===== BACK TO TOP =====
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    if (backToTop) {
      backToTop.classList.toggle('active', window.scrollY > 200);
    }
  });

  // ===== ISOTOPE PORTFOLIO FILTER =====
  window.addEventListener('load', () => {
    const portfolioContainer = document.querySelector('.portfolio-container');
    if (portfolioContainer && typeof Isotope !== 'undefined') {
      const iso = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      document.querySelectorAll('#portfolio-flters li').forEach(btn => {
        btn.addEventListener('click', function () {
          document.querySelectorAll('#portfolio-flters li').forEach(b => b.classList.remove('filter-active'));
          this.classList.add('filter-active');
          iso.arrange({ filter: this.getAttribute('data-filter') });
        });
      });
    }

    // GLightbox
    if (typeof GLightbox !== 'undefined') {
      GLightbox({ selector: '.portfolio-lightbox' });
    }

    // PureCounter
    if (typeof PureCounter !== 'undefined') {
      new PureCounter();
    }
  });

  // ===== HERO PARALLAX ORBS ON MOUSE =====
  const heroBg = document.querySelector('#hero');
  document.addEventListener('mousemove', (e) => {
    if (!heroBg) return;
    const rect = heroBg.getBoundingClientRect();
    if (e.clientY > rect.bottom) return;
    const xPct = (e.clientX / window.innerWidth - 0.5) * 20;
    const yPct = (e.clientY / window.innerHeight - 0.5) * 10;
    heroBg.style.setProperty('--px', xPct + 'px');
    heroBg.style.setProperty('--py', yPct + 'px');
  });

})();
