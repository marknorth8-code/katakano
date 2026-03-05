/**
 * Loads HTML partials (Header/Footer) and initializes logic
 */
async function includeHTML(file, elementId) {
    const container = document.getElementById(elementId);
    if (!container) return;

    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Could not fetch ${file}`);
        
        const html = await response.text();
        container.innerHTML = html;

        // Start menu logic ONLY after the header is injected
        if (elementId === 'header') {
            initMenuToggle();
        }
    } catch (error) {
        console.error("Error loading partial:", error);
    }
}

/**
 * Master Controller for the Morphing Menu
 */
function initMenuToggle() {
    const menuBtn = document.getElementById('menuToggle');
    const overlay = document.getElementById('fullScreenMenu');
    const body = document.body;

    if (menuBtn && overlay) {
        // Toggle everything based on the single header button
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const isOpen = overlay.classList.toggle('is-open');
            body.classList.toggle('menu-open'); // Triggers CSS X-morph & Button colors
            
            // Handle scrolling
            body.style.overflow = isOpen ? 'hidden' : ''; 
        });

        // Close when any link inside the overlay is clicked
        const links = overlay.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                overlay.classList.remove('is-open');
                body.classList.remove('menu-open');
                body.style.overflow = '';
            });
        });

    } else {
        console.warn("Menu components not found. Ensure header.html contains: #menuToggle and #fullScreenMenu");
    }
}

// Kick off the loading process
document.addEventListener('DOMContentLoaded', () => {
    includeHTML('partials/header.html', 'header');
    includeHTML('partials/footer.html', 'footer'); 
});

