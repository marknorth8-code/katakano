/**
 * js/include-header.js
 * Loads HTML partials (Header/Footer) and initializes logic
 */

async function loadPartials() {
    // 1. Define the elements and their source files
    const partials = [
        { file: 'partials/header.html', elementId: 'header-holder' },
        { file: 'partials/footer.html', elementId: 'footer-holder' }
    ];

    // 2. Loop through and fetch each partial
    for (const partial of partials) {
        const container = document.getElementById(partial.elementId);
        
        if (container) {
            try {
                const response = await fetch(partial.file);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                
                const html = await response.text();
                container.innerHTML = html;

                // 3. If we just loaded the header, initialize the menu buttons
                if (partial.elementId === 'header-holder') {
                    initMenuToggle();
                }
            } catch (error) {
                console.error(`Error loading ${partial.file}:`, error);
            }
        }
    }
}

/**
 * Logic for the "Floating Pills" Menu and Overlay
 */
function initMenuToggle() {
    const menuBtn = document.getElementById('menuToggle');
    const overlay = document.getElementById('fullScreenMenu');
    const body = document.body;

    // Check if the elements exist in the injected HTML
    if (menuBtn && overlay) {
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Toggle the visibility classes defined in your CSS
            const isOpen = overlay.classList.toggle('is-open');
            body.classList.toggle('menu-open');
            
            // Prevent scrolling when menu is open
            body.style.overflow = isOpen ? 'hidden' : ''; 
        });

        // Close menu when a link inside the overlay is clicked
        const links = overlay.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                overlay.classList.remove('is-open');
                body.classList.remove('menu-open');
                body.style.overflow = '';
            });
        });
        
        console.log("Navigation initialized successfully.");
    } else {
        console.warn("Menu components (menuToggle or fullScreenMenu) not found in header.html");
    }
}

// Kick off the process as soon as the DOM is ready
document.addEventListener('DOMContentLoaded', loadPartials);

