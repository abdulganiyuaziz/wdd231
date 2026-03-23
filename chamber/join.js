/**
 * Join page functionality
 * Handles form submission, timestamp, and modal interactions
 */

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Inject navigation and footer
  injectNavigation('join');
  injectFooter();

  // Set timestamp on form load
  setFormTimestamp();

  // Add form submit handler
  const form = document.getElementById('membershipForm');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }

  // Add keyboard support for modals
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeAllModals();
    }
  });
});

/**
 * Set the current timestamp in the hidden field
 * Format: Day of Week, Month Date, Year at Time (e.g., "Monday, March 23, 2026 at 2:45 PM")
 */
function setFormTimestamp() {
  const timestampField = document.getElementById('timestamp');
  if (timestampField) {
    const now = new Date();
    const timestamp = formatDateTime(now);
    timestampField.value = timestamp;
  }
}

/**
 * Format date and time in a readable format
 * @param {Date} date - The date to format
 * @returns {string} Formatted date and time
 */
function formatDateTime(date) {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Africa/Accra'
  };
  return date.toLocaleDateString('en-US', options);
}

/**
 * Handle form submission
 * @param {Event} event - The submit event
 */
function handleFormSubmit(event) {
  // Form will submit naturally with GET method to thankyou.html
  // Data will be passed as URL parameters
  console.log('Form submitted successfully');
}

/**
 * Open a modal dialog
 * @param {Event} event - The click event
 * @param {string} modalId - The ID of the modal to open
 */
function openModal(event, modalId) {
  event.preventDefault();
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('show');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    
    // Set focus to the close button for accessibility
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.focus();
    }
    
    // Add body scroll lock
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Close a specific modal
 * @param {string} modalId - The ID of the modal to close
 */
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('show');
    
    // Remove body scroll lock if no other modals are open
    if (!document.querySelector('.modal.show')) {
      document.body.style.overflow = 'auto';
    }
    
    // Return focus to the trigger button
    returnFocusToTrigger();
  }
}

/**
 * Close all open modals
 */
function closeAllModals() {
  const modals = document.querySelectorAll('.modal.show');
  modals.forEach(modal => {
    modal.classList.remove('show');
  });
  if (modals.length > 0) {
    document.body.style.overflow = 'auto';
  }
}

/**
 * Return focus to the button that triggered the modal
 */
function returnFocusToTrigger() {
  // This could be enhanced to track which button opened the modal
  // For now, find the first learn-more button
  const buttons = document.querySelectorAll('.learn-more');
  if (buttons.length > 0) {
    buttons[0].focus();
  }
}

/**
 * Close modal when clicking outside the modal content
 */
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('modal')) {
    const modalId = event.target.id;
    closeModal(modalId);
  }
});

// Additional form validation
document.addEventListener('DOMContentLoaded', function() {
  const orgTitleInput = document.getElementById('orgTitle');
  
  if (orgTitleInput) {
    orgTitleInput.addEventListener('invalid', function(event) {
      if (this.validity.patternMismatch) {
        this.setCustomValidity(
          'Organizational title must be at least 7 characters and contain only letters, hyphens, and spaces'
        );
      } else if (this.validity.valueMissing) {
        this.setCustomValidity('Organizational title is required');
      }
    });

    orgTitleInput.addEventListener('input', function() {
      this.setCustomValidity('');
    });
  }
});

// Accessibility: Track which button opened the modal for focus return
let lastFocusedButton = null;

document.addEventListener('DOMContentLoaded', function() {
  const learnMoreButtons = document.querySelectorAll('.learn-more');
  
  learnMoreButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      lastFocusedButton = this;
    });
  });
});
