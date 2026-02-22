/* ============================================
   NAVAA TEXTILES – JavaScript
   ============================================ */

/* --- NAVBAR SCROLL --- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* --- HAMBURGER MENU --- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

/* --- SCROLL REVEAL --- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* --- COUNTER ANIMATION --- */
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target.querySelector('.stat-number');
        if (el && !el.dataset.animated) {
          el.dataset.animated = 'true';
          animateCounter(el, parseInt(el.dataset.target));
        }
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.stat-card').forEach(card => counterObserver.observe(card));

/* --- HERO REVEAL STAGGER --- */
document.querySelectorAll('.hero-content .reveal').forEach((el, i) => {
  setTimeout(() => el.classList.add('visible'), 300 + i * 200);
});

/* --- CONTACT FORM --- */
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('contact-submit-btn');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  submitBtn.textContent = 'Sending…';
  submitBtn.style.opacity = '0.7';
  submitBtn.disabled = true;

  setTimeout(() => {
    submitBtn.textContent = '✦ Enquiry Sent!';
    submitBtn.style.opacity = '1';
    submitBtn.style.background = 'linear-gradient(135deg, #4caf83, #2e7d56)';
    contactForm.reset();

    setTimeout(() => {
      submitBtn.textContent = 'Send Enquiry';
      submitBtn.style.background = '';
      submitBtn.disabled = false;
    }, 4000);
  }, 1500);
});

/* --- NEWSLETTER FORM --- */
const newsletterForm = document.getElementById('newsletter-form');
const nlSubmit = document.getElementById('nl-submit');

newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('nl-email').value;
  if (!email) return;

  nlSubmit.textContent = '✦';
  setTimeout(() => {
    nlSubmit.textContent = 'Done!';
    newsletterForm.reset();
    setTimeout(() => { nlSubmit.textContent = 'Subscribe'; }, 3000);
  }, 1000);
});

/* --- SMOOTH PARALLAX ON HERO --- */
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
  if (window.scrollY < window.innerHeight) {
    heroBg.style.transform = `scale(1.05) translateY(${window.scrollY * 0.25}px)`;
  }
}, { passive: true });

/* --- LOOKBOOK IMAGE CURSOR GLOW EFFECT --- */
document.querySelectorAll('.lb-item').forEach(item => {
  item.addEventListener('mousemove', (e) => {
    const rect = item.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    item.style.setProperty('--mx', `${x}%`);
    item.style.setProperty('--my', `${y}%`);
  });
});
