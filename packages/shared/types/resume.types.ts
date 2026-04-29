import type { Email, HttpUrl, PhoneNumber, ResumeDate, CertExpiryDate } from './primitives.types';

export type SectionKey =
  | 'personal'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications';

export interface PersonalInfo {
  firstName: string;             // plain string — no validation needed
  lastName:  string;
  email:     Email;              // branded — must pass Zod email schema
  phone:     PhoneNumber;        // branded — must pass Zod phone schema
  linkedin:  HttpUrl;            // branded — must be valid URL
  github:    HttpUrl;            // branded — must be valid URL
  website?:  HttpUrl;            // optional personal site
  location:  string;             // "City, State" or "City, Country" — free text
}

// BulletPoint uses { id, content } not plain string[].
// id is required for stable React keys and future drag-to-reorder (v2).
export interface BulletPoint {
  id:      string;                // nanoid — generated on creation
  content: string;
}

export interface Experience {
  id:        string;              // nanoid
  role:      string;
  company:   string;
  location:  string;
  startDate: ResumeDate;          // display string e.g. "Jun. 2022"
  endDate:   ResumeDate;          // display string e.g. "Present" | "May 2024"
  bullets:   BulletPoint[];
}

export interface Education {
  id:          string;
  institution: string;
  degree:      string;            // e.g. "Bachelor of Science"
  field:       string;            // e.g. "Computer Science"
  startDate:   ResumeDate;
  endDate:     ResumeDate;
  gpa?:        string;            // e.g. "3.9 / 4.0" — free text, no float
  honors?:     string;            // e.g. "Dean's List, Summa Cum Laude"
}

export interface SkillCategory {
  id:       string;
  category: string;               // e.g. "Languages", "Frameworks", "Tools"
  items:    string[];             // e.g. ["Python", "TypeScript", "Go"]
}

export interface Project {
  id:        string;
  name:      string;
  techStack: string[];            // e.g. ["React", "Node.js", "PostgreSQL"]
  liveUrl?:  HttpUrl;
  repoUrl?:  HttpUrl;
  startDate: ResumeDate;
  endDate:   ResumeDate;
  bullets:   BulletPoint[];
}

export interface Certification {
  id:            string;
  name:          string;
  issuer:        string;
  issueDate:     ResumeDate;
  expiryDate:    CertExpiryDate;  // ResumeDate | 'never' — never use undefined
  credentialId?: string;
  url?:          HttpUrl;
}

export interface ResumeContent {
  personal:       PersonalInfo;
  experience:     Experience[];
  education:      Education[];
  skills:         SkillCategory[];
  projects:       Project[];
  certifications: Certification[];
}
