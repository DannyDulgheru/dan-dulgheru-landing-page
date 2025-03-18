
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ThreeSceneProps {
  className?: string;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const frameId = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Materials
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      transparent: true,
      color: 0xffffff,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    
    // Points
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Mouse tracking for interaction
    const mouse = {
      x: 0,
      y: 0,
    };

    function onMouseMove(event: MouseEvent) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    const animate = () => {
      if (particlesRef.current) {
        particlesRef.current.rotation.x += 0.0005;
        particlesRef.current.rotation.y += 0.0005;
        
        // Mouse interaction - subtle movement towards mouse
        particlesRef.current.rotation.x += mouse.y * 0.0005;
        particlesRef.current.rotation.y += mouse.x * 0.0005;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      frameId.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (frameId.current != null) {
        cancelAnimationFrame(frameId.current);
      }
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (particlesRef.current) {
        particlesRef.current.geometry.dispose();
        (particlesRef.current.material as THREE.Material).dispose();
      }
    };
  }, []);

  return <div ref={containerRef} className={`absolute inset-0 ${className}`} />;
};

export default ThreeScene;
