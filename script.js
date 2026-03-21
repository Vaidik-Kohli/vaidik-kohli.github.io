// ── Cursor glow ──────────────────────────────────────
const glow = document.getElementById('cursor-glow');
if (glow && window.matchMedia('(pointer: fine)').matches) {
  let raf;
  document.addEventListener('mousemove', (e) => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      glow.style.background =
        'radial-gradient(600px circle at ' +
        e.clientX + 'px ' + e.clientY + 'px,' +
        'rgba(212,98,42,0.07) 0%,' +
        'rgba(212,98,42,0.02) 40%,' +
        'transparent 70%)';
    });
  });
}

// ── Smooth scroll ────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    var target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Formspree async form ─────────────────────────────
var form   = document.getElementById('contact-form');
var status = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var data = new FormData(form);
    status.textContent = 'Sending...';
    status.className = 'form-status';

    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    })
    .then(function(res) {
      if (res.ok) {
        status.textContent = "Sent. I'll get back to you.";
        status.className = 'form-status success';
        form.reset();
      } else {
        return res.json().then(function(json) {
          var msg = (json && json.errors)
            ? json.errors.map(function(e) { return e.message; }).join(', ')
            : 'Something went wrong.';
          status.textContent = msg;
          status.className = 'form-status error';
        });
      }
    })
    .catch(function() {
      status.textContent = 'Network error. Try emailing directly.';
      status.className = 'form-status error';
    });
  });
}