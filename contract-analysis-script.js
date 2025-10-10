// Contract Analysis Case Study Interactive Script - Legal Dark Theme

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all legal interactive features
    initSmoothScrolling();
    initScrollAnimations();
    initCounterAnimations();
    initLazyLoading();
    initTimelineAnimations();
    initBackToTop();
    initLegalThemeEffects();
    initContractAnimations();
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
        '.testimonial-content, .cta-content, .workflow-step'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add stagger classes to grid containers
    const gridContainers = document.querySelectorAll(
        '.challenge-content, .feature-grid, .results-metrics, ' +
        '.benefits-grid-large, .studies-grid, .benefits-grid, .workflow-steps'
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

// Animated counters for legal metrics
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
            
            if (originalText.includes('4.8/5')) {
                element.textContent = (current / 10).toFixed(1) + '/5';
            } else if (originalText.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else if (originalText.includes('$2.4M')) {
                element.textContent = '$' + (current / 1000000).toFixed(1) + 'M';
            } else if (originalText.includes('$24B')) {
                element.textContent = '$' + Math.floor(current) + 'B';
            } else if (originalText.includes('M+')) {
                element.textContent = (current / 1000000).toFixed(1) + 'M+';
            } else if (originalText.includes('K+')) {
                element.textContent = (current / 1000).toFixed(0) + 'K+';
            } else if (originalText.includes('+')) {
                element.textContent = Math.floor(current) + '+';
            } else if (originalText.includes('99.8%')) {
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
                
                // Parse different legal number formats
                let number = 0;
                let duration = 2000;
                
                if (text.includes('78%')) {
                    number = 78;
                    duration = 2500;
                } else if (text.includes('95%')) {
                    number = 95;
                    duration = 2000;
                } else if (text.includes('$2.4M')) {
                    number = 2400000;
                    duration = 3000;
                } else if (text.includes('$24B')) {
                    number = 24;
                    duration = 2500;
                } else if (text.includes('85K+')) {
                    number = 85000;
                    duration = 2800;
                } else if (text.includes('12K+')) {
                    number = 12000;
                    duration = 2200;
                } else if (text.includes('500+')) {
                    number = 500;
                    duration = 2000;
                } else if (text.includes('2.8M+')) {
                    number = 2800000;
                    duration = 3200;
                } else if (text.includes('99.8%')) {
                    number = 99.8;
                    duration = 2800;
                } else if (text.includes('4.8/5')) {
                    number = 48; // Will be divided by 10
                    duration = 1800;
                } else if (text.includes('45+')) {
                    number = 45;
                    duration = 1500;
                } else if (text.includes('91%')) {
                    number = 91;
                    duration = 2200;
                } else if (text.includes('85%')) {
                    number = 85;
                    duration = 2100;
                } else if (text.includes('67%')) {
                    number = 67;
                    duration = 2000;
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

// Enhanced lazy loading for legal images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('fade-in');
                    
                    // Add subtle legal glow effect for contract-related images
                    if (img.alt.includes('contract') || img.alt.includes('legal') || img.alt.includes('law')) {
                        img.addEventListener('load', () => {
                            img.style.boxShadow = '0 0 30px rgba(201, 169, 110, 0.1)';
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

// Timeline progressive reveal with legal theme
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
                        marker.style.animation = 'legalPulse 2s ease-in-out infinite';
                    }, index * 300 + 500);
                }
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Legal dark theme specific effects
function initLegalThemeEffects() {
    // Add subtle glow effects to interactive elements
    const interactiveElements = document.querySelectorAll('.legal-card, .btn-primary-legal, .btn-secondary-legal');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 32px rgba(201, 169, 110, 0.15)';
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
        heroTitle.style.borderRight = '2px solid var(--legal-primary)';
        
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

// Legal-themed animations
function initContractAnimations() {
    // Add scale effect to legal icons
    const legalIcons = document.querySelectorAll('.challenge-icon, .feature-icon, .benefit-icon');
    
    legalIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'legalScale 0.6s ease-in-out';
        });
        
        icon.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
    // Add document shuffle effect
    createDocumentEffect();
}

// Document shuffle background effect for legal theme
function createDocumentEffect() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.015;
    `;
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let animationId;
    let documents = [];
    
    // Create floating document shapes
    for (let i = 0; i < 8; i++) {
        documents.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            width: 60 + Math.random() * 40,
            height: 80 + Math.random() * 60,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.005,
            dx: (Math.random() - 0.5) * 0.5,
            dy: (Math.random() - 0.5) * 0.5
        });
    }
    
    function drawDocuments() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#c9a96e';
        ctx.lineWidth = 1;
        
        documents.forEach(doc => {
            ctx.save();
            ctx.translate(doc.x + doc.width / 2, doc.y + doc.height / 2);
            ctx.rotate(doc.rotation);
            
            // Draw document outline
            ctx.strokeRect(-doc.width / 2, -doc.height / 2, doc.width, doc.height);
            
            // Draw document lines
            const lineSpacing = 8;
            for (let y = -doc.height / 2 + 10; y < doc.height / 2 - 10; y += lineSpacing) {
                ctx.beginPath();
                ctx.moveTo(-doc.width / 2 + 10, y);
                ctx.lineTo(doc.width / 2 - 10, y);
                ctx.stroke();
            }
            
            ctx.restore();
            
            // Update position and rotation
            doc.x += doc.dx;
            doc.y += doc.dy;
            doc.rotation += doc.rotationSpeed;
            
            // Wrap around screen
            if (doc.x > canvas.width + doc.width) doc.x = -doc.width;
            if (doc.x < -doc.width) doc.x = canvas.width + doc.width;
            if (doc.y > canvas.height + doc.height) doc.y = -doc.height;
            if (doc.y < -doc.height) doc.y = canvas.height + doc.height;
        });
        
        animationId = requestAnimationFrame(drawDocuments);
    }
    
    drawDocuments();
    
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
            drawDocuments();
        }
    });
}

// Back to top button with legal icon
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <polyline points="9,11 12,8 15,11"></polyline>
        </svg>
    `;
    backToTopBtn.className = 'back-to-top-legal';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top-legal {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 3.5rem;
            height: 3.5rem;
            background: var(--legal-gradient);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 20px rgba(201, 169, 110, 0.3);
        }
        
        .back-to-top-legal.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top-legal:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 8px 25px rgba(201, 169, 110, 0.4);
        }
        
        @keyframes legalPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        @keyframes legalScale {
            0%, 100% { transform: scale(1); }
            25% { transform: scale(1.1); }
            50% { transform: scale(1.05); }
            75% { transform: scale(1.15); }
        }
        
        @media (max-width: 768px) {
            .back-to-top-legal {
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

// Add CSS animations for legal dark theme
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    /* Legal dark theme animation classes */
    .animate-in {
        animation: fadeInUpLegal 0.8s ease forwards;
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
    
    @keyframes fadeInUpLegal {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Legal-themed hover effects */
    .metric-card:hover .metric-icon {
        transform: scale(1.1) rotate(5deg);
        box-shadow: 0 0 20px rgba(201, 169, 110, 0.4);
        transition: all 0.3s ease;
    }
    
    .challenge-item:hover .challenge-icon {
        transform: scale(1.1);
        box-shadow: 0 0 15px rgba(201, 169, 110, 0.3);
        transition: all 0.3s ease;
    }
    
    .feature-item:hover .feature-icon {
        transform: scale(1.1);
        box-shadow: 0 0 20px rgba(201, 169, 110, 0.4);
        transition: all 0.3s ease;
    }
    
    .benefit-card:hover .benefit-icon {
        transform: scale(1.05) rotate(-5deg);
        box-shadow: 0 0 25px rgba(201, 169, 110, 0.3);
        transition: all 0.3s ease;
    }
    
    .workflow-step:hover .step-number {
        transform: scale(1.1);
        box-shadow: 0 0 15px rgba(201, 169, 110, 0.4);
        transition: all 0.3s ease;
    }
    
    /* Legal glow effect */
    .legal-glow-effect {
        position: relative;
    }
    
    .legal-glow-effect::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: var(--legal-gradient);
        border-radius: inherit;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: -1;
    }
    
    .legal-glow-effect:hover::before {
        opacity: 0.3;
    }
    
    /* Loading states for legal theme */
    .loading-legal {
        position: relative;
        overflow: hidden;
    }
    
    .loading-legal::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(201, 169, 110, 0.1), transparent);
        animation: shimmerLegal 2s infinite;
    }
    
    @keyframes shimmerLegal {
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
        
        .back-to-top-legal {
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

// Initialize legal-themed interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add loading class to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.classList.add('loading-legal');
        img.addEventListener('load', function() {
            this.classList.remove('loading-legal');
        });
    });
    
    // Add legal glow effect to important elements
    const importantElements = document.querySelectorAll('.hero-title, .cta-text h2');
    importantElements.forEach(element => {
        element.classList.add('legal-glow-effect');
    });
});
