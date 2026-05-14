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
const clickX = e.clientX - rect.left;
const clickY = e.clientY - rect.top;

let clickedOnClose = false;

// DESKTOP (botão no canto)
if (window.innerWidth >= 992) {
  clickedOnClose = clickX < 40 && clickY < 40;
}
// MOBILE (botão centralizado)
else {
  const centerX = rect.width / 2;
  clickedOnClose =
    Math.abs(clickX - centerX) < 20 && // metade do tamanho (40px)
    clickY < 40;
}

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
    const topicSelect = form.querySelector('.js-chat-topic');

    const topic = topicSelect?.value;

    // ✅ validação visual (sem alert)
    if (!topic) {
      topicSelect.classList.add('is-invalid-select');
      return;
    } else {
      topicSelect.classList.remove('is-invalid-select');
    }

    let message = '';

    switch (topic) {
      case 'Serviços':
        message = `Olá, desejo mais informações sobre *Serviços*.`;
        break;

      case 'Terapias':
        message = `Olá, desejo mais informações sobre *Terapias*.`;
        break;

      case 'Valores':
        message = `Olá, desejo mais informações sobre *Valores*.`;
        break;

      default:
        message = `Olá, gostaria de mais informações.`;
    }

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // ✅ fecha o chat
    chat.classList.remove('is-open');

    setTimeout(() => {
      openButtons.forEach(b => b.classList.remove('is-hidden'));
    }, 220);

    // ✅ abre WhatsApp
    window.open(url, '_blank');
  });
});

const whatsapp = document.getElementById('mobile-whatsapp');

if (whatsapp) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    const scrollBottom = scrollY + windowHeight;

    // ✅ aparece depois de rolar um pouco (ex: 200px)
    if (scrollY > 200 && scrollBottom < docHeight - 100) {
      whatsapp.classList.remove('whatsapp-hidden');
      whatsapp.classList.add('whatsapp-visible');
    } else {
      whatsapp.classList.remove('whatsapp-visible');
      whatsapp.classList.add('whatsapp-hidden');
    }
  });
}
let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;

      const progress = (scrollTop / scrollHeight) * 100;

      document.getElementById("progress-bar").style.width = progress + "%";

      ticking = false;
    });

    ticking = true;
  }
});