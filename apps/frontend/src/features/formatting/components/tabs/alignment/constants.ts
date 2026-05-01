import type { AlignmentDef } from '@resume-builder/shared';

export const VERTICAL_OPTIONS: ReadonlyArray<{ value: AlignmentDef['vertical']; label: string }> = [
  { value: 'top', label: 'Top' },
  { value: 'middle', label: 'Middle' },
  { value: 'bottom', label: 'Bottom' },
];

export const HORIZONTAL_OPTIONS: ReadonlyArray<{ value: AlignmentDef['horizontal']; label: string }> = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
  { value: 'space-between', label: 'Space between' },
];

export const ALIGNMENT_FIELDS: ReadonlyArray<{ key: keyof AlignmentDef; label: string }> = [
  { key: 'vertical', label: 'Vertical' },
  { key: 'horizontal', label: 'Horizontal' },
];
