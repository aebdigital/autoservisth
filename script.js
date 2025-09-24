// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    hamburger.addEventListener('click', function() {
        // Toggle menu and hamburger state
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Change navbar to black when hamburger is active
        updateNavbarColor();
    });

    // Function to update navbar color based on scroll and hamburger state
    function updateNavbarColor() {
        const scrollPosition = window.scrollY;
        const triggerPoint = window.innerHeight * 0.2; // 20vh
        const isHamburgerActive = hamburger.classList.contains('active');
        
        if (scrollPosition > triggerPoint || isHamburgerActive) {
            // Scrolled down or hamburger active - black navbar
            navbar.classList.add('scrolled');
        } else {
            // In hero section and hamburger not active - transparent navbar
            navbar.classList.remove('scrolled');
        }
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            // Update navbar color after closing menu
            updateNavbarColor();
        });
    });

    // Smooth scrolling for navigation links
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

    // Scroll Progress Indicator
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Update scroll progress
        if (scrollProgress) {
            const scrollPercentage = (scrollPosition / documentHeight) * 100;
            scrollProgress.style.height = `${scrollPercentage}%`;
        }
        
        // Update navbar color on scroll
        updateNavbarColor();
        
        // Hide hero background when scrolling past hero section
        const heroHeight = document.querySelector('.hero') ? document.querySelector('.hero').offsetHeight : 0;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            if (scrollPosition > heroHeight) {
                heroBackground.classList.add('hidden');
            } else {
                heroBackground.classList.remove('hidden');
            }
        }
    });
    
    // Hero background image cycling
    const heroImages = document.querySelectorAll('.hero-bg-image');
    let currentImageIndex = 0;
    
    function cycleHeroImages() {
        heroImages[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        heroImages[currentImageIndex].classList.add('active');
    }
    
    // Cycle images every 5 seconds
    setInterval(cycleHeroImages, 5000);

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-item, .portfolio-item, .gallery-item, .stat-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Counter animation for stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // Animate counters when hero stats section is visible
    const heroStatsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const numberElement = stat.childNodes[0];
                    const target = parseInt(numberElement.textContent);
                    if (!isNaN(target)) {
                        animateCounter(numberElement, target);
                    }
                });
                heroStatsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observe hero stats
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        heroStatsObserver.observe(heroStats);
    }

    // Animate counters when about stats section is visible
    const aboutStatsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.textContent.replace('+', ''));
                    if (!isNaN(target)) {
                        animateCounter(stat, target);
                        // Add back the + sign after animation
                        setTimeout(() => {
                            stat.textContent = stat.textContent + '+';
                        }, 2000);
                    }
                });
                aboutStatsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observe about stats
    const aboutStats = document.querySelector('.about-stats');
    if (aboutStats) {
        aboutStatsObserver.observe(aboutStats);
    }

    // Animate section title on scroll
    const sectionTitleObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { 
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });

    // Animate section title fill on scroll (middle of viewport)
    const sectionTitleFillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fill-animate');
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '0px 0px 0px 0px'
    });

    // Observe section title
    const sectionTitle = document.querySelector('.section-title');
    if (sectionTitle) {
        sectionTitleObserver.observe(sectionTitle);
        sectionTitleFillObserver.observe(sectionTitle);
    }

    // Animate services title on scroll
    const servicesTitle = document.querySelector('.services-title');
    if (servicesTitle) {
        sectionTitleObserver.observe(servicesTitle);
        sectionTitleFillObserver.observe(servicesTitle);
    }

    // Animate about title on scroll
    const aboutTitle = document.querySelector('.about-title');
    if (aboutTitle) {
        sectionTitleObserver.observe(aboutTitle);
        sectionTitleFillObserver.observe(aboutTitle);
    }

    // Animate service section titles on scroll
    const serviceTitles = document.querySelectorAll('.service-title');
    serviceTitles.forEach(title => {
        if (title) {
            sectionTitleObserver.observe(title);
            sectionTitleFillObserver.observe(title);
        }
    });

    // Animate materials title on scroll
    const materialsTitle = document.querySelector('.materials-title');
    if (materialsTitle) {
        sectionTitleObserver.observe(materialsTitle);
        sectionTitleFillObserver.observe(materialsTitle);
    }

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Let the form submit normally to PHP
            const name = this.querySelector('#name').value.trim();
            const email = this.querySelector('#email').value.trim();
            const phone = this.querySelector('#phone').value.trim();
            const message = this.querySelector('#message').value.trim();
            
            // Basic validation
            if (!name || !email || !phone || !message) {
                e.preventDefault();
                alert('Prosím, vyplňte všetky polia.');
                return false;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Prosím, zadajte platnú emailovú adresu.');
                return false;
            }
        });
    }
    
    // Check for success/error messages from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const msg = urlParams.get('msg');
    
    if (status === 'success') {
        alert('Ďakujeme! Vaša správa bola úspešne odoslaná. Ozveme sa vám čoskoro.');
        // Remove the status parameter from URL
        window.history.replaceState({}, document.title, window.location.pathname);
    } else if (status === 'error') {
        let errorMessage = 'Ups! Nastala chyba pri odosielaní správy. Prosím, skúste to znovu alebo nás kontaktujte priamo.';
        
        switch(msg) {
            case 'missing_fields':
                errorMessage = 'Prosím, vyplňte všetky povinné polia.';
                break;
            case 'invalid_email':
                errorMessage = 'Prosím, zadajte platnú emailovú adresu.';
                break;
            case 'send_failed':
                errorMessage = 'Nepodarilo sa odoslať správu. Skúste to prosím znovu.';
                break;
        }
        
        alert(errorMessage);
        // Remove the status parameter from URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Gallery image modal disabled - items now link to portfolio page
    // const galleryItems = document.querySelectorAll('.gallery-item');
    // Gallery modal functionality removed to allow direct navigation to portfolio page

    // Services carousel functionality
    let currentSlide = 0;
    const carousel = document.querySelector('.services-carousel');
    const cards = document.querySelectorAll('.services-carousel .service-card');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (carousel && cards.length > 0) {
        const cardWidth = cards[0].offsetWidth + 40; // card width + gap
        const maxSlides = Math.max(0, cards.length - 3); // Show 3 cards at a time, 4th partially visible
        
        function updateCarousel() {
            const translateX = -(currentSlide * cardWidth);
            carousel.style.transform = `translateX(${translateX}px)`;
            
            // Update button states
            prevBtn.disabled = currentSlide === 0;
            nextBtn.disabled = currentSlide >= maxSlides;
        }
        
        function nextSlide() {
            if (currentSlide < maxSlides) {
                currentSlide++;
                updateCarousel();
            }
        }
        
        function prevSlide() {
            if (currentSlide > 0) {
                currentSlide--;
                updateCarousel();
            }
        }
        
        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Initialize carousel
        updateCarousel();
        
        // Handle window resize
        window.addEventListener('resize', function() {
            const newCardWidth = cards[0].offsetWidth + 40;
            if (newCardWidth !== cardWidth) {
                location.reload(); // Simple solution for responsive updates
            }
        });
    }

    // Privacy Policy Modal Functionality
    const privacyModal = document.getElementById('privacy-modal');
    const privacyLink = document.getElementById('privacy-policy-link');
    const modalClose = document.querySelector('.modal-close');

    // Open modal
    if (privacyLink) {
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    }

    // Close modal when clicking X
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            closeModal();
        });
    }

    // Close modal when clicking outside
    if (privacyModal) {
        privacyModal.addEventListener('click', function(e) {
            if (e.target === privacyModal) {
                closeModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && privacyModal && privacyModal.style.display === 'block') {
            closeModal();
        }
    });

    function openModal() {
        if (privacyModal) {
            privacyModal.style.display = 'block';
            document.body.classList.add('modal-open');
            
            // Add show class after display is set for animation
            setTimeout(() => {
                privacyModal.classList.add('show');
            }, 10);
        }
    }

    function closeModal() {
        if (privacyModal) {
            privacyModal.classList.remove('show');
            
            // Wait for animation to complete before hiding
            setTimeout(() => {
                privacyModal.style.display = 'none';
                document.body.classList.remove('modal-open');
            }, 300);
        }
    }

    // Continuous slider animation (no pause on hover)
});

// Gallery modal styles removed - no longer needed
// Modal functionality disabled in favor of direct portfolio navigation 