export function initModals() {
  document.querySelectorAll('[data-modal]').forEach((button) => {
    button.addEventListener('click', () => {
      document.getElementById(button.dataset.modal).showModal();
    });
  });

  document.querySelectorAll('.modal').forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.close();
    });
  });
}
