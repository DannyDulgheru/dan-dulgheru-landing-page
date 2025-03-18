
import { db } from '@/lib/firebase';
import { collection, doc, setDoc, writeBatch, getDoc } from 'firebase/firestore';

// Function to seed the initial content to Firebase
export const seedFirebase = async () => {
  try {
    // Using a batch write for multiple operations
    const batch = writeBatch(db);
    
    // 0. Site Information
    const siteInfoRef = doc(db, 'content', 'siteInfo');
    batch.set(siteInfoRef, {
      siteName: "Motion Design Portfolio",
      siteTagline: "Bringing Ideas to Life",
      siteDescription: "Professional motion design portfolio showcasing creative animation and visual storytelling",
      contactEmail: "hello@motiondesigner.com",
      contactPhone: "+1 (555) 123-4567",
      contactLocation: "New York, NY, USA",
      socialLinks: [
        { platform: "LinkedIn", url: "https://linkedin.com/in/johndoe", icon: "linkedin" },
        { platform: "Instagram", url: "https://instagram.com/johndoe", icon: "instagram" },
        { platform: "GitHub", url: "https://github.com/johndoe", icon: "github" },
        { platform: "Dribbble", url: "https://dribbble.com/johndoe", icon: "dribbble" },
        { platform: "YouTube", url: "https://youtube.com/c/johndoe", icon: "youtube" }
      ]
    });
    
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
      profileImage: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?q=80&w=1064",
      socialLinks: [
        { platform: "LinkedIn", url: "https://linkedin.com/in/johndoe" },
        { platform: "Instagram", url: "https://instagram.com/johndoe" },
        { platform: "GitHub", url: "https://github.com/johndoe" },
        { platform: "Dribbble", url: "https://dribbble.com/johndoe" }
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
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example YouTube embed URL
        detailedDescription: "This project involved creating a comprehensive motion graphics system for a tech startup's rebrand. The animated logo needed to convey innovation and flexibility while maintaining brand recognition. Used After Effects with custom expressions to create procedural animations that could be easily adapted for different contexts.",
        clientName: "TechVision Labs",
        completionDate: "January 2023",
        toolsUsed: ["After Effects", "Illustrator", "Lottie"]
      },
      {
        title: "Product Showcase",
        category: "3D Animation",
        imageUrl: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=2080",
        description: "Designed an immersive 3D product showcase for a new electronics launch.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example YouTube embed URL
        detailedDescription: "Created a series of 3D animations to showcase a new smartphone's key features. The animations highlighted the device's unique design elements and demonstrated its functionality in a visually engaging way. The final product was used across digital marketing channels and in-store displays.",
        clientName: "NextGen Electronics",
        completionDate: "March 2023",
        toolsUsed: ["Cinema 4D", "After Effects", "Redshift"]
      },
      {
        title: "Social Media Package",
        category: "Animation",
        imageUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2080",
        description: "Developed a cohesive animation package for cross-platform social media content.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example YouTube embed URL
        detailedDescription: "Designed and animated a comprehensive package of motion graphics for a fashion brand's social media channels. The package included animated stickers, transitions, lower thirds, and template animations that could be easily customized for different posts. The cohesive style helped strengthen brand recognition across platforms.",
        clientName: "Urban Style Collective",
        completionDate: "May 2023",
        toolsUsed: ["After Effects", "Photoshop", "Illustrator"]
      },
      {
        title: "Explainer Video",
        category: "2D Animation",
        imageUrl: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2080",
        description: "Created an engaging explainer video for a SaaS product launch.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example YouTube embed URL
        detailedDescription: "Produced a 90-second explainer video for a new project management software. The video needed to clearly communicate complex features in an accessible way. Using character animation and metaphorical visuals, we created an engaging narrative that simplified technical concepts and highlighted the software's benefits to potential users.",
        clientName: "TaskFlow Solutions",
        completionDate: "July 2023",
        toolsUsed: ["After Effects", "Character Animator", "Audition"]
      },
      {
        title: "UI Animation Kit",
        category: "UI/UX Animation",
        imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2080",
        description: "Developed a comprehensive UI animation kit for a mobile app.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example YouTube embed URL
        detailedDescription: "Created a library of micro-interactions and transition animations for a fitness tracking app. The animations needed to provide clear feedback, guide users through the interface, and add personality to the brand. The kit included loading states, button interactions, page transitions, and data visualization animations.",
        clientName: "FitTrack App",
        completionDate: "September 2023",
        toolsUsed: ["After Effects", "Principle", "Lottie", "Figma"]
      },
      {
        title: "Character Animation Reel",
        category: "Character Animation",
        imageUrl: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2080",
        description: "A showcase of character animations for various clients and personal projects.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example YouTube embed URL
        detailedDescription: "This reel compiles character animation work created for commercial projects and personal experiments. It demonstrates a range of emotional expressions, walk cycles, and character interactions. The animations were created using a combination of traditional keyframe animation and procedural techniques to achieve smooth, expressive movement.",
        clientName: "Various/Personal",
        completionDate: "December 2023",
        toolsUsed: ["After Effects", "Character Animator", "Illustrator"]
      }
    ];
    
    projectsData.forEach((project, index) => {
      const projectRef = doc(db, 'projects', index.toString());
      batch.set(projectRef, project);
    });
    
    // 6. Seed Contact Information
    const contactRef = doc(db, 'content', 'contact');
    batch.set(contactRef, {
      title: "Let's Work Together",
      subtitle: "Have a project in mind? Get in touch and let's create something amazing together.",
      email: "hello@motiondesigner.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY, USA",
      availability: "Currently available for freelance and contract work",
      socialLinks: [
        { platform: "LinkedIn", url: "https://linkedin.com/in/johndoe" },
        { platform: "Instagram", url: "https://instagram.com/johndoe" },
        { platform: "Dribbble", url: "https://dribbble.com/johndoe" }
      ]
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
