/**
 * Navigation Module
 * Handles responsive navigation with hamburger menu for mobile devices
 * Features:
 * - Toggle hamburger menu on click
 * - Close menu when navigation link is clicked
 * - Close menu when clicking outside navbar
 * - Full accessibility support with ARIA attributes
 */

/**
 * Initialize responsive navigation menu
 * Sets up event listeners for hamburger menu and navigation links
 * Supports both desktop and mobile views
 */
export function setupNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navMenu) {
        console.warn('Navigation elements not found');
        return;
    }

    /**
     * Toggle navigation menu visibility
     * Updates aria-expanded attribute for accessibility
     */
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isExpanded.toString());
    });

    /**
     * Close menu when a navigation link is clicked
     * User navigates to a new page or section
     */
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    /**
     * Close menu when clicking outside the navbar
     * Provides better UX by closing menu on outside click
     */
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
}
