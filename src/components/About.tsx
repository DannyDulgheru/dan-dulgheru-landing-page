
import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-24 px-6 relative scroll-margin">
      {/* Abstract Decorative Elements */}
      <div className="absolute -top-20 left-1/3 w-64 h-64 rounded-full bg-gradient-primary opacity-5 blur-3xl"></div>
      <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-gradient-secondary opacity-10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <p className="uppercase tracking-[0.3em] text-gray-400 text-sm mb-3">About Me</p>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Bringing <span className="text-gradient">Ideas</span> to Life Through Motion
            </h2>
            
            <div className="space-y-6 text-gray-300">
              <p>
                I'm a passionate 2D Motion Designer with over 6 years of experience creating 
                compelling visual stories through animation and motion graphics. My approach 
                combines technical precision with artistic vision to deliver motion experiences 
                that captivate and engage.
              </p>
              <p>
                My work ranges from brand animations and product showcases to UI motion design 
                and explainer videos. I'm driven by the challenge of translating complex ideas 
                into clear, visually stunning motion sequences.
              </p>
              <p>
                When I'm not animating, you'll find me exploring new design trends, 
                experimenting with emerging technologies, or contributing to the motion 
                design community through tutorials and mentorship.
              </p>
            </div>
            
            <div className="flex gap-6 mt-8">
              <a href="#" className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
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
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                LinkedIn
              </a>
              <a href="#" className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
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
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                Instagram
              </a>
              <a href="#" className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
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
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                GitHub
              </a>
            </div>
          </div>
          
          {/* Image/Decorative Element */}
          <div className="order-1 lg:order-2 relative">
            <div className="aspect-square relative rounded-2xl overflow-hidden glass-morphism border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1555952517-2e8e729e0b44?q=80&w=1064" 
                alt="Designer working on motion graphics" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Overlay Elements */}
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-2xl font-display font-medium mb-2">John Doe</h3>
                <p className="text-gray-300 text-sm">Motion Designer / Art Director</p>
              </div>
              
              {/* Decorative Square */}
              <div className="absolute -top-6 -right-6 w-20 h-20 border-2 border-white/10 rounded-lg rotate-12 animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 border-2 border-white/10 rounded-lg -rotate-12 animate-float animation-delay-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
