import type { FontDef, LaTeXUnit } from '@resume-builder/shared';

const PT_PER_IN = 72;
const PT_PER_CM = 28.3464567;
const PT_PER_MM = 2.83464567;

export const toPointValue = (unit: LaTeXUnit): number => {
  switch (unit.unit) {
    case 'pt':
      return unit.value;
    case 'in':
      return unit.value * PT_PER_IN;
    case 'cm':
      return unit.value * PT_PER_CM;
    case 'mm':
      return unit.value * PT_PER_MM;
    case 'em':
      return unit.value * 12;
    case 'ex':
      return unit.value * 6;
    default:
      return unit.value;
  }
};

export const toTextWeight = (weight: FontDef['weight']): number | 'bold' | 'normal' => {
  if (weight === 'bold') return 'bold';
  if (weight === 'light') return 300;
  return 'normal';
};

export const normalizePdfFontFamily = (family: string): string => {
  const normalized = family.toLowerCase();

  if (
    normalized.includes('calibri') ||
    normalized.includes('helvetica') ||
    normalized.includes('arial')
  ) {
    return 'Helvetica';
  }

  if (
    normalized.includes('georgia') ||
    normalized.includes('times') ||
    normalized.includes('computer modern') ||
    normalized.includes('latin modern')
  ) {
    return 'Times-Roman';
  }

  return 'Helvetica';
};

export const pdfFontFamily = (font: FontDef): string => normalizePdfFontFamily(font.family);

export const pdfTextStyle = (font: FontDef, textColor: string) => ({
  fontFamily: pdfFontFamily(font),
  fontSize: font.size.value,
  fontWeight: toTextWeight(font.weight),
  color: textColor,
});

export const color = (hex: string): string => `#${hex}`;
