
import { db } from '@/lib/firebase';
import { collection, doc, setDoc, writeBatch, getDoc } from 'firebase/firestore';

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
        { platform: "LinkedIn", url: "https://linkedin.com/in/johndoe" },
        { platform: "Instagram", url: "https://instagram.com/johndoe" },
        { platform: "GitHub", url: "https://github.com/johndoe" }
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
    
    // 5. Seed Projects with YouTube video links
    const projectsData = [
      {
        title: "Dynamic Brand Animation",
        category: "Motion Graphics",
        imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2080",
        description: "Created fluid logo animations and motion graphics system for a tech brand.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Example YouTube embed URL
      },
      {
        title: "Product Showcase",
        category: "3D Animation",
        imageUrl: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=2080",
        description: "Designed an immersive 3D product showcase for a new electronics launch.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Example YouTube embed URL
      },
      {
        title: "Social Media Package",
        category: "Animation",
        imageUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2080",
        description: "Developed a cohesive animation package for cross-platform social media content.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Example YouTube embed URL
      },
      {
        title: "Explainer Video",
        category: "2D Animation",
        imageUrl: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2080",
        description: "Created an engaging explainer video for a SaaS product launch.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Example YouTube embed URL
      },
      {
        title: "UI Animation Kit",
        category: "UI/UX Animation",
        imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2080",
        description: "Developed a comprehensive UI animation kit for a mobile app.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Example YouTube embed URL
      },
      {
        title: "Character Animation Reel",
        category: "Character Animation",
        imageUrl: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2080",
        description: "A showcase of character animations for various clients and personal projects.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Example YouTube embed URL
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
    const heroDoc = await getDoc(heroRef);
    
    return { exists: heroDoc.exists() };
  } catch (error) {
    console.error("Error checking if data exists:", error);
    return { exists: false, error };
  }
};
