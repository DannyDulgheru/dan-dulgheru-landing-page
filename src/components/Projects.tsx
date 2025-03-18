import React, { useState, useEffect } from 'react';
import { fetchProjects, fetchAllProjects, Project } from '@/services/contentService';
import { trackProjectView } from '@/services/analyticsService';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';

const Projects = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const projectsData = showAll 
          ? await fetchAllProjects()
          : await fetchProjects(4);
          
        if (projectsData && projectsData.length > 0) {
          setProjects(projectsData);
        } else {
          setProjects([
            {
              id: 1,
              title: "Dynamic Brand Animation",
              category: "Motion Graphics",
              imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2080",
              description: "Created fluid logo animations and motion graphics system for a tech brand.",
              videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
            },
            {
              id: 2,
              title: "Product Showcase",
              category: "3D Animation",
              imageUrl: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=2080",
              description: "Designed an immersive 3D product showcase for a new electronics launch.",
              videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
            },
            {
              id: 3,
              title: "Social Media Package",
              category: "Animation",
              imageUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2080",
              description: "Developed a cohesive animation package for cross-platform social media content.",
              videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
            },
            {
              id: 4,
              title: "Explainer Video",
              category: "2D Animation",
              imageUrl: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2080",
              description: "Created an engaging explainer video for a SaaS product launch.",
              videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
            }
          ]);
        }
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [showAll]);

  const handleProjectClick = (project: Project) => {
    trackProjectView(project.id.toString(), project.title);
    setActiveProject(project);
    if (project.videoUrl) {
      setIsDialogOpen(true);
    }
  };

  const handleViewAllProjects = async () => {
    setShowAll(true);
  };

  if (loading) {
    return (
      <section id="work" className="py-12 md:py-24 px-4 md:px-6 relative scroll-margin">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-10 h-10 border-t-2 border-white rounded-full animate-spin mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="work" className="py-12 md:py-24 px-4 md:px-6 relative scroll-margin">
      <div className="absolute top-1/3 left-0 w-40 md:w-72 h-40 md:h-72 rounded-full bg-gradient-secondary opacity-10 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-5 md:right-10 w-60 md:w-96 h-60 md:h-96 rounded-full bg-gradient-primary opacity-5 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-16 text-center">
          <p className="uppercase tracking-[0.3em] text-gray-400 text-xs md:text-sm mb-2 md:mb-3">Selected Works</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold"><span className="text-gradient">Featured</span> Projects</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="group relative overflow-hidden rounded-lg glass-morphism border border-white/10 transition-all duration-500 hover:border-white/20 cursor-pointer"
              onMouseEnter={() => !isMobile && setActiveProject(project)}
              onMouseLeave={() => !isMobile && setActiveProject(null)}
              onClick={() => handleProjectClick(project)}
            >
              <div className="relative aspect-video overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10"></div>
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {project.videoUrl && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 
                                  w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center
                                  opacity-70 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 z-20">
                <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                  <p className="inline-block text-xs px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-gray-300 mb-2 md:mb-3">
                    {project.category}
                  </p>
                  <h3 className="text-xl md:text-2xl font-display font-medium text-white mb-1 md:mb-2">
                    {project.title}
                  </h3>
                  <p className={`text-gray-300 transition-all duration-300 text-xs md:text-sm ${isMobile ? 'block' : 'opacity-0 max-h-0 group-hover:max-h-20 group-hover:opacity-100'}`}>
                    {project.description}
                  </p>
                </div>
              </div>
              
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-500/20 to-blue-500/20 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10 md:mt-16">
          {!showAll ? (
            <Button 
              onClick={handleViewAllProjects}
              className="px-6 md:px-8 py-2.5 md:py-3 rounded-full glass-morphism border border-white/20 font-medium tracking-wide hover:bg-white/10 transition-all duration-300 text-black text-sm md:text-base"
            >
              View All Projects
            </Button>
          ) : (
            <p className="text-gray-400 animate-fade-in">Showing all projects</p>
          )}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] max-h-[90vh] p-0 bg-background/95 backdrop-blur-lg">
          <DialogHeader className="p-3 md:p-4 flex flex-row items-center justify-between">
            <DialogTitle className="text-lg md:text-xl font-display">
              {activeProject?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full">
            {activeProject?.videoUrl && (
              <iframe
                src={activeProject.videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={activeProject.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                style={{ display: 'block' }} 
                onLoad={() => console.log('Video iframe loaded successfully')}
                onError={(e) => console.error('Error loading video iframe:', e)}
              ></iframe>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;
