
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    setIsScrolled(offset > 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 py-5 px-6 md:px-12',
        isScrolled ? 'backdrop-blur-lg bg-black/70 py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" className="text-xl font-display font-medium tracking-wider text-gradient">MOTION<span className="font-light">.DESIGN</span></a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {['home', 'work', 'about', 'skills', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-sm uppercase tracking-widest text-gray-300 hover:text-white transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="w-7 h-5 flex flex-col justify-between relative">
            <span className={`w-full h-0.5 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-full h-0.5 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`w-full h-0.5 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full glass-morphism overflow-hidden transition-all duration-300 ease-in-out ${
        mobileMenuOpen ? 'max-h-screen py-6 opacity-100' : 'max-h-0 py-0 opacity-0'
      }`}>
        <div className="flex flex-col items-center gap-6 px-6">
          {['home', 'work', 'about', 'skills', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-base uppercase tracking-widest text-gray-300 hover:text-white transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
