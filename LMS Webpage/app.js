// ==========================================================
// 1. Contact form (Contact page)
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

// ==========================================================
// 2. Course details popup (Courses page)
// ==========================================================
const courseModal = document.getElementById('courseModal');

if (courseModal) {
    const modalTitle = document.getElementById('courseModalTitle');
    const modalBody = document.getElementById('courseModalBody');

    // Open the popup with the clicked course's details
    document.querySelectorAll('.view-details-btn').forEach((button) => {
        button.addEventListener('click', () => {
            modalTitle.textContent = button.dataset.title;
            modalBody.textContent = button.dataset.description;
            courseModal.showModal();
        });
    });

    // Close with the X button or the Close button
    courseModal.querySelectorAll('[data-close-modal]').forEach((button) => {
        button.addEventListener('click', () => courseModal.close());
    });

    // Close when clicking outside the popup
    courseModal.addEventListener('click', (event) => {
        if (event.target === courseModal) {
            courseModal.close();
        }
    });
}