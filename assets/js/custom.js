/* =========================
   SCROLL PARA SERVIÇOS
========================= */

const target = document.getElementById('servicos');

function scrollToServicos() {
  target.scrollIntoView({ behavior: 'smooth' });
}

// Tabs (pills)
document.querySelectorAll('[data-bs-toggle="pill"]').forEach(tab => {
  tab.addEventListener('shown.bs.tab', scrollToServicos);

  tab.addEventListener('click', function () {
    if (this.classList.contains('active')) {
      scrollToServicos();
    }
  });
});

// Accordion (mobile)
document
  .querySelectorAll('#accordionServices .accordion-collapse')
  .forEach(collapse => {
    collapse.addEventListener('shown.bs.collapse', function () {
      this.closest('.accordion-item')
        .scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

/* =========================
   CHAT
========================= */

const chat = document.querySelector('.chatt');
const openButtons = document.querySelectorAll('.js-open-chat');

openButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const isOpen = chat.classList.contains('is-open');

    if (!isOpen) {
      // esconde botão flutuante
      requestAnimationFrame(() => {
        btn.classList.add('is-hidden');
      });

      // abre chat
      setTimeout(() => {
        chat.classList.add('is-open');

        // ✅ foco automático no campo Nome
        const nameInput = chat.querySelector('.js-chat-name');
        if (nameInput) {
          nameInput.focus();
        }
      }, 180);
    } else {
      // fecha chat
      chat.classList.remove('is-open');

      setTimeout(() => {
        openButtons.forEach(b => b.classList.remove('is-hidden'));
      }, 220);
    }
  });
});

// Fechar chat pelo X (pseudo-elemento)
chat.addEventListener('click', (e) => {
  // ✅ ignora qualquer clique vindo do formulário
  if (e.target.closest('form')) return;

  const rect = chat.getBoundingClientRect();
  const clickedOnClose =
    e.clientX - rect.left < 40 &&
    e.clientY - rect.top < 40;

  if (clickedOnClose) {
    chat.classList.remove('is-open');

    setTimeout(() => {
      openButtons.forEach(b => b.classList.remove('is-hidden'));
    }, 220);
  }
});


/* =========================
   WHATSAPP
========================= */

const phoneNumber = '5511932075811';

document.querySelectorAll('.js-send-whatsapp').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();

    const form = button.closest('form') || document;
    const nameInput = form.querySelector('.js-chat-name');
    const topicSelect = form.querySelector('.js-chat-topic');

    const name = nameInput?.value.trim();
    const topic = topicSelect?.value;

    if (!name) {
      alert('Por favor, informe seu nome.');
      return;
    }

    if (!topic) {
      alert('Por favor, selecione um assunto.');
      return;
    }

    let message = '';

switch (topic) {
  case 'Serviços':
    message = `Olá, meu nome é ${name} e desejo mais informações sobre *Serviços*.`;
    break;
  case 'Terapias':
    message = `Olá, meu nome é ${name} e desejo mais informações sobre *Terapias*.`;
    break;
  case 'Valores':
    message = `Olá, meu nome é ${name} e desejo mais informações sobre *Valores*.`;
    break;
  default:
    message = `Olá, meu nome é ${name} e gostaria de mais informações.`;
}

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // ✅ fecha o chat ao enviar
    chat.classList.remove('is-open');

    setTimeout(() => {
      openButtons.forEach(b => b.classList.remove('is-hidden'));
    }, 220);

    // ✅ abre WhatsApp em nova aba
    window.open(url, '_blank');
  });
});