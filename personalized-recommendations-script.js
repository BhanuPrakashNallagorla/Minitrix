// Personalized Recommendations Case Study Interactive Script - E-commerce Dark Theme

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all e-commerce interactive features
    initSmoothScrolling();
    initScrollAnimations();
    initCounterAnimations();
    initLazyLoading();
    initTimelineAnimations();
    initBackToTop();
    initEcommerceThemeEffects();
    initRecommendationAnimations();
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
        '.testimonial-content, .cta-content, .tech-feature'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add stagger classes to grid containers
    const gridContainers = document.querySelectorAll(
        '.challenge-content, .feature-grid, .results-metrics, ' +
        '.benefits-grid-large, .studies-grid, .benefits-grid, .technical-features'
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

// Animated counters for e-commerce metrics
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
            
            if (originalText.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else if (originalText.includes('$') && originalText.includes('M')) {
                element.textContent = '$' + Math.floor(current) + 'M';
            } else if (originalText.includes('$')) {
                element.textContent = '$' + Math.floor(current);
            } else if (originalText.includes('M+')) {
                element.textContent = (current / 1000000).toFixed(1) + 'M+';
            } else if (originalText.includes('K+')) {
                element.textContent = (current / 1000).toFixed(0) + 'K+';
            } else if (originalText.includes('+')) {
                element.textContent = Math.floor(current) + '+';
            } else if (originalText.includes('99.9%')) {
                element.textContent = current.toFixed(1) + '%';
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
                
                // Parse different e-commerce number formats
                let number = 0;
                let duration = 2000;
                
                if (text.includes('47%')) {
                    number = 47;
                    duration = 2500;
                } else if (text.includes('34%')) {
                    number = 34;
                    duration = 2200;
                } else if (text.includes('52%')) {
                    number = 52;
                    duration = 2300;
                } else if (text.includes('68%')) {
                    number = 68;
                    duration = 2400;
                } else if (text.includes('89%')) {
                    number = 89;
                    duration = 2600;
                } else if (text.includes('156%')) {
                    number = 156;
                    duration = 3000;
                } else if (text.includes('28%')) {
                    number = 28;
                    duration = 2000;
                } else if (text.includes('43%')) {
                    number = 43;
                    duration = 2100;
                } else if (text.includes('$180M')) {
                    number = 180;
                    duration = 2800;
                } else if (text.includes('2.8M+')) {
                    number = 2800000;
                    duration = 3200;
                } else if (text.includes('45K+')) {
                    number = 45000;
                    duration = 2500;
                } else if (text.includes('850+')) {
                    number = 850;
                    duration = 2400;
                } else if (text.includes('12.5M+')) {
                    number = 12500000;
                    duration = 3500;
                } else if (text.includes('99.9%')) {
                    number = 99.9;
                    duration = 2800;
                } else if (text.includes('$127')) {
                    number = 127;
                    duration = 2000;
                } else if (text.includes('$170')) {
                    number = 170;
                    duration = 2200;
                } else if (text.includes('$2.92')) {
                    number = 292; // Will be divided by 100
                    duration = 2000;
                } else if (text.includes('$4.44')) {
                    number = 444; // Will be divided by 100
                    duration = 2200;
                } else if (text.includes('3.2%')) {
                    number = 32; // Will be divided by 10
                    duration = 1800;
                } else if (text.includes('5.4%')) {
                    number = 54; // Will be divided by 10
                    duration = 2000;
                } else if (text.includes('2.3%')) {
                    number = 23; // Will be divided by 10
                    duration = 1600;
                } else if (text.includes('3.4%')) {
                    number = 34; // Will be divided by 10
                    duration = 1800;
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

// Enhanced lazy loading for e-commerce images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('fade-in');
                    
                    // Add subtle e-commerce glow effect for product-related images
                    if (img.alt.includes('e-commerce') || img.alt.includes('recommendation') || img.alt.includes('personalized')) {
                        img.addEventListener('load', () => {
                            img.style.boxShadow = '0 0 30px rgba(255, 107, 53, 0.1)';
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

// Timeline progressive reveal with e-commerce theme
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
                        marker.style.animation = 'ecommercePulse 2s ease-in-out infinite';
                    }, index * 300 + 500);
                }
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// E-commerce dark theme specific effects
function initEcommerceThemeEffects() {
    // Add subtle glow effects to interactive elements
    const interactiveElements = document.querySelectorAll('.ecommerce-card, .btn-primary-ecommerce, .btn-secondary-ecommerce');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 32px rgba(255, 107, 53, 0.15)';
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
        heroTitle.style.borderRight = '2px solid var(--ecommerce-primary)';
        
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

// E-commerce-themed animations
function initRecommendationAnimations() {
    // Add shopping cart effect to e-commerce icons
    const ecommerceIcons = document.querySelectorAll('.challenge-icon, .feature-icon, .benefit-icon, .tech-icon');
    
    ecommerceIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'ecommerceCart 0.8s ease-in-out';
        });
        
        icon.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
    // Add product recommendation effect
    createProductRecommendationEffect();
}

// Product recommendation background effect for e-commerce theme
function createProductRecommendationEffect() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.02;
    `;
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let animationId;
    let products = [];
    
    // Create floating product recommendation shapes
    for (let i = 0; i < 12; i++) {
        products.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: 20 + Math.random() * 30,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.003,
            dx: (Math.random() - 0.5) * 0.3,
            dy: (Math.random() - 0.5) * 0.3,
            type: Math.floor(Math.random() * 3) // 0: star, 1: heart, 2: cart
        });
    }
    
    function drawProducts() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#ff6b35';
        ctx.fillStyle = '#ff6b35';
        ctx.lineWidth = 1;
        
        products.forEach(product => {
            ctx.save();
            ctx.translate(product.x, product.y);
            ctx.rotate(product.rotation);
            
            if (product.type === 0) {
                // Draw star (recommendation icon)
                drawStar(ctx, 0, 0, product.size / 2, product.size / 4, 5);
            } else if (product.type === 1) {
                // Draw heart (favorite icon)
                drawHeart(ctx, 0, 0, product.size / 2);
            } else {
                // Draw shopping cart
                drawCart(ctx, 0, 0, product.size / 2);
            }
            
            ctx.restore();
            
            // Update position and rotation
            product.x += product.dx;
            product.y += product.dy;
            product.rotation += product.rotationSpeed;
            
            // Wrap around screen
            if (product.x > canvas.width + product.size) product.x = -product.size;
            if (product.x < -product.size) product.x = canvas.width + product.size;
            if (product.y > canvas.height + product.size) product.y = -product.size;
            if (product.y < -product.size) product.y = canvas.height + product.size;
        });
        
        animationId = requestAnimationFrame(drawProducts);
    }
    
    function drawStar(ctx, cx, cy, outerRadius, innerRadius, points) {
        ctx.beginPath();
        for (let i = 0; i < points * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (i * Math.PI) / points;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
    }
    
    function drawHeart(ctx, cx, cy, size) {
        ctx.beginPath();
        ctx.moveTo(cx, cy + size / 4);
        ctx.bezierCurveTo(cx, cy, cx - size / 2, cy, cx - size / 2, cy + size / 4);
        ctx.bezierCurveTo(cx - size / 2, cy + size / 2, cx, cy + size, cx, cy + size);
        ctx.bezierCurveTo(cx, cy + size, cx + size / 2, cy + size / 2, cx + size / 2, cy + size / 4);
        ctx.bezierCurveTo(cx + size / 2, cy, cx, cy, cx, cy + size / 4);
        ctx.stroke();
    }
    
    function drawCart(ctx, cx, cy, size) {
        // Cart body
        ctx.strokeRect(cx - size / 2, cy - size / 4, size, size / 2);
        // Cart handle
        ctx.beginPath();
        ctx.moveTo(cx - size / 2, cy - size / 4);
        ctx.lineTo(cx - size / 1.5, cy - size / 2);
        ctx.stroke();
        // Cart wheels
        ctx.beginPath();
        ctx.arc(cx - size / 4, cy + size / 3, size / 8, 0, Math.PI * 2);
        ctx.arc(cx + size / 4, cy + size / 3, size / 8, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    drawProducts();
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Pause animation when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            drawProducts();
        }
    });
}

// Back to top button with e-commerce icon
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            <polyline points="9,11 12,8 15,11"></polyline>
        </svg>
    `;
    backToTopBtn.className = 'back-to-top-ecommerce';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top-ecommerce {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 3.5rem;
            height: 3.5rem;
            background: var(--ecommerce-gradient);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 20px rgba(255, 107, 53, 0.3);
        }
        
        .back-to-top-ecommerce.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top-ecommerce:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
        }
        
        @keyframes ecommercePulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        @keyframes ecommerceCart {
            0%, 100% { transform: scale(1); }
            25% { transform: scale(1.1) rotate(5deg); }
            50% { transform: scale(1.05) rotate(-3deg); }
            75% { transform: scale(1.15) rotate(3deg); }
        }
        
        @media (max-width: 768px) {
            .back-to-top-ecommerce {
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

// Add CSS animations for e-commerce dark theme
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    /* E-commerce dark theme animation classes */
    .animate-in {
        animation: fadeInUpEcommerce 0.8s ease forwards;
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
    
    @keyframes fadeInUpEcommerce {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* E-commerce-themed hover effects */
    .metric-card:hover .metric-icon {
        transform: scale(1.1) rotate(5deg);
        box-shadow: 0 0 20px rgba(255, 107, 53, 0.4);
        transition: all 0.3s ease;
    }
    
    .challenge-item:hover .challenge-icon {
        transform: scale(1.1);
        box-shadow: 0 0 15px rgba(255, 107, 53, 0.3);
        transition: all 0.3s ease;
    }
    
    .feature-item:hover .feature-icon {
        transform: scale(1.1);
        box-shadow: 0 0 20px rgba(255, 107, 53, 0.4);
        transition: all 0.3s ease;
    }
    
    .benefit-card:hover .benefit-icon {
        transform: scale(1.05) rotate(-5deg);
        box-shadow: 0 0 25px rgba(255, 107, 53, 0.3);
        transition: all 0.3s ease;
    }
    
    .tech-feature:hover .tech-icon {
        transform: scale(1.1);
        box-shadow: 0 0 15px rgba(255, 107, 53, 0.4);
        transition: all 0.3s ease;
    }
    
    /* E-commerce glow effect */
    .ecommerce-glow-effect {
        position: relative;
    }
    
    .ecommerce-glow-effect::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: var(--ecommerce-gradient);
        border-radius: inherit;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: -1;
    }
    
    .ecommerce-glow-effect:hover::before {
        opacity: 0.3;
    }
    
    /* Loading states for e-commerce theme */
    .loading-ecommerce {
        position: relative;
        overflow: hidden;
    }
    
    .loading-ecommerce::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.1), transparent);
        animation: shimmerEcommerce 2s infinite;
    }
    
    @keyframes shimmerEcommerce {
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
        
        .back-to-top-ecommerce {
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

// Initialize e-commerce-themed interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add loading class to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.classList.add('loading-ecommerce');
        img.addEventListener('load', function() {
            this.classList.remove('loading-ecommerce');
        });
    });
    
    // Add e-commerce glow effect to important elements
    const importantElements = document.querySelectorAll('.hero-title, .cta-text h2');
    importantElements.forEach(element => {
        element.classList.add('ecommerce-glow-effect');
    });
});
