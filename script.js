// =============================================
// CONTINUOUS SCROLLING ANIMATIONS
// =============================================

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.addEventListener('DOMContentLoaded', () => {
    // Animate elements on scroll
    const elementsToObserve = document.querySelectorAll(
        'section, .detail-card, .skill-card, .timeline-item, .summary-card'
    );

    elementsToObserve.forEach((element) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });

    // Initialize smooth scrolling for nav links
    initSmoothScroll();

    // Initialize navbar background on scroll
    initNavbarScroll();

    // Initialize parallax effect
    initParallax();
});

// =============================================
// SMOOTH SCROLL NAVIGATION
// =============================================

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();

                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }

                // Scroll to element
                targetElement.scrollIntoView({ behavior: 'smooth' });

                // Add active class to nav link
                updateActiveNavLink(href);
            }
        });
    });
}

function updateActiveNavLink(href) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === href) {
            link.classList.add('active');
        }
    });
}

// =============================================
// NAVBAR BACKGROUND ON SCROLL
// =============================================

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add background when scrolled
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(44, 62, 80, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'rgba(44, 62, 80, 1)';
            navbar.style.backdropFilter = 'none';
        }

        // Update active nav link based on scroll position
        updateActiveNavLinkOnScroll();

        lastScroll = currentScroll;
    });
}

function updateActiveNavLinkOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// =============================================
// PARALLAX EFFECT
// =============================================

function initParallax() {
    const heroSection = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;

        if (heroSection) {
            heroSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        }
    });
}

// =============================================
// COUNTER ANIMATION
// =============================================

function animateCounters() {
    const counters = document.querySelectorAll('.counter');

    counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 50;
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// =============================================
// FORM HANDLING
// =============================================

function handleFormSubmit(e) {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted');
}

// =============================================
// MOBILE MENU TOGGLE
// =============================================

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when link is clicked
        document.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// =============================================
// SCROLL TO TOP BUTTON
// =============================================

function initScrollToTop() {
    let scrollTopButton = document.querySelector('.scroll-to-top');

    if (!scrollTopButton) {
        scrollTopButton = document.createElement('button');
        scrollTopButton.classList.add('scroll-to-top');
        scrollTopButton.innerHTML = '↑';
        document.body.appendChild(scrollTopButton);
    }

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopButton.style.display = 'block';
        } else {
            scrollTopButton.style.display = 'none';
        }
    });

    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// =============================================
// TYPING EFFECT
// =============================================

function typeEffect(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';

    const type = () => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    };

    type();
}

// =============================================
// LAZY LOADING IMAGES
// =============================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach((img) => imageObserver.observe(img));
}

// =============================================
// CALL ALL INITIALIZATION FUNCTIONS
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initScrollToTop();
    initLazyLoading();

    // Optional: Uncomment if you want typing effect on hero title
    // const heroTitle = document.querySelector('.hero-title');
    // if (heroTitle) {
    //     typeEffect(heroTitle, heroTitle.textContent);
    // }
});

// =============================================
// UTILITY FUNCTIONS
// =============================================

// Debounce function for performance optimization
function debounce(func, delay = 250) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Throttle function for performance optimization
function throttle(func, limit = 250) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}
