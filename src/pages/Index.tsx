
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
import { seedFirebase, checkIfDataExists } from '@/services/seedService';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [dataExists, setDataExists] = useState(false);
  
  // Check if data exists in Firebase on initial load
  useEffect(() => {
    const checkData = async () => {
      try {
        const { exists } = await checkIfDataExists();
        setDataExists(exists);
        if (!exists) {
          toast.info("No content found in Firebase database. Consider seeding initial data.");
        }
      } catch (error) {
        console.error("Error checking if data exists:", error);
      }
    };
    
    checkData();
  }, []);
  
  // Seed Firebase data function
  const handleSeedData = async () => {
    setIsSeeding(true);
    try {
      const result = await seedFirebase();
      if (result.success) {
        toast.success("Data successfully seeded to Firebase!");
        setDataExists(true);
        // Reload the page after seeding to show the new data
        setTimeout(() => {
          window.location.reload();
        }, 2000);
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
          <Button 
            onClick={handleSeedData}
            disabled={isSeeding}
            variant="default"
            className="px-4 py-2 rounded-md bg-gradient-primary text-white text-sm font-medium tracking-wide hover:opacity-90 transition-all duration-300 flex items-center gap-2"
          >
            {isSeeding ? (
              <>
                <span className="w-4 h-4 border-t-2 border-white rounded-full animate-spin"></span>
                Seeding Data...
              </>
            ) : (
              <>
                {dataExists ? 'Reseed Firebase Data' : 'Seed Firebase Data'}
              </>
            )}
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
