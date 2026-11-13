export function initFaq() {
  const items = document.querySelectorAll('.faq__item');

  function setOpen(item, open) {
    item.classList.toggle('faq__item--open', open);
    item.querySelector('.faq__question').setAttribute('aria-expanded', open);
  }

  items.forEach((item) => {
    item.querySelector('.faq__question').addEventListener('click', () => {
      const wasOpen = item.classList.contains('faq__item--open');
      items.forEach((other) => setOpen(other, other === item && !wasOpen));
    });
  });
}
