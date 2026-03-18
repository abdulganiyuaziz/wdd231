// WEATHER API
const apiKey = "https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"; // <-- PUT YOUR KEY HERE
const weatherURL = `https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`;

async function getWeather() {
  try {
    const response = await fetch(weatherURL);
    const data = await response.json();

    document.getElementById("temp").textContent =
      `Temperature: ${data.list[0].main.temp}°C`;

    document.getElementById("desc").textContent =
      data.list[0].weather[0].description;

    const forecast = document.getElementById("forecast");
    forecast.innerHTML = "";

    const days = [0, 8, 16];

    days.forEach((i) => {
      const date = data.list[i].dt_txt;
      const temp = data.list[i].main.temp;

      const p = document.createElement("p");
      p.textContent = `${date}: ${temp}°C`;

      forecast.appendChild(p);
    });
  } catch (error) {
    console.error("Weather error:", error);
  }
}

getWeather();

// SPOTLIGHTS
const membersURL = "../data/members.json";

async function getSpotlights() {
  try {
    const response = await fetch(membersURL);
    const data = await response.json();

    displaySpotlights(data.members);
  } catch (error) {
    console.error("Error loading members:", error);
  }
}

function displaySpotlights(members) {
  const container = document.getElementById("spotlight-container");

  const filtered = members.filter(
    (m) => m.membership === 2 || m.membership === 3,
  );

  const shuffled = filtered.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 3);

  selected.forEach((member) => {
    const card = document.createElement("section");

    card.innerHTML = `
      <h3>${member.name}</h3>
      <img src="images/${member.image}" alt="${member.name}">
      <p>📞 ${member.phone}</p>
      <p>📍 ${member.address}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p>${member.membership === 3 ? "Gold" : "Silver"}</p>
    `;

    container.appendChild(card);
  });
}

getSpotlights();
