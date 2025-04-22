document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS
  AOS.init({
    duration: 800,
    once: true,
  });

  // Navbar toggle for mobile
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Smooth scrolling with error handling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        try {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        } catch (error) {
          // Fallback for browsers without smooth scrolling
          targetElement.scrollIntoView();
          console.warn('Smooth scrolling not supported, using fallback:', error);
        }
      } else {
        console.error(`Target element ${targetId} not found`);
      }

      // Close mobile menu
      navLinks.classList.remove('active');
    });
  });

  // Dark mode toggle
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun text-xl"></i>' : '<i class="fas fa-moon text-xl"></i>';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Load saved theme
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    themeToggle.innerHTML = '<i class="fas fa-sun text-xl"></i>';
  }

  // Contact form validation and submission
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let isValid = true;

    // Reset errors
    nameError.classList.add('hidden');
    emailError.classList.add('hidden');
    messageError.classList.add('hidden');

    // Validate inputs
    if (!nameInput.value.trim()) {
      nameError.classList.remove('hidden');
      isValid = false;
    }
    if (!emailInput.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      emailError.classList.remove('hidden');
      isValid = false;
    }
    if (!messageInput.value.trim()) {
      messageError.classList.remove('hidden');
      isValid = false;
    }

    if (isValid) {
      const formData = new FormData(form);
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        if (response.ok) {
          alert('Message sent successfully!');
          form.reset();
        } else {
          alert('Failed to send message. Please try again.');
        }
      } catch (error) {
        alert('An error occurred. Please try again later.');
      }
    }
  });
});
