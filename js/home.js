// Weather API Configuration
const WEATHER_API_KEY = "7d06b405e3a8c2a1ebfbbfb42549bcfa"; // Free tier API key
const LAT = 5.6037; // Accra latitude
const LON = -0.1870; // Accra longitude
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${WEATHER_API_KEY}&units=metric`;

// Members data
const membersUrl = "../data/members.json";

// Initialize page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  injectNavigation('home');
  injectFooter();
  getWeather();
  getSpotlights();
});

/**
 * Fetch and display current weather and 3-day forecast
 */
async function getWeather() {
  try {
    const response = await fetch(weatherUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error("Error fetching weather:", error);
    displayWeatherError();
  }
}

/**
 * Display weather data on the page
 */
function displayWeather(data) {
  try {
    // Current weather (first item in forecast)
    const current = data.list[0];
    const temp = Math.round(current.main.temp);
    const description = current.weather[0].description;
    
    // Update current weather display
    document.getElementById("temp").textContent = temp;
    document.getElementById("description").textContent = 
      description.charAt(0).toUpperCase() + description.slice(1);
    
    // Get forecast for next 3 days (every 8 entries = 24 hours)
    const forecastContainer = document.getElementById("forecast-container");
    forecastContainer.innerHTML = "";
    
    // Get unique days for 3-day forecast
    const forecastDays = {};
    data.list.forEach(entry => {
      const date = new Date(entry.dt * 1000);
      const day = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      
      // Only get one forecast per day (keep the first one)
      if (!forecastDays[day]) {
        forecastDays[day] = {
          temp: Math.round(entry.main.temp),
          description: entry.weather[0].description,
          high: Math.round(entry.main.temp_max),
          low: Math.round(entry.main.temp_min)
        };
      }
    });
    
    // Display first 3 days
    Object.entries(forecastDays).slice(0, 3).forEach(([day, weather]) => {
      const forecastItem = document.createElement("div");
      forecastItem.className = "forecast-item";
      forecastItem.innerHTML = `
        <p><strong>${day}</strong></p>
        <p>High: ${weather.high}°C</p>
        <p>Low: ${weather.low}°C</p>
        <p>${weather.description.charAt(0).toUpperCase() + weather.description.slice(1)}</p>
      `;
      forecastContainer.appendChild(forecastItem);
    });
  } catch (error) {
    console.error("Error displaying weather:", error);
    displayWeatherError();
  }
}

/**
 * Display weather error message
 */
function displayWeatherError() {
  document.getElementById("temp").textContent = "Error";
  document.getElementById("description").textContent = "Unable to load weather data";
  document.getElementById("forecast-container").innerHTML = 
    '<p style="color: #d9534f;">Unable to load forecast data</p>';
}

/**
 * Fetch members and display random spotlights
 */
async function getSpotlights() {
  try {
    const response = await fetch(membersUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const data = await response.json();
    
    // Filter for gold (3) and silver (2) members only
    const qualifiedMembers = data.members.filter(member => member.membership >= 2);
    
    // Randomly select 2-3 members
    const spotlightCount = Math.min(3, Math.max(2, qualifiedMembers.length));
    const selectedMembers = getRandomMembers(qualifiedMembers, spotlightCount);
    
    displaySpotlights(selectedMembers);
  } catch (error) {
    console.error("Error fetching spotlights:", error);
    displaySpotlightsError();
  }
}

/**
 * Get random members from an array
 */
function getRandomMembers(members, count) {
  const shuffled = [...members].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Display spotlight cards
 */
function displaySpotlights(members) {
  const spotlightsContainer = document.querySelector("#spotlights-container");
  if (!spotlightsContainer) return;
  
  spotlightsContainer.innerHTML = "";
  
  members.forEach(member => {
    const membershipLevel = member.membership === 3 ? "Gold" : "Silver";
    const spotlightCard = document.createElement("article");
    spotlightCard.className = "spotlight-card";
    spotlightCard.innerHTML = `
      <img src="../images/${member.image}" alt="${member.name} logo" class="spotlight-logo">
      <h3>${member.name}</h3>
      <p class="membership-badge ${membershipLevel.toLowerCase()}">${membershipLevel} Member</p>
      <p><strong>Phone:</strong> <a href="tel:${member.phone}">${member.phone}</a></p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit</a></p>
    `;
    spotlightsContainer.appendChild(spotlightCard);
  });
}

/**
 * Display spotlights error message
 */
function displaySpotlightsError() {
  const spotlightsContainer = document.querySelector("#spotlights-container");
  if (!spotlightsContainer) return;
  
  spotlightsContainer.innerHTML = 
    '<p style="color: #d9534f; text-align: center; grid-column: 1/-1;">Error loading featured businesses. Please refresh the page.</p>';
}
