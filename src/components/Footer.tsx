
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);

  const headlines = [
    'Ready to Build Your AI Asset?',
    'Ready for 80% Cost Savings?',
    'Ready for 100% Data Privacy?',
    'Ready for 3x Faster Performance?'
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /\S+@\S+\.\S+/;
    
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setEmailError('');
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  // Cycle through headlines
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }, 4000); // 4 seconds per headline

    return () => clearInterval(interval);
  }, [headlines.length]);

  // Animation variants for the headline
  const headlineVariants = {
    enter: {
      y: 15,
      opacity: 0,
    },
    center: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: -15,
      opacity: 0,
    },
  };

  const transition = {
    duration: 0.6,
    ease: "easeInOut" as const,
  };

  return (
    <footer className="footer footer--animated-logotype">
      {/* Animated Gradient Logotype */}
      <div className="footer__brand footer__brand--animated" aria-hidden="true">Minitrix</div>
      
      <div className="footer__grid">
        {/* Primary CTA Section with Animated Headline */}
        <section className="footer__cta">
          <div className="footer__title-container">
            <AnimatePresence mode="wait">
              <motion.h2
                key={currentHeadlineIndex}
                className="footer__title footer__title--animated"
                variants={headlineVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
              >
                {headlines[currentHeadlineIndex]}
              </motion.h2>
            </AnimatePresence>
          </div>
          <p>Discuss how a custom SLM can transform outcomes.</p>
          
          <form 
            className="footer__newsletter" 
            id="newsletter" 
            onSubmit={handleNewsletterSubmit}
            noValidate
          >
            <label className="sr-only" htmlFor="nl-email">Email address</label>
            <input 
              id="nl-email" 
              name="email" 
              type="email" 
              autoComplete="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={emailError ? 'true' : 'false'}
              aria-describedby={emailError ? 'email-error' : undefined}
              required 
            />
            <button className="btn-primary" type="submit">Subscribe</button>
          </form>
          {emailError && (
            <div id="email-error" className="footer__error" role="alert">
              {emailError}
            </div>
          )}
          
          <a className="btn-accent" href="/contact">Schedule a Consultation</a>
        </section>

        {/* Company Navigation */}
        <nav className="footer__col" aria-label="Company">
          <h3>Company</h3>
          <ul>
            <li><a href="/about" className="footer__link">About Us</a></li>
            <li><a href="/blog" className="footer__link">Blog</a></li>
            <li><a href="/careers" className="footer__link">Careers</a></li>
          </ul>
        </nav>

        {/* Solutions Navigation */}
        <nav className="footer__col" aria-label="Solutions">
          <h3>Solutions</h3>
          <ul>
            <li><a href="/services" className="footer__link">Services</a></li>
            <li><a href="/use-cases" className="footer__link">Use Cases</a></li>
            <li><a href="/industries" className="footer__link">Industries</a></li>
          </ul>
        </nav>

        {/* Resources Navigation */}
        <nav className="footer__col" aria-label="Resources">
          <h3>Resources</h3>
          <ul>
            <li><a href="/case-studies" className="footer__link">Case Studies</a></li>
            <li><a href="/trust" className="footer__link">Trust Center</a></li>
            <li><a href="mailto:hello@minitrix.ai" className="footer__link">hello@minitrix.ai</a></li>
            <li>
              <a href="tel:+15551234567" className="footer__link">+1 (555) 123‑4567</a>{' '}
              <small>Mon–Fri • 9–6 PST</small>
            </li>
          </ul>
        </nav>
      </div>

      {/* Legal Section */}
      <div className="footer__legal">
        <p>© 2025 Minitrix. All rights reserved.</p>
        <ul className="footer__links" aria-label="Legal">
          <li><a href="/privacy" className="footer__link">Privacy</a></li>
          <li><a href="/terms" className="footer__link">Terms</a></li>
          <li><a href="/cookie-settings" className="footer__link">Cookie Settings</a></li>
          <li><a href="/accessibility" className="footer__link">Accessibility</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;