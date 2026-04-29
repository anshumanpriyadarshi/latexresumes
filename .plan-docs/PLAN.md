# LaTeX Resume Builder — Implementation Plan
> **Claude Code Edition · Frontend-First · v1**

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Repository Structure](#3-repository-structure)
4. [Type System](#4-type-system)
5. [Zod Schemas](#5-zod-schemas)
6. [MobX Store Architecture](#6-mobx-store-architecture)
7. [UI Layout & Components](#7-ui-layout--components)
8. [Formatting Panel](#8-formatting-panel)
9. [Jake's Resume Template](#9-jakes-resume-template)
10. [Export System](#10-export-system)
11. [Data Persistence](#11-data-persistence)
12. [ESLint & TypeScript Config](#12-eslint--typescript-config)
13. [.tex Parser — v2 Architecture](#13-tex-parser--v2-architecture)
14. [Build Order](#14-build-order)
15. [Claude Code Prompt Templates](#15-claude-code-prompt-templates)

---

## 1. Project Overview

A web-based LaTeX resume builder. Users fill structured forms and a live formatting engine — the app generates a pixel-perfect PDF and a valid `.tex` source file that opens directly in Overleaf. No LaTeX knowledge required.

### Core Value Proposition

- **Form-driven** — no LaTeX knowledge needed to produce a professional resume
- **Full LaTeX formatting control** — spacing, fonts, alignment, colors via a visual panel
- **Overleaf-compatible `.tex` export** — users can continue editing in Overleaf directly
- **Multiple resumes dashboard** — manage all resumes with per-resume formatting configs
- **Portable data** — export as PDF, `.tex`, `.json`, or reusable `.theme.json` preset
- **Future: `.tex` import** — upload an existing Jake's Resume `.tex` file and populate the editor (v2)

### v1 Scope

| Concern | Decision |
|---|---|
| Sections | Personal Info, Experience, Education, Skills, Projects, Certifications |
| Template | Jake's Resume only |
| Exports | PDF, `.tex`, JSON, `.theme.json` |
| Storage | localStorage primary, backend stub ready for optional account sync |
| Resume management | Dashboard — multiple resumes per user |
| AI features | None in v1 |
| Mobile | Desktop only |

---

## 2. Tech Stack

| Concern | Choice | Reason |
|---|---|---|
| Monorepo | pnpm workspaces | Faster installs, strict dependency isolation |
| Frontend | React 18 + Vite | Fast HMR, ES module native |
| Language | TypeScript — strict mode | No implicit any, exact optional types |
| Validation | Zod | Runtime validation + type inference + branded types |
| State | MobX + mobx-react-lite | Fine-grained reactivity, ideal for form-heavy UI |
| Styling | Tailwind CSS | Utility-first, easy dark mode via `class` strategy |
| Linting | ESLint + react-hooks plugin + typescript-eslint | Enforced hook rules + strict TS |
| PDF | @react-pdf/renderer | Real vector PDF, fully client-side, no server |
| `.tex` gen | JS string templating | No LaTeX compiler needed, Overleaf-compatible |
| IDs | nanoid | Collision-resistant short IDs for all entities |
| Backend | Express (stub only) | Placeholder for future auth + sync |
| Deploy | Frontend → Vercel · Backend stub → Railway | Native monorepo support on both |

---

## 3. Repository Structure

```
resume-builder/
├── apps/
│   ├── frontend/                        ← PRIMARY FOCUS
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── topbar/              # Logo, resume name, theme toggle, export buttons
│   │   │   │   ├── editor/              # Horizontal tabs + section forms
│   │   │   │   │   └── sections/        # One file per section form
│   │   │   │   ├── preview/             # Live paper preview panel
│   │   │   │   ├── formatting/          # Slide-in formatting panel + tabs
│   │   │   │   │   └── tabs/            # SpacingTab, FontsTab, ColorsTab, AlignmentTab
│   │   │   │   └── dashboard/           # Slide-over resume manager + cards
│   │   │   ├── templates/
│   │   │   │   └── jakes/
│   │   │   │       ├── JakesHTMLPreview.tsx   # Instant live HTML mirror
│   │   │   │       ├── JakesPDFTemplate.tsx   # @react-pdf/renderer template
│   │   │   │       └── jakesTex.ts            # ResumeData → .tex string
│   │   │   ├── store/
│   │   │   │   ├── AppStore.ts                # Root store — resumes list, theme, dashboard
│   │   │   │   ├── ResumeStore.ts             # Active resume content CRUD
│   │   │   │   ├── FormattingStore.ts         # Global + per-section formatting
│   │   │   │   └── index.ts                   # StoreProvider + useStores hook
│   │   │   ├── utils/
│   │   │   │   ├── pdfExporter.ts
│   │   │   │   ├── texExporter.ts
│   │   │   │   ├── jsonExporter.ts
│   │   │   │   └── themeExporter.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useStores.ts               # Typed store access
│   │   │   │   └── usePersistence.ts          # localStorage hydrate + MobX reaction
│   │   │   └── App.tsx
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   └── .eslintrc.cjs
│   │
│   └── backend/                         ← STUB ONLY — not implemented in v1
│       ├── src/index.ts                 # GET /health only
│       └── package.json
│
├── packages/
│   └── shared/
│       ├── types/
│       │   ├── primitives.types.ts      # Branded types: Email, PhoneNumber, HttpUrl
│       │   ├── formatting.types.ts      # LaTeXUnit, FormattingConfig, Theme
│       │   ├── resume.types.ts          # ResumeContent, all section types
│       │   └── app.types.ts             # Resume, AppState, ColorTheme
│       ├── schemas/
│       │   ├── primitives.schemas.ts    # Zod schemas for branded types
│       │   ├── resume.schemas.ts        # Zod schemas for all resume content
│       │   ├── formatting.schemas.ts    # Zod schemas for FormattingConfig
│       │   └── app.schemas.ts           # Zod schema for full Resume object
│       ├── defaults/
│       │   └── formatting.defaults.ts   # Default FormattingConfig for Jake's template
│       └── package.json
│
├── .github/
│   └── workflows/
│       └── frontend.yml                 # Deploy frontend on push to main
├── .gitignore                           # Node template + Vite extras + .env
├── .eslintrc.cjs                        # Root ESLint — applies to all apps
├── LICENSE                              # MIT
├── README.md
├── pnpm-workspace.yaml
└── package.json                         # Root scripts + workspace config
```

### pnpm-workspace.yaml

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

### Root package.json scripts

```json
{
  "private": true,
  "scripts": {
    "dev":   "concurrently \"pnpm --filter frontend dev\" \"pnpm --filter backend dev\"",
    "build": "pnpm --filter frontend build",
    "lint":  "eslint . --ext .ts,.tsx",
    "type-check": "pnpm --filter frontend exec tsc --noEmit"
  }
}
```

---

## 4. Type System

> **Rule:** Define all types before writing any component or store. Every type is imported from `@resume-builder/shared`. No inline type definitions in component files.

### 4.1 Branded Primitives

```ts
// packages/shared/types/primitives.types.ts

// Branded types — prevent passing raw strings where validated types are expected.
// Zod schemas in packages/shared/schemas/ are the ONLY way to construct these.

export type Email       = string & { readonly __brand: 'Email' }
export type PhoneNumber = string & { readonly __brand: 'PhoneNumber' }
export type HttpUrl     = string & { readonly __brand: 'HttpUrl' }

// Resume date strings — intentionally NOT Date objects.
// Reason: resume dates are display strings, not calendar dates.
// Valid values: "May 2024", "Present", "Summer 2023", "2019", "Jun. 2022"
// Using Date would break "Present", force day-of-month assumptions, and
// create lossy round-trips in the .tex exporter. Do not change this.
export type ResumeDate = string;

// Certification expiry — explicit 'never' instead of undefined
// to make .tex serialization unambiguous.
export type CertExpiryDate = ResumeDate | 'never';
```

### 4.2 Formatting Types

```ts
// packages/shared/types/formatting.types.ts

export type LengthUnit = 'pt' | 'em' | 'ex' | 'cm' | 'mm' | 'in';

// Core unit — NEVER store as raw string e.g. "6pt".
// Keeps value + unit separate so sliders can be added in v2
// without changing the data model.
export interface LaTeXUnit {
  value: number;
  unit:  LengthUnit;
}

export type FontWeight = 'normal' | 'bold' | 'light';

export interface FontDef {
  family: string;       // e.g. "Computer Modern", "Latin Modern", "Helvetica"
  size:   LaTeXUnit;
  weight: FontWeight;
}

export interface ColorDef {
  hex:     string;      // 6-char hex, no '#' prefix  e.g. "4f46e5"
  preset?: string;      // optional human label        e.g. "indigo"
}

export interface AlignmentDef {
  vertical:   'top' | 'middle' | 'bottom';
  horizontal: 'left' | 'center' | 'right' | 'space-between';
}

export interface SpacingConfig {
  beforeSection:     LaTeXUnit;   // \vspace{} before \section{}
  afterSectionTitle: LaTeXUnit;   // gap between section title and first entry
  betweenItems:      LaTeXUnit;   // gap between entries (e.g. two jobs)
  betweenSubItems:   LaTeXUnit;   // \itemsep between bullet points
  inlineGap:         LaTeXUnit;   // \hspace{} between same-line elements
}

export interface FontConfig {
  name:         FontDef;          // Candidate full name
  sectionTitle: FontDef;          // "EXPERIENCE", "EDUCATION" headers
  entryTitle:   FontDef;          // Job title, degree name
  entrySubtitle:FontDef;          // Company name, institution
  bodyText:     FontDef;          // Bullet point content
  dateLine:     FontDef;          // Dates, locations (right-aligned)
}

export interface PageMargins {
  top:    LaTeXUnit;
  bottom: LaTeXUnit;
  left:   LaTeXUnit;
  right:  LaTeXUnit;
}

export interface GlobalFormatting {
  spacing:     SpacingConfig;
  fonts:       FontConfig;
  colors: {
    accent:    ColorDef;          // Section title color + horizontal rule
    nameText:  ColorDef;
    bodyText:  ColorDef;
    dateText:  ColorDef;
  };
  alignment:   AlignmentDef;
  pageMargins: PageMargins;
}

// Section-level overrides — all fields optional.
// Undefined fields fall back to GlobalFormatting values.
// Use FormattingStore.resolveSpacing() to get the merged value.
export interface SectionFormatting {
  spacing?:   Partial<SpacingConfig>;
  fonts?:     Partial<FontConfig>;
  alignment?: Partial<AlignmentDef>;
}

export interface FormattingConfig {
  global:   GlobalFormatting;
  sections: Partial<Record<SectionKey, SectionFormatting>>;
}

// Reusable formatting preset — exported as .theme.json
export interface Theme {
  id:         string;
  name:       string;
  createdAt:  string;             // ISO 8601 date string
  formatting: FormattingConfig;
}
```

### 4.3 Resume Content Types

```ts
// packages/shared/types/resume.types.ts
import type { Email, PhoneNumber, HttpUrl, ResumeDate, CertExpiryDate } from './primitives.types';

export type SectionKey =
  | 'personal'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications';

export interface PersonalInfo {
  firstName:  string;             // plain string — no validation needed
  lastName:   string;
  email:      Email;              // branded — must pass Zod email schema
  phone:      PhoneNumber;        // branded — must pass Zod phone schema
  linkedin:   HttpUrl;            // branded — must be valid URL
  github:     HttpUrl;            // branded — must be valid URL
  website?:   HttpUrl;            // optional personal site
  location:   string;             // "City, State" or "City, Country" — free text
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
```

### 4.4 App-Level Types

```ts
// packages/shared/types/app.types.ts
import type { ResumeContent } from './resume.types';
import type { FormattingConfig, Theme } from './formatting.types';

export type ColorTheme = 'light' | 'dark';
export type TemplateId = 'jakes';           // extend union in v2 for AltaCV etc.

export interface Resume {
  id:          string;                      // nanoid
  name:        string;                      // user label e.g. "Google SWE 2024"
  templateId:  TemplateId;
  createdAt:   string;                      // ISO 8601
  updatedAt:   string;                      // ISO 8601 — updated on every content/formatting change
  content:     ResumeContent;
  formatting:  FormattingConfig;
}

export interface AppState {
  resumes:        Resume[];
  activeResumeId: string | null;
  savedThemes:    Theme[];
  colorTheme:     ColorTheme;
  dashboardOpen:  boolean;
}
```

---

## 5. Zod Schemas

> Schemas live in `packages/shared/schemas/`. They serve two purposes:
> 1. **Form validation** — validate user input at the boundary before writing to the store
> 2. **Import validation** — validate `.json` resume files on upload before hydrating state
>
> Never call `schema.parse()` inside a MobX store. Validate at the form/import boundary,
> then pass clean typed data to the store action.

### 5.1 Primitive Schemas

```ts
// packages/shared/schemas/primitives.schemas.ts
import { z } from 'zod';
import type { Email, PhoneNumber, HttpUrl } from '../types/primitives.types';

export const emailSchema = z
  .string()
  .email('Must be a valid email address')
  .transform(v => v as Email);

export const phoneSchema = z
  .string()
  .regex(
    /^\+?[\d\s\-().]{7,20}$/,
    'Must be a valid phone number'
  )
  .transform(v => v as PhoneNumber);

export const httpUrlSchema = z
  .string()
  .url('Must be a valid URL')
  .transform(v => v as HttpUrl);

// Resume dates — any non-empty string is valid (display strings)
export const resumeDateSchema = z.string().min(1, 'Date is required');

export const certExpirySchema = z.union([
  resumeDateSchema,
  z.literal('never'),
]);
```

### 5.2 Resume Content Schemas

```ts
// packages/shared/schemas/resume.schemas.ts
import { z } from 'zod';
import { emailSchema, phoneSchema, httpUrlSchema, resumeDateSchema, certExpirySchema } from './primitives.schemas';

export const bulletPointSchema = z.object({
  id:      z.string().min(1),
  content: z.string(),
});

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName:  z.string().min(1, 'Last name is required'),
  email:     emailSchema,
  phone:     phoneSchema,
  linkedin:  httpUrlSchema,
  github:    httpUrlSchema,
  website:   httpUrlSchema.optional(),
  location:  z.string().min(1, 'Location is required'),
});

export const experienceSchema = z.object({
  id:        z.string(),
  role:      z.string().min(1),
  company:   z.string().min(1),
  location:  z.string(),
  startDate: resumeDateSchema,
  endDate:   resumeDateSchema,
  bullets:   z.array(bulletPointSchema),
});

export const educationSchema = z.object({
  id:          z.string(),
  institution: z.string().min(1),
  degree:      z.string().min(1),
  field:       z.string().min(1),
  startDate:   resumeDateSchema,
  endDate:     resumeDateSchema,
  gpa:         z.string().optional(),
  honors:      z.string().optional(),
});

export const skillCategorySchema = z.object({
  id:       z.string(),
  category: z.string().min(1),
  items:    z.array(z.string().min(1)),
});

export const projectSchema = z.object({
  id:        z.string(),
  name:      z.string().min(1),
  techStack: z.array(z.string()),
  liveUrl:   httpUrlSchema.optional(),
  repoUrl:   httpUrlSchema.optional(),
  startDate: resumeDateSchema,
  endDate:   resumeDateSchema,
  bullets:   z.array(bulletPointSchema),
});

export const certificationSchema = z.object({
  id:            z.string(),
  name:          z.string().min(1),
  issuer:        z.string().min(1),
  issueDate:     resumeDateSchema,
  expiryDate:    certExpirySchema,
  credentialId:  z.string().optional(),
  url:           httpUrlSchema.optional(),
});

export const resumeContentSchema = z.object({
  personal:       personalInfoSchema,
  experience:     z.array(experienceSchema),
  education:      z.array(educationSchema),
  skills:         z.array(skillCategorySchema),
  projects:       z.array(projectSchema),
  certifications: z.array(certificationSchema),
});
```

### 5.3 App Schema (JSON Import Validation)

```ts
// packages/shared/schemas/app.schemas.ts
// Used to validate uploaded .json resume files before hydrating the store.

export const resumeSchema = z.object({
  id:          z.string(),
  name:        z.string().min(1),
  templateId:  z.enum(['jakes']),
  createdAt:   z.string().datetime(),
  updatedAt:   z.string().datetime(),
  content:     resumeContentSchema,
  formatting:  formattingConfigSchema,   // defined in formatting.schemas.ts
});

// Usage at import boundary:
// const result = resumeSchema.safeParse(uploadedJson);
// if (!result.success) { showWarnings(result.error.issues); return; }
// appStore.importResume(result.data);
```

---

## 6. MobX Store Architecture

Three stores, each with a single responsibility. Instantiated once, injected via React context.

### 6.1 AppStore

```ts
// src/store/AppStore.ts
import { makeAutoObservable, action, computed } from 'mobx';
import { nanoid } from 'nanoid';
import type { Resume, AppState, ColorTheme, TemplateId } from '@resume-builder/shared';
import { defaultFormattingConfig } from '@resume-builder/shared/defaults/formatting.defaults';

export class AppStore {
  resumes:        Resume[]       = [];
  activeResumeId: string | null  = null;
  savedThemes:    Theme[]        = [];
  colorTheme:     ColorTheme     = 'light';
  dashboardOpen:  boolean        = false;

  constructor() { makeAutoObservable(this); }

  get activeResume(): Resume | undefined {
    return this.resumes.find(r => r.id === this.activeResumeId);
  }

  createResume = action((name: string, templateId: TemplateId = 'jakes'): Resume => {
    const resume: Resume = {
      id: nanoid(), name, templateId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      content:    emptyResumeContent(),
      formatting: defaultFormattingConfig(templateId),
    };
    this.resumes.push(resume);
    this.activeResumeId = resume.id;
    return resume;
  });

  deleteResume    = action((id: string): void => {
    this.resumes = this.resumes.filter(r => r.id !== id);
    if (this.activeResumeId === id) {
      this.activeResumeId = this.resumes[0]?.id ?? null;
    }
  });

  duplicateResume = action((id: string): Resume => { /* deep clone + new id */ });
  setActiveResume = action((id: string): void => { this.activeResumeId = id; });
  toggleTheme     = action((): void => { this.colorTheme = this.colorTheme === 'light' ? 'dark' : 'light'; });
  toggleDashboard = action((): void => { this.dashboardOpen = !this.dashboardOpen; });
  importResume    = action((resume: Resume): void => { this.resumes.push(resume); });
  saveTheme       = action((theme: Theme): void => { this.savedThemes.push(theme); });

  // Called by usePersistence hook — returns plain object for localStorage
  serialize = (): AppState => ({
    resumes: this.resumes.slice(),
    activeResumeId: this.activeResumeId,
    savedThemes: this.savedThemes.slice(),
    colorTheme: this.colorTheme,
    dashboardOpen: false,           // never persist open state
  });

  hydrate = action((state: Partial<AppState>): void => { Object.assign(this, state); });
}
```

### 6.2 ResumeStore

```ts
// src/store/ResumeStore.ts
// Operates on the active resume's content only.
// All mutations touch AppStore.activeResume.content and update updatedAt.

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
  updatePersonal = action(<K extends keyof PersonalInfo>(
    field: K, value: PersonalInfo[K]
  ): void => {
    if (!this.content) return;
    this.content.personal[field] = value;
    this.touch();
  });

  // Experience
  addExperience = action((): void => {
    this.content?.experience.push({
      id: nanoid(), role:'', company:'', location:'',
      startDate:'', endDate:'', bullets:[],
    });
    this.touch();
  });

  updateExperience = action((id: string, patch: Partial<Omit<Experience,'id'>>): void => {
    const entry = this.content?.experience.find(e => e.id === id);
    if (entry) { Object.assign(entry, patch); this.touch(); }
  });

  removeExperience = action((id: string): void => {
    if (!this.content) return;
    this.content.experience = this.content.experience.filter(e => e.id !== id);
    this.touch();
  });

  addBullet = action((parentId: string, section: 'experience' | 'projects'): void => {
    const entry = this.content?.[section].find(e => e.id === parentId);
    entry?.bullets.push({ id: nanoid(), content: '' });
    this.touch();
  });

  updateBullet = action((parentId: string, bulletId: string, content: string, section: 'experience' | 'projects'): void => {
    const entry  = this.content?.[section].find(e => e.id === parentId);
    const bullet = entry?.bullets.find(b => b.id === bulletId);
    if (bullet) { bullet.content = content; this.touch(); }
  });

  removeBullet = action((parentId: string, bulletId: string, section: 'experience' | 'projects'): void => {
    const entry = this.content?.[section].find(e => e.id === parentId);
    if (entry) {
      entry.bullets = entry.bullets.filter(b => b.id !== bulletId);
      this.touch();
    }
  });

  // Education, Skills, Projects, Certifications — same pattern as Experience
  // addEducation / updateEducation / removeEducation
  // addSkillCategory / updateSkillCategory / removeSkillCategory / addSkillItem / removeSkillItem
  // addProject / updateProject / removeProject
  // addCertification / updateCertification / removeCertification
}
```

### 6.3 FormattingStore

```ts
// src/store/FormattingStore.ts

export class FormattingStore {
  constructor(private appStore: AppStore) {
    makeAutoObservable(this);
  }

  get formatting(): FormattingConfig | undefined {
    return this.appStore.activeResume?.formatting;
  }

  // Merged value: section override ?? global default
  resolveSpacing = (
    section: SectionKey | null,
    key: keyof SpacingConfig
  ): LaTeXUnit => {
    const override = section
      ? this.formatting?.sections[section]?.spacing?.[key]
      : undefined;
    return override ?? this.formatting!.global.spacing[key];
  };

  resolveFont = (section: SectionKey | null, key: keyof FontConfig): FontDef => {
    const override = section
      ? this.formatting?.sections[section]?.fonts?.[key]
      : undefined;
    return override ?? this.formatting!.global.fonts[key];
  };

  updateGlobalSpacing = action((key: keyof SpacingConfig, value: LaTeXUnit): void => {
    if (!this.formatting) return;
    this.formatting.global.spacing[key] = value;
  });

  updateGlobalColor = action((key: keyof GlobalFormatting['colors'], value: ColorDef): void => {
    if (!this.formatting) return;
    this.formatting.global.colors[key] = value;
  });

  updateSectionOverride = action((
    section: SectionKey,
    key: keyof SpacingConfig,
    value: LaTeXUnit | undefined     // undefined clears override → falls back to global
  ): void => {
    if (!this.formatting) return;
    if (!this.formatting.sections[section]) {
      this.formatting.sections[section] = {};
    }
    const sec = this.formatting.sections[section]!;
    if (!sec.spacing) sec.spacing = {};
    if (value === undefined) {
      delete sec.spacing[key];
    } else {
      sec.spacing[key] = value;
    }
  });

  applyTheme  = action((theme: Theme): void => {
    if (!this.formatting) return;
    Object.assign(this.formatting, theme.formatting);
  });

  exportTheme = (name: string): Theme => ({
    id:         nanoid(),
    name,
    createdAt:  new Date().toISOString(),
    formatting: JSON.parse(JSON.stringify(this.formatting)), // deep clone
  });
}
```

### 6.4 Store Context & Hook

```ts
// src/store/index.ts
import { createContext, useContext, useMemo } from 'react';
import { AppStore } from './AppStore';
import { ResumeStore } from './ResumeStore';
import { FormattingStore } from './FormattingStore';

export interface RootStore {
  appStore:        AppStore;
  resumeStore:     ResumeStore;
  formattingStore: FormattingStore;
}

const StoreContext = createContext<RootStore | null>(null);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const stores = useMemo(() => {
    const appStore        = new AppStore();
    const resumeStore     = new ResumeStore(appStore);
    const formattingStore = new FormattingStore(appStore);
    return { appStore, resumeStore, formattingStore };
  }, []);

  return (
    <StoreContext.Provider value={stores}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStores = (): RootStore => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStores must be used within StoreProvider');
  return ctx;
};
```

---

## 7. UI Layout & Components

### 7.1 Overall Layout

```
┌────────────────────────────────────────────────────────────────────┐
│  TOPBAR: Logo │ [Resume Name — editable] │ Theme ∙ PDF ∙ .tex ∙ JSON │ 48px
├──────────────────────────────────┬─────────────────────────────────┤
│  EDITOR PANEL (resizable)        │  PREVIEW PANEL                  │
│                                  │                                 │
│  ┌──────────────────────────┐   │  bg: slate-100 / slate-800      │
│  │ Tabs: Per│Son│Exp│Edu... │   │  centered white paper           │
│  ├──────────────────────────┤   │  8.5 × 11 in with shadow        │
│  │                          │   │  live HTML resume render        │
│  │  Active Section Form     │   │                                 │
│  │  (scrollable)            │   │  zoom control bottom-right      │
│  │                          │   │                                 │
│  └──────────────────────────┘   │                                 │
└──────────────────────────────────┴─────────────────────────────────┘

Layered on top (z-index stacking):
  FormattingPanel  — slides in from LEFT over the editor panel
  DashboardPanel   — slides in from RIGHT over full viewport
```

### 7.2 Component Inventory

| Component | File | Responsibility |
|---|---|---|
| `TopBar` | `topbar/TopBar.tsx` | Logo, editable resume name, theme toggle, export buttons (PDF / .tex / JSON), dashboard trigger |
| `SectionTabs` | `editor/SectionTabs.tsx` | Horizontal tabs: Personal · Experience · Education · Skills · Projects · Certifications · Formatting |
| `PersonalForm` | `editor/sections/PersonalForm.tsx` | Controlled inputs for all PersonalInfo; Zod validation on blur |
| `ExperienceForm` | `editor/sections/ExperienceForm.tsx` | Dynamic entry list; per-entry individual bullet inputs (one `<input>` per bullet) |
| `EducationForm` | `editor/sections/EducationForm.tsx` | Dynamic entry list |
| `SkillsForm` | `editor/sections/SkillsForm.tsx` | Category + tag-style item inputs per category |
| `ProjectsForm` | `editor/sections/ProjectsForm.tsx` | Dynamic entries; techStack as tag inputs; bullet list |
| `CertificationsForm` | `editor/sections/CertificationsForm.tsx` | Dynamic entries; `expiryDate` as `ResumeDate \| 'never'` toggle |
| `ResumePreview` | `preview/ResumePreview.tsx` | Paper container (A4/Letter, white, shadow) + live HTML render |
| `JakesHTMLPreview` | `templates/jakes/JakesHTMLPreview.tsx` | HTML/CSS mirror of Jake's layout; reads FormattingStore via CSS vars |
| `FormattingPanel` | `formatting/FormattingPanel.tsx` | Slide-in from left; scope toggle (global/section); tabbed |
| `SpacingTab` | `formatting/tabs/SpacingTab.tsx` | `LaTeXUnitInput` for all `SpacingConfig` fields + page margins |
| `FontsTab` | `formatting/tabs/FontsTab.tsx` | Font family select + `LaTeXUnitInput` size per `FontConfig` role |
| `ColorsTab` | `formatting/tabs/ColorsTab.tsx` | Hex input + preset swatches for all `ColorDef` fields |
| `AlignmentTab` | `formatting/tabs/AlignmentTab.tsx` | Vertical/horizontal selects per element type |
| `LaTeXUnitInput` | `formatting/LaTeXUnitInput.tsx` | Reusable `{ value, unit }` input — number field + unit select |
| `DashboardPanel` | `dashboard/DashboardPanel.tsx` | Right slide-over; grid of `ResumeCard` components |
| `ResumeCard` | `dashboard/ResumeCard.tsx` | Paper thumbnail, name, last edited, action menu (open/duplicate/delete/export) |

---

## 8. Formatting Panel

The most complex UI surface. Slides in from the left over the editor. Does not push the editor — it overlaps.

### Scope Toggle

At the top of the panel, always visible:

```
[ Global ▼ ]  or  [ Section Override ▼: Experience · Education · ... ]
```

- **Global** — writes to `FormattingConfig.global`. Affects all sections unless overridden.
- **Section Override** — select a section from dropdown. Writes to `FormattingConfig.sections[key]`.
- Override inputs show the global value as a placeholder (inherited hint) when not set.
- Each override field has a `× clear` button that calls `formattingStore.updateSectionOverride(..., undefined)`.

### Tabs

| Tab | Controls |
|---|---|
| **Spacing** | `beforeSection`, `afterSectionTitle`, `betweenItems`, `betweenSubItems`, `inlineGap`, page margins (top/bottom/left/right) |
| **Fonts** | Font family select + size `LaTeXUnitInput` + weight for: name, sectionTitle, entryTitle, entrySubtitle, bodyText, dateLine |
| **Colors** | Hex input + preset swatch grid for: accent, nameText, bodyText, dateText |
| **Alignment** | Vertical select (top/middle/bottom) + horizontal select (left/center/right/space-between) |

### LaTeXUnitInput Component

```ts
// Reusable — used throughout the Formatting Panel
interface LaTeXUnitInputProps {
  label:         string;
  value:         LaTeXUnit;
  onChange:      (v: LaTeXUnit) => void;
  inheritedHint?: LaTeXUnit;    // shown as placeholder when in section-override mode
  disabled?:     boolean;
}

// Renders as: [label] [___number___] [pt ▼]
// Unit select options: pt | em | ex | cm | mm | in
// Serializes to LaTeX: `${value}${unit}` — e.g. "6pt", "0.5em"
```

### Spacing → LaTeX Command Map

| Field | LaTeX command |
|---|---|
| `beforeSection` | `\vspace{}` before `\section{}` |
| `afterSectionTitle` | `\vspace{}` after section heading rule |
| `betweenItems` | `\vspace{}` between `\resumeSubheading` blocks |
| `betweenSubItems` | `\itemsep` inside `\resumeItemListStart` |
| `inlineGap` | `\hspace{}` between same-line elements |
| `pageMargins.*` | `\geometry{left=, right=, top=, bottom=}` |

---

## 9. Jake's Resume Template

Three representations of the same template — kept in sync by always reading from `FormattingStore.resolveSpacing()` / `resolveFont()`.

| Representation | File | Purpose |
|---|---|---|
| HTML preview | `templates/jakes/JakesHTMLPreview.tsx` | Instant live preview using CSS custom properties |
| PDF renderer | `templates/jakes/JakesPDFTemplate.tsx` | `@react-pdf/renderer` — real vector PDF download |
| `.tex` exporter | `templates/jakes/jakesTex.ts` | Generates valid Jake's Resume `.tex` string |

### Critical Rule — Formatting Parity

> `FormattingStore.resolveSpacing(section, key)` is the **single source of truth**.
> Call it in all three representations. Never hardcode spacing values.
>
> Example:
> - HTML: `style={{ marginBottom: \`${resolveSpacing('experience', 'betweenItems').value}${resolveSpacing('experience','betweenItems').unit}\` }}`
> - `.tex`: `\vspace{${resolveSpacing('experience', 'betweenItems').value}${resolveSpacing('experience','betweenItems').unit}}`

### .tex Exporter Structure

```ts
// templates/jakes/jakesTex.ts
import type { Resume } from '@resume-builder/shared';

export function generateJakesTex(resume: Resume, resolve: typeof FormattingStore.prototype.resolveSpacing): string {
  const { content, formatting } = resume;
  const g = formatting.global;

  return [
    jakesDocumentClass(g),          // \documentclass, \usepackage, \geometry
    jakesCustomCommands(g),          // \resumeSubheading, \resumeItem etc.
    '\\begin{document}',
    jakesPersonalSection(content.personal, g),
    content.experience.length     ? jakesExperienceSection(content.experience, g)     : '',
    content.education.length      ? jakesEducationSection(content.education, g)       : '',
    content.projects.length       ? jakesProjectsSection(content.projects, g)         : '',
    content.skills.length         ? jakesSkillsSection(content.skills, g)             : '',
    content.certifications.length ? jakesCertsSection(content.certifications, g)      : '',
    '\\end{document}',
  ].filter(Boolean).join('\n\n');
}

// Each section function signature:
// function jakesExperienceSection(entries: Experience[], g: GlobalFormatting): string

// LaTeXUnit serialization helper:
export const toLatex = (u: LaTeXUnit): string => `${u.value}${u.unit}`;
// Usage: \vspace{${toLatex(g.spacing.beforeSection)}}
```

---

## 10. Export System

All exports are triggered from the TopBar. All are client-side only in v1.

```ts
// utils/pdfExporter.ts
export async function downloadPDF(resume: Resume): Promise<void> {
  const { pdf }   = await import('@react-pdf/renderer');
  const { JakesPDFTemplate } = await import('../templates/jakes/JakesPDFTemplate');
  const blob = await pdf(<JakesPDFTemplate resume={resume} />).toBlob();
  triggerDownload(blob, `${resume.content.personal.lastName}_Resume.pdf`, 'application/pdf');
}

// utils/texExporter.ts
export function downloadTex(resume: Resume): void {
  const tex  = generateJakesTex(resume);
  const blob = new Blob([tex], { type: 'text/plain; charset=utf-8' });
  triggerDownload(blob, `${resume.content.personal.lastName}_Resume.tex`);
}

// utils/jsonExporter.ts
export function downloadJSON(resume: Resume): void {
  const blob = new Blob([JSON.stringify(resume, null, 2)], { type: 'application/json' });
  triggerDownload(blob, `${resume.name}.resume.json`);
}

// utils/themeExporter.ts
export function downloadTheme(theme: Theme): void {
  const blob = new Blob([JSON.stringify(theme, null, 2)], { type: 'application/json' });
  triggerDownload(blob, `${theme.name}.theme.json`);
}

// Shared helper
function triggerDownload(blob: Blob, filename: string, type?: string): void {
  const url = URL.createObjectURL(blob);
  const a   = Object.assign(document.createElement('a'), { href: url, download: filename });
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
```

### JSON Import

```ts
// In DashboardPanel — import button handler
async function handleJSONImport(file: File): Promise<void> {
  const raw    = await file.text();
  const parsed = JSON.parse(raw);
  const result = resumeSchema.safeParse(parsed);

  if (!result.success) {
    // Show Zod validation errors to user
    showImportErrors(result.error.issues.map(i => i.message));
    return;
  }
  appStore.importResume(result.data);
}
```

---

## 11. Data Persistence

```ts
// src/hooks/usePersistence.ts
const STORAGE_KEY = 'resume-builder:state';

export function usePersistence(appStore: AppStore): void {
  // Hydrate on mount
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const state = JSON.parse(raw) as Partial<AppState>;
      appStore.hydrate(state);
    } catch {
      console.warn('Failed to parse persisted state — starting fresh');
    }
  }, [appStore]);

  // Persist on every change — debounced 500ms
  useEffect(() => {
    const dispose = reaction(
      () => appStore.serialize(),
      (state) => localStorage.setItem(STORAGE_KEY, JSON.stringify(state)),
      { delay: 500, fireImmediately: false }
    );
    return dispose;
  }, [appStore]);
}
```

---

## 12. ESLint & TypeScript Config

### ESLint

```js
// .eslintrc.cjs — root, applies to all apps
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['@typescript-eslint', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any':               'error',
    '@typescript-eslint/no-non-null-assertion':         'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/consistent-type-imports':       'error',   // enforce `import type`
    'react-hooks/rules-of-hooks':                       'error',
    'react-hooks/exhaustive-deps':                      'warn',
    'no-console':                                       'warn',
  },
};
```

### TypeScript

```json
// apps/frontend/tsconfig.json
{
  "compilerOptions": {
    "target":                     "ES2020",
    "lib":                        ["ES2020", "DOM", "DOM.Iterable"],
    "module":                     "ESNext",
    "moduleResolution":           "bundler",
    "strict":                     true,
    "noImplicitAny":              true,
    "noImplicitReturns":          true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess":   true,
    "jsx":                        "react-jsx",
    "paths": {
      "@resume-builder/shared": ["../../packages/shared/index.ts"]
    }
  }
}
```

---

## 13. .tex Parser — v2 Architecture

> **Not implemented in v1.** Architecture is defined here so the type system and
> export layer are designed with the inverse operation in mind from day one.

### What it does

User uploads an existing Jake's Resume `.tex` file → app parses it → populates `ResumeContent` + `FormattingConfig` → opens in the editor. Fields that couldn't be parsed are left empty with a warning shown to the user.

### Types

```ts
// packages/shared/types/texParser.types.ts  — defined now, implemented in v2

export interface TexParseWarning {
  field:   string;      // e.g. "experience[0].bullets[1]"
  reason:  string;      // e.g. "Could not match \\resumeItem content"
  rawTex?: string;      // the offending LaTeX fragment for user reference
}

export interface TexParseResult {
  content:     Partial<ResumeContent>;    // best-effort parsed content
  formatting:  Partial<FormattingConfig>; // best-effort parsed formatting
  warnings:    TexParseWarning[];         // list of fields that couldn't be parsed
  rawSource:   string;                    // original .tex preserved verbatim
}
```

### Module Structure (v2)

```
src/utils/texParser/
├── index.ts              # parseTex(source: string): TexParseResult
├── parsePersonal.ts      # extract \begin{center} name + contact line
├── parseExperience.ts    # extract \resumeSubheading + \resumeItem blocks
├── parseEducation.ts     # extract education \resumeSubheading blocks
├── parseSkills.ts        # extract \textbf{Category:} patterns
├── parseProjects.ts      # extract project \resumeSubheading blocks
├── parseCertifications.ts
├── parseFormatting.ts    # extract \geometry{}, \fontsize{}, \color{} etc.
└── utils.ts              # regex helpers, LaTeX string unescape
```

### Warning UI (v2)

When `TexParseResult.warnings.length > 0`, show a dismissible warnings panel above the editor:

```
⚠ 3 fields couldn't be parsed from your .tex file

  • experience[0].bullets[2] — Could not match \resumeItem content
  • formatting.fonts.name    — \fontsize not found, using default
  • certifications            — Section not found in uploaded file

  [View raw .tex]  [Dismiss]
```

### Inverse Pair Guarantee

The `.tex` exporter (`jakesTex.ts`) and the `.tex` parser (`texParser/`) must be developed as inverse pairs. Any macro format change in the exporter must be reflected in the parser. Both share a `JAKES_MACROS` constant defining the exact LaTeX command signatures used.

---

## 14. Build Order

Implement in this exact sequence. Each step must pass `pnpm type-check` and `pnpm lint` before moving to the next.

| # | Task | Output | Done when |
|---|---|---|---|
| 1 | Monorepo init | `pnpm-workspace.yaml`, root `package.json`, `.gitignore`, `LICENSE`, `README.md` | `pnpm install` runs clean |
| 2 | Shared types | All files in `packages/shared/types/` | `tsc --noEmit` passes with zero errors |
| 3 | Zod schemas | All files in `packages/shared/schemas/` | Schemas infer correct TS types |
| 4 | Formatting defaults | `packages/shared/defaults/formatting.defaults.ts` | Default config matches Jake's template |
| 5 | ESLint + tsconfig | `.eslintrc.cjs` at root, `tsconfig.json` in frontend | `pnpm lint` exits 0 |
| 6 | Vite scaffold | `apps/frontend` with Tailwind, MobX, Zod, nanoid, deps | `pnpm dev` serves blank page |
| 7 | MobX stores | `AppStore`, `ResumeStore`, `FormattingStore`, `StoreProvider`, `useStores` | No TS errors, stores instantiate |
| 8 | Persistence hook | `usePersistence.ts` — hydrate on mount + reaction persist | State survives page refresh |
| 9 | App layout | `TopBar` + resizable split panes (editor + preview) | Layout renders correctly |
| 10 | Section tabs | `SectionTabs.tsx` — horizontal tab row | Tab switching works |
| 11 | All section forms | `PersonalForm` → `CertificationsForm` — all fields write to store | Every field reflects in store |
| 12 | Form validation | Zod schemas wired to form inputs — errors shown on blur | Invalid email/URL shows error |
| 13 | HTML preview | `JakesHTMLPreview.tsx` — live CSS mirror | Preview updates on every keystroke |
| 14 | Formatting panel | `FormattingPanel` + all 4 tabs + `LaTeXUnitInput` | Global + section override scope works |
| 15 | Preview ↔ formatting sync | CSS vars driven by `FormattingStore` | Spacing/font changes reflect instantly |
| 16 | PDF export | `JakesPDFTemplate.tsx` + `pdfExporter.ts` | Downloaded PDF matches HTML preview |
| 17 | `.tex` export | `jakesTex.ts` + `texExporter.ts` | `.tex` opens correctly in Overleaf |
| 18 | JSON export + import | `jsonExporter.ts` + import handler | Round-trip: export → reimport works |
| 19 | Theme export + import | `themeExporter.ts` + import in `FormattingPanel` | Theme applies to any resume |
| 20 | Dashboard panel | `DashboardPanel` + `ResumeCard` grid | Create, duplicate, delete, switch resumes |
| 21 | Dark mode | Tailwind `dark:` classes + toggle | Theme switch works across all components |
| 22 | Backend stub | `apps/backend/src/index.ts` — `GET /health` only | Returns `{ status: 'ok' }` |
| 23 | Deploy | Vercel config + GitHub Actions workflow | Push to `main` deploys frontend |

---

## 15. Claude Code Prompt Templates

### Opening prompt — paste this first

```
Read PLAN.md in full before writing any code.

We are building a LaTeX resume builder. The plan is in PLAN.md.

Start with Steps 1–3 from Section 14 (Build Order):
  1. Initialize the pnpm monorepo
  2. Create all shared type files in packages/shared/types/
  3. Create all Zod schema files in packages/shared/schemas/

Rules:
- strict TypeScript throughout — no `any`, no non-null assertions without a comment justifying it
- All types imported from @resume-builder/shared — no inline type definitions in component files
- Run `pnpm type-check` before considering any step complete
- Do not start Step 4 until I confirm the types and schemas look correct
```

### Per-step prompt

```
We are on Step [N] — [task name] — from PLAN.md Section 14.
Reference Section [relevant section] for the expected code shape.
Use only types from @resume-builder/shared.
Run `pnpm type-check` and `pnpm lint` before finishing.
Do not move to Step [N+1].
```

### Formatting panel prompt

```
Implement Step 14 — FormattingPanel — from PLAN.md.
Reference Section 8 for full spec.
The panel slides in from the left over the editor (not pushing it).
Scope toggle at top: Global | Section Override with section dropdown.
Tabs: Spacing | Fonts | Colors | Alignment.
Every input uses the LaTeXUnitInput component (Section 8, LaTeXUnitInput spec).
All reads go through FormattingStore.resolveSpacing() / resolveFont().
All writes go through FormattingStore action methods.
HTML preview must update instantly — components must be MobX `observer`.
```

### Template parity prompt

```
Implement Step 16 — PDF export — and verify parity with the HTML preview.
Reference Section 9 (Jake's Resume Template) — Critical Rule.
Both JakesHTMLPreview.tsx and JakesPDFTemplate.tsx must call
FormattingStore.resolveSpacing() for every spacing value.
No hardcoded spacing or font sizes in either file.
Use the toLatex(u: LaTeXUnit) helper for all LaTeX unit serialization.
```

---

*resume-builder · MIT License · v1 Frontend Plan*
