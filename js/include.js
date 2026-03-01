/**
 * Loads HTML partials and initializes component-specific logic
 */
async function includeHTML(file, elementId) {
    const container = document.getElementById(elementId);
    if (!container) return;

    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Could not fetch ${file}`);
        
        const html = await response.text();
        container.innerHTML = html;

        // Re-initialize menu logic ONLY after header.html is fully injected
        if (elementId === 'header') {
            initMenuToggle();
        }
    } catch (error) {
        console.error("Error loading partial:", error);
    }
}

/**
 * Consolidated menu toggle logic
 */
function initMenuToggle() {
    // Select by class to match your header.html structure
    const menuBtn = document.querySelector('.menu-toggle-pill');
    const overlay = document.getElementById('fullScreenMenu');

    if (menuBtn && overlay) {
        menuBtn.addEventListener('click', () => {
            // Toggle classes for both button (for the X morph) and the overlay
            menuBtn.classList.toggle('is-active');
            overlay.classList.toggle('is-active');
            
            // Prevent background scrolling while menu is open
            document.body.style.overflow = overlay.classList.contains('is-active') ? 'hidden' : '';
            
            console.log("Menu toggled successfully.");
        });
    } else {
        console.warn("Menu button or overlay not found in DOM.");
    }
}

// Initial load on page ready
document.addEventListener('DOMContentLoaded', () => {
    includeHTML('partials/header.html', 'header');
    includeHTML('partials/footer.html', 'footer'); 
});


document.getElementById('menuToggle').addEventListener('click', function() {
    this.classList.toggle('is-active');
    // document.querySelector('.menu-overlay').classList.toggle('is-active');
});

const menuToggle = document.getElementById('menuToggle');
const menuClose = document.getElementById('menuClose');
const fullScreenMenu = document.getElementById('fullScreenMenu');

// Open menu
menuToggle.addEventListener('click', () => {
  fullScreenMenu.style.display = 'flex';
});

// Close menu
menuClose.addEventListener('click', () => {
  fullScreenMenu.style.display = 'none';
});

