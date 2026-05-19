document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const initialPopup = document.getElementById('initial-popup');
    const closeInitialPopupBtn = document.getElementById('close-initial-popup');
    const campaignModal = document.getElementById('campaign-modal');
    const closeCampaignModalBtn = document.getElementById('close-campaign-modal');
    const navCampaignBtn = document.getElementById('nav-campaign');

    // Prevent body scroll when modal is open
    const toggleBodyScroll = (disable) => {
        if (disable) {
            document.body.style.overflow = 'hidden';
            // Prevent layout shift from scrollbar disappearing
            document.body.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + 'px';
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }
    };

    // 1. Initial Popup Logic
    if (initialPopup) {
        toggleBodyScroll(true);

        const closeInitial = () => {
            initialPopup.classList.remove('active');
            toggleBodyScroll(false);
        };

        // Close on X button
        if (closeInitialPopupBtn) {
            closeInitialPopupBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event bubbling
                closeInitial();
            });
        }

        // Close on ANY click inside the modal overlay 
        initialPopup.addEventListener('click', () => {
            closeInitial();
        });
    }

    // 2. Campaign Menu Click Logic
    if (navCampaignBtn && campaignModal) {
        navCampaignBtn.addEventListener('click', (e) => {
            e.preventDefault();
            campaignModal.classList.add('active');
            toggleBodyScroll(true);
        });

        const closeCampaign = () => {
            campaignModal.classList.remove('active');
            toggleBodyScroll(false);
        };

        // Close on X button
        if (closeCampaignModalBtn) {
            closeCampaignModalBtn.addEventListener('click', closeCampaign);
        }

        // Close on clicking outside the image (overlay click)
        campaignModal.addEventListener('click', (e) => {
            if (e.target === campaignModal) {
                closeCampaign();
            }
        });
    }

    // Navbar Scrolled Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
        }
    });
});
