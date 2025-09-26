import { useState, useRef, useEffect } from 'react';
import { post } from '../lib/api';
import * as THREE from 'three';

const FooterDataWeave = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    lines: THREE.Line[];
    mouse: THREE.Vector2;
    animationId: number;
  } | null>(null);

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

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true,
      antialias: true 
    });
    
    renderer.setSize(window.innerWidth, 600);
    renderer.setClearColor(0x000000, 0);
    camera.position.z = 5;

    // Create the data weave network
    const lines: THREE.Line[] = [];
    const nodes: THREE.Vector3[] = [];
    const nodeCount = 50;
    const mouse = new THREE.Vector2();

    // Generate random nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 2
      ));
    }

    // Create connections between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].distanceTo(nodes[j]);
        if (distance < 3 && Math.random() > 0.7) {
          const geometry = new THREE.BufferGeometry().setFromPoints([nodes[i], nodes[j]]);
          const material = new THREE.LineBasicMaterial({ 
            color: 0x38e1ff,
            transparent: true,
            opacity: 0.3
          });
          const line = new THREE.Line(geometry, material);
          lines.push(line);
          scene.add(line);
        }
      }
    }

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    canvasRef.current.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.01;
      
      // Animate the network
      lines.forEach((line, index) => {
        const material = line.material as THREE.LineBasicMaterial;
        const baseOpacity = 0.2 + Math.sin(time + index * 0.1) * 0.1;
        
        // Mouse interaction effect
        const mouseDistance = Math.sqrt(mouse.x * mouse.x + mouse.y * mouse.y);
        const mouseEffect = Math.max(0, 1 - mouseDistance * 2);
        
        material.opacity = baseOpacity + mouseEffect * 0.3;
        
        // Subtle color shift
        const hue = 0.5 + Math.sin(time * 0.5 + index * 0.05) * 0.1;
        material.color.setHSL(hue, 0.8, 0.6);
      });

      // Gentle camera movement
      camera.position.x = Math.sin(time * 0.2) * 0.5;
      camera.position.y = Math.cos(time * 0.15) * 0.3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      sceneRef.current!.animationId = requestAnimationFrame(animate);
    };

    sceneRef.current = {
      scene,
      camera,
      renderer,
      lines,
      mouse,
      animationId: requestAnimationFrame(animate)
    };

    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current || !sceneRef.current) return;
      
      const width = canvasRef.current.parentElement?.clientWidth || window.innerWidth;
      const height = 600;
      
      sceneRef.current.camera.aspect = width / height;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Cleanup
    return () => {
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        sceneRef.current.renderer.dispose();
      }
      canvasRef.current?.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <footer className="footer footer--data-weave">
      {/* Animated Canvas Background */}
      <canvas 
        ref={canvasRef}
        className="footer__canvas"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
      
      {/* Large wordmark backdrop */}
      <div className="footer__brand" aria-hidden="true">Minitrix</div>
      
      <div className="footer__grid" style={{ position: 'relative', zIndex: 2 }}>
        {/* Primary CTA Section */}
        <section className="footer__cta">
          <h2 className="footer__title">Ready to Build Your AI Asset?</h2>
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
      <div className="footer__legal" style={{ position: 'relative', zIndex: 2 }}>
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

export default FooterDataWeave;
