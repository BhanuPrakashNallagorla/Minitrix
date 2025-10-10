// Predictive Maintenance Case Study Interactive Script - Industrial Dark Theme

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all industrial interactive features
    initSmoothScrolling();
    initScrollAnimations();
    initCounterAnimations();
    initLazyLoading();
    initTimelineAnimations();
    initBackToTop();
    initIndustrialThemeEffects();
    initMachineryAnimations();
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

// Animated counters for industrial metrics
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
                element.textContent = '$' + (current / 1000000).toFixed(1) + 'M';
            } else if (originalText.includes('$')) {
                element.textContent = '$' + (current / 1000000).toFixed(1) + 'M';
            } else if (originalText.includes('K+')) {
                element.textContent = Math.floor(current / 1000) + 'K+';
            } else if (originalText.includes('+')) {
                element.textContent = Math.floor(current) + '+';
            } else if (originalText.includes('91%')) {
                element.textContent = Math.floor(current) + '%';
            } else if (originalText.includes('72%')) {
                element.textContent = Math.floor(current) + '%';
            } else if (originalText.includes('28%')) {
                element.textContent = Math.floor(current) + '%';
            } else if (originalText.includes('45%')) {
                element.textContent = Math.floor(current) + '%';
            } else if (originalText.includes('58%')) {
                element.textContent = Math.floor(current) + '%';
            } else if (originalText.includes('310%')) {
                element.textContent = Math.floor(current) + '%';
            } else if (originalText.includes('99.8%')) {
                element.textContent = (current / 10).toFixed(1) + '%';
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
                
                // Parse different industrial number formats
                let number = 0;
                let duration = 2000;
                
                if (text.includes('72%')) {
                    number = 72;
                    duration = 2500;
                } else if (text.includes('91%')) {
                    number = 91;
                    duration = 2600;
                } else if (text.includes('$1.4M')) {
                    number = 1400000;
                    duration = 2800;
                } else if (text.includes('$850M')) {
                    number = 850000000;
                    duration = 3500;
                } else if (text.includes('2,400+')) {
                    number = 2400;
                    duration = 2500;
                } else if (text.includes('3,200')) {
                    number = 3200;
                    duration = 2800;
                } else if (text.includes('28%')) {
                    number = 28;
                    duration = 2000;
                } else if (text.includes('45%')) {
                    number = 45;
                    duration = 2100;
                } else if (text.includes('310%')) {
                    number = 310;
                    duration = 3000;
                } else if (text.includes('58%')) {
                    number = 58;
                    duration = 2200;
                } else if (text.includes('450+')) {
                    number = 450;
                    duration = 2300;
                } else if (text.includes('85K+')) {
                    number = 85000;
                    duration = 2800;
                } else if (text.includes('99.8%')) {
                    number = 998; // Will be divided by 10
                    duration = 2600;
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

// Enhanced lazy loading for industrial images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('fade-in');
                    
                    // Add subtle industrial glow effect for machinery images
                    if (img.alt.includes('industrial') || img.alt.includes('machinery') || img.alt.includes('equipment')) {
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

// Timeline progressive reveal with industrial theme
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
                        marker.style.animation = 'industrialPulse 2s ease-in-out infinite';
                    }, index * 300 + 500);
                }
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Industrial dark theme specific effects
function initIndustrialThemeEffects() {
    // Add subtle glow effects to interactive elements
    const interactiveElements = document.querySelectorAll('.industrial-card, .btn-primary-industrial, .btn-secondary-industrial');
    
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
        heroTitle.style.borderRight = '2px solid var(--industrial-primary)';
        
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

// Industrial-themed animations
function initMachineryAnimations() {
    // Add machinery effect to industrial icons
    const industrialIcons = document.querySelectorAll('.challenge-icon, .feature-icon, .benefit-icon, .tech-icon');
    
    industrialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'industrialMachinery 0.8s ease-in-out';
        });
        
        icon.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
    // Add machinery background effect
    createMachineryBackgroundEffect();
}

// Machinery background effect for industrial theme
function createMachineryBackgroundEffect() {
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
    let gears = [];
    
    // Create floating gear shapes
    for (let i = 0; i < 8; i++) {
        gears.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: 30 + Math.random() * 40,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.005,
            dx: (Math.random() - 0.5) * 0.2,
            dy: (Math.random() - 0.5) * 0.2,
            teeth: 8 + Math.floor(Math.random() * 8)
        });
    }
    
    function drawGears() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#ff6b35';
        ctx.lineWidth = 1;
        
        gears.forEach(gear => {
            ctx.save();
            ctx.translate(gear.x, gear.y);
            ctx.rotate(gear.rotation);
            
            drawGear(ctx, 0, 0, gear.size, gear.teeth);
            
            ctx.restore();
            
            // Update position and rotation
            gear.x += gear.dx;
            gear.y += gear.dy;
            gear.rotation += gear.rotationSpeed;
            
            // Wrap around screen
            if (gear.x > canvas.width + gear.size) gear.x = -gear.size;
            if (gear.x < -gear.size) gear.x = canvas.width + gear.size;
            if (gear.y > canvas.height + gear.size) gear.y = -gear.size;
            if (gear.y < -gear.size) gear.y = canvas.height + gear.size;
        });
        
        animationId = requestAnimationFrame(drawGears);
    }
    
    function drawGear(ctx, cx, cy, radius, teeth) {
        const toothHeight = radius * 0.3;
        const innerRadius = radius * 0.6;
        
        ctx.beginPath();
        
        for (let i = 0; i < teeth; i++) {
            const angle1 = (i * 2 * Math.PI) / teeth;
            const angle2 = ((i + 0.5) * 2 * Math.PI) / teeth;
            const angle3 = ((i + 1) * 2 * Math.PI) / teeth;
            
            // Outer tooth
            const x1 = cx + Math.cos(angle1) * radius;
            const y1 = cy + Math.sin(angle1) * radius;
            const x2 = cx + Math.cos(angle1) * (radius + toothHeight);
            const y2 = cy + Math.sin(angle1) * (radius + toothHeight);
            const x3 = cx + Math.cos(angle2) * (radius + toothHeight);
            const y3 = cy + Math.sin(angle2) * (radius + toothHeight);
            const x4 = cx + Math.cos(angle3) * radius;
            const y4 = cy + Math.sin(angle3) * radius;
            
            if (i === 0) {
                ctx.moveTo(x1, y1);
            } else {
                ctx.lineTo(x1, y1);
            }
            ctx.lineTo(x2, y2);
            ctx.lineTo(x3, y3);
            ctx.lineTo(x4, y4);
        }
        
        ctx.closePath();
        ctx.stroke();
        
        // Inner circle
        ctx.beginPath();
        ctx.arc(cx, cy, innerRadius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Center hole
        ctx.beginPath();
        ctx.arc(cx, cy, innerRadius * 0.3, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    drawGears();
    
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
            drawGears();
        }
    });
}

// Back to top button with industrial icon
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            <polyline points="9,11 12,8 15,11"></polyline>
        </svg>
    `;
    backToTopBtn.className = 'back-to-top-industrial';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top-industrial {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 3.5rem;
            height: 3.5rem;
            background: var(--industrial-gradient);
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
        
        .back-to-top-industrial.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top-industrial:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
        }
        
        @keyframes industrialPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        @keyframes industrialMachinery {
            0%, 100% { transform: scale(1); }
            25% { transform: scale(1.1) rotate(5deg); }
            50% { transform: scale(1.05) rotate(-3deg); }
            75% { transform: scale(1.15) rotate(3deg); }
        }
        
        @media (max-width: 768px) {
            .back-to-top-industrial {
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

// Add CSS animations for industrial dark theme
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    /* Industrial dark theme animation classes */
    .animate-in {
        animation: fadeInUpIndustrial 0.8s ease forwards;
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
    
    @keyframes fadeInUpIndustrial {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Industrial-themed hover effects */
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
    
    /* Industrial glow effect */
    .industrial-glow-effect {
        position: relative;
    }
    
    .industrial-glow-effect::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: var(--industrial-gradient);
        border-radius: inherit;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: -1;
    }
    
    .industrial-glow-effect:hover::before {
        opacity: 0.3;
    }
    
    /* Loading states for industrial theme */
    .loading-industrial {
        position: relative;
        overflow: hidden;
    }
    
    .loading-industrial::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.1), transparent);
        animation: shimmerIndustrial 2s infinite;
    }
    
    @keyframes shimmerIndustrial {
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
        
        .back-to-top-industrial {
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

// Initialize industrial-themed interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add loading class to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.classList.add('loading-industrial');
        img.addEventListener('load', function() {
            this.classList.remove('loading-industrial');
        });
    });
    
    // Add industrial glow effect to important elements
    const importantElements = document.querySelectorAll('.hero-title, .cta-text h2');
    importantElements.forEach(element => {
        element.classList.add('industrial-glow-effect');
    });
});
