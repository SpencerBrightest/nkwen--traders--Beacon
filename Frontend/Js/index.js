/**
 * Nkwen Traders - Homepage Interactivity
 * This file handles the UI logic for the homepage, including the mobile sidebar
 * and the sticky header scroll effect.
 */

document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    initStickyHeader();
});

/**
 * Initializes the mobile sidebar navigation toggle logic.
 * Handles opening/closing via buttons and clicking on the overlay.
 */
function initSidebar() {
    const openBtn = document.getElementById('openSidebarBtn');
    const closeBtn = document.getElementById('closeSidebarBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    // Edge case handling: Ensure elements exist before binding events
    if (!openBtn || !closeBtn || !sidebar || !overlay) {
        console.warn('Sidebar elements are missing from the DOM.');
        return;
    }

    const openSidebar = () => {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        // Prevent body scrolling when menu is open
        document.body.style.overflow = 'hidden'; 
    };

    const closeSidebar = () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        // Restore body scrolling
        document.body.style.overflow = ''; 
    };

    // Event Listeners
    openBtn.addEventListener('click', openSidebar);
    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);
}

/**
 * Initializes the sticky header effect.
 * Changes the header background from transparent to solid when scrolling down.
 */
function initStickyHeader() {
    const header = document.getElementById('mainHeader');

    // Edge case handling: Ensure header exists
    if (!header) {
        console.warn('Main header element is missing from the DOM.');
        return;
    }

    const handleScroll = () => {
        // If user scrolls down more than 50px, add 'scrolled' class
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Check initial state on load in case the page is refreshed while scrolled down
    handleScroll();
}
