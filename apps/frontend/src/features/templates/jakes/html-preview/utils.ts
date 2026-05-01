import type { CSSProperties } from 'react';
import type { LaTeXUnit } from '@resume-builder/shared';

export const toLatexUnit = (unit: LaTeXUnit): string => `${unit.value}${unit.unit}`;

export const fontStyle = (family: string, size: LaTeXUnit, weight: string): CSSProperties => ({
  fontFamily: family,
  fontSize: toLatexUnit(size),
  fontWeight: weight,
});
