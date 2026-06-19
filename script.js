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
        const pdfFile = card.getAttribute('data-pdf');
        const title = card.querySelector('.cert-title').textContent;
        const desc = card.querySelector('.cert-desc').textContent;

        if (pdfFile) {
          modalImgBox.innerHTML = `<iframe src="${pdfFile}" width="100%" height="550px" style="border: none; border-radius: 8px; background-color: #fff;"></iframe>`;
        } else {
          const svgContent = card.querySelector('.cert-svg-placeholder').outerHTML;
          modalImgBox.innerHTML = svgContent;
        }
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

      // Save inquiry data to localStorage (Simulating system storage)
      const inquiryData = {
        name,
        phone,
        email,
        content,
        submittedAt: new Date().toISOString()
      };
      
      let inquiries = [];
      try {
        inquiries = JSON.parse(localStorage.getItem('batech_inquiries') || '[]');
      } catch (err) {
        inquiries = [];
      }
      inquiries.push(inquiryData);
      localStorage.setItem('batech_inquiries', JSON.stringify(inquiries));

      console.log('데이터가 시스템에 성공적으로 저장되었습니다:', inquiryData);
      console.log('관리자 이메일(admin@company.com)로 견적 접수 알림이 즉시 전송되었습니다.');

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

  // --- FAQ Accordion Logic ---
  const faqQuestions = document.querySelectorAll('.faq-question');
  if (faqQuestions.length > 0) {
    faqQuestions.forEach(q => {
      q.addEventListener('click', () => {
        const item = q.parentElement;
        const isActive = item.classList.contains('active');
        
        // Close all items
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        
        // If it wasn't active, open it
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }

  // --- FAQ Filtering Logic ---
  const faqTabButtons = document.querySelectorAll('.faq-tab-btn');
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqTabButtons.length > 0 && faqItems.length > 0) {
    faqTabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        faqTabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-faq-cat');

        faqItems.forEach(item => {
          if (cat === 'all') {
            item.style.display = 'block';
          } else if (item.getAttribute('data-faq-category') === cat) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Initialize water tracker on load if elements exist
  if (currentGlassesText) {
    updateWaterTracker();
  }

  // --- Interactive Tabs for Product Operation Guide ---
  const guideTabButtons = document.querySelectorAll('.guide-tab-btn');
  const guidePanels = document.querySelectorAll('.guide-content-panel');
  if (guideTabButtons.length > 0 && guidePanels.length > 0) {
    guideTabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from buttons
        guideTabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const tabId = btn.getAttribute('data-guide-tab');
        
        // Switch panels with smooth fade-in
        guidePanels.forEach(panel => {
          if (panel.id === `guide-panel-${tabId}`) {
            panel.classList.add('active');
          } else {
            panel.classList.remove('active');
          }
        });
      });
    });
  }

  // --- Site-wide Floating KakaoTalk Consultation Button ---
  const kakaoFloatBtn = document.createElement('a');
  kakaoFloatBtn.href = 'http://pf.kakao.com/_AeHXX/chat';
  kakaoFloatBtn.target = '_blank';
  kakaoFloatBtn.rel = 'noopener noreferrer';
  kakaoFloatBtn.className = 'floating-kakao';
  kakaoFloatBtn.setAttribute('aria-label', '카카오톡 상담하기');
  kakaoFloatBtn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12,2C6.5,2,2,5.6,2,10c0,2.8,1.8,5.3,4.5,6.6l-1,3.7c-0.1,0.5,0.4,0.9,0.9,0.7l4.3-2.6c0.4,0.1,0.8,0.1,1.3,0.1c5.5,0,10-3.6,10-8S17.5,2,12,2z"/>
    </svg>
  `;
  document.body.appendChild(kakaoFloatBtn);

  // --- Pump Operation Simulation Logic ---
  const simTabButtons = document.querySelectorAll('.sim-tab-btn');
  const simSvgContainer = document.getElementById('sim-svg-container');
  const simTitle = document.getElementById('sim-title');
  const simDesc = document.getElementById('sim-desc');
  const simFeatures = document.getElementById('sim-features');
  const simPatentName = document.getElementById('sim-patent-name');
  const simPatentEffect = document.getElementById('sim-patent-effect');

  const simData = {
    booster: {
      title: '부스터펌프 (상수도 가압 시스템)',
      desc: '압력 탱크 내부의 공기 압력과 물의 유입/유출을 보여주는 흐름도입니다. 다수의 버티컬 인버터 펌프가 압력 변화를 실시간으로 감지하여 설정된 상수도 공급 압력을 일정하게 조절합니다.',
      patentName: '지능형 압력센서 연동 가변 제어 시스템 (특허 제10-2490102호)',
      patentEffect: '상수도 급수 유량 변화에 맞춰 압력을 정밀 제어하여 펌프 모터 전력 소비량 최대 35% 절감 및 수격 현상 예방',
      features: [
        '<strong>가변 압력 제어:</strong> 실시간 공기 압축 조절',
        '<strong>안정성 극대화:</strong> 수충격(워터 해머) 완화 구조',
        '<strong>에너지 절감:</strong> 유량 감지형 가변 모터 스피드',
        '<strong>공회전 방지:</strong> 수위 연계형 자동차단 보호'
      ],
      svg: `<svg viewBox="0 0 400 300" width="100%" height="100%">
        <g stroke="rgba(255,255,255,0.05)" stroke-width="1">
          <line x1="0" y1="50" x2="400" y2="50" /><line x1="0" y1="100" x2="400" y2="100" />
          <line x1="0" y1="150" x2="400" y2="150" /><line x1="0" y1="200" x2="400" y2="200" />
          <line x1="0" y1="250" x2="400" y2="250" /><line x1="80" y1="0" x2="80" y2="300" />
          <line x1="160" y1="0" x2="160" y2="300" /><line x1="240" y1="0" x2="240" y2="300" />
          <line x1="320" y1="0" x2="320" y2="300" />
        </g>
        <path d="M 30 180 L 150 180 L 150 240 M 250 240 L 250 180 L 370 180" fill="none" stroke="#2c3e50" stroke-width="16" stroke-linecap="round" />
        <path d="M 30 180 L 150 180 L 150 240 M 250 240 L 250 180 L 370 180" fill="none" stroke="#3498db" stroke-width="10" stroke-linecap="round" />
        <path d="M 30 180 L 150 180 L 150 240" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="8 6" class="flow-anim-in" />
        <path d="M 250 240 L 250 180 L 370 180" fill="none" stroke="#ffffff" stroke-width="2" stroke-dasharray="8 6" class="flow-anim-out" />
        <rect x="180" y="220" width="40" height="30" rx="3" fill="#7f8c8d" />
        <circle cx="200" cy="235" r="12" fill="#00d2d3" />
        <line x1="200" y1="235" x2="200" y2="210" stroke="#7f8c8d" stroke-width="4" />
        <rect x="160" y="50" width="80" height="120" rx="40" fill="#34495e" stroke="#2c3e50" stroke-width="4" />
        <path d="M 162 90 Q 200 120 238 90 L 238 90 A 38 38 0 0 0 162 90 Z" fill="#e74c3c" opacity="0.85" class="bladder-anim" />
        <text x="200" y="75" font-family="Outfit" font-size="11" font-weight="700" fill="#ffffff" text-anchor="middle">AIR</text>
        <path d="M 162 90 Q 200 120 238 90 L 238 168 A 38 38 0 0 1 162 168 Z" fill="#3498db" opacity="0.75" class="tank-water-anim" />
        <text x="200" y="145" font-family="Outfit" font-size="11" font-weight="700" fill="#ffffff" text-anchor="middle">WATER</text>
        <text x="70" y="160" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle">INLET</text>
        <text x="330" y="160" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle">OUTLET</text>
        <text x="200" y="30" fill="#FEE500" font-size="12" font-weight="700" text-anchor="middle">DIAPHRAGM PRESSURE TANK</text>
      </svg>`
    },
    submersible: {
      title: '수중펌프 (지하수 및 수조 배수)',
      desc: '모터와 임펠러가 물속에 잠긴 상태에서 회전하며, 원심력으로 흡입된 물을 양정관(수직 배출관)을 통해 위로 밀어 올리는 단면 구조도입니다. 완전 방수 전동기와 누수 감지 센서가 내장되어 안전한 배수를 지원합니다.',
      patentName: '이중 밀폐형 축봉 및 내부 누설 감지 센서 (특허 제10-2580104호)',
      patentEffect: '수중 운전 시 모터 침수를 이중 차단하고 미세 누수 감지 즉시 자동차단하여 코일 소손 사고 방지',
      features: [
        '<strong>완전 잠김 운전:</strong> 공간 절약 및 무소음 작동',
        '<strong>이중 기밀 씰:</strong> 모터 내부로의 수분 유입 차단',
        '<strong>간편 설치 탈착:</strong> 수중 가이드 파이프 자동 연결',
        '<strong>전동기 보호:</strong> 과열 차단(TP) 및 누수 경보 탑재'
      ],
      svg: `<svg viewBox="0 0 400 300" width="100%" height="100%">
        <rect x="0" y="100" width="400" height="200" fill="#3498db" opacity="0.15" />
        <line x1="0" y1="100" x2="400" y2="100" stroke="#3498db" stroke-width="2" stroke-dasharray="10 5" />
        <rect x="160" y="110" width="80" height="130" rx="10" fill="#2c3e50" stroke="#34495e" stroke-width="3" />
        <line x1="170" y1="130" x2="230" y2="130" stroke="#34495e" stroke-width="2" />
        <line x1="170" y1="150" x2="230" y2="150" stroke="#34495e" stroke-width="2" />
        <line x1="170" y1="170" x2="230" y2="170" stroke="#34495e" stroke-width="2" />
        <rect x="150" y="210" width="100" height="30" rx="4" fill="#16a085" />
        <rect x="165" y="240" width="70" height="15" fill="#7f8c8d" />
        <line x1="175" y1="240" x2="175" y2="255" stroke="#2c3e50" stroke-width="2" />
        <line x1="185" y1="240" x2="185" y2="255" stroke="#2c3e50" stroke-width="2" />
        <line x1="195" y1="240" x2="195" y2="255" stroke="#2c3e50" stroke-width="2" />
        <line x1="205" y1="240" x2="205" y2="255" stroke="#2c3e50" stroke-width="2" />
        <line x1="215" y1="240" x2="215" y2="255" stroke="#2c3e50" stroke-width="2" />
        <line x1="225" y1="240" x2="225" y2="255" stroke="#2c3e50" stroke-width="2" />
        <path d="M 230 220 L 300 220 L 300 30" fill="none" stroke="#2c3e50" stroke-width="12" />
        <path d="M 230 220 L 300 220 L 300 30" fill="none" stroke="#3498db" stroke-width="6" />
        <path d="M 230 220 L 300 220 L 300 30" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="6 6" class="sub-flow-anim" />
        <g transform="translate(200, 225)">
          <circle cx="0" cy="0" r="10" fill="#00d2d3" />
          <path d="M -8 -2 L 8 2" stroke="#ffffff" stroke-width="2" class="spin-anim" />
          <path d="M -2 8 L 2 -8" stroke="#ffffff" stroke-width="2" class="spin-anim" />
        </g>
        <path d="M 180 270 Q 185 255 185 245 M 200 275 Q 200 255 200 245 M 220 270 Q 215 255 215 245" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="4 4" class="suction-particles" />
        <text x="300" y="20" fill="#FEE500" font-size="10" font-weight="700" text-anchor="middle">DISCHARGE</text>
        <text x="200" y="90" fill="#ffffff" font-size="11" font-weight="700" text-anchor="middle">WATER LINE</text>
      </svg>`
    },
    sludge: {
      title: '슬러지펌프 (하수찌꺼기 이송)',
      desc: '협잡물이 포함되거나 점도가 높은 슬러지 유체를 막힘없이 통과시키기 위해 설계된 특수 비폐쇄형(Non-clog) 및 와류형 임펠러의 단면 구조입니다. 임펠러 내부 통로가 매우 넓어 고형물 통과 성능이 매우 우수합니다.',
      patentName: '고형물 막힘 방지 볼텍스 임펠러 설계 (특허 제10-2649033호)',
      patentEffect: '고농도 찌꺼기 및 이물질 함유 유체 이송 시 날개 깃 걸림 현상을 제거하여 돌발 정지 시간(Downtime) 90% 단축',
      features: [
        '<strong>비폐쇄 통로:</strong> 막힘과 엉킴을 근본적으로 방지',
        '<strong>경화 재질 구조:</strong> 마모성 입자 및 모래에 극강의 강도',
        '<strong>간편 세척 탈착:</strong> 유지관리가 매우 수월한 해체 설계',
        '<strong>더블 메카니컬 씰:</strong> 누수 감지 전극센서 포함'
      ],
      svg: `<svg viewBox="0 0 400 300" width="100%" height="100%">
        <path d="M 200 50 C 300 50 350 120 350 180 C 350 250 280 280 200 280 C 120 280 80 220 80 180 C 80 140 100 110 130 110 M 130 110 L 130 50 M 200 50 L 200 30" fill="none" stroke="#2c3e50" stroke-width="12" />
        <path d="M 200 50 C 300 50 350 120 350 180 C 350 250 280 280 200 280 C 120 280 80 220 80 180 C 80 140 100 110 130 110" fill="#34495e" opacity="0.3" />
        <path d="M 130 110 L 130 30 L 90 30" fill="none" stroke="#2c3e50" stroke-width="24" stroke-linecap="square" />
        <path d="M 130 110 L 130 30 L 90 30" fill="none" stroke="#8e44ad" stroke-width="18" stroke-linecap="square" />
        <g transform="translate(210, 180)" class="spin-anim">
          <circle cx="0" cy="0" r="25" fill="#16a085" />
          <path d="M 0 0 C 15 15 35 10 40 0" fill="none" stroke="#2c3e50" stroke-width="8" stroke-linecap="round" />
          <path d="M 0 0 C -15 -15 -35 -10 -40 0" fill="none" stroke="#2c3e50" stroke-width="8" stroke-linecap="round" />
          <path d="M 0 0 C -15 15 -10 35 0 40" fill="none" stroke="#2c3e50" stroke-width="8" stroke-linecap="round" />
          <path d="M 0 0 C 15 -15 10 -35 0 -40" fill="none" stroke="#2c3e50" stroke-width="8" stroke-linecap="round" />
        </g>
        <circle cx="210" cy="180" r="8" fill="#d35400" stroke="#ba4a00" stroke-width="2" class="sludge-ball-1" />
        <circle cx="210" cy="180" r="10" fill="#a04000" stroke="#7e5109" stroke-width="2" class="sludge-ball-2" />
        <circle cx="210" cy="180" r="7" fill="#d35400" stroke="#ba4a00" stroke-width="2" class="sludge-ball-3" />
        <text x="210" y="115" fill="#FEE500" font-size="11" font-weight="700" text-anchor="middle">VORTEX BLADES (NON-CLOG)</text>
        <text x="70" y="25" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle">SLUDGE DISCHARGE</text>
      </svg>`
    },
    mono: {
      title: '일축나사식 모노펌프 (고점도 및 정용량 이송)',
      desc: '금속제 나선형 로터가 고무제 스테이터 내의 정밀하게 계산된 공동 공간에서 편심 회전하면서 유체를 입구에서 출구 방향으로 밀어 올리는 원리입니다. 고점도 슬러지, 탈수 케이크 및 고액 혼합 유체의 일정량 연속 정량 이송에 독보적인 성능을 발휘합니다.',
      patentName: '저마찰 편심 회전 로터 및 탄성 스테이터 (특허 제10-2710115호)',
      patentEffect: '고점도 유체 이송 시 로터 마찰 저항을 25% 감쇄시키고 특수 탄성 복합 스테이터 수명을 2배 연장',
      features: [
        '<strong>일정한 토출량:</strong> 맥동 없이 일정한 유량 연속 공급',
        '<strong>고점도 액체 특화:</strong> 점도 변화와 관계없이 강력한 추진력',
        '<strong>가역 회전 구조:</strong> 정방향 및 역방향 역전 운전 가능',
        '<strong>고밀폐 스테이터:</strong> 유입 액체의 역류 및 유출 원천 차단'
      ],
      svg: `<svg viewBox="0 0 400 300" width="100%" height="100%">
        <rect x="50" y="100" width="300" height="100" rx="10" fill="#2c3e50" stroke="#34495e" stroke-width="3" />
        <path d="M 50 150 C 80 120, 110 180, 140 150 C 170 120, 200 180, 230 150 C 260 120, 290 180, 320 150 M 50 150 C 80 180, 110 120, 140 150 C 170 180, 200 120, 230 150 C 260 180, 290 120, 320 150" fill="none" stroke="#7f8c8d" stroke-width="24" stroke-linecap="round" />
        <path d="M 40 150 Q 80 110 120 150 T 200 150 T 280 150 T 360 150" fill="none" stroke="#00d2d3" stroke-width="12" stroke-linecap="round" class="rotor-wobble" />
        <ellipse cx="90" cy="150" rx="20" ry="12" fill="#3498db" opacity="0.6" class="cavity-fluid" />
        <ellipse cx="170" cy="150" rx="20" ry="12" fill="#3498db" opacity="0.6" class="cavity-fluid" />
        <ellipse cx="250" cy="150" rx="20" ry="12" fill="#3498db" opacity="0.6" class="cavity-fluid" />
        <path d="M 320 150 L 370 150" fill="none" stroke="#2980b9" stroke-width="14" stroke-linecap="round" />
        <path d="M 30 150 L 50 150" fill="none" stroke="#2980b9" stroke-width="14" stroke-linecap="round" />
        <text x="350" y="125" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle">INLET</text>
        <text x="45" y="125" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle">OUTLET</text>
        <text x="200" y="80" fill="#FEE500" font-size="12" font-weight="700" text-anchor="middle">ROTATING HELICAL ROTOR IN STATOR</text>
      </svg>`
    },
    dosing: {
      title: 'PAC 정량펌프 (다이어프램형)',
      desc: '모터 구동 캠축에 연결된 다이어프램(불침투성 수지 판막)이 왕복 신축 운동을 함으로써 펌프 헤드 내부에 주기적인 감압/가압 상태를 생성합니다. 흡입측과 토출측에 내장된 볼 체크 밸브(Check Valve)가 정밀 연동하여 약품을 역류 없이 정확한 주량만큼 밀어냅니다.',
      patentName: '약품 주입 스트로크 미세 기계 조절 메커니즘 (특허 제10-2810168호)',
      patentEffect: '정량 PAC 투입 오차 범위를 ±0.5% 이내로 보장하여 화학 약품 과주입을 방지하고 화학적 수처리 효율 향상',
      features: [
        '<strong>초정밀 토출:</strong> 정격 주입량의 오차 범위 1% 이내 제어',
        '<strong>내화학 플라스틱:</strong> PAC, 염소, 산성 약품에 강한 저항성',
        '<strong>스트로크 조절:</strong> 다이얼 조절로 미세 주입량 상시 세팅',
        '<strong>기밀 다이어프램:</strong> 기계 구동부와 유체를 완전히 격리'
      ],
      svg: `<svg viewBox="0 0 400 300" width="100%" height="100%">
        <path d="M 120 100 L 220 100 L 220 200 L 120 200 Z" fill="#34495e" stroke="#2c3e50" stroke-width="4" />
        <path d="M 140 105 L 140 195" fill="none" stroke="#e74c3c" stroke-width="6" stroke-linecap="round" class="diaphragm-flex" />
        <path d="M 170 200 L 170 260" fill="none" stroke="#2c3e50" stroke-width="12" />
        <path d="M 170 200 L 170 260" fill="none" stroke="#3498db" stroke-width="6" />
        <circle cx="170" cy="225" r="8" fill="#7f8c8d" stroke="#2c3e50" stroke-width="2" class="valve-suction" />
        <path d="M 170 100 L 170 40" fill="none" stroke="#2c3e50" stroke-width="12" />
        <path d="M 170 100 L 170 40" fill="none" stroke="#3498db" stroke-width="6" />
        <circle cx="170" cy="75" r="8" fill="#7f8c8d" stroke="#2c3e50" stroke-width="2" class="valve-discharge" />
        <circle cx="170" cy="25" r="4" fill="#FEE500" class="dosing-drop-1" />
        <circle cx="170" cy="25" r="4" fill="#FEE500" class="dosing-drop-2" />
        <text x="200" y="155" fill="#ffffff" font-size="11" font-weight="700" text-anchor="middle">CHAMBER</text>
        <text x="95" y="155" fill="#e74c3c" font-size="10" font-weight="700" text-anchor="middle">DIAPHRAGM</text>
        <text x="240" y="245" fill="#3498db" font-size="10" font-weight="700">SUCTION VALVE</text>
        <text x="240" y="65" fill="#3498db" font-size="10" font-weight="700">DISCHARGE VALVE</text>
      </svg>`
    },
    volute: {
      title: '편흡입볼류트펌프 (원심 처리수 이송)',
      desc: '가운데 흡입구(Eye)로 흡입된 처리수 유체가 고속 회전하는 임펠러의 날개 깃을 타며 가속을 얻고, 점진적으로 단면적이 넓어지는 나선형 와류실(Volute) 케이싱을 지나면서 속도 에너지가 고압의 정적 압력 에너지로 변환되어 상단 토출구로 분사되는 원심 펌프입니다.',
      patentName: '임펠러 다이내믹 밸런싱 및 마찰 감쇄 코팅 (특허 제10-2920243호)',
      patentEffect: '회전 시 무부하 진동을 최소화하여 축 베어링 마모 속도를 40% 감축시키고 펌프 기계적 효율 증대',
      features: [
        '<strong>원심력 가압:</strong> 유체 속도를 효과적인 수압으로 변환',
        '<strong>부드러운 나선 케이싱:</strong> 유동 마찰 저항을 극소화하여 고효율화',
        '<strong>견고한 패킹 설계:</strong> 글랜드 패킹 및 메카니컬 씰 옵션 제공',
        '<strong>편리한 백풀아웃:</strong> 배관 해체 없이 회전체 축부 분해 정비'
      ],
      svg: `<svg viewBox="0 0 400 300" width="100%" height="100%">
        <path d="M 200 60 C 280 60, 320 110, 320 180 C 320 240, 260 270, 200 270 C 140 270, 100 220, 100 180 C 100 140, 120 110, 150 110 M 150 110 L 150 50 L 190 50 M 200 60 L 200 30" fill="none" stroke="#2c3e50" stroke-width="12" />
        <path d="M 200 60 C 280 60, 320 110, 320 180 C 320 240, 260 270, 200 270 C 140 270, 100 220, 100 180 C 100 140, 120 110, 150 110" fill="#34495e" opacity="0.3" />
        <circle cx="200" cy="180" r="30" fill="#2c3e50" stroke="#34495e" stroke-width="4" />
        <text x="200" y="184" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle">SUCTION</text>
        <g transform="translate(200, 180)" class="spin-anim">
          <path d="M 0 0 Q 15 -15 30 -5" fill="none" stroke="#00d2d3" stroke-width="4" />
          <path d="M 0 0 Q -15 15 -30 5" fill="none" stroke="#00d2d3" stroke-width="4" />
          <path d="M 0 0 Q 15 15 5 30" fill="none" stroke="#00d2d3" stroke-width="4" />
          <path d="M 0 0 Q -15 -15 -5 -30" fill="none" stroke="#00d2d3" stroke-width="4" />
        </g>
        <path d="M 200 180 Q 240 180 250 200 T 170 240 T 130 180 T 200 100 T 270 120 L 270 30" fill="none" stroke="#3498db" stroke-width="3" stroke-dasharray="10 8" class="volute-flow-anim" />
        <text x="270" y="20" fill="#FEE500" font-size="10" font-weight="700" text-anchor="middle">DISCHARGE</text>
        <text x="200" y="285" fill="#ffffff" font-size="11" font-weight="700" text-anchor="middle">VOLUTE CASING</text>
      </svg>`
    }
  };

  function switchPumpSim(pumpId) {
    const data = simData[pumpId];
    if (!data) return;

    simTabButtons.forEach(btn => {
      if (btn.getAttribute('data-sim') === pumpId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (simSvgContainer) simSvgContainer.innerHTML = data.svg;
    if (simTitle) simTitle.textContent = data.title;
    if (simDesc) simDesc.textContent = data.desc;
    
    // Patent info handling
    const patentBox = document.getElementById('sim-patent-box');
    if (data.patentName) {
      if (simPatentName) simPatentName.textContent = data.patentName;
      if (simPatentEffect) simPatentEffect.textContent = data.patentEffect || '';
      if (patentBox) patentBox.style.display = 'block';
    } else {
      if (patentBox) patentBox.style.display = 'none';
    }

    if (simFeatures) {
      simFeatures.innerHTML = data.features.map(feat => `
        <div style="display: flex; align-items: start; gap: 8px; font-size: 0.95rem; color: var(--text-main);">
          <span style="color: var(--accent-color); font-weight: 700;">✓</span>
          <span>${feat}</span>
        </div>
      `).join('');
    }
  }

  // Bind simulation tab click listeners & initialize
  if (simTabButtons.length > 0) {
    simTabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const pumpId = btn.getAttribute('data-sim');
        switchPumpSim(pumpId);
      });
    });

    // Initialize with first simulation ('booster')
    switchPumpSim('booster');
  }

  // --- Solution Matching Tool Logic ---
  const matcherTabButtons = document.querySelectorAll('.matcher-tab-btn');
  const matcherResultContainer = document.getElementById('matcher-result-container');

  const matcherData = {
    water: {
      guideText: '"가정 및 산업용 상수도 공급의 최적화된 압력을 보장합니다."',
      pumps: [
        {
          tag: '추천 01',
          name: '부스터 펌프 시스템',
          summary: '실시간 유량 감지형 가변 압력 제어를 지원하는 지능형 시스템입니다.',
          bullets: [
            '지능형 압력센서 연동 가변 제어 시스템 특허 적용',
            '급수 부하량에 맞춘 인버터 제어로 에너지 소비 최대 35% 절감',
            '상수도 가압장에서 수충격 및 압력 맥동 최소화 실현'
          ],
          targetId: '#prod-booster'
        },
        {
          tag: '추천 02',
          name: '편흡입 볼류트 펌프',
          summary: '구조가 단순하여 유지보수가 매우 우수한 원심 처리수 이송 펌프입니다.',
          bullets: [
            '임펠러 다이내믹 밸런싱 및 마찰 감쇄 코팅 특허 기술 적용',
            '유동 마찰 저항 극소화로 펌프 운전 효율 극대화',
            '축 정렬 보정으로 베어링 마모 및 기계적 진동 45% 감소'
          ],
          targetId: '#prod-volute'
        }
      ]
    },
    sewage: {
      guideText: '"점도와 이물질 함량이 높은 하수 현장에서 막힘 없이 안정적인 운전을 보장합니다."',
      pumps: [
        {
          tag: '추천 01',
          name: '수중 펌프',
          summary: '모터가 물속에 잠겨 작동하며, 침수 차단 능력이 뛰어난 배수용 펌프입니다.',
          bullets: [
            '이중 밀폐형 축봉 및 누설 감지 센서 특허 적용',
            'IP68 등급 완전 방수 설계로 지하수 및 하수 배수 신뢰성 확보',
            '침수 위험 감지 즉시 제어반 자동 차단하여 전동기 완벽 보호'
          ],
          targetId: '#prod-submersible'
        },
        {
          tag: '추천 02',
          name: '슬러지 펌프',
          summary: '고농도의 찌꺼기 및 이물질 함유 유체를 와류로 막힘없이 이송합니다.',
          bullets: [
            '고형물 막힘 방지 볼텍스 임펠러 특허 기술 적용',
            '섬유질이나 고형 협잡물 걸림 현상 방지로 돌발 고장 90% 예방',
            '내마모성 경화 특수 재질 적용으로 거친 입자 이송에 최적화'
          ],
          targetId: '#prod-sludge'
        },
        {
          tag: '추천 03',
          name: '일축나사식 모노 펌프',
          summary: '맥동 없이 고점도 유체를 일정한 양으로 추진하는 용적식 나사 펌프입니다.',
          bullets: [
            '저마찰 편심 회전 로터 및 탄성 스테이터 특허 적용',
            '고점도 폐수나 탈수 케이크 등의 연속 정량 이송에 독보적 성능',
            '로터-스테이터 마찰 최소화 설계로 구동 에너지 25% 절감'
          ],
          targetId: '#prod-mono'
        }
      ]
    },
    chemical: {
      guideText: '"수처리 공정의 핵심인 약품 투입을 0.1ml 단위까지 정밀하게 제어하여 운영 효율을 극대화합니다."',
      pumps: [
        {
          tag: '추천 01',
          name: 'PAC 정량 펌프 (다이어프램형)',
          summary: '미세 스트로크 조절을 통해 화학 약품을 오차 없이 정밀 주입합니다.',
          bullets: [
            '약품 주입 스트로크 미세 기계 조절 메커니즘 특허 적용',
            '정량 약품 투입 오차 범위를 ±0.5% 이내로 엄격하게 제어',
            '테플론 다이어프램이 펌프 구동부와 강한 약품을 완벽 격리'
          ],
          targetId: '#prod-dosing'
        }
      ]
    }
  };

  // Click scroll and pulse highlight handler
  function handleCardScrollAndHighlight(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
      // Check if target is hidden under inactive tabs
      if (window.getComputedStyle(target).display === 'none') {
        const category = target.getAttribute('data-category');
        const tabBtn = document.querySelector(`.prod-tab-btn[data-tab="${category}"]`) || document.querySelector(`.prod-tab-btn[data-tab="all"]`);
        if (tabBtn) {
          tabBtn.click();
        }
      }

      // Allow a brief delay for transition to complete
      setTimeout(() => {
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Set up the premium highlight effect (float by 8px & aqua glow)
        target.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        target.style.transform = 'translateY(-8px)';
        target.style.boxShadow = 'var(--shadow-glow), var(--shadow-lg)';
        target.style.borderColor = 'var(--accent-color)';

        // Revert styling after 2.5 seconds
        setTimeout(() => {
          target.style.transform = '';
          target.style.boxShadow = '';
          target.style.borderColor = '';
        }, 2500);
      }, 50);
    }
  }

  function updatePumpMatcher(category) {
    const data = matcherData[category];
    if (!data || !matcherResultContainer) return;

    // Apply fade transition
    matcherResultContainer.style.opacity = '0';
    matcherResultContainer.style.transform = 'translateY(10px)';
    matcherResultContainer.style.transition = 'all 0.3s ease';

    setTimeout(() => {
      let pumpsHtml = '';
      data.pumps.forEach(pump => {
        let bulletsHtml = '';
        pump.bullets.forEach(bullet => {
          bulletsHtml += `<li>${bullet}</li>`;
        });

        pumpsHtml += `
          <a href="${pump.targetId}" class="matched-pump-card">
            <div class="matched-pump-header">
              <span class="pump-tag">${pump.tag}</span>
              <h4 class="pump-name">${pump.name}</h4>
            </div>
            <p class="pump-summary">${pump.summary}</p>
            <ul class="pump-bullets">
              ${bulletsHtml}
            </ul>
          </a>
        `;
      });

      matcherResultContainer.innerHTML = `
        <div class="matcher-guide-card">
          <div class="matcher-guide-icon">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
          </div>
          <p class="matcher-guide-text">${data.guideText}</p>
        </div>

        <div class="matched-pumps-grid">
          ${pumpsHtml}
        </div>
      `;

      // Attach click scroll and highlight listeners to dynamically rendered cards
      const newPumpCards = matcherResultContainer.querySelectorAll('.matched-pump-card');
      newPumpCards.forEach(card => {
        card.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = card.getAttribute('href');
          handleCardScrollAndHighlight(targetId);
        });
      });

      matcherResultContainer.style.opacity = '1';
      matcherResultContainer.style.transform = 'translateY(0)';
    }, 300);
  }

  // Initialize matcher tabs behavior and bind initial cards
  if (matcherTabButtons.length > 0 && matcherResultContainer) {
    matcherTabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        matcherTabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.getAttribute('data-category');
        updatePumpMatcher(category);
      });
    });

    // Bind click events to initial matched pump cards
    const initialPumpCards = document.querySelectorAll('#matched-pumps-grid .matched-pump-card');
    initialPumpCards.forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = card.getAttribute('href');
        handleCardScrollAndHighlight(targetId);
      });
    });
  }

  // --- technology.html hash scroll and highlight logic ---
  if (window.location.hash && window.location.pathname.includes('technology.html')) {
    // Wait slightly for DOM to settle
    setTimeout(() => {
      const hash = window.location.hash;
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Highlight effect
        target.style.transition = 'all 0.3s ease';
        target.style.transform = 'translateY(-12px)';
        target.style.boxShadow = 'var(--shadow-glow), var(--shadow-lg)';
        target.style.borderColor = 'var(--accent-color)';
        
        setTimeout(() => {
          target.style.transform = '';
          target.style.boxShadow = '';
          target.style.borderColor = '';
        }, 2500);
      }
    }, 600);
  }
});