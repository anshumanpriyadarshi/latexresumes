import type { LaTeXUnit } from '@resume-builder/shared';

export const toLatex = (unit: LaTeXUnit): string => `${unit.value}${unit.unit}`;

export const latexEscape = (value: string): string =>
  value
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/\$/g, '\\$')
    .replace(/#/g, '\\#')
    .replace(/_/g, '\\_')
    .replace(/{/g, '\\{')
    .replace(/}/g, '\\}')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');

export const latexUrl = (value: string): string => `\\url{${value}}`;

export const formatLatexNumber = (value: number): string =>
  Number.isInteger(value) ? `${value}` : `${Number(value.toFixed(2))}`;

export const latexParagraph = (lines: string[]): string =>
  lines.filter(Boolean).join('\n\n');
