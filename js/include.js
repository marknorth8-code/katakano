/**
 * Reusable function to load HTML partials into specific containers
 * @param {string} file - Path to the partial HTML file
 * @param {string} elementId - ID of the container element in the main page
 */
async function includeHTML(file, elementId) {
    const container = document.getElementById(elementId);
    if (!container) return; // Exit if the container isn't on the current page

    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Could not fetch ${file}`);
        
        const html = await response.text();
        container.innerHTML = html;

        // Re-initialize any listeners if the header was just loaded
        if (elementId === 'header') {
            initMenuToggle();
        }
    } catch (error) {
        console.error("Error loading partial:", error);
    }
}

/**
 * Logic for the floating menu toggle
 * This must be initialized AFTER the header is injected into the DOM
 */
function initMenuToggle() {
    const menuBtn = document.querySelector('.menu-toggle-lg');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            console.log("Menu clicked! Overlay logic goes here.");
            // You can add a class to the body to trigger a full-screen menu
            // document.body.classList.toggle('menu-open');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    includeHTML('partials/header.html', 'header');
    // Activate this line to load your footer
    includeHTML('partials/footer.html', 'footer'); 
});

const toggleBtn = document.getElementById('menuToggle');
const overlay = document.getElementById('fullScreenMenu');

toggleBtn.addEventListener('click', () => {
  toggleBtn.classList.toggle('is-active');
  overlay.classList.toggle('is-active');
  
  // Optional: Prevent background scrolling when menu is open
  document.body.style.overflow = overlay.classList.contains('is-active') ? 'hidden' : '';
});

