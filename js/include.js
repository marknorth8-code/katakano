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

        // INITIALIZE logic after the HTML is injected
        if (elementId === 'header') {
            initMenuToggle();
        }
    } catch (error) {
        console.error("Error loading partial:", error);
    }
}

/**
 * Consolidated menu toggle logic - Matches your CSS classes
 */
const menuOverlay = document.getElementById("menuOverlay");
const menuToggle = document.querySelector(".menu-toggle");
const menuClose = document.querySelector(".menu-close");

menuToggle.addEventListener("click", () => {
  menuOverlay.classList.add("active");
});

menuClose.addEventListener("click", () => {
  menuOverlay.classList.remove("active");
});

    if (menuBtn && overlay) {
        // OPEN MENU
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Use classList to trigger your .is-open CSS
            overlay.classList.add('is-open'); 
            menuBtn.classList.add('is-active');
            document.body.style.overflow = 'hidden'; 
        });

        // CLOSE MENU
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                overlay.classList.remove('is-open');
                menuBtn.classList.remove('is-active');
                document.body.style.overflow = ''; 
            });
        }

        // Close when a link is clicked
        const links = overlay.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                overlay.classList.remove('is-open');
                document.body.style.overflow = '';
            });
        });

    } else {
        console.warn("Menu components not found. Ensure header.html has IDs: menuToggle, menuClose, fullScreenMenu");
    }
}

// Initial load on page ready - Keeps your Header and Footer loading logic
document.addEventListener('DOMContentLoaded', () => {
    includeHTML('partials/header.html', 'header');
    includeHTML('partials/footer.html', 'footer'); 
});
