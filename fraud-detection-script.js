// Fraud Detection Case Study Interactive Script - Dark Theme

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initSmoothScrolling();
    initScrollAnimations();
    initCounterAnimations();
    initLazyLoading();
    initTimelineAnimations();
    initBackToTop();
    initDarkThemeEffects();
    initSecurityAnimations();
});

// Smooth scrolling for anchor links
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
                        }, index * 150);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.hero-content, .client-info, .challenge-item, .feature-item, ' +
        '.timeline-item, .metric-card, .benefit-card, .study-card, ' +
        '.testimonial-content, .cta-content, .tech-component'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add stagger classes to grid containers
    const gridContainers = document.querySelectorAll(
        '.challenge-content, .feature-grid, .results-metrics, ' +
        '.benefits-grid-large, .studies-grid, .benefits-grid, .tech-details'
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

// Animated counters for metrics with fraud-specific formatting
function initCounterAnimations() {
    const counterElements = document.querySelectorAll('.metric-value, .benefit-metric, .stat-number');
    
    const animateCounter = (element, target, duration = 2000, suffix = '') => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format the number based on the target and content
            const originalText = element.dataset.originalText || element.textContent;
            
            if (originalText.includes('99.99%')) {
                element.textContent = current.toFixed(2) + '%';
            } else if (originalText.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else if (originalText.includes('M')) {
                element.textContent = '$' + (current / 1000000).toFixed(1) + 'M';
            } else if (originalText.includes('K')) {
                element.textContent = (current / 1000).toFixed(0) + 'K+';
            } else if (originalText.includes('/5')) {
                element.textContent = (current / 10).toFixed(1) + '/5';
            } else if (originalText.includes('ms')) {
                element.innerHTML = '&lt;' + Math.floor(current) + 'ms';
            } else if (originalText.includes('.')) {
                element.textContent = (current / 10).toFixed(1) + suffix;
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 16);
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                
                const text = entry.target.textContent;
                entry.target.dataset.originalText = text;
                
                // Parse different number formats
                let number = 0;
                let duration = 2000;
                
                if (text.includes('94%')) {
                    number = 94;
                    duration = 2500;
                } else if (text.includes('67%')) {
                    number = 67;
                    duration = 2000;
                } else if (text.includes('340%')) {
                    number = 340;
                    duration = 3000;
                } else if (text.includes('4.7/5')) {
                    number = 47; // Will be divided by 10
                    duration = 1800;
                } else if (text.includes('50K+')) {
                    number = 50000;
                    duration = 2500;
                } else if (text.includes('$500M+')) {
                    number = 500000000;
                    duration = 3500;
                } else if (text.includes('200+')) {
                    number = 200;
                    duration = 2000;
                } else if (text.includes('99.99%')) {
                    number = 99.99;
                    duration = 2800;
                } else {
                    const parsed = parseFloat(text.replace(/[^0-9.]/g, ''));
                    if (!isNaN(parsed)) {
                        number = parsed;
                    }
                }
                
                if (number > 0) {
                    entry.target.textContent = '0';
                    animateCounter(entry.target, number, duration);
                }
            }
        });
    }, { threshold: 0.5 });
    
    counterElements.forEach(el => {
        counterObserver.observe(el);
    });
}

// Enhanced lazy loading for images with dark theme effects
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('fade-in');
                    
                    // Add subtle glow effect for security-themed images
                    if (img.alt.includes('security') || img.alt.includes('fraud')) {
                        img.addEventListener('load', () => {
                            img.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.1)';
                        });
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Timeline progressive reveal with security theme
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(timelineItems).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 300}ms`;
                entry.target.classList.add('slide-in-left');
                
                // Add pulse effect to timeline markers
                const marker = entry.target.querySelector('.timeline-marker');
                if (marker) {
                    setTimeout(() => {
                        marker.style.animation = 'pulse 2s ease-in-out infinite';
                    }, index * 300 + 500);
                }
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Dark theme specific effects
function initDarkThemeEffects() {
    // Add subtle glow effects to interactive elements
    const interactiveElements = document.querySelectorAll('.dark-card, .btn-primary-dark, .btn-secondary-dark');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 32px rgba(0, 212, 255, 0.15)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid var(--accent-primary)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 500);
    }
}

// Security-themed animations
function initSecurityAnimations() {
    // Add scanning line effect to technical images
    const techImages = document.querySelectorAll('.tech-overview img, .challenge-image img');
    
    techImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            const scanLine = document.createElement('div');
            scanLine.style.cssText = `
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 2px;
                background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
                animation: scan 2s ease-in-out infinite;
                pointer-events: none;
                z-index: 10;
            `;
            
            const container = this.parentElement;
            container.style.position = 'relative';
            container.appendChild(scanLine);
            
            setTimeout(() => {
                if (scanLine.parentElement) {
                    scanLine.parentElement.removeChild(scanLine);
                }
            }, 2000);
        });
    });
    
    // Add matrix-style background effect
    createMatrixEffect();
}

// Matrix-style background effect for dark theme
function createMatrixEffect() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.03;
    `;
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00d4ff';
        ctx.font = fontSize + 'px arial';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Back to top button with security icon
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.16-.21 2.31-.54 3.45-.98"/>
            <polyline points="9,11 12,8 15,11"></polyline>
        </svg>
    `;
    backToTopBtn.className = 'back-to-top-security';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top-security {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 3.5rem;
            height: 3.5rem;
            background: var(--accent-gradient);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 20px rgba(0, 212, 255, 0.3);
        }
        
        .back-to-top-security.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top-security:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 8px 25px rgba(0, 212, 255, 0.4);
        }
        
        @keyframes scan {
            0% { left: -100%; }
            100% { left: 100%; }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        @media (max-width: 768px) {
            .back-to-top-security {
                bottom: 1rem;
                right: 1rem;
                width: 3rem;
                height: 3rem;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', debounce(() => {
        if (window.pageYOffset > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }, 100));
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add CSS animations for dark theme
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    /* Dark theme animation classes */
    .animate-in {
        animation: fadeInUpDark 0.8s ease forwards;
    }
    
    .stagger-child {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    .stagger-child.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    @keyframes fadeInUpDark {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Security-themed hover effects */
    .metric-card:hover .metric-icon {
        transform: scale(1.1) rotate(5deg);
        box-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
        transition: all 0.3s ease;
    }
    
    .challenge-item:hover .challenge-icon {
        transform: scale(1.1);
        box-shadow: 0 0 15px rgba(0, 212, 255, 0.3);
        transition: all 0.3s ease;
    }
    
    .feature-item:hover .feature-icon {
        transform: scale(1.1);
        box-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
        transition: all 0.3s ease;
    }
    
    .benefit-card:hover .benefit-icon {
        transform: scale(1.05) rotate(-5deg);
        box-shadow: 0 0 25px rgba(0, 212, 255, 0.3);
        transition: all 0.3s ease;
    }
    
    /* Glitch effect for security theme */
    .glitch-effect {
        position: relative;
    }
    
    .glitch-effect::before,
    .glitch-effect::after {
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    
    .glitch-effect::before {
        animation: glitch-1 0.5s infinite;
        color: var(--accent-primary);
        z-index: -1;
    }
    
    .glitch-effect::after {
        animation: glitch-2 0.5s infinite;
        color: #ff0080;
        z-index: -2;
    }
    
    @keyframes glitch-1 {
        0%, 14%, 15%, 49%, 50%, 99%, 100% {
            transform: translate(0);
        }
        15%, 49% {
            transform: translate(-2px, 0);
        }
    }
    
    @keyframes glitch-2 {
        0%, 20%, 21%, 62%, 63%, 99%, 100% {
            transform: translate(0);
        }
        21%, 62% {
            transform: translate(2px, 0);
        }
    }
    
    /* Loading states for dark theme */
    .loading-dark {
        position: relative;
        overflow: hidden;
    }
    
    .loading-dark::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent);
        animation: shimmerDark 2s infinite;
    }
    
    @keyframes shimmerDark {
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
        
        .back-to-top-security {
            animation: none !important;
        }
    }
`;

document.head.appendChild(animationStyles);

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

// Initialize security-themed interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add loading class to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.classList.add('loading-dark');
        img.addEventListener('load', function() {
            this.classList.remove('loading-dark');
        });
    });
    
    // Add glitch effect to security-related headings
    const securityHeadings = document.querySelectorAll('h2, h3');
    securityHeadings.forEach(heading => {
        if (heading.textContent.includes('Fraud') || 
            heading.textContent.includes('Security') || 
            heading.textContent.includes('Detection')) {
            heading.classList.add('glitch-effect');
            heading.setAttribute('data-text', heading.textContent);
        }
    });
});
