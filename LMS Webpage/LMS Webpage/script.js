// Dynamic Greeting based on time of day
const greetingSpan = document.getElementById('greeting');

if (greetingSpan) {
    const hours = new Date().getHours();
    let greeting = "";

    if (hours >= 5 && hours < 12) {
        greeting = "Good Morning, ";
    } else if (hours >= 12 && hours < 17) {
        greeting = "Good Afternoon, ";
    } else {
        greeting = "Good Evening, ";
    }

    greetingSpan.textContent = greeting;
}

// Dark Mode
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeIcon = document.getElementById('darkModeIcon');

// Function to apply theme state
const updateTheme = (isDark) => {
    document.body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    if (darkModeIcon) {
        darkModeIcon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
    }
};

// 1. Load saved preference on page load
updateTheme(localStorage.getItem('darkMode') === 'enabled');

// 2. Toggle on button click
darkModeToggle?.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark-mode');
    updateTheme(isDark);
});
