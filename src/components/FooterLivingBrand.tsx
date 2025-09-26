import { useState, useEffect } from 'react';
import { post } from '../lib/api';
import { motion, AnimatePresence } from 'framer-motion';

const FooterLivingBrand = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);

  const headlines = [
    'Ready to Build Your AI Asset?',
    'Ready for 80% Cost Savings?',
    'Ready for 100% Data Privacy?',
    'Ready for 3x Faster Performance?'
  ];

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setEmailError('');
    setIsLoading(true);
    try {
      await post('/api/newsletter', { email });
      setIsSubscribed(true);
      setEmail('');
    } catch (err: any) {
      setEmailError(err?.data?.errors?.[0]?.msg || err.message || 'Subscription failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Cycle through headlines
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }, 3500); // 3.5 seconds per headline

    return () => clearInterval(interval);
  }, [headlines.length]);

  // Animation variants for the headline
  const headlineVariants = {
    enter: {
      y: 20,
      opacity: 0,
    },
    center: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: -20,
      opacity: 0,
    },
  };

  const transition = {
    duration: 0.5,
    ease: "easeInOut" as const, // Smooth animation easing
  };

  return (
    <footer className="footer footer--living-brand">
      {/* Large wordmark backdrop */}
      <div className="footer__brand" aria-hidden="true">Minitrix</div>
      
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
            <button className="btn-primary" type="submit" disabled={isLoading}>
              {isLoading ? 'Subscribing…' : 'Subscribe'}
            </button>
          </form>
          {emailError && (
            <div id="email-error" className="footer__error" role="alert">
              {emailError}
            </div>
          )}
          {isSubscribed && !emailError && (
            <div className="text-green-500 text-sm mt-2" role="status">
              You are subscribed. Please check your email for confirmation.
            </div>
          )}
          
          <a className="btn-accent" href="/contact">Schedule a Consultation</a>
        </section>

        {/* Company Navigation */}
        <nav className="footer__col" aria-label="Company">
          <h3>Company</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/careers">Careers</a></li>
          </ul>
        </nav>

        {/* Solutions Navigation */}
        <nav className="footer__col" aria-label="Solutions">
          <h3>Solutions</h3>
          <ul>
            <li><a href="/services">Services</a></li>
            <li><a href="/use-cases">Use Cases</a></li>
            <li><a href="/industries">Industries</a></li>
          </ul>
        </nav>

        {/* Resources Navigation */}
        <nav className="footer__col" aria-label="Resources">
          <h3>Resources</h3>
          <ul>
            <li><a href="/case-studies">Case Studies</a></li>
            <li><a href="/trust">Trust Center</a></li>
            <li><a href="mailto:hello@minitrix.ai">hello@minitrix.ai</a></li>
            <li>
              <a href="tel:+15551234567">+1 (555) 123‑4567</a>{' '}
              <small>Mon–Fri • 9–6 PST</small>
            </li>
          </ul>
        </nav>
      </div>

      {/* Legal Section */}
      <div className="footer__legal">
        <p>© 2025 Minitrix. All rights reserved.</p>
        <ul className="footer__links" aria-label="Legal">
          <li><a href="/privacy">Privacy</a></li>
          <li><a href="/terms">Terms</a></li>
          <li><a href="/cookie-settings">Cookie Settings</a></li>
          <li><a href="/accessibility">Accessibility</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default FooterLivingBrand;
