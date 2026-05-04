
  const target = document.getElementById('servicos');

  function scrollToServicos() {
    target.scrollIntoView({ behavior: 'smooth' });
  }

  // 1. Quando a tab MUDA
  document.querySelectorAll('[data-bs-toggle="pill"]').forEach(tab => {
    tab.addEventListener('shown.bs.tab', scrollToServicos);

    // 2. Quando clica na tab que JÁ está ativa
    tab.addEventListener('click', function () {
      if (this.classList.contains('active')) {
        scrollToServicos();
      }
    });
  });


document
    .querySelectorAll('#accordionServices .accordion-collapse')
    .forEach(collapse => {
      collapse.addEventListener('shown.bs.collapse', function () {
        this.closest('.accordion-item')
          .scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
