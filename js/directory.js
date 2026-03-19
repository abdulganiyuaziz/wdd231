const url = "data/members.json";

async function getMembers() {
  const cards = document.querySelector("#members");
  if (!cards) return;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error("Error fetching members:", error);
    cards.innerHTML = "<p style='color: #d9534f; text-align: center;'>Error loading member data. Please refresh the page.</p>";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  injectNavigation('directory');
  injectFooter();
  getMembers();
  
  // Setup button event listeners
  const gridButton = document.querySelector("#grid");
  const listButton = document.querySelector("#list");
  
  if (gridButton) {
    gridButton.addEventListener("click", () => {
      const cards = document.querySelector("#members");
      cards.classList.add("grid");
      cards.classList.remove("list");
      getMembers();
    });
  }
  
  if (listButton) {
    listButton.addEventListener("click", () => {
      const cards = document.querySelector("#members");
      cards.classList.add("list");
      cards.classList.remove("grid");
      getMembers();
    });
  }
});

function displayMembers(members) {
  const cards = document.querySelector("#members");
  if (!cards) return;

  cards.innerHTML = "";

  members.forEach(member => {

    const card = document.createElement("section");

    let imageHTML = "";

    if (cards.classList.contains("grid")) {
      imageHTML = `<img src="images/${member.image}" alt="${member.name} logo">`;
    }

    card.innerHTML = `
    ${imageHTML}
    <h3>${member.name}</h3>
    <p>${member.address}</p>
    <p>${member.phone}</p>
    <p><strong>Membership:</strong> ${member.membership}</p>
    <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
    `;

    cards.appendChild(card);

  });
}