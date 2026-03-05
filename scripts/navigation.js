const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('nav-list');

hamburger.addEventListener('click', () => {
  if (navList.style.display === 'flex') {
    navList.style.display = 'none';
  } else {
    navList.style.display = 'flex';
    navList.style.flexDirection = 'column';
  }
});