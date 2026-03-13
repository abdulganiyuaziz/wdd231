const url = "data/members.json";
const cards = document.querySelector("#members");

async function getMembers() {

const response = await fetch(url);
const data = await response.json();

displayMembers(data.members);

}

getMembers();

function displayMembers(members) {

members.forEach((member) => {

let card = document.createElement("section");

card.innerHTML = `
<img src="images/${member.image}" alt="${member.name}">
<h3>${member.name}</h3>
<p>${member.address}</p>
<p>${member.phone}</p>
<a href="${member.website}" target="_blank">Visit Website</a>
`;

cards.appendChild(card);

});

}


// Grid / List toggle

const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

gridButton.addEventListener("click", () => {
cards.classList.add("grid");
cards.classList.remove("list");
});

listButton.addEventListener("click", () => {
cards.classList.add("list");
cards.classList.remove("grid");
});


// Footer Dates

document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelector("#lastModified").textContent =
"Last Modified: " + document.lastModified;