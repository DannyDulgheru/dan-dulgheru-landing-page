
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc, query, orderBy, limit } from 'firebase/firestore';

// Types for our content data
export interface SiteInfo {
  siteName: string;
  siteTagline: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  contactLocation: string;
  socialLinks: {
    platform: string;
    url: string;
    icon: string;
  }[];
}

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
  profileImage: string;
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
  videoUrl?: string;
  detailedDescription?: string;
  clientName?: string;
  completionDate?: string;
  toolsUsed?: string[];
}

export interface ContactInfo {
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  location: string;
  availability: string;
  socialLinks: {
    platform: string;
    url: string;
  }[];
}

// Fetch site information from Firestore
export const fetchSiteInfo = async (): Promise<SiteInfo | null> => {
  try {
    const docRef = doc(db, 'content', 'siteInfo');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Fetched site info data:", docSnap.data());
      return docSnap.data() as SiteInfo;
    } else {
      console.log("No site info found in Firebase");
      return null;
    }
  } catch (error) {
    console.error("Error fetching site info:", error);
    return null;
  }
};

// Fetch hero content from Firestore
export const fetchHeroContent = async (): Promise<HeroContent | null> => {
  try {
    const docRef = doc(db, 'content', 'hero');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Fetched hero content:", docSnap.data());
      return docSnap.data() as HeroContent;
    } else {
      console.log("No hero content found in Firebase");
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
      console.log("Fetched about content:", docSnap.data());
      return docSnap.data() as AboutContent;
    } else {
      console.log("No about content found in Firebase");
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
      const skills = skillsSnapshot.docs.map(doc => doc.data() as SkillCategory);
      console.log("Fetched skills data:", skills);
      return skills;
    } else {
      console.log("No skills data found in Firebase");
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
      const stats = statsSnapshot.docs.map(doc => doc.data() as StatsItem);
      console.log("Fetched stats data:", stats);
      return stats;
    } else {
      console.log("No stats data found in Firebase");
      return null;
    }
  } catch (error) {
    console.error("Error fetching stats data:", error);
    return null;
  }
};

// Fetch contact information from Firestore
export const fetchContactInfo = async (): Promise<ContactInfo | null> => {
  try {
    const docRef = doc(db, 'content', 'contact');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Fetched contact information:", docSnap.data());
      return docSnap.data() as ContactInfo;
    } else {
      console.log("No contact information found in Firebase");
      return null;
    }
  } catch (error) {
    console.error("Error fetching contact information:", error);
    return null;
  }
};

// Fetch featured projects (limited amount) from Firestore
export const fetchProjects = async (limitCount = 4): Promise<Project[] | null> => {
  try {
    const projectsCollection = collection(db, 'projects');
    const projectsSnapshot = await getDocs(projectsCollection);
    
    if (!projectsSnapshot.empty) {
      const projects = projectsSnapshot.docs
        .slice(0, limitCount)
        .map(doc => {
          const data = doc.data();
          return {
            id: parseInt(doc.id) || Math.floor(Math.random() * 1000),
            title: data.title,
            category: data.category,
            imageUrl: data.imageUrl,
            description: data.description,
            videoUrl: data.videoUrl,
            detailedDescription: data.detailedDescription,
            clientName: data.clientName,
            completionDate: data.completionDate,
            toolsUsed: data.toolsUsed
          } as Project;
        });
      console.log(`Fetched ${projects.length} projects data:`, projects);
      return projects;
    } else {
      console.log("No projects data found in Firebase");
      return null;
    }
  } catch (error) {
    console.error("Error fetching projects data:", error);
    return null;
  }
};

// Fetch all projects from Firestore
export const fetchAllProjects = async (): Promise<Project[] | null> => {
  try {
    const projectsCollection = collection(db, 'projects');
    const projectsSnapshot = await getDocs(projectsCollection);
    
    if (!projectsSnapshot.empty) {
      const projects = projectsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: parseInt(doc.id) || Math.floor(Math.random() * 1000),
          title: data.title,
          category: data.category,
          imageUrl: data.imageUrl,
          description: data.description,
          videoUrl: data.videoUrl,
          detailedDescription: data.detailedDescription,
          clientName: data.clientName,
          completionDate: data.completionDate,
          toolsUsed: data.toolsUsed
        } as Project;
      });
      console.log(`Fetched all ${projects.length} projects:`, projects);
      return projects;
    } else {
      console.log("No projects data found in Firebase");
      return null;
    }
  } catch (error) {
    console.error("Error fetching all projects data:", error);
    return null;
  }
};
