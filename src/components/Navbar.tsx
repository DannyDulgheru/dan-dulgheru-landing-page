
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  siteName?: string;
}

const Navbar = ({ siteName = "MOTION.DESIGN" }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
        isScrolled ? 'glass-morphism border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" className="text-xl font-display font-medium tracking-wider text-gradient">
          {siteName.split('.').map((part, index) => (
            <span key={index} className={index === 1 ? "font-light" : ""}>
              {index === 0 ? part : `.${part}`}
            </span>
          ))}
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          {['Home', 'Work', 'About', 'Skills', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors hover:text-gradient"
            >
              {item}
            </a>
          ))}
        </nav>
        
        {/* Contact Button (Desktop) */}
        <div className="hidden md:block">
          <a 
            href="#contact"
            className="px-6 py-2 rounded-full glass-morphism border border-white/20 text-sm font-medium hover:bg-white/10 transition-all duration-300"
          >
            Get in Touch
          </a>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`transition-all duration-300 ${isMobileMenuOpen ? 'rotate-90 opacity-0' : 'opacity-100'}`}
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`absolute transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'rotate-90 opacity-0'}`}
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 glass-morphism border-b border-white/10 overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-4">
          <nav className="flex flex-col gap-4">
            {['Home', 'Work', 'About', 'Skills', 'Contact'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 hover:text-white py-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
          
          <div className="mt-6 pt-6 border-t border-white/10">
            <a 
              href="#contact"
              className="block w-full py-3 text-center rounded-full bg-gradient-primary text-white font-medium tracking-wide hover:opacity-90 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
