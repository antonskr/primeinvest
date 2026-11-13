import intlTelInput from 'https://cdn.jsdelivr.net/npm/intl-tel-input@29.5.11/+esm';
import uk from 'https://cdn.jsdelivr.net/npm/intl-tel-input@29.5.11/dist/js/locale/uk.js';

const UTILS_URL = 'https://cdn.jsdelivr.net/npm/intl-tel-input@29.5.11/dist/js/utils.js';

export function initLeadForm() {
  const form = document.querySelector('.form');
  const steps = form.querySelectorAll('.form__step');
  const stepNum = form.querySelector('.form__step-num');
  const submitBtn = form.querySelector('.form__submit');
  const modal = document.getElementById('modal-success');
  const phone = intlTelInput(form.elements.phone, {
    initialCountry: 'ua',
    countryOrder: ['ua', 'pl'],
    countryNameLocale: 'uk',
    uiTranslations: uk,
    separateDialCode: true,
    strictMode: true,
    loadUtils: () => import(UTILS_URL),
  });
  let step = 0;

  const validators = {
    name(input) {
      const value = input.value.trim();
      if (value.length < 2) return 'Напишіть, як до вас звертатися';
      if (!/^[\p{L}\s'’ʼ-]+$/u.test(value)) return 'В імені можуть бути лише літери';
      return '';
    },
    email(input) {
      const value = input.value.trim();
      if (!value) return 'Вкажіть email';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return 'Схоже, в адресі помилка';
      return '';
    },
    phone() {
      return phone.isValidNumber() ? '' : 'Перевірте номер телефону';
    },
    agree(input) {
      return input.checked ? '' : 'Без згоди ми не можемо прийняти заявку';
    },
  };

  function validate(input) {
    const error = validators[input.name](input);
    const field = input.closest('.field');

    field.classList.toggle('field--invalid', error !== '');
    field.querySelector('.field__error').textContent = error;
    input.setAttribute('aria-invalid', error !== '');

    return error === '';
  }

  function validateStep() {
    const inputs = Array.from(steps[step].querySelectorAll('input')).filter((input) => input.name in validators);
    const invalid = inputs.filter((input) => !validate(input));

    if (invalid.length) invalid[0].focus();
    return invalid.length === 0;
  }

  function showStep(index) {
    step = index;
    steps.forEach((el, i) => {
      el.hidden = i !== index;
    });
    stepNum.textContent = index + 1;
  }

  function sendLead(data) {
    console.log('lead', data);
    return new Promise((resolve) => setTimeout(resolve, 700));
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (submitBtn.disabled || !validateStep()) return;

    if (step === 0) {
      showStep(1);
      form.elements.phone.focus();
      return;
    }

    const data = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      phone: phone.getNumber(),
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Надсилаємо…';
    await sendLead(data);
    submitBtn.disabled = false;
    submitBtn.textContent = 'Надіслати заявку';

    modal.showModal();

    form.reset();
    showStep(0);
  });

  form.querySelector('.form__back').addEventListener('click', () => {
    showStep(0);
    form.elements.name.focus();
  });

  form.addEventListener('focusout', (e) => {
    if (e.target.matches('.field__input') && e.target.value) validate(e.target);
  });

  form.addEventListener('input', (e) => {
    if (e.target.name in validators && e.target.closest('.field--invalid')) validate(e.target);
  });
}
