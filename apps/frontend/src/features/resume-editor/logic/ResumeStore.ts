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
import type { AppStore } from '../../shared/state/AppStore';
import { findEntryById, removeEntryById } from './helpers';

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
    const entry = this.content ? findEntryById(this.content.experience, id) : undefined;
    if (entry) {
      Object.assign(entry, patch);
      this.touch();
    }
  });

  removeExperience = action((id: string): void => {
    if (!this.content) return;
    this.content.experience = removeEntryById(this.content.experience, id);
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
    const entry = this.content ? findEntryById(this.content.education, id) : undefined;
    if (entry) {
      Object.assign(entry, patch);
      this.touch();
    }
  });

  removeEducation = action((id: string): void => {
    if (!this.content) return;
    this.content.education = removeEntryById(this.content.education, id);
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
    const entry = this.content ? findEntryById(this.content.skills, id) : undefined;
    if (entry) {
      Object.assign(entry, patch);
      this.touch();
    }
  });

  removeSkillCategory = action((id: string): void => {
    if (!this.content) return;
    this.content.skills = removeEntryById(this.content.skills, id);
    this.touch();
  });

  addSkillItem = action((categoryId: string, item: string): void => {
    const category = this.content ? findEntryById(this.content.skills, categoryId) : undefined;
    if (category) {
      category.items.push(item);
      this.touch();
    }
  });

  removeSkillItem = action((categoryId: string, index: number): void => {
    const category = this.content ? findEntryById(this.content.skills, categoryId) : undefined;
    if (category) {
      category.items.splice(index, 1);
      this.touch();
    }
  });

  updateSkillItem = action((categoryId: string, index: number, value: string): void => {
    const category = this.content ? findEntryById(this.content.skills, categoryId) : undefined;
    if (!category) return;
    category.items[index] = value;
    this.touch();
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
    const entry = this.content ? findEntryById(this.content.projects, id) : undefined;
    if (entry) {
      Object.assign(entry, patch);
      this.touch();
    }
  });

  removeProject = action((id: string): void => {
    if (!this.content) return;
    this.content.projects = removeEntryById(this.content.projects, id);
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
    const entry = this.content ? findEntryById(this.content.certifications, id) : undefined;
    if (entry) {
      Object.assign(entry, patch);
      this.touch();
    }
  });

  removeCertification = action((id: string): void => {
    if (!this.content) return;
    this.content.certifications = removeEntryById(this.content.certifications, id);
    this.touch();
  });

  // Bullet points (for experience and projects)
  private getBulletEntry = (
    section: 'experience' | 'projects',
    parentId: string
  ): (Experience | Project) | undefined => {
    if (!this.content) return undefined;
    return section === 'experience'
      ? findEntryById(this.content.experience, parentId)
      : findEntryById(this.content.projects, parentId);
  };

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
    entry.bullets = removeEntryById(entry.bullets, bulletId);
    this.touch();
  });
}
