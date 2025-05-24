// Database Type Definitions

export interface Profile {
  id: number;
  name: string;
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  bio?: string;
  profile_image_url?: string;
  resume_url?: string;
  linkedin_url?: string;
  github_url?: string;
  website_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: number;
  name: string;
  category?: string;
  proficiency_level?: number;
  years_experience?: number;
  is_featured: boolean;
  created_at: string;
}

export interface Project {
  id: number;
  title: string;
  description?: string;
  detailed_description?: string;
  start_date?: string;
  end_date?: string;
  status?: 'in_progress' | 'completed' | 'archived';
  project_type?: string;
  github_url?: string;
  demo_url?: string;
  image_url?: string;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  technologies?: string[]; 
  images?: ProjectImage[];
}

export interface ProjectImage {
  id: number;
  project_id: number;
  image_url: string;
  caption?: string;
  alt_text?: string;
  sort_order: number;
  created_at: string;
}

export interface Experience {
  id: number;
  company_name: string;
  position: string;
  location?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description?: string;
  company_url?: string;
  company_logo_url?: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
  items?: ExperienceItem[]; 
}

export interface ExperienceItem {
  id: number;
  experience_id: number;
  description: string;
  sort_order: number;
}

export interface Education {
  id: number;
  institution_name: string;
  degree?: string;
  field_of_study?: string;
  start_date?: string;
  end_date?: string;
  gpa?: number;
  description?: string;
  location?: string;
  is_current: boolean;
  sort_order: number;
  created_at: string;
}

export interface Certification {
  id: number;
  name: string;
  issuing_organization: string;
  issue_date?: string;
  expiration_date?: string;
  credential_id?: string;
  credential_url?: string;
  description?: string;
  created_at: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  is_read: boolean;
  replied_at?: string;
  created_at: string;
}

export interface Testimonial {
  id: number;
  name: string;
  position?: string;
  company?: string;
  content: string;
  avatar_url?: string;
  rating?: number;
  is_featured: boolean;
  is_approved: boolean;
  created_at: string;
}

export interface SiteSetting {
  id: number;
  setting_key: string;
  setting_value?: string;
  setting_type: 'text' | 'number' | 'boolean' | 'json';
  description?: string;
  updated_at: string;
}