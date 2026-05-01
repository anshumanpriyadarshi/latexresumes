import type {
  FontConfig,
  FontDef,
  LaTeXUnit,
  SectionKey,
  SpacingConfig,
} from '@resume-builder/shared';

export type ResolveSpacing = (section: SectionKey, key: keyof SpacingConfig) => LaTeXUnit;
export type ResolveFont = (section: SectionKey | null, key: keyof FontConfig) => FontDef;

export type JakesPdfRenderContext = {
  resolveSpacing: ResolveSpacing;
  resolveFont: ResolveFont;
  bodyColor: string;
  dateColor: string;
  accentColor: string;
};
