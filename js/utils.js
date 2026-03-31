/**
 * Utility functions for reusable page components
 */

/**
 * Create and inject navigation into the page
 * @param {string} currentPage - The current page identifier (e.g., 'home', 'directory')
 */
function injectNavigation(currentPage = '') {
  const headerHTML = `
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <header class="site-header" role="banner">
      <div class="header-container">
        <div class="header-branding">
          <h1>Accra Chamber of Commerce</h1>
          <p class="tagline">Supporting Local Business Growth</p>
        </div>

        <button id="menu" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="navigation" class="menu-toggle">
          <span class="hamburger">☰</span>
        </button>
      </div>

      <nav class="site-nav" role="navigation">
        <ul class="navigation" id="navigation">
          <li><a href="${getPagePath('home', currentPage)}" ${currentPage === 'home' ? 'aria-current="page"' : ''}>Home</a></li>
          <li><a href="${getPagePath('directory', currentPage)}" ${currentPage === 'directory' ? 'aria-current="page"' : ''}>Directory</a></li>
          <li><a href="${getPagePath('join', currentPage)}" ${currentPage === 'join' ? 'aria-current="page"' : ''}>Join</a></li>
          <li><a href="${getPagePath('discover', currentPage)}" ${currentPage === 'discover' ? 'aria-current="page"' : ''}>Discover</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  `;

  // Insert header at the beginning of body
  document.body.insertAdjacentHTML('afterbegin', headerHTML);

  // Initialize menu toggle after header is injected
  initializeMenuToggle();
}

/**
 * Create and inject footer into the page
 */
function injectFooter() {
  const footerHTML = `
    <footer class="site-footer" role="contentinfo">
      <div class="footer-container">
        
        <div class="footer-content">
          
          <div class="footer-section footer-about">
            <h3>About Accra Chamber</h3>
            <p>Supporting business growth and economic development in Accra, Ghana.</p>
          </div>

          <div class="footer-section footer-contact">
            <h3>Contact Us</h3>
            <address>
              <p><strong>Organization:</strong> Accra Chamber of Commerce</p>
              <p><strong>Email:</strong> <a href="mailto:info@accracc.org">info@accracc.org</a></p>
              <p><strong>Phone:</strong> <a href="tel:+233542444693">+233 54 244 4693</a></p>
            </address>
          </div>

          <div class="footer-section footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="${getPagePath('home')}">Home</a></li>
              <li><a href="${getPagePath('directory')}">Directory</a></li>
              <li><a href="${getPagePath('discover')}">Discover</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

        </div>

        <div class="footer-bottom">
          <div class="footer-copyright">
            <p>&copy; <span id="year"></span> Accra Chamber of Commerce. All rights reserved.</p>
          </div>
          <div class="footer-credits">
            <p>Developed by Abdul Ganiyu Abdul Aziz | <span>WDD 231</span></p>
          </div>
          <div class="footer-modified">
            <p id="lastModified"></p>
          </div>
        </div>

      </div>
    </footer>
  `;

  // Append footer at the end of body
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  // Update footer info
  updateFooterInfo();
}

/**
 * Get the correct path for a page based on current location
 * @param {string} targetPage - The page to link to ('home', 'directory', 'join')
 * @param {string} currentPage - The current page location
 * @returns {string} - The correct path
 */
function getPagePath(targetPage, currentPage = '') {
  const isInChamberFolder = window.location.pathname.includes('/chamber/');
  
  // When linking from chamber pages
  if (isInChamberFolder) {
    if (targetPage === 'home') return 'index.html';
    if (targetPage === 'directory') return '../directory.html';
    if (targetPage === 'join') return 'join.html';
    if (targetPage === 'discover') return 'discover.html';
  } 
  // When linking from root level pages
  else {
    if (targetPage === 'home') return 'chamber/index.html';
    if (targetPage === 'directory') return 'directory.html';
    if (targetPage === 'join') return 'chamber/join.html';
    if (targetPage === 'discover') return 'chamber/discover.html';
  }
  
  return '#';
}

/**
 * Initialize menu toggle functionality
 */
function initializeMenuToggle() {
  const menuButton = document.querySelector("#menu");
  const navigation = document.querySelector(".navigation");
  
  if (menuButton) {
    menuButton.addEventListener("click", () => {
      navigation.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", navigation.classList.contains("open"));
    });
  }
}

/**
 * Update footer information
 */
function updateFooterInfo() {
  const yearElement = document.querySelector("#year");
  const lastModifiedElement = document.querySelector("#lastModified");
  
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  if (lastModifiedElement) {
    lastModifiedElement.textContent = "Last Modified: " + document.lastModified;
  }
}
