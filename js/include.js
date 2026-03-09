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

        // FIXED: Check for 'header-holder' instead of 'header'
        if (elementId === 'header-holder') {
            initMenuToggle();
        }
    } catch (error) {
        console.error("Error loading partial:", error);
    }
}

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

        const links = overlay.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                overlay.classList.remove('is-open');
                body.classList.remove('menu-open');
                body.style.overflow = '';
            });
        });
    } else {
        console.warn("Menu components not found.");
    }
}

// Kick off the loading process once
document.addEventListener('DOMContentLoaded', () => {
       includeHTML('/partials/header.html', 'header-holder');
    includeHTML('partials/footer.html', 'footer-holder'); 
    
});
