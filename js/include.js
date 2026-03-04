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

    // OPEN MENU
    menuToggle.addEventListener("click", (e) => {
        e.preventDefault();
        menuOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
    });

    // CLOSE MENU (X button)
    menuClose.addEventListener("click", (e) => {
        e.preventDefault();
        menuOverlay.classList.remove("active");
        document.body.style.overflow = "";
    });

    // CLOSE MENU when link clicked
    const links = menuOverlay.querySelectorAll("a");
    links.forEach(link => {
        link.addEventListener("click", () => {
            menuOverlay.classList.remove("active");
            document.body.style.overflow = "";
        });
    });
}


/**
 * Initial load
 */
document.addEventListener('DOMContentLoaded', () => {
    includeHTML('partials/header.html', 'header');
    includeHTML('partials/footer.html', 'footer');
});
