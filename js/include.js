/**
 * js/include-header.js
 * Loads HTML partials and initializes interactive elements
 */

async function loadPartials() {
    // 1. Identify where the header and footer go
    const headerContainer = document.getElementById('header-holder');
    const footerContainer = document.getElementById('footer-holder');

    try {
        // 2. Load the Header first
        if (headerContainer) {
            const hResponse = await fetch('partials/header.html');
            if (!hResponse.ok) throw new Error(`Header status: ${hResponse.status}`);
            headerContainer.innerHTML = await hResponse.text();
            
            // 3. IMPORTANT: Re-initialize the menu toggle after the header exists in the DOM
            initMenuToggle(); 
        }

        // 4. Load the Footer
        if (footerContainer) {
            const fResponse = await fetch('partials/footer.html');
            if (!fResponse.ok) throw new Error(`Footer status: ${fResponse.status}`);
            footerContainer.innerHTML = await fResponse.text();
        }
    } catch (error) {
        console.error("Error loading partials:", error);
    }
}

/**
 * Re-binds the Menu Toggle logic to the new HTML elements
 */
function initMenuToggle() {
    const menuBtn = document.getElementById('menuToggle');
    const overlay = document.getElementById('fullScreenMenu');
    const body = document.body;

    if (menuBtn && overlay) {
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = overlay.classList.toggle('is-open');
            body.classList.toggle('menu-open');
            body.style.overflow = isOpen ? 'hidden' : ''; 
        });

        // Ensure links inside the menu close it when clicked
        const links = overlay.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                overlay.classList.remove('is-open');
                body.classList.remove('menu-open');
                body.style.overflow = '';
            });
        });
        console.log("Menu initialized.");
    } else {
        console.warn("Could not find #menuToggle or #fullScreenMenu in header.html");
    }
}

// Start the loading process
document.addEventListener('DOMContentLoaded', loadPartials);

