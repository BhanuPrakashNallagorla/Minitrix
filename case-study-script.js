// Case Study Interactive Script - Minitrix Theme

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Intersection Observer for animations
    initScrollAnimations();
    
    // Counter animations for metrics
    initCounterAnimations();
    
    // Lazy loading for images
    initLazyLoading();
    
    // Timeline animations
    initTimelineAnimations();
    
    // Back to top functionality
    initBackToTop();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Intersection Observer for scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('stagger-parent')) {
                    const children = entry.target.querySelectorAll('.stagger-child');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-in');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.hero-content, .client-info, .challenge-item, .feature-item, ' +
        '.timeline-item, .metric-card, .takeaway-item, .study-card, ' +
        '.testimonial-content, .cta-content'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add stagger classes to grid containers
    const gridContainers = document.querySelectorAll(
        '.challenge-content, .feature-grid, .results-metrics, ' +
        '.takeaways-grid, .studies-grid, .benefits-grid'
    );
    
    gridContainers.forEach(container => {
        container.classList.add('stagger-parent');
        const children = container.children;
        Array.from(children).forEach(child => {
            child.classList.add('stagger-child');
        });
        observer.observe(container);
    });
}

// Animated counters for metrics
function initCounterAnimations() {
    const counterElements = document.querySelectorAll('.metric-value, .benefit-metric, .stat-number');
    
    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format the number based on the target
            if (target >= 1000000) {
                element.textContent = (current / 1000000).toFixed(1) + 'M';
            } else if (target >= 1000) {
                element.textContent = (current / 1000).toFixed(1) + 'K';
            } else if (target < 1) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                
                const text = entry.target.textContent;
                const number = parseFloat(text.replace(/[^0-9.]/g, ''));
                
                if (!isNaN(number)) {
                    entry.target.textContent = '0';
                    
                    // Handle different formats
                    if (text.includes('M')) {
                        animateCounter(entry.target, number, 2500);
                    } else if (text.includes('K')) {
                        animateCounter(entry.target, number, 2000);
                    } else if (text.includes('%')) {
                        animateCounter(entry.target, number, 1500);
                    } else {
                        animateCounter(entry.target, number, 2000);
                    }
                }
            }
        });
    }, { threshold: 0.5 });
    
    counterElements.forEach(el => {
        counterObserver.observe(el);
    });
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('fade-in');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Timeline progressive reveal
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${Array.from(timelineItems).indexOf(entry.target) * 200}ms`;
                entry.target.classList.add('slide-in-left');
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Back to top button
function initBackToTop() {
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="18,15 12,9 6,15"></polyline>
        </svg>
    `;
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 3rem;
            height: 3rem;
            background: var(--accent-gradient);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
        }
        
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(14, 165, 233, 0.4);
        }
        
        @media (max-width: 768px) {
            .back-to-top {
                bottom: 1rem;
                right: 1rem;
                width: 2.5rem;
                height: 2.5rem;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Parallax effect for hero section
function initParallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Add CSS animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    /* Animation classes */
    .animate-in {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    .stagger-child {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
    
    .stagger-child.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Hover effects */
    .metric-card:hover .metric-icon {
        transform: scale(1.1);
        transition: transform 0.3s ease;
    }
    
    .challenge-item:hover .challenge-icon {
        transform: scale(1.1) rotate(5deg);
        transition: transform 0.3s ease;
    }
    
    .feature-item:hover .feature-icon {
        transform: scale(1.1);
        transition: transform 0.3s ease;
    }
    
    .takeaway-item:hover .takeaway-number {
        transform: scale(1.1);
        transition: transform 0.3s ease;
    }
    
    /* Loading states */
    .loading {
        position: relative;
        overflow: hidden;
    }
    
    .loading::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
        animation: shimmer 1.5s infinite;
    }
    
    @keyframes shimmer {
        to {
            left: 100%;
        }
    }
    
    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;

document.head.appendChild(animationStyles);

// Social sharing functionality
function initSocialSharing() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.dataset.platform;
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            const text = encodeURIComponent('Check out this case study from Minitrix');
            
            let shareUrl = '';
            
            switch(platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'email':
                    shareUrl = `mailto:?subject=${title}&body=${text} ${url}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

// Print functionality
function initPrintSupport() {
    const printBtn = document.querySelector('.print-btn');
    
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initSocialSharing();
    initPrintSupport();
    
    // Add loading class to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.classList.add('loading');
        img.addEventListener('load', function() {
            this.classList.remove('loading');
        });
    });
});

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(() => {
    // Scroll-dependent functionality here
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);
