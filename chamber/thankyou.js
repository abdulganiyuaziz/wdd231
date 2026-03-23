/**
 * Thank You page functionality
 * Displays submitted form data from URL parameters
 */

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Inject navigation and footer
  injectNavigation('thankyou');
  injectFooter();

  // Display submitted data
  displaySubmittedData();
});

/**
 * Display the submitted form data on the thank you page
 * Extracts data from URL parameters and displays only required fields
 */
function displaySubmittedData() {
  const dataDisplay = document.getElementById('dataDisplay');
  const errorMessage = document.getElementById('errorMessage');

  // Get URL parameters
  const params = new URLSearchParams(window.location.search);

  // List of required fields to display
  const requiredFields = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email Address' },
    { key: 'phone', label: 'Mobile Phone' },
    { key: 'businessName', label: 'Business/Organization Name' },
    { key: 'timestamp', label: 'Application Date & Time' }
  ];

  // Check if there's any data
  let hasData = false;
  requiredFields.forEach(field => {
    if (params.has(field.key)) {
      hasData = true;
    }
  });

  if (!hasData) {
    // Show error message if no data found
    errorMessage.style.display = 'block';
    errorMessage.textContent = 'No application data found. Please complete the membership form first.';
    dataDisplay.innerHTML = '<p>It appears you reached this page without completing the application form. Please <a href="join.html">return to the join page</a> and submit the form to proceed.</p>';
    return;
  }

  // Build HTML for submitted data
  let dataHTML = '';
  
  requiredFields.forEach(field => {
    const value = params.get(field.key);
    if (value) {
      dataHTML += `
        <div class="data-item">
          <div class="data-label">${field.label}</div>
          <div class="data-value">${escapeHtml(value)}</div>
        </div>
      `;
    }
  });

  dataDisplay.innerHTML = dataHTML;
}

/**
 * Escape HTML special characters to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, char => map[char]);
}

/**
 * Handle print functionality
 * Add print-specific styling and behavior
 */
window.addEventListener('beforeprint', function() {
  // Any print-specific setup can go here
  console.log('Document prepared for printing');
});

window.addEventListener('afterprint', function() {
  // Any post-print cleanup can go here
  console.log('Print dialog closed');
});
