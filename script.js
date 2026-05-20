document.addEventListener('DOMContentLoaded', () => {
  // --- Header Scroll Effect ---
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Mobile Hamburger Menu ---
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpened = navMenu.classList.contains('open');
      const spans = menuToggle.querySelectorAll('span');
      if (isOpened) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // --- Interactive Tabs for Products (Product Page) ---
  const tabButtons = document.querySelectorAll('.prod-tab-btn');
  const productCards = document.querySelectorAll('.product-card');
  if (tabButtons.length > 0 && productCards.length > 0) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from buttons
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-tab');

        productCards.forEach(card => {
          if (category === 'all') {
            card.style.display = 'flex';
            card.style.animation = 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards';
          } else if (card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
            card.style.animation = 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --- Search & Filter Logic for Business Performance (Performance Page) ---
  const perfSearch = document.getElementById('perf-search-input');
  const filterRegion = document.getElementById('filter-region');
  const filterCategory = document.getElementById('filter-category');
  const perfRows = document.querySelectorAll('.table-perf tbody tr');

  function filterPerformanceTable() {
    if (!perfRows.length) return;
    
    const query = perfSearch ? perfSearch.value.toLowerCase() : '';
    const region = filterRegion ? filterRegion.value : 'all';
    const category = filterCategory ? filterCategory.value : 'all';

    perfRows.forEach(row => {
      const client = row.children[1].textContent.toLowerCase();
      const project = row.children[2].textContent.toLowerCase();
      const rowRegion = row.getAttribute('data-region');
      const rowCategory = row.getAttribute('data-category');

      const matchesSearch = client.includes(query) || project.includes(query);
      const matchesRegion = region === 'all' || rowRegion === region;
      const matchesCategory = category === 'all' || rowCategory === category;

      if (matchesSearch && matchesRegion && matchesCategory) {
        row.style.display = '';
        row.style.animation = 'fadeIn 0.4s ease forwards';
      } else {
        row.style.display = 'none';
      }
    });
  }

  if (perfSearch) perfSearch.addEventListener('input', filterPerformanceTable);
  if (filterRegion) filterRegion.addEventListener('change', filterPerformanceTable);
  if (filterCategory) filterCategory.addEventListener('change', filterPerformanceTable);

  // --- Modal Zoom-in for Technology Certificates (Technology Page) ---
  const certCards = document.querySelectorAll('.cert-card');
  const modal = document.getElementById('cert-modal');
  const modalClose = document.querySelector('.modal-close');
  const modalImgBox = document.querySelector('.modal-img-wrapper');
  const modalTitle = document.querySelector('.modal-title');
  const modalDesc = document.querySelector('.modal-desc');

  if (certCards.length > 0 && modal) {
    certCards.forEach(card => {
      card.addEventListener('click', () => {
        const svgContent = card.querySelector('.cert-svg-placeholder').outerHTML;
        const title = card.querySelector('.cert-title').textContent;
        const desc = card.querySelector('.cert-desc').textContent;

        modalImgBox.innerHTML = svgContent;
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Lock background scroll
      });
    });

    const closeModal = () => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Restore scroll
    };

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // --- Interactive Customer Inquiry Web Form (Support Page) ---
  const inquiryForm = document.getElementById('inquiry-form');
  const successModal = document.getElementById('success-modal');
  const successClose = document.getElementById('success-close-btn');

  if (inquiryForm && successModal) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Form validation
      const name = document.getElementById('client-name').value.trim();
      const phone = document.getElementById('client-phone').value.trim();
      const email = document.getElementById('client-email').value.trim();
      const content = document.getElementById('client-content').value.trim();
      const privacy = document.getElementById('privacy-check').checked;

      if (!name || !phone || !email || !content) {
        alert('필수 입력 필드를 모두 작성해 주세요.');
        return;
      }

      if (!privacy) {
        alert('개인정보 수집 및 이용 동의에 체크해 주세요.');
        return;
      }

      // Display customized success dialogue
      successModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      inquiryForm.reset();
    });

    if (successClose) {
      successClose.addEventListener('click', () => {
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      });
    }
  }
});
