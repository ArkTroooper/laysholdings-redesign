/**
 * Lays Holdings - Main JavaScript
 * Interactive functionality for modern, energy-themed website
 */

// ===================================
// DOM Elements
// ===================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const statNumbers = document.querySelectorAll('.stat-number');

// ===================================
// Navigation Functions
// ===================================

/**
 * Toggle mobile navigation menu
 */
function toggleNav() {
    navMenu.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

/**
 * Close mobile menu when clicking a link
 */
function closeNav() {
    navMenu.classList.remove('active');
    const icon = navToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
}

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

/**
 * Add/remove navbar background on scroll
 */
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ===================================
// Smooth Scrolling
// ===================================

/**
 * Smooth scroll to section
 */
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const offsetTop = element.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

/**
 * Handle navigation link clicks
 */
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        smoothScroll(target);
        closeNav();
    });
});

// ===================================
// Back to Top Button
// ===================================

/**
 * Show/hide back to top button based on scroll position
 */
function handleBackToTop() {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
}

/**
 * Scroll to top when button is clicked
 */
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Scroll Animations
// ===================================

/**
 * Animate elements when they come into view
 */
function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ===================================
// Counter Animation
// ===================================

/**
 * Animate counter numbers
 */
function animateCounters() {
    let countersAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            stat.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            stat.textContent = target;
                        }
                    };

                    updateCounter();
                });
            }
        });
    }, {
        threshold: 0.5
    });

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// ===================================
// Form Validation and Submission
// ===================================

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone format (basic validation)
 */
function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phone === '' || phoneRegex.test(phone);
}

/**
 * Show error message for form field
 */
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    
    formGroup.classList.add('error');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

/**
 * Clear error message for form field
 */
function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    
    formGroup.classList.remove('error');
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
}

/**
 * Validate form inputs
 */
function validateForm(formData) {
    let isValid = true;
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');

    // Clear all errors first
    [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
        if (input) clearError(input);
    });

    // Validate name
    if (!name || name.trim().length < 2) {
        showError(nameInput, 'Please enter a valid name (at least 2 characters)');
        isValid = false;
    }

    // Validate email
    if (!email || !isValidEmail(email)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }

    // Validate phone (if provided)
    if (phone && !isValidPhone(phone)) {
        showError(phoneInput, 'Please enter a valid phone number');
        isValid = false;
    }

    // Validate message
    if (!message || message.trim().length < 10) {
        showError(messageInput, 'Please enter a message (at least 10 characters)');
        isValid = false;
    }

    return isValid;
}

/**
 * Show form status message
 */
function showFormStatus(type, message) {
    const formStatus = document.querySelector('.form-status');
    formStatus.className = `form-status ${type}`;
    formStatus.textContent = message;
    formStatus.style.display = 'block';

    // Hide status after 5 seconds
    setTimeout(() => {
        formStatus.style.display = 'none';
    }, 5000);
}

/**
 * Handle form submission
 */
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);

    // Validate form
    if (!validateForm(formData)) {
        showFormStatus('error', 'Please correct the errors above');
        return;
    }

    // Show loading state
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    // Simulate form submission (replace with actual API call)
    try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // In production, you would send the data to your backend:
        // const response = await fetch('/api/contact', {
        //     method: 'POST',
        //     body: formData
        // });

        // Show success message
        showFormStatus('success', 'Thank you! Your message has been sent successfully. We will get back to you soon.');
        contactForm.reset();

    } catch (error) {
        // Show error message
        showFormStatus('error', 'Something went wrong. Please try again later.');
        console.error('Form submission error:', error);
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
});

// Real-time validation on input
const formInputs = contactForm.querySelectorAll('input, textarea, select');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value) {
            const formData = new FormData(contactForm);
            validateForm(formData);
        }
    });

    input.addEventListener('input', () => {
        if (input.closest('.form-group').classList.contains('error')) {
            clearError(input);
        }
    });
});

// ===================================
// Scroll Event Handlers
// ===================================

/**
 * Handle all scroll-related functions
 */
function handleScroll() {
    handleNavbarScroll();
    handleBackToTop();
    updateActiveNav();
}

// Throttle scroll events for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            handleScroll();
            scrollTimeout = null;
        }, 10);
    }
});

// ===================================
// Event Listeners
// ===================================

// Navigation toggle
navToggle.addEventListener('click', toggleNav);

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        if (navMenu.classList.contains('active')) {
            closeNav();
        }
    }
});

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            closeNav();
        }
    }, 250);
});

// ===================================
// Initialization
// ===================================

/**
 * Initialize all functionality when DOM is loaded
 */
function init() {
    // Initial navbar state
    handleNavbarScroll();
    
    // Initialize scroll animations
    animateOnScroll();
    
    // Initialize counter animations
    animateCounters();
    
    // Set initial active nav link
    updateActiveNav();

    // Add animation classes to elements
    const cards = document.querySelectorAll('.about-card, .service-card, .why-card');
    cards.forEach(card => {
        card.classList.add('animate-on-scroll');
    });

    console.log('Lays Holdings website initialized successfully');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isValidEmail,
        isValidPhone,
        validateForm
    };
}
