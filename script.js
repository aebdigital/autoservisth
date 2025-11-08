// Autoservis TH JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Animate hamburger bars
            const bars = hamburger.querySelectorAll('.bar');
            if (hamburger.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            // Reset hamburger animation
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('#header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect
    const header = document.querySelector('#header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Counter animation for stats
    function animateCounter(element, target, duration = 2000, suffix = '') {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 16);
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate counters in stats section
                if (entry.target.classList.contains('stats-section')) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.textContent.replace(/\D/g, ''));
                        const suffix = stat.textContent.includes('+') ? '+' : 
                                      stat.textContent.includes('%') ? '%' : '';
                        if (target > 0) {
                            animateCounter(stat, target, 2000, suffix);
                        }
                    });
                }
            }
        });
    }, observerOptions);
    
    // Add fade-in animations to sections
    const animatedElements = document.querySelectorAll('.o-nas, .sluzby, .galeria, .preco-my, .kontakt, .stats-section');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            const speed = scrolled * 0.5;
            heroImage.style.transform = `translateY(${speed}px)`;
        }
    });
    
    // Gallery lightbox functionality
    const galleryItems = document.querySelectorAll('.galeria-item');
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            openLightbox(index);
        });
    });
    
    function openLightbox(index) {
        // Create lightbox overlay
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <button class="lightbox-prev">&#10094;</button>
                <img src="${galleryItems[index].querySelector('img').src}" alt="Gallery Image">
                <button class="lightbox-next">&#10095;</button>
                <div class="lightbox-counter">${index + 1} / ${galleryItems.length}</div>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        let currentIndex = index;
        
        // Close lightbox
        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) closeLightbox();
        });
        
        // Navigation
        lightbox.querySelector('.lightbox-prev').addEventListener('click', function() {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : galleryItems.length - 1;
            updateLightboxImage();
        });
        
        lightbox.querySelector('.lightbox-next').addEventListener('click', function() {
            currentIndex = currentIndex < galleryItems.length - 1 ? currentIndex + 1 : 0;
            updateLightboxImage();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', handleKeydown);
        
        function updateLightboxImage() {
            const img = lightbox.querySelector('img');
            const counter = lightbox.querySelector('.lightbox-counter');
            img.src = galleryItems[currentIndex].querySelector('img').src;
            counter.textContent = `${currentIndex + 1} / ${galleryItems.length}`;
        }
        
        function handleKeydown(e) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') lightbox.querySelector('.lightbox-prev').click();
            if (e.key === 'ArrowRight') lightbox.querySelector('.lightbox-next').click();
        }
        
        function closeLightbox() {
            document.body.removeChild(lightbox);
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleKeydown);
        }
    }
    
    // Contact form handling
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            // Show loading state
            button.textContent = 'ODOSIELAM...';
            button.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                alert('Ďakujeme za vašu správu! Ozveme sa vám čoskoro.');
                this.reset();
                button.textContent = originalText;
                button.disabled = false;
            }, 1500);
        });
    }
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.sluzba-card, .benefit-item, .galeria-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Add scroll indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = '<div class="scroll-line"></div>';
    document.body.appendChild(scrollIndicator);
    
    window.addEventListener('scroll', function() {
        const scrollPercent = (window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100;
        scrollIndicator.querySelector('.scroll-line').style.height = scrollPercent + '%';
    });
    
});

// Add CSS for lightbox and additional styles
const lightboxStyles = `
<style>
.lightbox-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease;
}

.lightbox-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.lightbox-content img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 8px;
}

.lightbox-close,
.lightbox-prev,
.lightbox-next {
    position: absolute;
    background: rgba(229, 9, 20, 0.8);
    color: white;
    border: none;
    padding: 15px;
    cursor: pointer;
    font-size: 24px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.lightbox-close {
    position: fixed;
    top: 20px;
    right: 20px;
}

.lightbox-prev {
    position: fixed;
    left: 50px;
    top: 50%;
    transform: translateY(-50%);
}

.lightbox-next {
    position: fixed;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);
}

.lightbox-close:hover {
    background: #e50914;
    transform: scale(1.05);
}

.lightbox-prev:hover,
.lightbox-next:hover {
    background: #e50914;
    transform: translateY(-50%) scale(1.05);
}

.lightbox-counter {
    position: absolute;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    font-size: 16px;
    font-weight: 600;
}

.scroll-indicator {
    position: fixed;
    top: 0;
    right: 0;
    width: 4px;
    height: 100vh;
    background: rgba(0, 0, 0, 0.1);
    z-index: 9999;
}

.scroll-line {
    width: 100%;
    background: #e50914;
    height: 0%;
    transition: height 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.loaded .fade-in {
    animation: slideInUp 0.8s ease forwards;
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .lightbox-prev,
    .lightbox-next {
        display: none;
    }
    
    .lightbox-close {
        top: 10px;
        right: 10px;
    }
}
</style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', lightboxStyles);