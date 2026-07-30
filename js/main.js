// ===================== Config =====================
const WHATSAPP_NUMBER = '966548823582'; // 054 882 3582

function waLink(message) {
  const text = encodeURIComponent(message || 'السلام عليكم، أرغب بالاستفسار عن رحلات العمرة من الرياض.');
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

// Apply WhatsApp links to every element with data-wa-msg (or default message)
document.querySelectorAll('[data-wa]').forEach((el) => {
  const msg = el.getAttribute('data-wa-msg');
  el.setAttribute('href', waLink(msg));
  el.setAttribute('target', '_blank');
  el.setAttribute('rel', 'noopener');
});

// ===================== Hero Background Slideshow =====================
const heroSlides = document.querySelectorAll('.hero-slide');
if (heroSlides.length > 1) {
  let activeSlide = 0;
  setInterval(() => {
    heroSlides[activeSlide].classList.remove('active');
    activeSlide = (activeSlide + 1) % heroSlides.length;
    heroSlides[activeSlide].classList.add('active');
  }, 5000);
}

// ===================== Mobile Menu =====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('mobile-open');
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('mobile-open');
    });
  });
}

// ===================== Active Nav Link on Scroll =====================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

function setActiveLink() {
  let current = '';
  const scrollY = window.pageYOffset;
  sections.forEach((section) => {
    const top = section.offsetTop - 130;
    const height = section.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}
window.addEventListener('scroll', setActiveLink);

// ===================== Header Shadow + Back to Top =====================
const header = document.getElementById('siteHeader');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (header) header.style.boxShadow = y > 10 ? '0 4px 24px rgba(0,0,0,0.1)' : '0 2px 20px rgba(0,0,0,0.06)';
  if (backToTop) backToTop.classList.toggle('show', y > 500);
});

if (backToTop) {
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ===================== FAQ Accordion =====================
document.querySelectorAll('.faq-item').forEach((item) => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('active'));
    if (!isActive) item.classList.add('active');
  });
});

// ===================== Reveal on Scroll =====================
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => revealObserver.observe(el));

// ===================== Footer Year =====================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
