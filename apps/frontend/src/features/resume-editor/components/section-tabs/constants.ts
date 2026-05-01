import type { SectionKey } from '@resume-builder/shared';

export type SectionTabKey = SectionKey;

export const SECTION_TABS: ReadonlyArray<{ key: SectionTabKey; label: string }> = [
  { key: 'personal', label: 'Personal' },
  { key: 'experience', label: 'Experience' },
  { key: 'education', label: 'Education' },
  { key: 'skills', label: 'Skills' },
  { key: 'projects', label: 'Projects' },
  { key: 'certifications', label: 'Certifications' },
];
