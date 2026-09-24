export type LanguageCode = 'en' | 'ku';

export interface LanguageSkill {
  name: string;
  nameKu?: string;
  level: string;
  levelKu: string;
  experienceDisplay: string;
  experienceDisplayKu: string;
  snippet: string;
  description: string;
  descriptionKu: string;
  category: string;
}

export interface Project {
  id: string;
  title: string;
  titleKu: string;
  tagline: string;
  taglineKu: string;
  category: string;
  categoryKu: string;
  year: string;
  role: string;
  roleKu: string;
  impactMetric: string;
  impactMetricKu: string;
  description: string;
  descriptionKu: string;
  features: string[];
  featuresKu: string[];
  techStack: string[];
  liveUrl: string;
  githubUrl?: string;
  imageUrl?: string;
  featured: boolean;
  previewType: 'dashboard' | 'game' | 'ai' | 'media';
}

export interface UserProfile {
  name: string;
  nameKu: string;
  role: string;
  roleKu: string;
  tagline: string;
  taglineKu: string;
  bio: string;
  bioKu: string;
  email: string;
  availability: string;
  availabilityKu: string;
  location: string;
  locationKu: string;
  github?: string;
  tiktok?: string;
}
