/**
 * Enterprise Blog System - Interactive Functionality
 * Production-ready JavaScript with performance optimizations
 */

(function() {
    'use strict';

    // ==========================================================================
    // Configuration and Constants
    // ==========================================================================
    
    const CONFIG = {
        readingSpeed: 200, // words per minute
        progressUpdateInterval: 100, // milliseconds
        scrollThreshold: 100, // pixels from top to show back-to-top button
        animationDuration: 300, // milliseconds
        localStorageKeys: {
            theme: 'blog-theme',
            readingPosition: 'blog-reading-position',
            bookmarks: 'blog-bookmarks'
        }
    };

    // ==========================================================================
    // Utility Functions
    // ==========================================================================
    
    /**
     * Debounce function to limit function calls
     */
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

    /**
     * Throttle function to limit function calls
     */
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Get reading time estimate
     */
    function getReadingTime() {
        const articleContent = document.querySelector('.article-content');
        if (!articleContent) return 0;
        
        const text = articleContent.innerText;
        const wordCount = text.split(/\s+/).length;
        return Math.ceil(wordCount / CONFIG.readingSpeed);
    }

    /**
     * Update reading time display
     */
    function updateReadingTime() {
        const timeElements = document.querySelectorAll('.time-text');
        const readingTime = getReadingTime();
        
        timeElements.forEach(element => {
            element.textContent = `${readingTime} min read`;
        });
    }

    // ==========================================================================
    // Theme Management
    // ==========================================================================
    
    class ThemeManager {
        constructor() {
            this.currentTheme = this.getStoredTheme() || 'light';
            this.init();
        }

        init() {
            this.applyTheme(this.currentTheme);
            this.bindEvents();
        }

        getStoredTheme() {
            try {
                return localStorage.getItem(CONFIG.localStorageKeys.theme);
            } catch (e) {
                return 'light';
            }
        }

        setStoredTheme(theme) {
            try {
                localStorage.setItem(CONFIG.localStorageKeys.theme, theme);
            } catch (e) {
                console.warn('Could not save theme preference');
            }
        }

        applyTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            this.currentTheme = theme;
            this.setStoredTheme(theme);
            this.updateThemeIcon(theme);
        }

        updateThemeIcon(theme) {
            const themeIcon = document.querySelector('.theme-icon');
            if (themeIcon) {
                themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
            }
        }

        toggleTheme() {
            const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
            this.applyTheme(newTheme);
        }

        bindEvents() {
            const themeToggle = document.querySelector('.theme-toggle');
            if (themeToggle) {
                themeToggle.addEventListener('click', () => this.toggleTheme());
            }
        }
    }

    // ==========================================================================
    // Reading Progress Management
    // ==========================================================================
    
    class ReadingProgress {
        constructor() {
            this.progressBar = document.querySelector('.progress-bar');
            this.isTracking = false;
            this.init();
        }

        init() {
            if (!this.progressBar) return;
            
            this.bindEvents();
            this.startTracking();
        }

        bindEvents() {
            window.addEventListener('scroll', throttle(() => this.updateProgress(), CONFIG.progressUpdateInterval));
            window.addEventListener('resize', debounce(() => this.updateProgress(), 250));
        }

        startTracking() {
            this.isTracking = true;
            this.updateProgress();
        }

        stopTracking() {
            this.isTracking = false;
        }

        updateProgress() {
            if (!this.isTracking || !this.progressBar) return;

            const articleContent = document.querySelector('.article-content');
            if (!articleContent) return;

            const articleTop = articleContent.offsetTop;
            const articleHeight = articleContent.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollTop = window.pageYOffset;
            
            const progress = Math.min(
                Math.max(
                    (scrollTop - articleTop + windowHeight) / articleHeight,
                    0
                ),
                1
            );

            this.progressBar.style.width = `${progress * 100}%`;
        }
    }

    // ==========================================================================
    // Bookmark Management
    // ==========================================================================
    
    class BookmarkManager {
        constructor() {
            this.bookmarks = this.getStoredBookmarks();
            this.init();
        }

        init() {
            this.bindEvents();
            this.updateBookmarkIcon();
        }

        getStoredBookmarks() {
            try {
                const stored = localStorage.getItem(CONFIG.localStorageKeys.bookmarks);
                return stored ? JSON.parse(stored) : [];
            } catch (e) {
                return [];
            }
        }

        setStoredBookmarks(bookmarks) {
            try {
                localStorage.setItem(CONFIG.localStorageKeys.bookmarks, JSON.stringify(bookmarks));
            } catch (e) {
                console.warn('Could not save bookmarks');
            }
        }

        isBookmarked() {
            const currentUrl = window.location.href;
            return this.bookmarks.includes(currentUrl);
        }

        toggleBookmark() {
            const currentUrl = window.location.href;
            const index = this.bookmarks.indexOf(currentUrl);
            
            if (index > -1) {
                this.bookmarks.splice(index, 1);
            } else {
                this.bookmarks.push(currentUrl);
            }
            
            this.setStoredBookmarks(this.bookmarks);
            this.updateBookmarkIcon();
            this.showBookmarkNotification();
        }

        updateBookmarkIcon() {
            const bookmarkBtn = document.querySelector('.bookmark-btn');
            const bookmarkIcon = document.querySelector('.bookmark-icon');
            
            if (bookmarkBtn && bookmarkIcon) {
                const isBookmarked = this.isBookmarked();
                bookmarkIcon.textContent = isBookmarked ? '🔖' : '🔖';
                bookmarkBtn.setAttribute('aria-pressed', isBookmarked);
                bookmarkBtn.title = isBookmarked ? 'Remove bookmark' : 'Add bookmark';
            }
        }

        showBookmarkNotification() {
            const isBookmarked = this.isBookmarked();
            const message = isBookmarked ? 'Article bookmarked!' : 'Bookmark removed!';
            
            // Create notification element
            const notification = document.createElement('div');
            notification.className = 'bookmark-notification';
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--accent-color);
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                font-weight: 600;
                z-index: 10000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            `;
            
            document.body.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 10);
            
            // Remove after delay
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 2000);
        }

        bindEvents() {
            const bookmarkBtn = document.querySelector('.bookmark-btn');
            if (bookmarkBtn) {
                bookmarkBtn.addEventListener('click', () => this.toggleBookmark());
            }
        }
    }

    // ==========================================================================
    // Reading Position Management
    // ==========================================================================
    
    class ReadingPosition {
        constructor() {
            this.init();
        }

        init() {
            this.restorePosition();
            this.bindEvents();
        }

        savePosition() {
            try {
                const position = {
                    scrollTop: window.pageYOffset,
                    timestamp: Date.now(),
                    url: window.location.href
                };
                localStorage.setItem(CONFIG.localStorageKeys.readingPosition, JSON.stringify(position));
            } catch (e) {
                console.warn('Could not save reading position');
            }
        }

        restorePosition() {
            try {
                const stored = localStorage.getItem(CONFIG.localStorageKeys.readingPosition);
                if (!stored) return;
                
                const position = JSON.parse(stored);
                
                // Only restore if it's the same URL and within 24 hours
                if (position.url === window.location.href && 
                    Date.now() - position.timestamp < 24 * 60 * 60 * 1000) {
                    
                    setTimeout(() => {
                        window.scrollTo(0, position.scrollTop);
                    }, 100);
                }
            } catch (e) {
                console.warn('Could not restore reading position');
            }
        }

        bindEvents() {
            // Save position on scroll (throttled)
            window.addEventListener('scroll', throttle(() => this.savePosition(), 1000));
            
            // Save position before page unload
            window.addEventListener('beforeunload', () => this.savePosition());
        }
    }

    // ==========================================================================
    // Social Sharing
    // ==========================================================================
    
    class SocialSharing {
        constructor() {
            this.init();
        }

        init() {
            this.bindEvents();
        }

        getShareData() {
            const title = document.title;
            const url = window.location.href;
            const description = document.querySelector('meta[name="description"]')?.content || '';
            
            return { title, url, description };
        }

        shareOnTwitter() {
            const { title, url } = this.getShareData();
            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
            this.openShareWindow(twitterUrl);
        }

        shareOnLinkedIn() {
            const { title, url } = this.getShareData();
            const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            this.openShareWindow(linkedinUrl);
        }

        shareViaEmail() {
            const { title, url } = this.getShareData();
            const subject = encodeURIComponent(`Check out this article: ${title}`);
            const body = encodeURIComponent(`I thought you might find this article interesting: ${title}\n\n${url}`);
            const emailUrl = `mailto:?subject=${subject}&body=${body}`;
            window.location.href = emailUrl;
        }

        openShareWindow(url) {
            const width = 600;
            const height = 400;
            const left = (window.innerWidth - width) / 2;
            const top = (window.innerHeight - height) / 2;
            
            window.open(
                url,
                'share',
                `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
            );
        }

        bindEvents() {
            const shareButtons = document.querySelectorAll('.share-btn');
            shareButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const platform = button.getAttribute('data-platform');
                    
                    switch (platform) {
                        case 'twitter':
                            this.shareOnTwitter();
                            break;
                        case 'linkedin':
                            this.shareOnLinkedIn();
                            break;
                        case 'email':
                            this.shareViaEmail();
                            break;
                    }
                });
            });
        }
    }

    // ==========================================================================
    // Back to Top Button
    // ==========================================================================
    
    class BackToTop {
        constructor() {
            this.button = document.querySelector('.back-to-top');
            this.init();
        }

        init() {
            if (!this.button) return;
            
            this.bindEvents();
            this.updateVisibility();
        }

        bindEvents() {
            window.addEventListener('scroll', throttle(() => this.updateVisibility(), 100));
            
            this.button.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        updateVisibility() {
            if (window.pageYOffset > CONFIG.scrollThreshold) {
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
            }
        }
    }

    // ==========================================================================
    // Table of Contents Navigation
    // ==========================================================================
    
    class TableOfContents {
        constructor() {
            this.tocLinks = document.querySelectorAll('.toc-link');
            this.sections = [];
            this.init();
        }

        init() {
            this.collectSections();
            this.bindEvents();
            this.highlightCurrentSection();
        }

        collectSections() {
            const sectionIds = ['introduction', 'risk-1', 'risk-2', 'risk-3', 'conclusion'];
            
            sectionIds.forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    this.sections.push({
                        id,
                        element,
                        top: element.offsetTop
                    });
                }
            });
        }

        bindEvents() {
            this.tocLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            window.addEventListener('scroll', throttle(() => this.highlightCurrentSection(), 100));
        }

        highlightCurrentSection() {
            const scrollTop = window.pageYOffset;
            const windowHeight = window.innerHeight;
            const currentSection = this.sections.find(section => {
                return scrollTop >= section.top - windowHeight / 2;
            });

            this.tocLinks.forEach(link => {
                link.classList.remove('active');
            });

            if (currentSection) {
                const activeLink = document.querySelector(`.toc-link[href="#${currentSection.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        }
    }

    // ==========================================================================
    // Newsletter Form
    // ==========================================================================
    
    class NewsletterForm {
        constructor() {
            this.form = document.querySelector('.newsletter-form');
            this.init();
        }

        init() {
            if (!this.form) return;
            
            this.bindEvents();
        }

        bindEvents() {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }

        handleSubmit() {
            const email = this.form.querySelector('.newsletter-input').value;
            
            if (!this.validateEmail(email)) {
                this.showError('Please enter a valid email address');
                return;
            }

            this.showSuccess('Thank you for subscribing!');
            this.form.reset();
        }

        validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        showError(message) {
            this.showNotification(message, 'error');
        }

        showSuccess(message) {
            this.showNotification(message, 'success');
        }

        showNotification(message, type) {
            const notification = document.createElement('div');
            notification.className = `newsletter-notification newsletter-notification--${type}`;
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'error' ? '#e53e3e' : '#38a169'};
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                font-weight: 600;
                z-index: 10000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 10);
            
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        }
    }

    // ==========================================================================
    // Comment Form
    // ==========================================================================
    
    class CommentForm {
        constructor() {
            this.form = document.querySelector('.comment-form-element');
            this.init();
        }

        init() {
            if (!this.form) return;
            
            this.bindEvents();
        }

        bindEvents() {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }

        handleSubmit() {
            const formData = new FormData(this.form);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            if (!name || !email || !message) {
                this.showError('Please fill in all fields');
                return;
            }

            if (!this.validateEmail(email)) {
                this.showError('Please enter a valid email address');
                return;
            }

            this.showSuccess('Comment submitted successfully!');
            this.form.reset();
        }

        validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        showError(message) {
            this.showNotification(message, 'error');
        }

        showSuccess(message) {
            this.showNotification(message, 'success');
        }

        showNotification(message, type) {
            const notification = document.createElement('div');
            notification.className = `comment-notification comment-notification--${type}`;
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'error' ? '#e53e3e' : '#38a169'};
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                font-weight: 600;
                z-index: 10000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 10);
            
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        }
    }

    // ==========================================================================
    // Article Navigation
    // ==========================================================================
    
    class ArticleNavigation {
        constructor() {
            this.readArticleBtn = document.querySelector('.read-article-btn');
            this.init();
        }

        init() {
            this.bindEvents();
        }

        bindEvents() {
            if (this.readArticleBtn) {
                this.readArticleBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.navigateToArticle();
                });
            }
        }

        navigateToArticle() {
            // Add loading state
            const btnText = this.readArticleBtn.querySelector('.btn-text');
            if (btnText) {
                const originalText = btnText.textContent;
                btnText.textContent = 'Loading...';
            }
            
            // Disable the button/link
            this.readArticleBtn.style.pointerEvents = 'none';
            this.readArticleBtn.style.opacity = '0.7';

            // Navigate immediately (no delay for better UX)
            window.location.href = 'article.html';
        }
    }

    // ==========================================================================
    // Performance Monitoring
    // ==========================================================================
    
    class PerformanceMonitor {
        constructor() {
            this.init();
        }

        init() {
            this.measurePageLoad();
            this.measureScrollPerformance();
        }

        measurePageLoad() {
            window.addEventListener('load', () => {
                const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                console.log(`Page load time: ${loadTime}ms`);
                
                // Send to analytics if needed
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'page_load_time', {
                        value: loadTime
                    });
                }
            });
        }

        measureScrollPerformance() {
            let scrollStart = null;
            
            window.addEventListener('scrollstart', () => {
                scrollStart = performance.now();
            });
            
            window.addEventListener('scrollend', () => {
                if (scrollStart) {
                    const scrollDuration = performance.now() - scrollStart;
                    console.log(`Scroll duration: ${scrollDuration}ms`);
                }
            });
        }
    }

    // ==========================================================================
    // Accessibility Enhancements
    // ==========================================================================
    
    class AccessibilityEnhancements {
        constructor() {
            this.init();
        }

        init() {
            this.addSkipLinks();
            this.enhanceKeyboardNavigation();
            this.addAriaLabels();
        }

        addSkipLinks() {
            // Skip links are already in HTML, but we can enhance them
            const skipLinks = document.querySelectorAll('.skip-link');
            skipLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = document.querySelector(link.getAttribute('href'));
                    if (target) {
                        target.focus();
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });
        }

        enhanceKeyboardNavigation() {
            // Add keyboard navigation for custom elements
            const interactiveElements = document.querySelectorAll('[role="button"], .btn-primary, .btn-secondary');
            
            interactiveElements.forEach(element => {
                element.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        element.click();
                    }
                });
            });
        }

        addAriaLabels() {
            // Add ARIA labels to elements that need them
            const progressIndicator = document.querySelector('.progress-indicator');
            if (progressIndicator) {
                progressIndicator.setAttribute('aria-label', 'Reading progress');
            }

            const backToTop = document.querySelector('.back-to-top');
            if (backToTop) {
                backToTop.setAttribute('aria-label', 'Back to top');
            }
        }
    }

    // ==========================================================================
    // Initialization
    // ==========================================================================
    
    // Initialize all components when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        // Core functionality
        new ThemeManager();
        new ReadingProgress();
        new BookmarkManager();
        new ReadingPosition();
        new SocialSharing();
        new BackToTop();
        new TableOfContents();
        new NewsletterForm();
        new CommentForm();
        new ArticleNavigation();
        
        // Performance and accessibility
        new PerformanceMonitor();
        new AccessibilityEnhancements();
        
        // Update reading time
        updateReadingTime();
        
        console.log('Enterprise Blog System initialized successfully');
    });

    // Fallback for immediate execution if DOMContentLoaded already fired
    if (document.readyState === 'loading') {
        // DOM is still loading, wait for DOMContentLoaded
    } else {
        // DOM is already loaded, initialize immediately
        try {
            new ArticleNavigation();
        } catch (e) {
            console.warn('ArticleNavigation failed to initialize:', e);
        }
    }

    // ==========================================================================
    // Service Worker Registration (if available)
    // ==========================================================================
    
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => {
                    console.log('Service Worker registered successfully');
                })
                .catch(error => {
                    console.log('Service Worker registration failed');
                });
        });
    }

    // ==========================================================================
    // Error Handling
    // ==========================================================================
    
    window.addEventListener('error', (e) => {
        console.error('JavaScript error:', e.error);
        // Send to error tracking service if needed
    });

    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled promise rejection:', e.reason);
        // Send to error tracking service if needed
    });

})();
