// Scroll reveal (hidden state is gated behind the .js class set in <head>)
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('.reveal');
if (reduced || !('IntersectionObserver' in window)) {
  revealEls.forEach(el => el.classList.add('in'));
} else {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  revealEls.forEach(el => io.observe(el));
}

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
let lastTrigger = null;
let lockedScrollY = 0;

function openLightbox(src, alt, trigger) {
  lastTrigger = trigger;
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  lightbox.hidden = false;
  // fixed-position body lock (body overflow alone is ignored by iOS Safari)
  lockedScrollY = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${lockedScrollY}px`;
  document.body.style.width = '100%';
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImg.src = '';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  const html = document.documentElement;
  const prevBehavior = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';
  window.scrollTo(0, lockedScrollY);
  html.style.scrollBehavior = prevBehavior;
  if (lastTrigger) lastTrigger.focus();
}

document.querySelectorAll('.zoom').forEach(btn => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img');
    openLightbox(btn.dataset.full, img ? img.alt : '', btn);
  });
});

lightbox.addEventListener('click', closeLightbox);
lightboxClose.addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => {
  if (lightbox.hidden) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'Tab') { e.preventDefault(); lightboxClose.focus(); }
});

// Year
document.getElementById('year').textContent = new Date().getFullYear();
