import type { FontConfig, FontWeight } from '@resume-builder/shared';

export const FONT_FAMILIES = [
  'Calibri',
  'Helvetica',
  'Arial',
  'Georgia',
  'Times New Roman',
  'Computer Modern',
  'Latin Modern',
] as const;

export const FONT_FIELDS: ReadonlyArray<{ key: keyof FontConfig; label: string }> = [
  { key: 'name', label: 'Name' },
  { key: 'sectionTitle', label: 'Section title' },
  { key: 'entryTitle', label: 'Entry title' },
  { key: 'entrySubtitle', label: 'Entry subtitle' },
  { key: 'bodyText', label: 'Body text' },
  { key: 'dateLine', label: 'Date line' },
];

export const FONT_WEIGHT_OPTIONS: ReadonlyArray<{ value: FontWeight; label: string }> = [
  { value: 'normal', label: 'Normal' },
  { value: 'bold', label: 'Bold' },
  { value: 'light', label: 'Light' },
];
