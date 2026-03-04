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
            // Use the class defined in your CSS to show the menu
            overlay.classList.add('is-open'); 
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

        // AUTO-CLOSE when clicking links (crucial for navigation)
        const links = overlay.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                overlay.classList.remove('is-open');
                document.body.style.overflow = '';
            });
        });
        
    } else {
        // This will tell you exactly which ID is missing in your partial
        console.warn("Menu components missing. Required IDs: menuToggle, menuClose, fullScreenMenu");
    }
}
