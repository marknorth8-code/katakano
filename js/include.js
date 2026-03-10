/**
 * js/include-header.js
 * Loads HTML partials and initializes the floating pill menu.
 * Only targets the menu overlay and its specific toggle button.
 */

async function loadPartials() {
    const headerContainer = document.getElementById('header-holder');
    const footerContainer = document.getElementById('footer-holder');

    /* --- LOAD HEADER --- */
    if (headerContainer) {
        try {
            // Using Fetch API to get the partial file
            const response = await fetch('./partials/header.html');
            if (!response.ok) throw new Error(`Header fetch failed: ${response.status}`);
            
            const headerHTML = await response.text();
            headerContainer.innerHTML = headerHTML;

            // Initialize menu logic immediately after injection
            initMenuToggle();
        } catch (error) {
            console.error("Error loading header:", error);
        }
    }

    /* --- LOAD FOOTER --- */
    if (footerContainer) {
        try {
            const response = await fetch('./partials/footer.html');
            if (!response.ok) throw new Error(`Footer fetch failed: ${response.status}`);
            
            footerContainer.innerHTML = await response.text();
        } catch (error) {
            console.error("Error loading footer:", error);
        }
    }
}

/**
 * Initialize Menu Toggle
 * Manages the "MENU" to "CLOSE" transition and overlay visibility.
 */
function initMenuToggle() {
    const menuBtn = document.getElementById('menuToggle');
    const overlay = document.querySelector('.menu-overlay');
    const body = document.body;

    // Safety check to ensure elements exist in the partial
    if (!menuBtn || !overlay) {
        return;
    }

    // Main Toggle Event
    menuBtn.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Toggle 'is-open' for the overlay and 'menu-open' for global CSS hooks
        const isOpen = overlay.classList.toggle('is-open');
        body.classList.toggle('menu-open', isOpen);
        
        // Prevent background scrolling while menu is active
        body.style.overflow = isOpen ? 'hidden' : '';
        
        // Update ARIA for screen readers
        menuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu automatically when any internal link is clicked
    const links = overlay.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            overlay.classList.remove('is-open');
            body.classList.remove('menu-open');
            body.style.overflow = '';
            menuBtn.setAttribute('aria-expanded', 'false');
        });
    });
}

// Modern best practice: Run after DOM is fully parsed
document.addEventListener('DOMContentLoaded', loadPartials);

