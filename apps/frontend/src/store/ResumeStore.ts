import { makeAutoObservable, action } from 'mobx';
import { nanoid } from 'nanoid';
import type {
  ResumeContent,
  PersonalInfo,
  Experience,
  Education,
  SkillCategory,
  Project,
  Certification,
  BulletPoint,
} from '@resume-builder/shared';
import type { AppStore } from './AppStore';

export class ResumeStore {
  constructor(private appStore: AppStore) {
    makeAutoObservable(this);
  }

  get content(): ResumeContent | undefined {
    return this.appStore.activeResume?.content;
  }

  private touch = (): void => {
    if (this.appStore.activeResume) {
      this.appStore.activeResume.updatedAt = new Date().toISOString();
    }
  };

  // Personal — field-level update with strict key typing
  updatePersonal = action(
    <K extends keyof PersonalInfo>(field: K, value: PersonalInfo[K]): void => {
      if (!this.content) return;
      this.content.personal[field] = value;
      this.touch();
    }
  );

  // Experience
  addExperience = action((): void => {
    if (!this.content) return;
    this.content.experience.push({
      id: nanoid(),
      role: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      bullets: [],
    });
    this.touch();
  });

  updateExperience = action((id: string, patch: Partial<Omit<Experience, 'id'>>): void => {
    const entry = this.content?.experience.find(e => e.id === id);
    if (entry) {
      Object.assign(entry, patch);
      this.touch();
    }
  });

  removeExperience = action((id: string): void => {
    if (!this.content) return;
    this.content.experience = this.content.experience.filter(e => e.id !== id);
    this.touch();
  });

  // Education
  addEducation = action((): void => {
    if (!this.content) return;
    this.content.education.push({
      id: nanoid(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
    });
    this.touch();
  });

  updateEducation = action((id: string, patch: Partial<Omit<Education, 'id'>>): void => {
    const entry = this.content?.education.find(e => e.id === id);
    if (entry) {
      Object.assign(entry, patch);
      this.touch();
    }
  });

  removeEducation = action((id: string): void => {
    if (!this.content) return;
    this.content.education = this.content.education.filter(e => e.id !== id);
    this.touch();
  });

  // Skills
  addSkillCategory = action((): void => {
    if (!this.content) return;
    this.content.skills.push({
      id: nanoid(),
      category: '',
      items: [],
    });
    this.touch();
  });

  updateSkillCategory = action((id: string, patch: Partial<Omit<SkillCategory, 'id'>>): void => {
    const entry = this.content?.skills.find(s => s.id === id);
    if (entry) {
      Object.assign(entry, patch);
      this.touch();
    }
  });

  removeSkillCategory = action((id: string): void => {
    if (!this.content) return;
    this.content.skills = this.content.skills.filter(s => s.id !== id);
    this.touch();
  });

  addSkillItem = action((categoryId: string, item: string): void => {
    const category = this.content?.skills.find(s => s.id === categoryId);
    if (category) {
      category.items.push(item);
      this.touch();
    }
  });

  removeSkillItem = action((categoryId: string, index: number): void => {
    const category = this.content?.skills.find(s => s.id === categoryId);
    if (category) {
      category.items.splice(index, 1);
      this.touch();
    }
  });

  // Projects
  addProject = action((): void => {
    if (!this.content) return;
    this.content.projects.push({
      id: nanoid(),
      name: '',
      techStack: [],
      startDate: '',
      endDate: '',
      bullets: [],
    });
    this.touch();
  });

  updateProject = action((id: string, patch: Partial<Omit<Project, 'id'>>): void => {
    const entry = this.content?.projects.find(p => p.id === id);
    if (entry) {
      Object.assign(entry, patch);
      this.touch();
    }
  });

  removeProject = action((id: string): void => {
    if (!this.content) return;
    this.content.projects = this.content.projects.filter(p => p.id !== id);
    this.touch();
  });

  // Certifications
  addCertification = action((): void => {
    if (!this.content) return;
    this.content.certifications.push({
      id: nanoid(),
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: 'never',
    });
    this.touch();
  });

  updateCertification = action((id: string, patch: Partial<Omit<Certification, 'id'>>): void => {
    const entry = this.content?.certifications.find(c => c.id === id);
    if (entry) {
      Object.assign(entry, patch);
      this.touch();
    }
  });

  removeCertification = action((id: string): void => {
    if (!this.content) return;
    this.content.certifications = this.content.certifications.filter(c => c.id !== id);
    this.touch();
  });

  // Bullet points (for experience and projects)
  private getBulletEntry = (
    section: 'experience' | 'projects',
    parentId: string
  ): (Experience | Project) | undefined =>
    this.content?.[section].find(entry => entry.id === parentId);

  addBullet = action((parentId: string, section: 'experience' | 'projects'): void => {
    const entry = this.getBulletEntry(section, parentId);
    if (!entry) return;
    entry.bullets.push({ id: nanoid(), content: '' });
    this.touch();
  });

  updateBullet = action(
    (parentId: string, bulletId: string, content: string, section: 'experience' | 'projects'): void => {
      const entry = this.getBulletEntry(section, parentId);
      const bullet = entry?.bullets.find((b: BulletPoint) => b.id === bulletId);
      if (bullet) {
        bullet.content = content;
        this.touch();
      }
    }
  );

  removeBullet = action((parentId: string, bulletId: string, section: 'experience' | 'projects'): void => {
    const entry = this.getBulletEntry(section, parentId);
    if (!entry) return;
    entry.bullets = entry.bullets.filter((b: BulletPoint) => b.id !== bulletId);
    this.touch();
  });
}
