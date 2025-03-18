
import React, { useEffect, useRef } from 'react';
import ThreeScene from './ThreeScene';

const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const animateText = () => {
      const heading = headingRef.current;
      const subheading = subheadingRef.current;
      
      if (heading) {
        heading.style.opacity = '1';
        heading.style.transform = 'translateY(0)';
      }
      
      if (subheading) {
        setTimeout(() => {
          subheading.style.opacity = '1';
          subheading.style.transform = 'translateY(0)';
        }, 400);
      }
    };

    animateText();
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
      {/* Three.js Background */}
      <ThreeScene className="w-full h-full" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background"></div>
      
      {/* Abstract Shape */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-primary opacity-20 blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-gradient-secondary opacity-10 blur-3xl animate-pulse-slow animation-delay-1000"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <p className="text-sm md:text-base uppercase tracking-[0.3em] text-gray-400 mb-4 animate-fade-in">2D Motion Designer</p>
        
        <h1 
          ref={headingRef}
          className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 opacity-0 transform translate-y-10 transition-all duration-700 ease-out"
        >
          Creating <span className="text-gradient">Motion</span> Experiences<br />
          that <span className="text-gradient">Captivate</span>
        </h1>
        
        <p 
          ref={subheadingRef}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 opacity-0 transform translate-y-10 transition-all duration-700 ease-out delay-300"
        >
          I blend creativity with technical expertise to craft visually stunning
          animations that tell your story and engage your audience.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-700">
          <button 
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="px-8 py-3 rounded-full glass-morphism border border-white/20 font-medium tracking-wide hover:bg-white/10 transition-all duration-300"
          >
            View My Work
          </button>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="px-8 py-3 rounded-full bg-gradient-primary text-white font-medium tracking-wide hover:opacity-90 transition-all duration-300"
          >
            Get in Touch
          </button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-gray-400 mb-2">Scroll</span>
        <svg width="16" height="28" viewBox="0 0 16 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="14" height="26" rx="7" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
          <circle className="animate-float" cx="8" cy="8" r="3" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
