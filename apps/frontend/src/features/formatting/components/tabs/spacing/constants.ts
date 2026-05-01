import type { PageMargins, SpacingConfig } from '@resume-builder/shared';

export const SPACING_FIELDS: ReadonlyArray<{ key: keyof SpacingConfig; label: string }> = [
  { key: 'beforeSection', label: 'Before section' },
  { key: 'afterSectionTitle', label: 'After section title' },
  { key: 'betweenItems', label: 'Between items' },
  { key: 'betweenSubItems', label: 'Between sub items' },
  { key: 'inlineGap', label: 'Inline gap' },
];

export const PAGE_MARGIN_FIELDS: ReadonlyArray<{ key: keyof PageMargins; label: string }> = [
  { key: 'top', label: 'Top' },
  { key: 'bottom', label: 'Bottom' },
  { key: 'left', label: 'Left' },
  { key: 'right', label: 'Right' },
];
