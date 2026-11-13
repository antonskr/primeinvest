export function initStickyCta() {
  const bar = document.querySelector('.sticky-cta');
  const visible = { hero: true, lead: false };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      visible[entry.target.id] = entry.isIntersecting;
    });
    bar.classList.toggle('sticky-cta--visible', !visible.hero && !visible.lead);
  });

  observer.observe(document.getElementById('hero'));
  observer.observe(document.getElementById('lead'));
}
