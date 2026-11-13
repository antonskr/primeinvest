export function initSlider() {
  const slider = document.querySelector('.slider');
  const track = slider.querySelector('.slider__track');
  const slides = Array.from(track.querySelectorAll('.slider__slide'));
  const prev = slider.querySelector('.slider__arrow--prev');
  const next = slider.querySelector('.slider__arrow--next');
  const dotsWrap = slider.querySelector('.slider__dots');
  let active = -1;
  let target = null;
  let scrollTimer;
  const mobile = matchMedia('(max-width: 1023px)');

  const dots = slides.map((slide, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'slider__dot';
    dot.setAttribute('aria-label', `Відгук ${i + 1} з ${slides.length}`);
    dot.addEventListener('click', () => scrollToIndex(i));
    dotsWrap.append(dot);
    return dot;
  });

  const centerOf = (slide) => slide.offsetLeft + slide.offsetWidth / 2;

  function scrollToIndex(i) {
    target = i;
    setActive(i);
    track.scrollTo({
      left: centerOf(slides[i]) - track.clientWidth / 2,
      behavior: 'smooth',
    });
  }

  function setActive(i) {
    active = i;
    dots.forEach((dot, n) => dot.classList.toggle('slider__dot--active', n === i));
    prev.disabled = i === 0;
    next.disabled = i === slides.length - 1;
  }

  function update() {
    const center = track.scrollLeft + track.clientWidth / 2;
    const maxDistance = track.clientWidth * 0.6;
    let closest = 0;
    let closestDistance = Infinity;

    slides.forEach((slide, i) => {
      const distance = Math.abs(centerOf(slide) - center);
      const t = mobile.matches ? Math.min(distance / maxDistance, 1) : 0;

      slide.style.opacity = 1 - 0.5 * t;
      slide.style.transform = t ? `scale(${1 - 0.05 * t})` : '';

      if (distance < closestDistance) {
        closestDistance = distance;
        closest = i;
      }
    });

    if (target !== null) {
      if (closest !== target || closestDistance > 1) return;
      target = null;
    }

    if (closest !== active) setActive(closest);
  }

  track.addEventListener('scroll', () => {
    requestAnimationFrame(update);
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      target = null;
      update();
    }, 300);
  }, { passive: true });
  new ResizeObserver(update).observe(track);

  prev.addEventListener('click', () => scrollToIndex(active - 1));
  next.addEventListener('click', () => scrollToIndex(active + 1));

  update();
}
