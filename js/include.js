/**
 * js/include-header.js
 * Loads HTML partials and initializes interactive elements
 */

async function loadPartials() {

    const headerContainer = document.getElementById('header-holder');
    const footerContainer = document.getElementById('footer-holder');

    try {

        /* ===============================
           Load Header
        =============================== */

        if (headerContainer) {

            const response = await fetch('./partials/header.html');

            if (!response.ok) {
                throw new Error(`Header status: ${response.status}`);
            }

            const headerHTML = await response.text();
            headerContainer.innerHTML = headerHTML;

            // Wait for DOM to update before initializing menu
            requestAnimationFrame(initMenuToggle);

        }

        /* ===============================
           Load Footer
        =============================== */

        if (footerContainer) {

            const response = await fetch('./partials/footer.html');

            if (!response.ok) {
                throw new Error(`Footer status: ${response.status}`);
            }

            footerContainer.innerHTML = await response.text();

        }

    } catch (error) {

        console.error("Error loading partials:", error);

    }

}


/**
 * Initialize Menu Toggle
 */

function initMenuToggle() {

    const menuBtn = document.getElementById('menuToggle');

    /* CSS uses .menu-overlay instead of #fullScreenMenu */
    const overlay = document.querySelector('.menu-overlay');

    const body = document.body;

    if (!menuBtn || !overlay) {

        console.warn("Menu elements not found.");
        return;

    }

    menuBtn.addEventListener('click', function (e) {

        e.preventDefault();

        const isOpen = overlay.classList.toggle('is-open');

        body.classList.toggle('menu-open');

        /* lock page scroll */
        body.style.overflow = isOpen ? 'hidden' : '';

    });


    /* Close menu when clicking a link */

    const links = overlay.querySelectorAll('a');

    links.forEach(link => {

        link.addEventListener('click', () => {

            overlay.classList.remove('is-open');

            body.classList.remove('menu-open');

            body.style.overflow = '';

        });

    });

    console.log("Menu initialized.");

}


/* Start after DOM ready */

document.addEventListener('DOMContentLoaded', loadPartials);
