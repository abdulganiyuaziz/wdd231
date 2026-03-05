// Example course array
const courses = [
  { name: 'WDD131', completed: true, credits: 3, type: 'WDD' },
  { name: 'CSE110', completed: false, credits: 3, type: 'CSE' },
  // Add more courses as needed
];

// Function to dynamically display courses
function displayCourses(filter = 'All') {
  const container = document.getElementById('courseContainer');
  container.innerHTML = ''; // clear previous content

  const filtered = courses.filter(course => {
    if (filter === 'All') return true;
    return course.type === filter;
  });

  filtered.forEach(course => {
    const card = document.createElement('div');
    card.textContent = `${course.name} - Credits: ${course.credits}`;
    if (course.completed) card.style.backgroundColor = '#c8e6c9'; // different style
    container.appendChild(card);
  });
}

// Example filter buttons
document.addEventListener('DOMContentLoaded', () => {
  displayCourses();
  document.getElementById('allBtn').addEventListener('click', () => displayCourses('All'));
  document.getElementById('wddBtn').addEventListener('click', () => displayCourses('WDD'));
  document.getElementById('cseBtn').addEventListener('click', () => displayCourses('CSE'));
});