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

  // --- Water Campaign Calculator & Tracker (Campaign Page) ---
  const calcForm = document.getElementById('water-calc-form');
  const calcResultBox = document.getElementById('calc-result-box');
  const calcResultVal = document.getElementById('calc-result-value');
  const targetIntakeText = document.getElementById('target-intake-text');

  let dailyGoalMl = 2000; // Default goal: 2000ml (8 glasses)
  let currentIntakeMl = 0;
  const glassVolumeMl = 250; // 1 glass = 250ml

  if (calcForm && calcResultBox) {
    calcForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const weightInput = document.getElementById('user-weight');
      const weight = parseFloat(weightInput.value);

      if (isNaN(weight) || weight <= 0) {
        alert('올바른 체중을 입력해 주세요.');
        return;
      }

      // Calculate water intake: Weight (kg) * 30 = recommended intake in ml
      const recommendedMl = Math.round(weight * 30);
      dailyGoalMl = recommendedMl;

      calcResultVal.textContent = (recommendedMl / 1000).toFixed(1) + 'L';
      calcResultBox.style.display = 'block';
      calcResultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // Update tracker goal text
      if (targetIntakeText) {
        targetIntakeText.textContent = (dailyGoalMl / 1000).toFixed(1) + 'L';
      }
      updateWaterTracker();
    });
  }

  const btnAddWater = document.getElementById('btn-add-water');
  const btnResetWater = document.getElementById('btn-reset-water');
  const currentGlassesText = document.getElementById('current-glasses');
  const currentVolumeText = document.getElementById('current-volume');
  const waterLevelRect = document.getElementById('water-level-rect');
  const targetIntakeSpan = document.getElementById('target-intake');

  function updateWaterTracker() {
    const glasses = Math.round(currentIntakeMl / glassVolumeMl);
    if (currentGlassesText) currentGlassesText.textContent = glasses;
    if (currentVolumeText) currentVolumeText.textContent = (currentIntakeMl / 1000).toFixed(2);
    if (targetIntakeSpan) targetIntakeSpan.textContent = (dailyGoalMl / 1000).toFixed(1);

    // Calculate percent
    const percent = Math.min(100, Math.round((currentIntakeMl / dailyGoalMl) * 100));
    
    // Update SVG Water Level
    // The SVG cup height is 120 (from y=30 to y=150)
    // 0% water level -> y=150, height=0
    // 100% water level -> y=30, height=120
    if (waterLevelRect) {
      const maxWaterHeight = 120;
      const waterHeight = (percent / 100) * maxWaterHeight;
      const waterY = 150 - waterHeight;
      
      waterLevelRect.setAttribute('height', waterHeight);
      waterLevelRect.setAttribute('y', waterY);
    }
  }

  if (btnAddWater) {
    btnAddWater.addEventListener('click', () => {
      currentIntakeMl += glassVolumeMl;
      updateWaterTracker();
      
      // Floating water drop effect
      createWaterDropEffect();
    });
  }

  if (btnResetWater) {
    btnResetWater.addEventListener('click', () => {
      if (confirm('오늘의 마신 물 기록을 초기화하시겠습니까?')) {
        currentIntakeMl = 0;
        updateWaterTracker();
      }
    });
  }

  function createWaterDropEffect() {
    const trackerDisplay = document.querySelector('.tracker-display');
    if (!trackerDisplay) return;

    const drop = document.createElement('div');
    drop.className = 'floating-drop';
    drop.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="#00A8FF" style="filter: drop-shadow(0 2px 4px rgba(0, 168, 255, 0.4));"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`;
    drop.style.position = 'absolute';
    drop.style.left = '50%';
    drop.style.top = '60%';
    drop.style.transform = 'translate(-50%, -50%)';
    drop.style.opacity = '1';
    drop.style.pointerEvents = 'none';
    drop.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    drop.style.zIndex = '10';
    
    trackerDisplay.appendChild(drop);

    setTimeout(() => {
      drop.style.top = '15%';
      drop.style.opacity = '0';
      drop.style.transform = 'translate(-50%, -50%) scale(1.8)';
    }, 50);

    setTimeout(() => {
      drop.remove();
    }, 900);
  }

  // --- Campaign Lightbox Modal (Cardnews Zoom) ---
  const cardnewsImg = document.getElementById('cardnews-main-image');
  const cardnewsZoomBtn = document.getElementById('cardnews-zoom-trigger');
  const lightbox = document.getElementById('campaign-lightbox');
  const lightboxClose = document.getElementById('lightbox-close-btn');
  const lightboxImg = document.getElementById('lightbox-image');

  function openLightbox() {
    if (lightbox && lightboxImg && cardnewsImg) {
      lightboxImg.src = cardnewsImg.src;
      lightboxImg.alt = cardnewsImg.alt;
      lightbox.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('show');
      document.body.style.overflow = 'auto';
    }
  }

  if (cardnewsImg) cardnewsImg.addEventListener('click', openLightbox);
  if (cardnewsZoomBtn) cardnewsZoomBtn.addEventListener('click', openLightbox);
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Initialize water tracker on load if elements exist
  if (currentGlassesText) {
    updateWaterTracker();
  }
});
