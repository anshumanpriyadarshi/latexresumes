import { makeAutoObservable, action } from 'mobx';
import { nanoid } from 'nanoid';
import type {
  Resume,
  AppState,
  ColorTheme,
  TemplateId,
  Theme,
} from '@resume-builder/shared';
import { defaultFormattingConfig, emptyResumeContent } from '@resume-builder/shared';
import { cloneSerializable, findResumeById } from './helpers';

export class AppStore {
  resumes: Resume[] = [];
  activeResumeId: string | null = null;
  savedThemes: Theme[] = [];
  colorTheme: ColorTheme = 'light';
  dashboardOpen: boolean = false;
  formattingPanelOpen: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get activeResume(): Resume | undefined {
    return this.activeResumeId ? findResumeById(this.resumes, this.activeResumeId) : undefined;
  }

  createResume = action((name: string, templateId: TemplateId = 'jakes'): Resume => {
    const now = new Date().toISOString();
    const resume: Resume = {
      id: nanoid(),
      name,
      templateId,
      createdAt: now,
      updatedAt: now,
      content: emptyResumeContent(),
      formatting: defaultFormattingConfig(templateId),
    };
    this.resumes.push(resume);
    this.activeResumeId = resume.id;
    return resume;
  });

  deleteResume = action((id: string): void => {
    this.resumes = this.resumes.filter(r => r.id !== id);
    if (this.activeResumeId === id) {
      this.activeResumeId = this.resumes[0]?.id ?? null;
    }
  });

  duplicateResume = action((id: string): Resume => {
    const original = findResumeById(this.resumes, id);
    if (!original) throw new Error(`Resume not found: ${id}`);

    const now = new Date().toISOString();
    const duplicate: Resume = {
      ...original,
      id: nanoid(),
      name: `${original.name} (Copy)`,
      createdAt: now,
      updatedAt: now,
      content: cloneSerializable(original.content),
      formatting: cloneSerializable(original.formatting),
    };
    this.resumes.push(duplicate);
    this.activeResumeId = duplicate.id;
    return duplicate;
  });

  setActiveResume = action((id: string): void => {
    if (findResumeById(this.resumes, id)) {
      this.activeResumeId = id;
    }
  });

  toggleTheme = action((): void => {
    this.colorTheme = this.colorTheme === 'light' ? 'dark' : 'light';
  });

  toggleDashboard = action((): void => {
    this.dashboardOpen = !this.dashboardOpen;
  });

  toggleFormattingPanel = action((): void => {
    this.formattingPanelOpen = !this.formattingPanelOpen;
  });

  updateActiveResumeName = action((name: string): void => {
    if (!this.activeResume) return;
    this.activeResume.name = name;
    this.activeResume.updatedAt = new Date().toISOString();
  });

  importResume = action((resume: Resume): void => {
    this.resumes.push(resume);
    this.activeResumeId = resume.id;
  });

  saveTheme = action((theme: Theme): void => {
    this.savedThemes.push(theme);
  });

  serialize = (): AppState => ({
    resumes: this.resumes.slice(),
    activeResumeId: this.activeResumeId,
    savedThemes: this.savedThemes.slice(),
    colorTheme: this.colorTheme,
    dashboardOpen: false,
  });

  hydrate = action((state: Partial<AppState>): void => {
    Object.assign(this, state);
  });
}
