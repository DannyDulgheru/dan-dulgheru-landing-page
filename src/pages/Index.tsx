
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { createScrollObserver } from '@/lib/animations';
import { trackPageView } from '@/services/analyticsService';
import { seedFirebase } from '@/services/seedService';
import { toast } from 'sonner';

const Index = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  
  // Seed Firebase data function - this would typically be done once manually by the site admin
  const handleSeedData = async () => {
    setIsSeeding(true);
    try {
      const result = await seedFirebase();
      if (result.success) {
        toast.success("Data successfully seeded to Firebase!");
      } else {
        toast.error("Failed to seed data to Firebase");
      }
    } catch (error) {
      console.error("Error seeding data:", error);
      toast.error("An error occurred while seeding data");
    } finally {
      setIsSeeding(false);
    }
  };

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
        
        {/* Admin Panel - Would typically be hidden behind auth */}
        <div className="fixed bottom-4 right-4 z-50">
          <button 
            onClick={handleSeedData}
            disabled={isSeeding}
            className="px-4 py-2 rounded-md bg-gradient-primary text-white text-sm font-medium tracking-wide hover:opacity-90 transition-all duration-300 flex items-center gap-2"
          >
            {isSeeding ? (
              <>
                <span className="w-4 h-4 border-t-2 border-white rounded-full animate-spin"></span>
                Seeding Data...
              </>
            ) : (
              'Seed Firebase Data'
            )}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
