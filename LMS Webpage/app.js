// ==========================================================
// 1. Dynamic greeting based on time of day (Home page)
// ==========================================================
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

// ==========================================================
// 2. Dark mode (all pages)
// ==========================================================
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeIcon = document.getElementById('darkModeIcon');

// Apply theme and save the choice
const updateTheme = (isDark) => {
    document.body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');

    if (darkModeIcon) {
        darkModeIcon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
    }
};

// Load saved preference on page load
updateTheme(localStorage.getItem('darkMode') === 'enabled');

// Toggle on button click
darkModeToggle?.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark-mode');
    updateTheme(isDark);
});

// ==========================================================
// 3. Contact form (Contact page)
// ==========================================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    // Create a message box under the form button
    const formMessage = document.createElement('p');
    formMessage.className = 'form-message mt-3 mb-0';
    formMessage.setAttribute('role', 'status');
    contactForm.appendChild(formMessage);

    const showMessage = (text, isError) => {
        formMessage.textContent = text;
        formMessage.style.color = isError ? '#dc3545' : '#198754';
    };

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const subject = contactForm.subject.value;
        const message = contactForm.message.value.trim();

        // Basic validation
        if (name.length < 2) {
            showMessage('Please enter your full name.', true);
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showMessage('Please enter a valid email address.', true);
            return;
        }

        if (!subject) {
            showMessage('Please choose a subject.', true);
            return;
        }

        if (message.length < 10) {
            showMessage('Your message must be at least 10 characters.', true);
            return;
        }

        // Success (no server yet, so just confirm and clear the form)
        showMessage('Thank you! Your message has been sent.', false);
        contactForm.reset();
    });
}