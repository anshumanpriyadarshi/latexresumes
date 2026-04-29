import type { ResumeContent } from './resume.types';
import type { FormattingConfig, Theme } from './formatting.types';

export type ColorTheme = 'light' | 'dark';
export type TemplateId = 'jakes';           // extend union in v2 for AltaCV etc.

export interface Resume {
  id:         string;                       // nanoid
  name:       string;                       // user label e.g. "Google SWE 2024"
  templateId: TemplateId;
  createdAt:  string;                       // ISO 8601
  updatedAt:  string;                       // ISO 8601 — updated on every content/formatting change
  content:    ResumeContent;
  formatting: FormattingConfig;
}

export interface AppState {
  resumes:        Resume[];
  activeResumeId: string | null;
  savedThemes:    Theme[];
  colorTheme:     ColorTheme;
  dashboardOpen:  boolean;
}
