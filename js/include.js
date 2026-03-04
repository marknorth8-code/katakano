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

        // Initialize menu AFTER header loads
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

    const menuOverlay = document.getElementById("menuOverlay");
    const menuToggle = document.querySelector(".menu-toggle");
    const menuClose = document.querySelector(".menu-close");

    if (!menuOverlay || !menuToggle || !menuClose) {
        console.warn("Menu elements not found.");
        return;
    }

    // Prevent double-binding if function runs again
    if (menuOverlay.dataset.initialized === "true") return;
    menuOverlay.dataset.initialized = "true";

    const openMenu = () => {
        menuOverlay.classList.add("active");
        document.body.classList.add("menu-open");
    };

    const closeMenu = () => {
        menuOverlay.classList.remove("active");
        document.body.classList.remove("menu-open");
    };

    // OPEN
    menuToggle.addEventListener("click", (e) => {
        e.preventDefault();
        openMenu();
    });

    // CLOSE (X button)
    menuClose.addEventListener("click", (e) => {
        e.preventDefault();
        closeMenu();
    });

    // CLOSE when link clicked
    const links = menuOverlay.querySelectorAll("a");
    links.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // CLOSE on ESC key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeMenu();
        }
    });

    // CLOSE if clicking outside nav content
    menuOverlay.addEventListener("click", (e) => {
        if (e.target === menuOverlay) {
            closeMenu();
        }
    });
}


/**
 * Initial load
 */
document.addEventListener('DOMContentLoaded', () => {
    includeHTML('partials/header.html', 'header');
    includeHTML('partials/footer.html', 'footer');
});
