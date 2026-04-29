import type { SectionKey } from './resume.types';

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
  name:          FontDef;          // Candidate full name
  sectionTitle:  FontDef;          // "EXPERIENCE", "EDUCATION" headers
  entryTitle:    FontDef;          // Job title, degree name
  entrySubtitle: FontDef;          // Company name, institution
  bodyText:      FontDef;          // Bullet point content
  dateLine:      FontDef;          // Dates, locations (right-aligned)
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
