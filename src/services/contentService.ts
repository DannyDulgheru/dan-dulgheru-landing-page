
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

// Types for our content data
export interface HeroContent {
  heading: string;
  subheading: string;
  role: string;
}

export interface AboutContent {
  title: string;
  description: string[];
  name: string;
  role: string;
  socialLinks: {
    platform: string;
    url: string;
  }[];
}

export interface SkillCategory {
  title: string;
  skills: Array<{
    name: string;
    level: number;
  }>;
}

export interface StatsItem {
  number: string;
  label: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

// Fetch hero content from Firestore
export const fetchHeroContent = async (): Promise<HeroContent | null> => {
  try {
    const docRef = doc(db, 'content', 'hero');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as HeroContent;
    } else {
      console.log("No hero content found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching hero content:", error);
    return null;
  }
};

// Fetch about content from Firestore
export const fetchAboutContent = async (): Promise<AboutContent | null> => {
  try {
    const docRef = doc(db, 'content', 'about');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as AboutContent;
    } else {
      console.log("No about content found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching about content:", error);
    return null;
  }
};

// Fetch skills data from Firestore
export const fetchSkillsData = async (): Promise<SkillCategory[] | null> => {
  try {
    const skillsCollection = collection(db, 'skills');
    const skillsSnapshot = await getDocs(skillsCollection);
    
    if (!skillsSnapshot.empty) {
      return skillsSnapshot.docs.map(doc => doc.data() as SkillCategory);
    } else {
      console.log("No skills data found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching skills data:", error);
    return null;
  }
};

// Fetch stats items from Firestore
export const fetchStatsItems = async (): Promise<StatsItem[] | null> => {
  try {
    const statsCollection = collection(db, 'stats');
    const statsSnapshot = await getDocs(statsCollection);
    
    if (!statsSnapshot.empty) {
      return statsSnapshot.docs.map(doc => doc.data() as StatsItem);
    } else {
      console.log("No stats data found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching stats data:", error);
    return null;
  }
};

// Fetch projects data from Firestore
export const fetchProjects = async (): Promise<Project[] | null> => {
  try {
    const projectsCollection = collection(db, 'projects');
    const projectsSnapshot = await getDocs(projectsCollection);
    
    if (!projectsSnapshot.empty) {
      return projectsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: parseInt(doc.id) || Math.floor(Math.random() * 1000),
          title: data.title,
          category: data.category,
          imageUrl: data.imageUrl,
          description: data.description
        } as Project;
      });
    } else {
      console.log("No projects data found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching projects data:", error);
    return null;
  }
};

// Function to seed initial data (use this once to populate Firebase)
export const seedInitialContent = async () => {
  // This function would contain the code to seed your Firebase with initial data
  // It's not implemented here as it would be run once manually
  console.log("Seeding initial content would be implemented here");
};
