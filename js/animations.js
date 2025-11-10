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

  function createCharSpans() {
    el.innerHTML = '';
    for (let i = 0; i < raw.length; i++) {
      const ch = raw[i];
      const span = document.createElement('span');
      span.className = 'char';
      if (ch === ' ') span.classList.add('space');
      if (startIndex >= 0 && i >= startIndex && i < startIndex + highlight.length) {
        span.classList.add('gradient-text');
      }
      span.textContent = ch;
      el.appendChild(span);
    }
    return el.querySelectorAll('.char');
  }

  function animateCycle() {
    const chars = createCharSpans();
    // Reset initial state
    chars.forEach(s => {
      s.style.opacity = '0';
      s.style.transform = 'translateY(28px) rotateX(18deg)';
    });
    
    // Trigger entrance
    requestAnimationFrame(() => {
      chars.forEach((s, i) => {
        s.style.transitionDelay = `${i * 40}ms`;
        s.style.opacity = '1';
        s.style.transform = 'none';
      });
    });

    // Schedule exit animation
    const totalDuration = (chars.length * 40) + 2000; // entrance + hold
    setTimeout(() => {
      chars.forEach((s, i) => {
        s.style.transitionDelay = `${i * 30}ms`;
        s.style.opacity = '0';
        s.style.transform = 'translateY(-28px) rotateX(-18deg)';
      });
      // Schedule next cycle
      setTimeout(animateCycle, chars.length * 30 + 500);
    }, totalDuration);
  }

  // Start the loop
  animateCycle();
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

  function startTypewriterCycle() {
    el.innerHTML = '';
    const wrapper = document.createElement('span');
    wrapper.className = 'typewriter-wrapper';
    const line = document.createElement('span');
    line.className = 'typewriter';
    wrapper.appendChild(line);
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.classList.add('cursor');
    
    let target = raw;
    const startIndex = target.indexOf(highlight);
    let i = 0;
    const typingSpeed = 60;
    el.appendChild(wrapper);
    wrapper.appendChild(cursor);

    function type() {
      const interval = setInterval(() => {
        if (i >= target.length) {
          clearInterval(interval);
          if (startIndex >= 0) {
            line.innerHTML = '';
            for (let j = 0; j < target.length; j++) {
              const ch = target[j];
              const span = document.createElement('span');
              span.textContent = ch;
              if (j >= startIndex && j < startIndex + highlight.length) span.classList.add('gradient-text');
              line.appendChild(span);
            }
          }
          // Hold for a moment, then start erasing
          setTimeout(erase, 2000);
          return;
        }
        line.textContent = (line.textContent || '') + target[i];
        i++;
      }, typingSpeed);
    }

    function erase() {
      const eraseSpeed = 30;
      const interval = setInterval(() => {
        const text = line.textContent;
        if (!text.length) {
          clearInterval(interval);
          setTimeout(() => {
            el.innerHTML = '';
            startTypewriterCycle();
          }, 500);
          return;
        }
        line.textContent = text.slice(0, -1);
      }, eraseSpeed);
    }

    // Start the cycle
    type();
  }

  // Begin the loop
  startTypewriterCycle();
}