
import { db } from '@/lib/firebase';
import { collection, doc, setDoc, writeBatch } from 'firebase/firestore';

// Function to seed the initial content to Firebase
export const seedFirebase = async () => {
  try {
    // Using a batch write for multiple operations
    const batch = writeBatch(db);
    
    // 1. Seed Hero Content
    const heroRef = doc(db, 'content', 'hero');
    batch.set(heroRef, {
      role: "2D Motion Designer",
      heading: "Creating Motion Experiences that Captivate",
      subheading: "I blend creativity with technical expertise to craft visually stunning animations that tell your story and engage your audience."
    });
    
    // 2. Seed About Content
    const aboutRef = doc(db, 'content', 'about');
    batch.set(aboutRef, {
      title: "Bringing Ideas to Life Through Motion",
      description: [
        "I'm a passionate 2D Motion Designer with over 6 years of experience creating compelling visual stories through animation and motion graphics. My approach combines technical precision with artistic vision to deliver motion experiences that captivate and engage.",
        "My work ranges from brand animations and product showcases to UI motion design and explainer videos. I'm driven by the challenge of translating complex ideas into clear, visually stunning motion sequences.",
        "When I'm not animating, you'll find me exploring new design trends, experimenting with emerging technologies, or contributing to the motion design community through tutorials and mentorship."
      ],
      name: "John Doe",
      role: "Motion Designer / Art Director",
      socialLinks: [
        { platform: "LinkedIn", url: "#" },
        { platform: "Instagram", url: "#" },
        { platform: "GitHub", url: "#" }
      ]
    });
    
    // 3. Seed Skills Categories
    const skillsData = [
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
    
    skillsData.forEach((skill, index) => {
      const skillRef = doc(db, 'skills', index.toString());
      batch.set(skillRef, skill);
    });
    
    // 4. Seed Stats
    const statsData = [
      { number: "6+", label: "Years Experience" },
      { number: "50+", label: "Projects Completed" },
      { number: "25+", label: "Happy Clients" },
      { number: "10+", label: "Awards Received" }
    ];
    
    statsData.forEach((stat, index) => {
      const statRef = doc(db, 'stats', index.toString());
      batch.set(statRef, stat);
    });
    
    // 5. Seed Projects
    const projectsData = [
      {
        title: "Dynamic Brand Animation",
        category: "Motion Graphics",
        imageUrl: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2080",
        description: "Created fluid logo animations and motion graphics system for a tech brand."
      },
      {
        title: "Product Showcase",
        category: "3D Animation",
        imageUrl: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2080",
        description: "Designed an immersive 3D product showcase for a new electronics launch."
      },
      {
        title: "Social Media Package",
        category: "Animation",
        imageUrl: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2080",
        description: "Developed a cohesive animation package for cross-platform social media content."
      },
      {
        title: "Explainer Video",
        category: "2D Animation",
        imageUrl: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2080",
        description: "Created an engaging explainer video for a SaaS product launch."
      }
    ];
    
    projectsData.forEach((project, index) => {
      const projectRef = doc(db, 'projects', index.toString());
      batch.set(projectRef, project);
    });
    
    // Commit the batch
    await batch.commit();
    
    console.log("Firebase data seeded successfully!");
    return { success: true };
  } catch (error) {
    console.error("Error seeding Firebase data:", error);
    return { success: false, error };
  }
};

// Function to check if data already exists in Firebase
export const checkIfDataExists = async () => {
  try {
    const heroRef = doc(db, 'content', 'hero');
    const heroDoc = await doc(db, 'content', 'hero').get();
    
    return { exists: heroDoc.exists() };
  } catch (error) {
    console.error("Error checking if data exists:", error);
    return { exists: false, error };
  }
};
