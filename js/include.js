/**
 * Consolidated menu toggle logic for Omni-style menu
 */
function initMenuToggle() {
    const menuBtn = document.getElementById('menuToggle');
    const closeBtn = document.getElementById('menuClose');
    const overlay = document.getElementById('fullScreenMenu');

    if (menuBtn && overlay) {
        // OPEN MENU
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            overlay.classList.add('is-open'); // Triggers CSS .is-open { display: flex !important; }
            menuBtn.classList.add('is-active');
            document.body.style.overflow = 'hidden';
            console.log("Menu Opened");
        });

        // CLOSE MENU (The "X" Button)
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                overlay.classList.remove('is-open');
                menuBtn.classList.remove('is-active');
                document.body.style.overflow = '';
                console.log("Menu Closed");
            });
        }

        // AUTO-CLOSE on link click (important for single-page feel)
        const links = overlay.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                overlay.classList.remove('is-open');
                document.body.style.overflow = '';
            });
        });
        
    } else {
        console.warn("Menu components not found. Ensure header.html has IDs: menuToggle, fullScreenMenu, menuClose");
    }
}
