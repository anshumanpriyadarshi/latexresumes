import { z } from 'zod';

export const lengthUnitSchema = z.enum(['pt', 'em', 'ex', 'cm', 'mm', 'in']);

export const latexUnitSchema = z.object({
  value: z.number(),
  unit:  lengthUnitSchema,
});

export const fontWeightSchema = z.enum(['normal', 'bold', 'light']);

export const fontDefSchema = z.object({
  family: z.string().min(1),
  size:   latexUnitSchema,
  weight: fontWeightSchema,
});

export const colorDefSchema = z.object({
  hex:    z.string().regex(/^[0-9a-fA-F]{6}$/, 'Must be a 6-char hex color without #'),
  preset: z.string().optional(),
});

export const alignmentDefSchema = z.object({
  vertical:   z.enum(['top', 'middle', 'bottom']),
  horizontal: z.enum(['left', 'center', 'right', 'space-between']),
});

export const spacingConfigSchema = z.object({
  beforeSection:     latexUnitSchema,
  afterSectionTitle: latexUnitSchema,
  betweenItems:      latexUnitSchema,
  betweenSubItems:   latexUnitSchema,
  inlineGap:         latexUnitSchema,
});

export const fontConfigSchema = z.object({
  name:          fontDefSchema,
  sectionTitle:  fontDefSchema,
  entryTitle:    fontDefSchema,
  entrySubtitle: fontDefSchema,
  bodyText:      fontDefSchema,
  dateLine:      fontDefSchema,
});

export const pageMarginsSchema = z.object({
  top:    latexUnitSchema,
  bottom: latexUnitSchema,
  left:   latexUnitSchema,
  right:  latexUnitSchema,
});

export const globalFormattingSchema = z.object({
  spacing:     spacingConfigSchema,
  fonts:       fontConfigSchema,
  colors: z.object({
    accent:   colorDefSchema,
    nameText: colorDefSchema,
    bodyText: colorDefSchema,
    dateText: colorDefSchema,
  }),
  alignment:   alignmentDefSchema,
  pageMargins: pageMarginsSchema,
});

export const sectionFormattingSchema = z.object({
  spacing:   spacingConfigSchema.partial().optional(),
  fonts:     fontConfigSchema.partial().optional(),
  alignment: alignmentDefSchema.partial().optional(),
});

const sectionKeySchema = z.enum([
  'personal',
  'experience',
  'education',
  'skills',
  'projects',
  'certifications',
]);

export const formattingConfigSchema = z.object({
  global:   globalFormattingSchema,
  // z.record with an enum key validates only keys present — absent keys are fine.
  // This matches Partial<Record<SectionKey, SectionFormatting>>.
  sections: z.record(sectionKeySchema, sectionFormattingSchema),
});
