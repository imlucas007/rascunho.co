/* ═══════════════════════════════════════
   RASCUNHO.CO — SCRIPTS
   ═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────
     CURSOR CUSTOMIZADO
  ───────────────────────────────────── */
  const cursor = document.getElementById('cursor');

  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });

  document.querySelectorAll('a, button, .project-img, .service-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  /* ─────────────────────────────────────
     FADE UP AO SCROLLAR
  ───────────────────────────────────── */
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

  /* ─────────────────────────────────────
     MENU MOBILE
  ───────────────────────────────────── */
  const mobileBtn  = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      const icon   = mobileBtn.querySelector('i');
      icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileBtn.querySelector('i').className = 'fa-solid fa-bars';
      });
    });
  }

  /* ─────────────────────────────────────
     BACK TO TOP
  ───────────────────────────────────── */
  const backBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    backBtn.classList.toggle('show', window.scrollY > 300);
  });

  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ─────────────────────────────────────
     MODAL DE STATUS (formulário)
  ───────────────────────────────────── */
  function showStatusModal(type) {
    const modal   = document.getElementById('statusModal');
    const icon    = document.getElementById('modalIcon');
    const title   = document.getElementById('modalTitle');
    const message = document.getElementById('modalMessage');

    if (type === 'success') {
      icon.innerHTML    = '<i class="fa-solid fa-circle-check" style="color:#4ade80;"></i>';
      title.innerText   = 'Mensagem Enviada!';
      message.innerText = 'Obrigado pelo contato. Recebi sua mensagem e retornarei em breve.';
    } else {
      icon.innerHTML    = '<i class="fa-solid fa-circle-xmark" style="color:#f87171;"></i>';
      title.innerText   = 'Ops, algo deu errado.';
      message.innerText = 'Não foi possível enviar sua mensagem. Por favor, tente novamente.';
    }

    modal.classList.add('show');
  }

  const closeStatusBtn = document.getElementById('closeModalBtn');
  if (closeStatusBtn) {
    closeStatusBtn.addEventListener('click', () => {
      document.getElementById('statusModal').classList.remove('show');
    });
  }

  /* ─────────────────────────────────────
     FORMULÁRIO DE CONTATO (SheetMonkey)
  ───────────────────────────────────── */
  const form      = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  if (form && submitBtn) {
    form.addEventListener('submit', async e => {
      e.preventDefault();

      const originalText    = submitBtn.innerText;
      submitBtn.innerText   = 'ENVIANDO...';
      submitBtn.disabled    = true;

      const ACTION_URL = 'https://api.sheetmonkey.io/form/3mUbK81mCfcLPjexWKTS5p';

      try {
        await fetch(ACTION_URL, {
          method: 'POST',
          body: new FormData(form),
          mode: 'no-cors',
        });
        showStatusModal('success');
        form.reset();
      } catch (err) {
        console.error('Erro ao enviar:', err);
        showStatusModal('error');
      } finally {
        submitBtn.innerText = originalText;
        submitBtn.disabled  = false;
      }
    });
  }

  /* ─────────────────────────────────────
     MODAL DE IMAGEM (carrossel)
  ───────────────────────────────────── */
  const imageModal     = document.getElementById('imageModal');
  const modalImg       = document.getElementById('modalImg');
  const downloadBtn    = document.getElementById('downloadBtn');
  const closeImgBtn    = document.getElementById('closeImageModal');

  function openImageModal(src) {
    modalImg.src      = src;
    downloadBtn.href  = src;
    imageModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeImageModal() {
    imageModal.classList.remove('show');
    document.body.style.overflow = 'auto';
  }

  // Delega o clique para os dois tracks (original + clone)
  document.querySelectorAll('.project-img').forEach(img => {
    img.addEventListener('click', () => {
      if (img.src && !img.src.endsWith('/')) openImageModal(img.src);
    });
  });

  if (closeImgBtn)  closeImgBtn.addEventListener('click', closeImageModal);
  if (imageModal)   imageModal.addEventListener('click', e => { if (e.target === imageModal) closeImageModal(); });

  // Fechar modais com ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeImageModal();
      document.getElementById('statusModal')?.classList.remove('show');
    }
  });

});