
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { createScrollObserver } from '@/lib/animations';
import { trackPageView } from '@/services/analyticsService';

const Index = () => {
  useEffect(() => {
    // Track page view
    trackPageView('Home Page');
    
    // Initialize scroll animations
    const animateOnScroll = () => {
      const observer = createScrollObserver('.animate-on-scroll', 'animate-slide-up', 0.1);
      return () => observer.disconnect();
    };
    
    // Animation will start after the page loads
    const timeout = setTimeout(animateOnScroll, 500);
    
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
