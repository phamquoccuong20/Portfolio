export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  isFallback?: boolean;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fullDetails: string;
  tags: string[];
  category: "3D/WebGL" | "Fullstack" | "Web Performance";
  metrics: string;
  imagePrompt: string; // for potential mockup design
  liveUrl?: string;
  githubUrl?: string;
  role?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: "Frontend" | "Backend" | "Databases & DevOps" | "Other";
  iconName: string;
  yearsOfExp: number;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  skills: string[];
}

export interface SkillCloudPoint {
  x: number;
  y: number;
  z: number;
  sX: number; // projected screen x
  sY: number; // projected screen y
  scale: number;
  alpha: number;
  name: string;
  level: number;
  category: string;
}
