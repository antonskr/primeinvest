export function initTimer() {
  const DURATION = 15 * 60 * 1000;
  const STORAGE_KEY = 'primeinvest-deadline';

  const timer = document.querySelector('.timer');
  const minutes = timer.querySelector('.timer__num--min');
  const seconds = timer.querySelector('.timer__num--sec');
  const stickyTime = document.querySelector('.sticky-cta__time');
  const ctaButtons = document.querySelectorAll('.js-cta');

  function getDeadline() {
    const short = Number(new URLSearchParams(location.search).get('t'));
    if (short > 0) return Date.now() + short * 1000;

    const saved = Number(sessionStorage.getItem(STORAGE_KEY));
    if (saved) return saved;

    const deadline = Date.now() + DURATION;
    sessionStorage.setItem(STORAGE_KEY, deadline);
    return deadline;
  }

  const pad = (n) => String(n).padStart(2, '0');

  function tick() {
    const left = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    const min = pad(Math.floor(left / 60));
    const sec = pad(left % 60);

    minutes.textContent = min;
    seconds.textContent = sec;
    stickyTime.textContent = `${min}:${sec}`;

    if (left === 0) {
      clearInterval(interval);
      timer.classList.add('timer--done');
      ctaButtons.forEach((btn) => {
        btn.textContent = 'Останній шанс';
      });
    }
  }

  const deadline = getDeadline();
  const interval = setInterval(tick, 1000);
  tick();
}
