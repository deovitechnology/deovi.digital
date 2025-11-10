// Scroll-triggered fade-in animation
function revealOnScroll() {
  const elements = document.querySelectorAll('.fade-in-up');
  const windowHeight = window.innerHeight;
  elements.forEach(el => {
    const position = el.getBoundingClientRect().top;
    if (position < windowHeight - 60) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
// Animate the main tech title with per-character entrance and gradient shimmer
function animateTitle() {
  const el = document.querySelector('.tech-title');
  if (!el) return;
  const raw = el.textContent || el.innerText;
  const highlight = 'Tech Skills';
  const startIndex = raw.indexOf(highlight);
  // Build spans for each character
  el.innerHTML = '';
  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    const span = document.createElement('span');
    span.className = 'char';
    if (ch === ' ') span.classList.add('space');
    // mark highlighted range for gradient
    if (startIndex >= 0 && i >= startIndex && i < startIndex + highlight.length) {
      span.classList.add('gradient-text');
    }
    span.textContent = ch;
    el.appendChild(span);
  }

  // Trigger staggered animation
  const chars = el.querySelectorAll('.char');
  chars.forEach((s, i) => {
    // small stagger, faster feel for professional look
    const delay = i * 40; // ms
    s.style.transitionDelay = `${delay}ms`;
  });

  // force reflow then start
  requestAnimationFrame(() => {
    chars.forEach((s) => {
      s.style.opacity = '1';
      s.style.transform = 'none';
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  revealOnScroll();
  // small timeout so the page feels ready
  // Default animation mode: 'char' (per-character). Can switch to 'typewriter'.
  let animationMode = 'char';

  function setAnimationMode(mode) {
    animationMode = mode;
    // reset and run chosen animation
    const el = document.querySelector('.tech-title');
    if (!el) return;
    if (mode === 'char') {
      // restore original text content (strip spans)
      const raw = el.textContent || el.innerText;
      el.textContent = raw;
      animateTitle();
    } else if (mode === 'typewriter') {
      const raw = el.textContent || el.innerText;
      el.textContent = raw;
      animateTitleTypewriter();
    }
  }

  // hook toggle button if present
  const toggle = document.getElementById('altAnimBtn');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = animationMode === 'char' ? 'typewriter' : 'char';
      setAnimationMode(next);
      toggle.setAttribute('aria-pressed', String(next === 'typewriter'));
      toggle.textContent = next === 'typewriter' ? 'Try primary animation' : 'Try alternate animation';
    });
  }

  // run the default
  setTimeout(() => setAnimationMode('char'), 120);
});

/* ---------- Alternate Animation: Typewriter ---------- */
function animateTitleTypewriter() {
  const el = document.querySelector('.tech-title');
  if (!el) return;
  const raw = (el.textContent || el.innerText).trim();
  const highlight = 'Tech Skills';
  // Prepare wrapper
  el.innerHTML = '';
  const wrapper = document.createElement('span');
  wrapper.className = 'typewriter-wrapper';
  const line = document.createElement('span');
  line.className = 'typewriter';
  wrapper.appendChild(line);
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  cursor.classList.add('cursor');
  // We'll build the full target string but reveal progressively
  let target = raw;
  // Mark gradient substring positions
  const startIndex = target.indexOf(highlight);
  // We'll progressively add characters
  let i = 0;
  const typingSpeed = 60; // ms per char
  el.appendChild(wrapper);
  wrapper.appendChild(cursor);

  const interval = setInterval(() => {
    if (i >= target.length) {
      clearInterval(interval);
      // replace spans for highlighted substring with gradient-text
      if (startIndex >= 0) {
        // build final content with gradient spans
        line.innerHTML = '';
        for (let j = 0; j < target.length; j++) {
          const ch = target[j];
          const span = document.createElement('span');
          span.textContent = ch;
          if (startIndex >= 0 && j >= startIndex && j < startIndex + highlight.length) span.classList.add('gradient-text');
          line.appendChild(span);
        }
      }
      // animate subtle per-character wave entrance for polish
      const chars = line.querySelectorAll('span');
      chars.forEach((s, idx) => {
        s.classList.add('char-wave');
        setTimeout(() => s.classList.add('visible'), idx * 35);
      });
      return;
    }
    // append next character
    const nextChar = target[i];
    // append into line as a text node (we'll rebuild at end to add gradient)
    line.textContent = (line.textContent || '') + nextChar;
    i++;
  }, typingSpeed);
}