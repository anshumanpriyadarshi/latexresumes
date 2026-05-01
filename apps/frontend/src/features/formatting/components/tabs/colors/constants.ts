import type { FormattingConfig } from '@resume-builder/shared';

export const COLOR_FIELDS: ReadonlyArray<{
  key: keyof FormattingConfig['global']['colors'];
  label: string;
}> = [
  { key: 'accent', label: 'Accent' },
  { key: 'nameText', label: 'Name text' },
  { key: 'bodyText', label: 'Body text' },
  { key: 'dateText', label: 'Date text' },
];

export const COLOR_PRESETS: ReadonlyArray<{ hex: string; label: string }> = [
  { hex: '4f46e5', label: 'Indigo' },
  { hex: '0f766e', label: 'Teal' },
  { hex: '2563eb', label: 'Blue' },
  { hex: '15803d', label: 'Green' },
  { hex: 'b45309', label: 'Amber' },
  { hex: '374151', label: 'Slate' },
  { hex: '000000', label: 'Black' },
  { hex: 'ef4444', label: 'Red' },
];
