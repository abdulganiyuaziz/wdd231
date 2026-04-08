/**
 * Contact Form Module
 * Handles form submission and redirects to result page with URLSearchParams
 * Features:
 * - Form validation
 * - URLSearchParams for form data transmission
 * - Local storage persistence
 * - User confirmation feedback
 */

// Storage constants
const CONTACT_DATA_KEY = 'lastContact';
const CONTACT_TIMESTAMP_KEY = 'contactTimestamp';

/**
 * Initialize contact form event handling
 * Submits form data via URLSearchParams to form-result.html
 */
export function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) {
        console.warn('Contact form not found on this page');
        return;
    }
    
    /**
     * Handle form submission with URLSearchParams
     * - Prevents default form behavior
     * - Validates required fields
     * - Creates URLSearchParams object
     * - Redirects to result page with parameters
     */
    contactForm.addEventListener('submit', (e) => {
        // Prevent default form submission
        e.preventDefault();
        
        try {
            // Collect form data using FormData API
            const formData = new FormData(contactForm);
            const contactData = Object.fromEntries(formData);
            
            // Validate required fields
            if (!contactData.name || !contactData.email || !contactData.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(contactData.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Create URLSearchParams object with form data
            const params = new URLSearchParams();
            params.append('name', contactData.name);
            params.append('email', contactData.email);
            params.append('subject', contactData.subject || 'No Subject');
            params.append('message', contactData.message);
            
            // Store in local storage for persistence
            localStorage.setItem(CONTACT_DATA_KEY, JSON.stringify(contactData));
            localStorage.setItem(CONTACT_TIMESTAMP_KEY, new Date().toISOString());
            
            // Redirect to form result page with URLSearchParams
            window.location.href = `form-result.html?${params.toString()}`;
            
            console.log('Form submitted with URLSearchParams:', contactData);
        } catch (error) {
            console.error('Error processing contact form:', error);
            alert('An error occurred. Please try again.');
        }
    });
}
