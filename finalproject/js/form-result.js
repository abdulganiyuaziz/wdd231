/**
 * Form Result Module
 * Displays form submission data from URLSearchParams
 * Demonstrates asynchronous operations and DOM manipulation
 */

/**
 * Parse and display form data from URL Search Parameters
 * Called when page loads to retrieve and display submitted form data
 */
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Get URL parameters using URLSearchParams API
        const params = new URLSearchParams(window.location.search);
        
        // Extract form data from parameters
        const name = params.get('name') || 'Not provided';
        const email = params.get('email') || 'Not provided';
        const subject = params.get('subject') || 'Not provided';
        const message = params.get('message') || 'Not provided';
        
        // Display the submitted data
        displayFormData(name, email, subject, message);
        
        // Store in local storage for reference
        const submissionData = {
            name: name,
            email: email,
            subject: subject,
            message: message,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('lastFormSubmission', JSON.stringify(submissionData));
        
        console.log('Form submission received:', submissionData);
    } catch (error) {
        console.error('Error processing form data:', error);
        displayError('There was an error processing your submission.');
    }
});

/**
 * Display form data in the results section
 * Uses template literals and DOM manipulation
 * 
 * @param {string} name - Submitter's name
 * @param {string} email - Submitter's email
 * @param {string} subject - Message subject
 * @param {string} message - Message content
 */
function displayFormData(name, email, subject, message) {
    const formDataDiv = document.getElementById('formData');
    
    if (!formDataDiv) {
        console.warn('Form data container not found');
        return;
    }
    
    // Use template literal to generate formatted display
    const htmlContent = `
        <dl class="data-list">
            <dt>Name:</dt>
            <dd>${escapeHtml(name)}</dd>
            
            <dt>Email:</dt>
            <dd><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></dd>
            
            <dt>Subject:</dt>
            <dd>${escapeHtml(subject)}</dd>
            
            <dt>Message:</dt>
            <dd>${escapeHtml(message).replace(/\n/g, '<br>')}</dd>
            
            <dt>Submitted At:</dt>
            <dd>${new Date().toLocaleString()}</dd>
        </dl>
    `;
    
    formDataDiv.innerHTML = htmlContent;
}

/**
 * Escape HTML special characters to prevent XSS
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
    return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Display error message
 * @param {string} message - Error message to display
 */
function displayError(message) {
    const formDataDiv = document.getElementById('formData');
    if (formDataDiv) {
        formDataDiv.innerHTML = `<p style="color: red;">${escapeHtml(message)}</p>`;
    }
}
