// testimonial-carousel.js

document.addEventListener('DOMContentLoaded', function() {
    // Testimonial data for dynamic content (optional - you can add more testimonials)
    const additionalTestimonials = [
        {
            text: "The clean water projects have transformed our entire village. Children no longer have to walk miles for water, and diseases have significantly decreased.",
            name: "Ahmed Hassan",
            title: "Village Elder",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80"
        },
        {
            text: "As a mother, seeing my children have access to quality education through Jasonstathon's programs fills my heart with hope for their future.",
            name: "Grace Okafor",
            title: "Mother of 3",
            image: "https://images.unsplash.com/photo-1581403341630-a6e0b9d2d257?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80"
        },
        {
            text: "The microfinance program helped me expand my small farm. Now I can provide for my family and employ others in the community.",
            name: "Carlos Mendoza",
            title: "Farmer & Entrepreneur",
            image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80"
        }
    ];

    // Function to create testimonial cards
    function createTestimonialCard(testimonial) {
        return `
            <div class="testimonial-card">
                <p>"${testimonial.text}"</p>
                <div class="testimonial-author">
                    <img src="${testimonial.image}" alt="${testimonial.name}" loading="lazy" decoding="async" />
                    <div>
                        <h6>${testimonial.name}</h6>
                        <small>${testimonial.title}</small>
                    </div>
                </div>
            </div>
        `;
    }

    // Function to duplicate testimonials for seamless loop
    function setupInfiniteScroll() {
        const carousel = document.querySelector('.testimonials-carousel');
        
        if (carousel) {
            // Get all existing testimonial cards
            const existingCards = carousel.querySelectorAll('.testimonial-card');
            
            // Clone existing cards to create seamless loop
            existingCards.forEach(card => {
                const clone = card.cloneNode(true);
                carousel.appendChild(clone);
            });

            // Optional: Add additional testimonials
            additionalTestimonials.forEach(testimonial => {
                const cardHTML = createTestimonialCard(testimonial);
                carousel.insertAdjacentHTML('beforeend', cardHTML);
                // Add clone for seamless loop
                carousel.insertAdjacentHTML('beforeend', cardHTML);
            });
        }
    }

    // Function to handle responsive behavior
    function handleResponsiveCarousel() {
        const carousel = document.querySelector('.testimonials-carousel');
        const cards = document.querySelectorAll('.testimonial-card');
        
        if (window.innerWidth <= 768) {
            // On mobile, adjust animation speed and card width
            carousel.style.animationDuration = '40s';
            cards.forEach(card => {
                card.style.minWidth = '300px';
            });
        } else if (window.innerWidth <= 1024) {
            // On tablet
            carousel.style.animationDuration = '35s';
            cards.forEach(card => {
                card.style.minWidth = '350px';
            });
        } else {
            // On desktop - default values
            carousel.style.animationDuration = '30s';
            cards.forEach(card => {
                card.style.minWidth = '400px';
            });
        }
    }

    // Function to pause animation on hover
    function setupHoverEffects() {
        const carousel = document.querySelector('.testimonials-carousel');
        
        if (carousel) {
            carousel.addEventListener('mouseenter', function() {
                this.style.animationPlayState = 'paused';
            });
            
            carousel.addEventListener('mouseleave', function() {
                this.style.animationPlayState = 'running';
            });
        }
    }

    // Function to handle visibility changes (pause when not visible)
    function setupVisibilityHandler() {
        const carousel = document.querySelector('.testimonials-carousel');
        const testimonialsSection = document.querySelector('.testimonials-section');
        
        if (carousel && testimonialsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        carousel.style.animationPlayState = 'running';
                    } else {
                        carousel.style.animationPlayState = 'paused';
                    }
                });
            }, {
                threshold: 0.1 // Start animation when 10% of the section is visible
            });
            
            observer.observe(testimonialsSection);
        }
    }

    // Function to add keyboard accessibility
    function setupKeyboardNavigation() {
        const carousel = document.querySelector('.testimonials-carousel');
        const testimonialsSection = document.querySelector('.testimonials-section');
        
        if (testimonialsSection) {
            testimonialsSection.setAttribute('tabindex', '0');
            testimonialsSection.setAttribute('role', 'region');
            testimonialsSection.setAttribute('aria-label', 'Customer testimonials carousel');
            
            testimonialsSection.addEventListener('keydown', function(e) {
                if (e.key === ' ' || e.key === 'Enter') {
                    // Toggle animation on space or enter
                    const currentState = carousel.style.animationPlayState;
                    carousel.style.animationPlayState = currentState === 'paused' ? 'running' : 'paused';
                    e.preventDefault();
                }
            });
        }
    }

    // Function to handle reduced motion preference
    function handleReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const carousel = document.querySelector('.testimonials-carousel');
        
        function updateMotion() {
            if (carousel) {
                if (prefersReducedMotion.matches) {
                    carousel.style.animation = 'none';
                    carousel.style.transform = 'none';
                } else {
                    carousel.style.animation = '';
                }
            }
        }
        
        prefersReducedMotion.addListener(updateMotion);
        updateMotion(); // Check initial state
    }

    // Initialize all functions
    function init() {
        setupInfiniteScroll();
        handleResponsiveCarousel();
        setupHoverEffects();
        setupVisibilityHandler();
        setupKeyboardNavigation();
        handleReducedMotion();
        
        // Handle window resize
        window.addEventListener('resize', handleResponsiveCarousel);
        
        // Handle orientation change on mobile
        window.addEventListener('orientationchange', function() {
            setTimeout(handleResponsiveCarousel, 100);
        });
    }

    // Start initialization
    init();

    // Optional: Add smooth scroll behavior for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Optional: Add loading states for images
    function handleImageLoading() {
        const images = document.querySelectorAll('.testimonial-author img, .donor-avatar, .about-image img');
        
        images.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', function() {
                    this.classList.add('loaded');
                });
                
                img.addEventListener('error', function() {
                    this.classList.add('error');
                    // Set a fallback image or placeholder
                    this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjOGE4YThhIi8+CjxwYXRoIGQ9Ik0zMCAzN0MzMy4zMTM3IDM3IDM2IDM0LjMxMzcgMzYgMzFDMzYgMjcuNjg2MyAzMy4zMTM3IDI1IDMwIDI1QzI2LjY4NjMgMjUgMjQgMjcuNjg2MyAyNCAzMUMyNCAzNC4zMTM3IDI2LjY4NjMgMzcgMzAgMzdaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMjEgNDJIMzlDMzguMTcwNCA0Mi42NjY3IDM3LjA1NTkgNDMgMzYgNDNIMjRDMjIuOTQ0MSA0MyAyMS44Mjk2IDQyLjY2NjcgMjEgNDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K';
                });
            }
        });
    }

    // Initialize image loading
    handleImageLoading();
});