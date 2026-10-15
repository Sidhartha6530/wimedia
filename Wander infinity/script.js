document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const button = item.querySelector('.faq-question');
    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      faqItems.forEach((faq) => {
        faq.classList.remove('active');
      });

      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
});
