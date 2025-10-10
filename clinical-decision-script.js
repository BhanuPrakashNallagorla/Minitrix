// Clinical Decision Support Case Study Interactive Script - Medical Dark Theme

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all medical interactive features
    initSmoothScrolling();
    initScrollAnimations();
    initCounterAnimations();
    initLazyLoading();
    initTimelineAnimations();
    initBackToTop();
    initMedicalThemeEffects();
    initClinicalAnimations();
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

// Animated counters for medical metrics
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
            
            if (originalText.includes('4.6/5')) {
                element.textContent = (current / 10).toFixed(1) + '/5';
            } else if (originalText.includes('%')) {
                element.textContent = Math.floor(current) + '%';
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
                
                // Parse different medical number formats
                let number = 0;
                let duration = 2000;
                
                if (text.includes('88%')) {
                    number = 88;
                    duration = 2500;
                } else if (text.includes('67%')) {
                    number = 67;
                    duration = 2000;
                } else if (text.includes('4.6/5')) {
                    number = 46; // Will be divided by 10
                    duration = 1800;
                } else if (text.includes('2.3M+')) {
                    number = 2300000;
                    duration = 3000;
                } else if (text.includes('2,400+')) {
                    number = 2400;
                    duration = 2500;
                } else if (text.includes('180K+')) {
                    number = 180000;
                    duration = 2800;
                } else if (text.includes('150+')) {
                    number = 150;
                    duration = 2000;
                } else if (text.includes('99.9%')) {
                    number = 99.9;
                    duration = 2800;
                } else if (text.includes('850')) {
                    number = 850;
                    duration = 2200;
                } else if (text.includes('35+')) {
                    number = 35;
                    duration = 1500;
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

// Enhanced lazy loading for medical images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('fade-in');
                    
                    // Add subtle medical glow effect for clinical images
                    if (img.alt.includes('clinical') || img.alt.includes('medical') || img.alt.includes('healthcare')) {
                        img.addEventListener('load', () => {
                            img.style.boxShadow = '0 0 30px rgba(9, 105, 218, 0.1)';
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

// Timeline progressive reveal with medical theme
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
                        marker.style.animation = 'medicalPulse 2s ease-in-out infinite';
                    }, index * 300 + 500);
                }
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Medical dark theme specific effects
function initMedicalThemeEffects() {
    // Add subtle glow effects to interactive elements
    const interactiveElements = document.querySelectorAll('.medical-card, .btn-primary-medical, .btn-secondary-medical');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 32px rgba(9, 105, 218, 0.15)';
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
        heroTitle.style.borderRight = '2px solid var(--medical-primary)';
        
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

// Medical-themed animations
function initClinicalAnimations() {
    // Add heartbeat effect to medical icons
    const medicalIcons = document.querySelectorAll('.challenge-icon, .feature-icon, .benefit-icon');
    
    medicalIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'medicalHeartbeat 1s ease-in-out';
        });
        
        icon.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
    // Add EKG-style line effect
    createEKGEffect();
}

// EKG-style background effect for medical theme
function createEKGEffect() {
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
    let offset = 0;
    
    function drawEKG() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#0969da';
        ctx.lineWidth = 1;
        
        const centerY = canvas.height / 2;
        const amplitude = 30;
        const frequency = 0.01;
        
        ctx.beginPath();
        
        for (let x = 0; x < canvas.width + 100; x += 2) {
            let y = centerY;
            
            // Create EKG-like pattern
            const wave = Math.sin((x + offset) * frequency) * amplitude * 0.3;
            
            // Add sharp spikes occasionally (like heartbeat)
            if ((x + offset) % 200 < 20) {
                const spikePhase = ((x + offset) % 200) / 20;
                if (spikePhase < 0.3) {
                    y += amplitude * (spikePhase / 0.3);
                } else if (spikePhase < 0.7) {
                    y += amplitude * (1 - (spikePhase - 0.3) / 0.4);
                } else {
                    y += wave;
                }
            } else {
                y += wave;
            }
            
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
        
        offset += 2;
        animationId = requestAnimationFrame(drawEKG);
    }
    
    drawEKG();
    
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
            drawEKG();
        }
    });
}

// Back to top button with medical icon
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            <polyline points="9,11 12,8 15,11"></polyline>
        </svg>
    `;
    backToTopBtn.className = 'back-to-top-medical';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top-medical {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 3.5rem;
            height: 3.5rem;
            background: var(--medical-gradient);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 20px rgba(9, 105, 218, 0.3);
        }
        
        .back-to-top-medical.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top-medical:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 8px 25px rgba(9, 105, 218, 0.4);
        }
        
        @keyframes medicalPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        @keyframes medicalHeartbeat {
            0%, 100% { transform: scale(1); }
            25% { transform: scale(1.1); }
            50% { transform: scale(1.05); }
            75% { transform: scale(1.15); }
        }
        
        @media (max-width: 768px) {
            .back-to-top-medical {
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

// Add CSS animations for medical dark theme
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    /* Medical dark theme animation classes */
    .animate-in {
        animation: fadeInUpMedical 0.8s ease forwards;
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
    
    @keyframes fadeInUpMedical {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Medical-themed hover effects */
    .metric-card:hover .metric-icon {
        transform: scale(1.1) rotate(5deg);
        box-shadow: 0 0 20px rgba(9, 105, 218, 0.4);
        transition: all 0.3s ease;
    }
    
    .challenge-item:hover .challenge-icon {
        transform: scale(1.1);
        box-shadow: 0 0 15px rgba(9, 105, 218, 0.3);
        transition: all 0.3s ease;
    }
    
    .feature-item:hover .feature-icon {
        transform: scale(1.1);
        box-shadow: 0 0 20px rgba(9, 105, 218, 0.4);
        transition: all 0.3s ease;
    }
    
    .benefit-card:hover .benefit-icon {
        transform: scale(1.05) rotate(-5deg);
        box-shadow: 0 0 25px rgba(9, 105, 218, 0.3);
        transition: all 0.3s ease;
    }
    
    .workflow-step:hover .step-number {
        transform: scale(1.1);
        box-shadow: 0 0 15px rgba(9, 105, 218, 0.4);
        transition: all 0.3s ease;
    }
    
    /* Medical glow effect */
    .medical-glow-effect {
        position: relative;
    }
    
    .medical-glow-effect::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: var(--medical-gradient);
        border-radius: inherit;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: -1;
    }
    
    .medical-glow-effect:hover::before {
        opacity: 0.3;
    }
    
    /* Loading states for medical theme */
    .loading-medical {
        position: relative;
        overflow: hidden;
    }
    
    .loading-medical::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(9, 105, 218, 0.1), transparent);
        animation: shimmerMedical 2s infinite;
    }
    
    @keyframes shimmerMedical {
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
        
        .back-to-top-medical {
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

// Initialize medical-themed interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add loading class to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.classList.add('loading-medical');
        img.addEventListener('load', function() {
            this.classList.remove('loading-medical');
        });
    });
    
    // Add medical glow effect to important elements
    const importantElements = document.querySelectorAll('.hero-title, .cta-text h2');
    importantElements.forEach(element => {
        element.classList.add('medical-glow-effect');
    });
});
