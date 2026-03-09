/**
 * js/include-header.js
 * Loads HTML partials and initializes interactive elements
 */

async function loadPartials() {
    const headerContainer = document.getElementById('header-holder');
    const footerContainer = document.getElementById('footer-holder');

    /* --- LOAD HEADER --- */
    if (headerContainer) {
        try {
            const response = await fetch('./partials/header.html');
            if (!response.ok) throw new Error(`Header status: ${response.status}`);
            
            const headerHTML = await response.text();
            headerContainer.innerHTML = headerHTML;

            // Initialize menu immediately after HTML is injected
            initMenuToggle();
        } catch (error) {
            console.error("Error loading header:", error);
        }
    }

    /* --- LOAD FOOTER --- */
    if (footerContainer) {
        try {
            const response = await fetch('./partials/footer.html');
            if (!response.ok) throw new Error(`Footer status: ${response.status}`);
            
            footerContainer.innerHTML = await response.text();
        } catch (error) {
            console.error("Error loading footer:", error);
        }
    }
}

/**
 * Initialize Menu Toggle
 */
function initMenuToggle() {
    const menuBtn = document.getElementById('menuToggle');
    const overlay = document.querySelector('.menu-overlay');
    const body = document.body;

    if (!menuBtn || !overlay) {
        console.warn("Menu elements not found in the loaded header HTML.");
        return;
    }

    // Toggle Menu
    menuBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const isOpen = overlay.classList.toggle('is-open');
        body.classList.toggle('menu-open');
        
        // Lock/Unlock scroll
        body.style.overflow = isOpen ? 'hidden' : '';
        
        // Update ARIA for accessibility
        menuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking any link inside the overlay
    const links = overlay.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            overlay.classList.remove('is-open');
            body.classList.remove('menu-open');
            body.style.overflow = '';
            menuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    console.log("Menu navigation initialized.");
}

/* Start after DOM is ready */
document.addEventListener('DOMContentLoaded', loadPartials);
