
import React, { useState } from 'react';

interface Project {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "Dynamic Brand Animation",
    category: "Motion Graphics",
    imageUrl: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2080",
    description: "Created fluid logo animations and motion graphics system for a tech brand."
  },
  {
    id: 2,
    title: "Product Showcase",
    category: "3D Animation",
    imageUrl: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2080",
    description: "Designed an immersive 3D product showcase for a new electronics launch."
  },
  {
    id: 3,
    title: "Social Media Package",
    category: "Animation",
    imageUrl: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2080",
    description: "Developed a cohesive animation package for cross-platform social media content."
  },
  {
    id: 4,
    title: "Explainer Video",
    category: "2D Animation",
    imageUrl: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2080",
    description: "Created an engaging explainer video for a SaaS product launch."
  }
];

const Projects = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="work" className="py-24 px-6 relative scroll-margin">
      {/* Background Elements */}
      <div className="absolute top-1/3 left-0 w-72 h-72 rounded-full bg-gradient-secondary opacity-10 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-gradient-primary opacity-5 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <p className="uppercase tracking-[0.3em] text-gray-400 text-sm mb-3">Selected Works</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold"><span className="text-gradient">Featured</span> Projects</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {projectsData.map((project) => (
            <div 
              key={project.id}
              className="group relative overflow-hidden rounded-lg glass-morphism border border-white/10 transition-all duration-500 hover:border-white/20"
              onMouseEnter={() => setActiveProject(project)}
              onMouseLeave={() => setActiveProject(null)}
            >
              {/* Project Image with Overlay */}
              <div className="relative aspect-video overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10"></div>
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                  <p className="inline-block text-xs px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-gray-300 mb-3">
                    {project.category}
                  </p>
                  <h3 className="text-2xl font-display font-medium text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 opacity-0 max-h-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-300 text-sm">
                    {project.description}
                  </p>
                </div>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-500/20 to-blue-500/20 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <button className="px-8 py-3 rounded-full glass-morphism border border-white/20 font-medium tracking-wide hover:bg-white/10 transition-all duration-300">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
