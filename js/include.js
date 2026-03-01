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

        // ONLY initialize logic after the HTML is injected
        if (elementId === 'header') {
            initMenuToggle();
        }
    } catch (error) {
        console.error("Error loading partial:", error);
    }
}

/**
 * Consolidated menu toggle logic for Omni-style menu
 */
function initMenuToggle() {
    const menuBtn = document.getElementById('menuToggle');
    const closeBtn = document.getElementById('menuClose');
    const overlay = document.getElementById('fullScreenMenu');

    if (menuBtn && overlay) {
        // OPEN MENU
        menuBtn.addEventListener('click', () => {
            overlay.style.display = 'flex'; // Shows the menu
            menuBtn.classList.add('is-active'); // For the pill morph animation
            document.body.style.overflow = 'hidden'; // Prevents background scroll
            console.log("Menu Opened");
        });

        // CLOSE MENU (The "X" Button)
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                overlay.style.display = 'none'; // Hides the menu
                menuBtn.classList.remove('is-active');
                document.body.style.overflow = ''; // Restores background scroll
                console.log("Menu Closed");
            });
        }
    } else {
        console.warn("Menu components not found. Ensure header.html has the correct IDs.");
    }
}

// Initial load on page ready
document.addEventListener('DOMContentLoaded', () => {
    // Adjust paths if your files are in a different folder
    includeHTML('partials/header.html', 'header');
    includeHTML('partials/footer.html', 'footer'); 
});
