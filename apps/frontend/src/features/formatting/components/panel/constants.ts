import type { SectionKey } from '@resume-builder/shared';

export const TAB_KEYS = ['spacing', 'fonts', 'colors', 'alignment'] as const;

export type TabKey = (typeof TAB_KEYS)[number];

export const SECTION_OPTIONS: ReadonlyArray<{ value: SectionKey; label: string }> = [
  { value: 'personal', label: 'Personal' },
  { value: 'experience', label: 'Experience' },
  { value: 'education', label: 'Education' },
  { value: 'skills', label: 'Skills' },
  { value: 'projects', label: 'Projects' },
  { value: 'certifications', label: 'Certifications' },
];
