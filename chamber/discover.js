/**
 * Discover Page JavaScript
 * Handles loading places of interest data and managing visit tracking
 */

import { placeOfInterest } from '../data/discover-data.mjs';

/**
 * Initialize the discover page
 */
function init() {
  injectNavigation('discover');
  injectFooter();
  displayVisitMessage();
  displayPlaces();
  trackVisit();
}

/**
 * Display visit message based on localStorage data
 */
function displayVisitMessage() {
  const messageElement = document.getElementById('visit-message');
  const lastVisit = localStorage.getItem('lastDiscoverVisit');
  const currentTime = Date.now();
  
  let message = '';
  let className = 'info';

  if (!lastVisit) {
    // First visit
    message = 'Welcome! Let us know if you have any questions.';
  } else {
    const lastVisitTime = parseInt(lastVisit);
    const timeDifference = currentTime - lastVisitTime;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference < 1) {
      // Less than a day
      message = 'Back so soon! Awesome!';
      className = 'success';
    } else {
      // More than a day
      const dayWord = daysDifference === 1 ? 'day' : 'days';
      message = `You last visited ${daysDifference} ${dayWord} ago.`;
    }
  }

  // Update message element
  messageElement.className = `visit-message ${className}`;
  messageElement.querySelector('p').textContent = message;
}

/**
 * Store the current visit time in localStorage
 */
function trackVisit() {
  localStorage.setItem('lastDiscoverVisit', Date.now().toString());
}

/**
 * Display places of interest from imported data
 */
function displayPlaces() {
  const gallery = document.getElementById('discover-gallery');
  
  // Clear loading message
  gallery.innerHTML = '';

  if (!placeOfInterest || placeOfInterest.length === 0) {
    gallery.innerHTML = '<div class="discover-error">Error loading places of interest. Please refresh the page.</div>';
    return;
  }

  // Create cards for each place
  placeOfInterest.forEach(place => {
    const card = createPlaceCard(place);
    gallery.appendChild(card);
  });
}

/**
 * Create a single place card element
 * @param {Object} place - The place object from data
 * @returns {HTMLElement} The card element
 */
function createPlaceCard(place) {
  const card = document.createElement('article');
  card.className = 'discover-card';

  const cardHTML = `
    <figure>
      <img 
        src="${place.image}" 
        alt="${place.name}"
        loading="lazy"
        width="300"
        height="250"
      >
    </figure>
    <h2>${place.name}</h2>
    <address>${place.address}</address>
    <p>${place.description}</p>
    <button type="button" aria-label="Learn more about ${place.name}">Learn More</button>
  `;

  card.innerHTML = cardHTML;
  
  // Add click handler to Learn More button
  const button = card.querySelector('button');
  button.addEventListener('click', () => {
    handleLearnMore(place);
  });

  return card;
}

/**
 * Handle Learn More button click
 * @param {Object} place - The place object
 */
function handleLearnMore(place) {
  // Create and show a modal or navigate to detailed page
  // For now, just log it and could open in new tab
  console.log('Learning more about:', place.name);
  
  // Option: Open website in new tab if available
  if (place.website) {
    window.open(place.website, '_blank');
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
