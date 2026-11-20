const motion = matchMedia('(prefers-reduced-motion: no-preference)');

if (motion.matches) {
  const format = new Intl.NumberFormat('en-US');
  const counters = [...document.querySelectorAll('[data-count]')].map(element => ({
    element,
    goal: Number(element.dataset.count),
  }));
  const start = performance.now();

  function countUp(now) {
    const progress = Math.min(1, Math.max(0, (now - start) / 900));
    const fraction = 1 - .8 * (1 - progress) ** 3;
    for (const { element, goal } of counters) {
      element.textContent = format.format(Math.round(goal * (motion.matches ? fraction : 1)));
    }
    if (progress < 1 && motion.matches) requestAnimationFrame(countUp);
  }

  countUp(start);
}

const tilt = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
for (const card of document.querySelectorAll('.work-card, .hop-feature, .service-grid article, .pricing-card')) {
  card.addEventListener('pointermove', event => {
    if (!tilt.matches || event.pointerType !== 'mouse') return;
    const bounds = card.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
    const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
    card.style.setProperty('--tilt-x', `${-y * 1.25}deg`);
    card.style.setProperty('--tilt-y', `${x * 1.25}deg`);
    card.toggleAttribute('data-tilting', true);
  });
  const reset = () => card.removeAttribute('data-tilting');
  card.addEventListener('pointerleave', reset);
  card.addEventListener('pointercancel', reset);
  tilt.addEventListener('change', reset);
}
