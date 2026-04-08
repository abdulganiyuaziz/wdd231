/**
 * Main Application Entry Point
 * Initializes all modules when DOM is ready
 * 
 * Modules imported:
 * - navigation.js: Handles responsive navigation and hamburger menu
 * - fetch.js: Handles data fetching and project display
 * - form.js: Handles contact form submission and local storage
 */

import { setupNavigation } from './navigation.js';
import { setupProjects } from './fetch.js';
import { setupContactForm } from './form.js';

/**
 * Initialize application when DOM is fully loaded
 * This ensures all HTML elements are available before attaching event listeners
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation with responsive hamburger menu
    setupNavigation();

    // Initialize projects page if projectsGrid element exists
    const projectsGrid = document.getElementById('projectsGrid');
    if (projectsGrid) {
        setupProjects();
    }

    // Initialize contact form if contactForm element exists
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        setupContactForm();
    }
});
