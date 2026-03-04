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

        // IMPORTANT: Initialize menu AFTER header loads
        if (elementId === 'header') {
            initMenuToggle();
        }

    } catch (error) {
        console.error("Error loading partial:", error);
    }
}


/**
 * Premium Menu Toggle Logic
 */
function initMenuToggle() {

    const menuToggle = document.querySelector('.menu-toggle');
    const menuOverlay = document.getElementById('fullScreenMenu');
    const menuClose = document.querySelector('.menu-close');

    if (!menuToggle || !menuOverlay || !menuClose) {
        console.warn("Menu elements not found.");
        return;
    }

    // OPEN
    menuToggle.addEventListener('click', () => {
        menuOverlay.classList.add('active');
        document.body.classList.add('menu-open');
    });

    // CLOSE
    menuClose.addEventListener('click', () => {
        menuOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
}


/**
 * Initial load
 */
document.addEventListener('DOMContentLoaded', () => {
    includeHTML('partials/header.html', 'header');
    includeHTML('partials/footer.html', 'footer');
});
