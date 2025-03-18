
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      <div className="absolute -top-40 left-1/4 w-96 h-96 rounded-full bg-gradient-primary opacity-5 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <a href="#" className="text-xl font-display font-medium tracking-wider text-gradient">MOTION<span className="font-light">.DESIGN</span></a>
            <p className="text-gray-400 mt-4 max-w-md">
              Creating stunning motion experiences that bring your ideas to life. 
              Let's collaborate on your next project and create something extraordinary.
            </p>
            <div className="mt-6 flex gap-4">
              {['twitter', 'instagram', 'dribbble', 'behance'].map((social) => (
                <a 
                  key={social} 
                  href="#" 
                  className="w-10 h-10 flex-center rounded-full glass-morphism border border-white/10 hover:bg-white/10 transition-colors"
                  aria-label={`Visit my ${social} profile`}
                >
                  <span className="sr-only">{social}</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-gray-300"
                  >
                    {social === 'twitter' && (
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    )}
                    {social === 'instagram' && (
                      <>
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </>
                    )}
                    {social === 'dribbble' && (
                      <>
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path>
                      </>
                    )}
                    {social === 'behance' && (
                      <>
                        <path d="M16.5 13.5h-7m1-6.5h5.5M6 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
                        <circle cx="12" cy="12" r="10"></circle>
                      </>
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Navigation</h3>
            <ul className="space-y-3">
              {['Home', 'Work', 'About', 'Skills', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Contact</h3>
            <ul className="space-y-3 text-gray-400">
              <li>Los Angeles, CA</li>
              <li>hello@motiondesign.com</li>
              <li>+1 (123) 456-7890</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Motion Design. All rights reserved.
          </p>
          
          <div className="mt-4 md:mt-0 flex gap-6 text-gray-400 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
