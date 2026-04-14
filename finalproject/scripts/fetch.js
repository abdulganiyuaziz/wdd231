/**
 * Project Data Fetching Module
 * Handles fetching, displaying, filtering, and interacting with project data
 * Features:
 * - Asynchronous data fetching with error handling
 * - Dynamic project card generation
 * - Category-based filtering using array methods
 * - Modal dialog for detailed project view
 * - Local storage persistence
 */

// Store all projects data in module scope
let allProjects = [];

// Constants
const DATA_FILE = './data/data.json';
const STORAGE_KEY = 'projects';

/**
 * Initialize projects page by fetching and displaying data
 * Demonstrates asynchronous operations with try-catch error handling
 * 
 * @async
 * @throws Will log error and display user-friendly message if fetch fails
 */
export async function setupProjects() {
    try {
        // Fetch project data from local JSON file
        const response = await fetch(DATA_FILE);
        
        // Check if response is successful (status 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Parse JSON response
        const data = await response.json();
        allProjects = data.projects;
        
        // Initialize UI with data
        displayProjects(allProjects);
        setupFiltering();
        setupModal();
        
        // Persist data in local storage for offline access
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allProjects));
        
        console.log(`Successfully loaded ${allProjects.length} projects`);
    } catch (error) {
        console.error('Error fetching projects:', error);
        displayError('Failed to load projects. Please try again later.');
    }
}

/**
 * Display projects in grid layout
 * Clears existing content and renders project cards for each project
 * 
 * @param {Array<Object>} projects - Array of project objects to display
 */
function displayProjects(projects) {
    const projectsGrid = document.getElementById('projectsGrid');
    
    if (!projectsGrid) {
        console.warn('Projects grid element not found');
        return;
    }
    
    // Clear previous content
    projectsGrid.innerHTML = '';

    // Use forEach to iterate through projects and create cards
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

/**
 * Create a project card element with project information
 * Uses template literal for dynamic HTML generation
 * Displays 4+ data properties: title, category, description, technologies, date
 * 
 * @param {Object} project - Project object containing title, category, description, technologies, image
 * @returns {HTMLElement} Configured project card element
 */
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    // Use template literals to dynamically generate HTML
    card.innerHTML = `
        <div class="project-image">${project.image}</div>
        <div class="project-content">
            <div class="project-category">${project.category}</div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <p class="project-tech">Tech: ${project.technologies.join(', ')}</p>
        </div>
    `;

    // Add click event listener to open modal with project details
    card.addEventListener('click', () => {
        showProjectModal(project);
    });
    
    return card;
}

/**
 * Set up category filtering functionality
 * Uses array filter() method to filter projects by selected category
 * Updates displayed projects when filter selection changes
 */
function setupFiltering() {
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (!categoryFilter) {
        console.warn('Category filter element not found');
        return;
    }
    
    // Listen for category filter changes
    categoryFilter.addEventListener('change', (e) => {
        const selectedCategory = e.target.value;
        
        // Use array filter() method - demonstrates ES6 array method requirement
        const filteredProjects = selectedCategory === '' 
            ? allProjects 
            : allProjects.filter(project => project.category === selectedCategory);
        
        // Update display with filtered results
        displayProjects(filteredProjects);
    });
}

/**
 * Display detailed project information in modal dialog
 * Uses template literals and array map() method for technology list generation
 * Updates modal accessibility attributes
 * 
 * @param {Object} project - Project object to display in modal
 */
function showProjectModal(project) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal || !modalBody) {
        console.warn('Modal elements not found');
        return;
    }
    
    // Use template literal with map() array method for technology list
    modalBody.innerHTML = `
        <h2>${project.title}</h2>
        <div style="font-size: 3rem; margin: 1rem 0;">${project.image}</div>
        <p><strong>Category:</strong> ${project.category}</p>
        <p><strong>Description:</strong> ${project.description}</p>
        <p><strong>Technologies Used:</strong></p>
        <ul>
            ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
        </ul>
        <p><strong>Completed:</strong> ${project.date}</p>
    `;
    
    // Show modal and update accessibility
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
}

/**
 * Set up modal dialog event listeners and interactions
 * Features:
 * - Close button click handler
 * - Close on backdrop click
 * - Close on Escape key press
 * - Full accessibility support with ARIA attributes
 */
function setupModal() {
    const modal = document.getElementById('projectModal');
    const closeButton = document.getElementById('closeModal');
    
    if (!modal) {
        console.warn('Modal element not found');
        return;
    }

    // Close modal when close button is clicked
    if (closeButton) {
        closeButton.addEventListener('click', closeProjectModal);
    }

    // Close modal when clicking on the backdrop (outside modal content)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProjectModal();
        }
    });

    // Close modal when Escape key is pressed
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeProjectModal();
        }
    });
}

/**
 * Close the project modal and update accessibility attributes
 */
function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    }
}

/**
 * Display error message in projects grid
 * Called when data fetch fails
 * 
 * @param {string} message - Error message to display to user
 */
function displayError(message) {
    const projectsGrid = document.getElementById('projectsGrid');
    if (projectsGrid) {
        projectsGrid.innerHTML = `<p style="color: red; grid-column: 1/-1; text-align: center; padding: 2rem;">${message}</p>`;
    }
};
