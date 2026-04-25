// Starfield
(function () {
  const field = document.createElement('div');
  field.className = 'starfield';
  document.body.prepend(field);

  for (let i = 0; i < 90; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = (Math.random() * 1.8 + 0.4).toFixed(1);
    s.style.cssText = [
      `left:${(Math.random() * 100).toFixed(2)}%`,
      `top:${(Math.random() * 100).toFixed(2)}%`,
      `width:${size}px`,
      `height:${size}px`,
      `--dur:${(Math.random() * 4 + 3).toFixed(1)}s`,
      `--del:${(Math.random() * 7).toFixed(1)}s`,
      `--peak:${(Math.random() * 0.45 + 0.2).toFixed(2)}`
    ].join(';');
    field.appendChild(s);
  }
})();

// Tabs
const tabs   = document.querySelectorAll('.tab');
const slides = document.querySelectorAll('.slide');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    slides.forEach(s => s.classList.remove('active'));
    tab.classList.add('active');
    const target = document.getElementById(tab.dataset.target);
    if (target) target.classList.add('active');
  });
});

// Contact form — replace YOUR_FORMSPREE_ID after signing up at formspree.io
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORMSPREE_ID';

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn    = document.getElementById('submitBtn');
    const status = document.getElementById('formStatus');

    btn.disabled = true;
    btn.querySelector('.btn-text').textContent = 'Sending…';
    status.textContent = '';
    status.className = 'form-status';

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method:  'POST',
        body:    new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        status.textContent = 'Message sent — I\'ll be in touch soon.';
        status.className = 'form-status success';
        contactForm.reset();
      } else {
        throw new Error('server');
      }
    } catch {
      status.textContent = 'Something went wrong. Try emailing me directly.';
      status.className = 'form-status error';
    } finally {
      btn.disabled = false;
      btn.querySelector('.btn-text').textContent = 'Send Message';
    }
  });
}
