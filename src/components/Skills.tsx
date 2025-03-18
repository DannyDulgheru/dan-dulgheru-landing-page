
import React from 'react';

interface SkillCategory {
  title: string;
  skills: Array<{
    name: string;
    level: number;
  }>;
}

const skillsData: SkillCategory[] = [
  {
    title: "Animation",
    skills: [
      { name: "After Effects", level: 95 },
      { name: "Character Animation", level: 85 },
      { name: "Motion Graphics", level: 90 },
      { name: "Storyboarding", level: 80 },
    ]
  },
  {
    title: "Design",
    skills: [
      { name: "Illustrator", level: 85 },
      { name: "Photoshop", level: 90 },
      { name: "Figma", level: 80 },
      { name: "Typography", level: 75 },
    ]
  },
  {
    title: "Technical",
    skills: [
      { name: "Lottie", level: 85 },
      { name: "3D Basics", level: 70 },
      { name: "HTML/CSS Animation", level: 75 },
      { name: "Video Editing", level: 80 },
    ]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 relative scroll-margin">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-10 w-80 h-80 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-primary opacity-5 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <p className="uppercase tracking-[0.3em] text-gray-400 text-sm mb-3">Expertise</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold">My <span className="text-gradient">Creative</span> Skills</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {skillsData.map((category, index) => (
            <div key={index} className="glass-morphism rounded-xl p-8 border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all duration-300">
              {/* Background Gradient */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-primary opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500"></div>
              
              <h3 className="text-2xl font-display font-medium mb-6 relative">{category.title}</h3>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-primary rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${skill.level}%`,
                          transform: 'translateX(0)',
                          opacity: 1
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-8 h-8 border border-white/10 rounded-md rotate-12 animate-float opacity-50"></div>
            </div>
          ))}
        </div>
        
        {/* Additional Info */}
        <div className="mt-20 glass-morphism border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-secondary opacity-10 blur-3xl rounded-full"></div>
          
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "6+", label: "Years Experience" },
              { number: "50+", label: "Projects Completed" },
              { number: "25+", label: "Happy Clients" },
              { number: "10+", label: "Awards Received" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <h4 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-2">
                  {stat.number}
                </h4>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
