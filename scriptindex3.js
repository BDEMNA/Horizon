/* ==========================================================================
   HORIZON – JS global
   Fonctions : fade-in, formulaire, toast, CTA mobile, scroll progress,
   retour en haut, menu burger, lazy loading, accessibilité, dark mode
   ========================================================================== */

// -----------------------------
// Fade-in au scroll
// -----------------------------
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-section').forEach(el => observer.observe(el));

// -----------------------------
// Validation avancée du formulaire
// -----------------------------
const form = document.querySelector('#contact form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name');
    const phone = form.querySelector('#phone');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');

    let valid = true;

    // Vérification nom et message
    [name, message].forEach(input => {
      if (!input.value.trim()) {
        input.parentElement.classList.add('error');
        valid = false;
      } else {
        input.parentElement.classList.remove('error');
        input.parentElement.classList.add('success');
      }
    });

    // Vérification email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.parentElement.classList.add('error');
      valid = false;
    } else {
      email.parentElement.classList.remove('error');
      email.parentElement.classList.add('success');
    }

    // Vérification téléphone
    if (!/^[0-9+\s-]{6,15}$/.test(phone.value)) {
      phone.parentElement.classList.add('error');
      valid = false;
    } else {
      phone.parentElement.classList.remove('error');
      phone.parentElement.classList.add('success');
    }

    if (valid) {
      showToast("✅ Merci ! Votre demande a bien été envoyée.");
      form.reset();
      form.querySelectorAll('.success').forEach(el => el.classList.remove('success'));
    } else {
      showToast("⚠️ Merci de remplir correctement tous les champs.");
    }
  });
}

// -----------------------------
// Toast notification
// -----------------------------
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(10px)';
  }, 2500);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}

// -----------------------------
// CTA fixe sur mobile
// -----------------------------
function handleFixedCTA() {
  const cta = document.querySelector('.fixed-cta');
  if (!cta) return;
  cta.style.display = (window.innerWidth <= 420) ? 'flex' : 'none';
}
window.addEventListener('resize', handleFixedCTA);
window.addEventListener('load', handleFixedCTA);

// -----------------------------
// Barre de progression au scroll
// -----------------------------
const progressBar = document.querySelector('.scroll-progress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + "%";
  });
}

// -----------------------------
// Bouton retour en haut
// -----------------------------
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// -----------------------------
// Menu burger responsive
// -----------------------------
const burger = document.querySelector('.burger');
const nav = document.querySelector('.header-actions');
if (burger && nav) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('open');
    burger.classList.toggle('active');
  });
}

// -----------------------------
// Lazy loading des images
// -----------------------------
const lazyImages = document.querySelectorAll('img[data-src]');
if ('IntersectionObserver' in window) {
  const lazyObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        obs.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => lazyObserver.observe(img));
}

// -----------------------------
// Accessibilité : focus visible
// -----------------------------
document.body.addEventListener('keyup', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing');
  }
});

// -----------------------------
// Mode sombre auto (préférence système)
// -----------------------------
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark-mode');
}
