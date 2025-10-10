import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

// Type declarations for constellation singleton
declare global {
  interface HTMLElement {
    __constellation?: {
      renderer: any;
      composer: any;
      labelRenderer: any;
      controls: any;
      rafId: number | null;
      dispose: () => void;
    };
  }
}

// Custom Icons
const CostSavingsIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="currentColor">
    <path d="M7 15h2c0 1.08 1.37 2 3 2s3-.92 3-2c0-1.1-1.04-1.5-3.24-2.03C9.64 12.44 7 11.78 7 9c0-1.79 1.47-3.31 3.5-3.82V3h3v2.18C15.53 5.69 17 7.21 17 9h-2c0-1.08-1.37-2-3-2s-3 .92-3 2c0 1.1 1.04 1.5 3.24 2.03C14.36 11.56 17 12.22 17 15c0 1.79-1.47 3.31-3.5 3.82V21h-3v-2.18C8.47 18.31 7 16.79 7 15z"/>
  </svg>
);

const SecurityIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="currentColor">
    <path d="M12 2L22 6V12C22 17.55 18.84 22.74 12 24C5.16 22.74 2 17.55 2 12V6L12 2Z" />
    <path d="M9 12L11 14L15 10" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PerformanceIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="currentColor">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
  </svg>
);

const CustomizableIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="currentColor">
    <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5A3.5 3.5 0 0 1 15.5 12A3.5 3.5 0 0 1 12 15.5Z" />
    <path d="M19.43 12.98C19.47 12.66 19.5 12.33 19.5 12C19.5 11.67 19.47 11.34 19.43 11.02L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.54 5.05 19.27 4.97 19.05 5.05L16.56 6.05C16.04 5.65 15.48 5.32 14.87 5.07L14.49 2.42C14.46 2.18 14.25 2 14 2H10C9.75 2 9.54 2.18 9.51 2.42L9.13 5.07C8.52 5.32 7.96 5.66 7.44 6.05L4.95 5.05C4.72 4.96 4.46 5.05 4.34 5.27L2.34 8.73C2.21 8.95 2.27 9.22 2.46 9.37L4.57 11.02C4.53 11.34 4.5 11.67 4.5 12C4.5 12.33 4.53 12.65 4.57 12.97L2.46 14.63C2.27 14.78 2.21 15.05 2.34 15.27L4.34 18.73C4.46 18.95 4.73 19.03 4.95 18.95L7.44 17.94C7.96 18.34 8.52 18.68 9.13 18.93L9.51 21.58C9.54 21.82 9.75 22 10 22H14C14.25 22 14.46 21.82 14.49 21.58L14.87 18.93C15.48 18.68 16.04 18.34 16.56 17.94L19.05 18.95C19.28 19.04 19.54 18.95 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.98Z" />
  </svg>
);

const OwnershipIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="currentColor">
    <path d="M12 1L21.5 6.5V11.5C21.5 16.11 18.86 20.61 12 22C5.14 20.61 2.5 16.11 2.5 11.5V6.5L12 1M12 7C10.89 7 10 7.89 10 9S10.89 11 12 11 14 10.11 14 9 13.11 7 12 7M12 13C10.67 13 8 13.67 8 15V16H16V15C16 13.67 13.33 13 12 13Z" />
  </svg>
);

const MigrationIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="currentColor">
    <path d="M4 12L1 9L4 6V8H16V4H18V8H20V10H18V14H20V16H18V20H16V16H4V14H16V10H4V12Z" />
    <path d="M20 12L23 15L20 18V16H8V20H6V16H4V14H6V10H4V8H6V4H8V8H20V10H8V14H20V12Z" />
  </svg>
);

// Three.js Constellation Component
const OrbitalConstellation: React.FC<{
  highlightedPod: number | null;
}> = ({ highlightedPod }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const constellationRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Singleton guard - prevent duplicate viewers
    const container = containerRef.current;
    if ((container as any).__constellation) {
      (container as any).__constellation.dispose();
      (container as any).__constellation = null;
    }

    // Import Three.js modules dynamically
    const initConstellation = async () => {
      const THREE = await import('three');
      const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
      const { EffectComposer } = await import('three/examples/jsm/postprocessing/EffectComposer.js');
      const { RenderPass } = await import('three/examples/jsm/postprocessing/RenderPass.js');
      const { UnrealBloomPass } = await import('three/examples/jsm/postprocessing/UnrealBloomPass.js');
      const { CSS2DRenderer, CSS2DObject } = await import('three/examples/jsm/renderers/CSS2DRenderer.js');

      class ConstellationVisualization {
        container: HTMLElement;
        isAnimating: boolean;
        isPaused: boolean;
        clock: any;
        scene: any;
        camera: any;
        renderer: any;
        labelRenderer: any;
        composer: any;
        controls: any;
        constellation: any;
        centralCore: any;
        orbitCurves: any[];
        orbitalPaths: any[];
        orbitalGroups: any[];
        pods: any[];
        labels: any[];
        resizeObserver: ResizeObserver | null;
        intersectionObserver: IntersectionObserver | null;
        mutationObserver: MutationObserver | null;
        raycaster: any;
        mouse: any;
        rafId: number | null;

        constructor(container: HTMLElement) {
          this.container = container;
          this.isAnimating = true;
          this.isPaused = false;
          this.clock = new THREE.Clock();
          this.orbitCurves = [];
          this.orbitalPaths = [];
          this.orbitalGroups = [];
          this.pods = [];
          this.labels = [];
          this.resizeObserver = null;
          this.intersectionObserver = null;
          this.mutationObserver = null;
          this.raycaster = new THREE.Raycaster();
          this.mouse = new THREE.Vector2();
          this.rafId = null;
          this.setupScene();
          this.setupCamera();
          this.setupRenderer();
          this.setupLighting();
          this.setupPostProcessing();
          this.setupControls();
          this.createConstellation();
          this.setupEventListeners();
          this.setupResizeObserver();
          this.setupIntersectionObserver();
          this.animate();
        }

        setupScene() {
          this.scene = new THREE.Scene();
          this.scene.background = new THREE.Color(0x000000); // Pure black background
          this.constellation = new THREE.Group();
          this.constellation.name = 'constellation';
          this.constellation.position.set(0, 0, 0); // Ensure at origin
          // Apply screenshot settings: Tilt X=45°, Y=32°, Z=-14°
          this.constellation.rotation.x = THREE.MathUtils.degToRad(45);
          this.constellation.rotation.y = THREE.MathUtils.degToRad(32);
          this.constellation.rotation.z = THREE.MathUtils.degToRad(-14);
          // Scale up the constellation slightly
          this.constellation.scale.setScalar(1);
          this.scene.add(this.constellation);
        }

        setupCamera() {
          const aspect = this.container.clientWidth / this.container.clientHeight;
          this.camera = new THREE.PerspectiveCamera(55, aspect, 0.1, 1000);
          this.camera.position.set(1.25, 0.85, 7.2);
          this.camera.lookAt(0, 0, 0);
        }

        setupRenderer() {
          this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: false,
            powerPreference: 'high-performance'
          });
          this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
          this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          
          // Position WebGL canvas absolutely within container
          this.renderer.domElement.style.position = 'absolute';
          this.renderer.domElement.style.inset = '0';
          this.renderer.domElement.style.margin = 'auto';
          this.renderer.domElement.className = 'webgl-canvas';
          this.container.appendChild(this.renderer.domElement);

          // Enhanced CSS2D renderer for crisp labels
          this.labelRenderer = new CSS2DRenderer();
          this.labelRenderer.setSize(this.container.clientWidth, this.container.clientHeight);
          this.labelRenderer.domElement.style.position = 'absolute';
          this.labelRenderer.domElement.style.inset = '0';
          this.labelRenderer.domElement.style.margin = 'auto';
          this.labelRenderer.domElement.style.pointerEvents = 'none';
          this.labelRenderer.domElement.style.transform = 'translateZ(0)';
          this.labelRenderer.domElement.style.backfaceVisibility = 'hidden';
          this.labelRenderer.domElement.className = 'css2d-container';
          this.container.appendChild(this.labelRenderer.domElement);
        }

        setupLighting() {
          const ambientLight = new THREE.AmbientLight(0x404040, 0.1);
          this.scene.add(ambientLight);
        }

        setupPostProcessing() {
          this.composer = new EffectComposer(this.renderer);
          const renderPass = new RenderPass(this.scene, this.camera);
          this.composer.addPass(renderPass);

          // Screenshot settings: threshold=0.73, strength=0.90, radius=0.87
          const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(this.container.clientWidth, this.container.clientHeight),
            0.90, // strength
            0.87, // radius
            0.73  // threshold
          );
          this.composer.addPass(bloomPass);
        }

        setupControls() {
          this.controls = new OrbitControls(this.camera, this.renderer.domElement);
          this.controls.enabled = false; // Disable all controls - fixed camera position
          this.controls.target.set(0, 0, 0); // Ensure target at origin
        }

        createConstellation() {
          this.createCentralCore();
          this.createOrbitalPaths();
          this.createPods();
          this.createLabels();
        }

        createCentralCore() {
          const geometry = new THREE.SphereGeometry(0.8, 64, 64);
          const material = new THREE.ShaderMaterial({
            uniforms: {
              time: { value: 0 },
              innerColor: { value: new THREE.Color(0x66F6FF) },
              outerColor: { value: new THREE.Color(0xA45CFF) }
            },
            vertexShader: `
              varying vec2 vUv;
              void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `,
            fragmentShader: `
              uniform float time;
              uniform vec3 innerColor;
              uniform vec3 outerColor;
              varying vec2 vUv;
              
              void main() {
                vec2 center = vec2(0.5, 0.5);
                float dist = distance(vUv, center);
                float gradient = smoothstep(0.0, 0.8, dist);
                vec3 color = mix(innerColor, outerColor, gradient);
                float pulse = sin(time * 1.5) * 0.05 + 0.95;
                color *= pulse * 1.2;
                gl_FragColor = vec4(color, 1.0);
              }
            `
          });

          this.centralCore = new THREE.Mesh(geometry, material);
          this.constellation.add(this.centralCore);
        }

        createOrbitalPaths() {
          const pathRadius = 2.8;
          const pathSegments = 128;
          const tubeRadius = 0.008;

          const orbitConfigs = [
            { name: 'OrbitA', rotation: { x: Math.PI / 2, y: 0, z: 0 } },
            { name: 'OrbitB', rotation: { x: Math.PI / 2, y: 0, z: THREE.MathUtils.degToRad(60) } },
            { name: 'OrbitC', rotation: { x: Math.PI / 2, y: 0, z: THREE.MathUtils.degToRad(120) } }
          ];

          orbitConfigs.forEach((config) => {
            const curve = new THREE.EllipseCurve(0, 0, pathRadius, pathRadius, 0, 2 * Math.PI, false, 0);
            this.orbitCurves.push(curve);

            const points = curve.getPoints(pathSegments);
            const tubeGeometry = new THREE.TubeGeometry(
              new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(p.x, 0, p.y))),
              pathSegments, tubeRadius, 8, true
            );

            const material = new THREE.MeshStandardMaterial({
              color: 0x68fcee,
              transparent: true,
              opacity: 0.6,
              emissive: new THREE.Color(0x68fcee),
              emissiveIntensity: 0.3
            });
            material.blending = THREE.AdditiveBlending;

            const tube = new THREE.Mesh(tubeGeometry, material);
            tube.rotation.set(config.rotation.x, config.rotation.y, config.rotation.z);
            this.orbitalPaths.push(tube);
            this.constellation.add(tube);

            const orbitalGroup = new THREE.Group();
            orbitalGroup.rotation.copy(tube.rotation);
            this.orbitalGroups.push(orbitalGroup);
            this.constellation.add(orbitalGroup);
          });
          
          // Force ring color update after creation
          this.orbitalPaths.forEach((ring) => {
            const ringColor = new THREE.Color(0x68fcee);
            ring.material.color.copy(ringColor);
            ring.material.emissive.copy(ringColor);
            ring.material.needsUpdate = true;
          });
        }

        createPods() {
          // Uniform pod geometry - same size for all pods
          const uniformPodRadius = 0.12;
          const podGeometry = new THREE.SphereGeometry(uniformPodRadius, 32, 32);
          const orbitPhases = [[0.0, 0.5], [0.2, 0.7], [0.35, 0.85]];
          
          // Pod colors matching benefit card gradients
          const podColors = [
            0x22C55E, // Cost Savings - Green (from-green-500)
            0x3B82F6, // Data Security - Blue (from-blue-500)
            0xF59E0B, // High Performance - Yellow/Orange (from-yellow-500)
            0xA855F7, // Customizable - Purple (from-purple-500)
            0x6366F1, // Full Ownership - Indigo (from-indigo-500)
            0x06B6D4  // LLM to SLM - Cyan (from-cyan-500)
          ];

          for (let orbitIndex = 0; orbitIndex < 3; orbitIndex++) {
            for (let podIndex = 0; podIndex < 2; podIndex++) {
              const globalIndex = orbitIndex * 2 + podIndex;
              const podColor = podColors[globalIndex] || 0x4A2F5F;
              
              const material = new THREE.MeshStandardMaterial({
                color: podColor,
                emissive: new THREE.Color(podColor),
                emissiveIntensity: 0.45
              });

              const pod = new THREE.Mesh(podGeometry, material);
              // Ensure uniform scale for all pods
              pod.scale.setScalar(1.0);
              
              pod.userData = {
                orbitIndex,
                podIndex,
                globalIndex,
                t: orbitPhases[orbitIndex][podIndex],
                orbitSpeed: 1 / 13,
                curve: this.orbitCurves[orbitIndex],
                originalEmissiveIntensity: 0.45,
                defaultColor: podColor
              };

              const point = pod.userData.curve.getPointAt(pod.userData.t % 1);
              pod.position.set(point.x, 0, point.y);
              this.pods.push(pod);
              this.orbitalGroups[orbitIndex].add(pod);
            }
          }
          
          // Initialize color synchronization
          this.updatePodColorsFromCSS();
        }

        createLabels() {
          const labelNames = ['Saves Cost', 'Security', 'High Performance', 'Customizable', 'Ownership', 'LLM to SLM'];

          this.pods.forEach((pod, index) => {
            // Clear any existing labels to prevent duplicates
            const existingLabels = pod.children.filter((child: any) => child.isCSS2DObject);
            existingLabels.forEach((label: any) => pod.remove(label));

            const labelDiv = document.createElement('div');
            labelDiv.className = 'hotspot-label';
            labelDiv.textContent = labelNames[index];
            labelDiv.setAttribute('aria-label', `Feature: ${labelNames[index]}`);
            labelDiv.setAttribute('data-pod-index', index.toString());

            const label = new CSS2DObject(labelDiv);
            // Position label with consistent offset
            label.position.set(0, 0.25, 0);
            this.labels.push(label);
            pod.add(label);
          });
        }

        highlightPod(index: number | null) {
          this.pods.forEach((pod, i) => {
            if (index === i) {
              pod.material.emissiveIntensity = 0.9;
              // Keep the pod's original color but make it brighter
              pod.material.emissive.copy(new THREE.Color(pod.userData.defaultColor));
              // Thicken corresponding orbital ring segment
              const orbitIndex = Math.floor(i / 2);
              if (this.orbitalPaths[orbitIndex]) {
                this.orbitalPaths[orbitIndex].material.opacity = 0.9;
              }
            } else {
              pod.material.emissiveIntensity = pod.userData.originalEmissiveIntensity;
              pod.material.emissive.copy(new THREE.Color(pod.userData.defaultColor));
              // Reset orbital ring
              const orbitIndex = Math.floor(i / 2);
              if (this.orbitalPaths[orbitIndex]) {
                this.orbitalPaths[orbitIndex].material.opacity = 0.6;
              }
            }
          });
        }

        updatePodColorsFromCSS() {
          // Pod colors are now set directly from the gradient colors
          // No need to read from CSS as we're using the same color scheme
          this.pods.forEach((pod) => {
            const color = new THREE.Color(pod.userData.defaultColor);
            pod.material.color.copy(color);
            pod.material.emissive.copy(color);
            pod.material.emissiveIntensity = pod.userData.originalEmissiveIntensity;
            
            // Update corresponding ring with website theme color
            this.updateRingColor(pod.userData.orbitIndex);
          });
        }
        
        updateRingColor(orbitIndex: number) {
          if (this.orbitalPaths[orbitIndex]) {
            // Use the website theme color #68fcee for all rings
            const ringColor = new THREE.Color(0x68fcee);
            this.orbitalPaths[orbitIndex].material.color.copy(ringColor);
            this.orbitalPaths[orbitIndex].material.emissive.copy(ringColor);
          }
        }
        
        setupColorObserver() {
          // Watch for theme changes and CSS updates
          this.mutationObserver = new MutationObserver(() => {
            this.updatePodColorsFromCSS();
          });
          
          this.mutationObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class', 'style'],
            subtree: true
          });
        }

        setupEventListeners() {
          // Setup color synchronization observer
          this.setupColorObserver();
        }

        setupResizeObserver() {
          this.resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
              const { width, height } = entry.contentRect;
              this.handleResize(width, height);
            }
          });
          this.resizeObserver.observe(this.container);
        }

        setupIntersectionObserver() {
          this.intersectionObserver = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                this.isPaused = !entry.isIntersecting;
              });
            },
            { threshold: 0.1 }
          );
          this.intersectionObserver.observe(this.container);
        }

        handleResize(width?: number, height?: number) {
          const w = width || this.container.clientWidth;
          const h = height || this.container.clientHeight;
          
          this.camera.aspect = w / h;
          this.camera.updateProjectionMatrix();
          
          // Clamp DPR to 2 for performance and crispness
          const pixelRatio = Math.min(window.devicePixelRatio, 2);
          this.renderer.setPixelRatio(pixelRatio);
          this.renderer.setSize(w, h);
          this.labelRenderer.setSize(w, h);
          this.composer.setSize(w, h);
        }

        // Removed pause functionality - animation runs continuously

        // Camera position is now fixed - no reset needed

        animate() {
          if (!this.isAnimating) return;
          this.rafId = requestAnimationFrame(() => this.animate());

          const deltaTime = this.clock.getDelta();
          const time = this.clock.getElapsedTime();

          if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // Much slower Y rotation on constellation group - rotate only around Y
            this.constellation.rotation.y += deltaTime * (Math.PI * 2) / 90;

            // Pod orbital motion
            this.pods.forEach((pod) => {
              const userData = pod.userData;
              userData.t += deltaTime * userData.orbitSpeed * 0.7;
              userData.t = userData.t % 1;
              const point = userData.curve.getPointAt(userData.t);
              pod.position.set(point.x, 0, point.y);
              pod.rotation.y += deltaTime * 0.3;
            });
          }

          // Core pulsing
          if (this.centralCore?.material?.uniforms) {
            this.centralCore.material.uniforms.time.value = time;
          }
          this.composer.render();
          this.labelRenderer.render(this.scene, this.camera);
        }

        dispose() {
          this.isAnimating = false;
          if (this.rafId) cancelAnimationFrame(this.rafId);
          if (this.controls) this.controls.dispose();
          
          // Clear labels to prevent duplicates
          this.labels.forEach(label => {
            if (label.element && label.element.parentNode) {
              label.element.parentNode.removeChild(label.element);
            }
          });
          this.labels = [];
          
          if (this.renderer) {
            this.renderer.dispose();
            if (this.renderer.domElement.parentNode) {
              this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
            }
          }
          if (this.labelRenderer && this.labelRenderer.domElement.parentNode) {
            this.labelRenderer.domElement.parentNode.removeChild(this.labelRenderer.domElement);
          }
          if (this.composer) {
            this.composer.passes.length = 0;
          }
          if (this.resizeObserver) this.resizeObserver.disconnect();
          if (this.intersectionObserver) this.intersectionObserver.disconnect();
          if (this.mutationObserver) this.mutationObserver.disconnect();
        }
        
        destroy() {
          this.dispose();
        }
      }

      if (containerRef.current) {
        const instance = new ConstellationVisualization(containerRef.current);
        constellationRef.current = instance;
        // Store singleton handle on container
        (containerRef.current as any).__constellation = {
          renderer: instance.renderer,
          composer: instance.composer,
          labelRenderer: instance.labelRenderer,
          controls: instance.controls,
          rafId: instance.rafId,
          dispose: () => instance.dispose()
        };
      }
    };

    initConstellation();

    return () => {
      if (constellationRef.current) {
        constellationRef.current.dispose();
        constellationRef.current = null;
      }
      if ((containerRef.current as any)?.__constellation) {
        (containerRef.current as any).__constellation = null;
      }
    };
  }, []);

  useEffect(() => {
    if (constellationRef.current) {
      constellationRef.current.highlightPod(highlightedPod);
    }
  }, [highlightedPod]);

  return (
    <div className="relative w-full h-full">
      {/* Constellation Container */}
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};

const ValuePropsWithConstellation = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  // Add professional CSS Grid layout styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .why-choose-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      @media (min-width: 960px) {
        .why-choose-grid {
          grid-template-columns: 1fr 580px;
          gap: 2.5rem;
          align-items: start;
        }
      }

      .constellation-container {
        display: grid;
        place-items: center;
        position: relative;
        width: 100%;
        height: 100%;
        min-height: 600px;
        border-radius: 1rem;
        overflow: visible;
        background: linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        padding: 0;
        margin: 0;
      }
      
      .webgl-canvas, .css2d-container {
        position: absolute;
        inset: 0;
        margin: auto;
        width: 100% !important;
        height: 100% !important;
      }

      .benefits-list {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.25rem;
      }

      @media (min-width: 960px) {
        .benefits-list {
          grid-template-columns: 1fr 1fr;
          grid-template-rows: repeat(3, 1fr);
          gap: 1.25rem;
          height: fit-content;
        }
      }
      
      .benefit-card {
        padding: 2rem !important;
      }
      
      @keyframes pulse-slow {
        0%, 100% { opacity: 0; }
        50% { opacity: 0.3; }
      }
      
      .animate-pulse-slow {
        animation: pulse-slow 2s ease-in-out infinite;
      }
      
      .animate-fade-in {
        animation: fadeIn 0.6s ease-out forwards;
        opacity: 0;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .controls-panel {
        position: absolute;
        top: 1rem;
        right: 1rem;
        z-index: 10;
        display: flex;
        gap: 0.5rem;
      }
      
      .control-button {
        padding: 0.5rem;
        background: rgba(0, 0, 0, 0.6);
        border: 1px solid rgba(6, 182, 212, 0.3);
        border-radius: 0.375rem;
        color: white;
        cursor: pointer;
        transition: all 0.2s ease;
        backdrop-filter: blur(4px);
      }
      
      .control-button:hover {
        background: rgba(6, 182, 212, 0.2);
        border-color: rgba(6, 182, 212, 0.5);
      }
      
      .control-button:focus-visible {
        outline: 2px solid #06b6d4;
        outline-offset: 2px;
      }

      .hotspot-label {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 11px;
        font-weight: 600;
        color: white;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.9);
        pointer-events: none;
        user-select: none;
        white-space: nowrap;
        z-index: 1000;
        background: rgba(0, 0, 0, 0.7);
        padding: 4px 8px;
        border-radius: 4px;
        backdrop-filter: blur(4px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        text-align: center;
        line-height: 1.2;
        transform: translateZ(0);
        will-change: transform;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      /* CSS Variables for benefit colors */
      .benefit-card-0 { --benefit-color: #22C55E; }
      .benefit-card-1 { --benefit-color: #38E1FF; }
      .benefit-card-2 { --benefit-color: #FFA94D; }
      .benefit-card-3 { --benefit-color: #C084FC; }
      .benefit-card-4 { --benefit-color: #60A5FA; }
      .benefit-card-5 { --benefit-color: #2DD4BF; }
      
      /* Line clamp utility for text truncation */
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const valueProps = [
    {
      icon: CostSavingsIcon,
      title: 'Cost Savings',
      description: 'Reduce operational costs by 60-80% with efficient SLMs',
      detailedDescription: 'Eliminate expensive API calls and reduce infrastructure costs with our efficient SLMs that deliver the same quality at a fraction of the price.',
      color: 'from-green-500 to-emerald-400',
      stat: '$2M+ Saved',
      metric: '80%',
      metricLabel: 'Cost Reduction'
    },
    {
      icon: SecurityIcon,
      title: 'Data Security',
      description: 'Keep your sensitive data on-premises and secure',
      detailedDescription: 'Deploy on-premises or in your private cloud. Complete data sovereignty with enterprise-grade security and compliance.',
      color: 'from-blue-500 to-cyan-400',
      stat: '100% Private',
      metric: '0',
      metricLabel: 'Data Breaches'
    },
    {
      icon: PerformanceIcon,
      title: 'High Performance',
      description: '3x faster inference with domain-specific optimization',
      detailedDescription: 'Optimized architectures and specialized training deliver lightning-fast responses without compromising accuracy.',
      color: 'from-yellow-500 to-orange-400',
      stat: '<50ms Response',
      metric: '3x',
      metricLabel: 'Faster'
    },
    {
      icon: CustomizableIcon,
      title: 'Customizable',
      description: 'Tailored models built for your specific use cases',
      detailedDescription: 'Fine-tuned models trained on your domain data, understanding your business context and terminology.',
      color: 'from-purple-500 to-pink-400',
      stat: 'Industry Specific',
      metric: '95%',
      metricLabel: 'Accuracy'
    },
    {
      icon: OwnershipIcon,
      title: 'Full Ownership',
      description: 'Deploy once, use forever - no usage fees',
      detailedDescription: 'Own your AI infrastructure completely. No per-token charges, no usage limits, no vendor lock-in.',
      color: 'from-indigo-500 to-blue-400',
      stat: 'Complete Control',
      metric: '∞',
      metricLabel: 'Usage Limit'
    },
    {
      icon: MigrationIcon,
      title: 'LLM to SLM',
      description: 'Seamless migration from expensive LLM providers',
      detailedDescription: 'Smooth transition with compatibility layers and migration tools. Maintain functionality while cutting costs.',
      color: 'from-cyan-500 to-teal-400',
      stat: '48hr Migration',
      metric: '48h',
      metricLabel: 'Migration Time'
    }
  ];

  return (
    <section className="section-dark section-transition relative py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 gradient-text-dark">
            Why Choose Our SLMs?
          </h2>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed text-gray-300">
            Transform your AI strategy with purpose-built Small Language Models that deliver enterprise-grade results at a fraction of the cost
          </p>
        </div>

        {/* CSS Grid Layout: Left constellation, Right benefits */}
        <div className="why-choose-grid">
          {/* Left: Constellation Canvas */}
          <div className="constellation-container">
            <OrbitalConstellation
              highlightedPod={hoveredItem}
            />
          </div>

          {/* Right: Sticky Benefits List */}
          <div className="benefits-list">
            {valueProps.map((prop, index) => (
              <div
                key={index}
                className="card-dark benefit-card group relative backdrop-blur-sm rounded-2xl transition-all duration-500 hover:transform hover:-translate-y-4 hover:shadow-2xl cursor-pointer"
                style={{ 
                  animationDelay: `${index * 150}ms`
                } as React.CSSProperties}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Animated Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${prop.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-all duration-500`}></div>
                
                {/* Icon with Pulse Animation */}
                <div className={`relative inline-flex p-3 bg-gradient-to-r ${prop.color} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <prop.icon />
                  <div className={`absolute inset-0 bg-gradient-to-r ${prop.color} rounded-xl animate-pulse-slow opacity-0 group-hover:opacity-30`}></div>
                </div>

                {/* Large Metric Display */}
                <div className="absolute top-4 right-4 text-right opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                  <div className={`text-xl font-bold bg-gradient-to-r ${prop.color} bg-clip-text text-transparent`}>
                    {prop.metric}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    {prop.metricLabel}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-base font-bold mb-2 transition-colors duration-300" style={{color: 'var(--dark-text-primary)'}}>
                  {prop.title}
                </h3>
                
                {/* Dynamic Description */}
                <div className="relative overflow-hidden mb-3">
                  <p className={`text-xs leading-relaxed transition-all duration-500 ${hoveredItem === index ? 'opacity-0 transform -translate-y-4' : 'opacity-100 transform translate-y-0'}`} style={{color: 'var(--dark-text-secondary)'}}>
                    {prop.description}
                  </p>
                  <p className={`absolute inset-0 text-xs leading-relaxed transition-all duration-500 ${hoveredItem === index ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`} style={{color: 'var(--dark-text-primary)'}}>
                    {prop.detailedDescription}
                  </p>
                </div>
                
                {/* Interactive Stat Badge */}
                <div className="flex items-center justify-between">
                  <div className={`inline-flex px-2 py-1 bg-gradient-to-r ${prop.color} bg-opacity-20 rounded-full text-xs font-medium border border-transparent transition-all duration-300`} style={{color: 'var(--dark-text-primary)', borderColor: 'var(--dark-border)'}}>
                    {prop.stat}
                  </div>
                  
                  {/* Explore More Arrow */}
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <ArrowRight className="h-3 w-3" style={{color: 'var(--accent-secondary)'}} />
                  </div>
                </div>

                {/* Progress Bar Animation */}
                <div className="absolute bottom-0 left-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform scale-x-0 group-hover:scale-x-100 origin-center" style={{background: 'linear-gradient(90deg, transparent, var(--accent-secondary), transparent)'}}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuePropsWithConstellation;
