// Defined now, implemented in v2.
// The .tex parser must be an inverse pair of jakesTex.ts —
// any macro change in the exporter must be reflected here.

import type { ResumeContent } from './resume.types';
import type { FormattingConfig } from './formatting.types';

export interface TexParseWarning {
  field:    string;      // e.g. "experience[0].bullets[1]"
  reason:   string;      // e.g. "Could not match \\resumeItem content"
  rawTex?:  string;      // the offending LaTeX fragment for user reference
}

export interface TexParseResult {
  content:    Partial<ResumeContent>;     // best-effort parsed content
  formatting: Partial<FormattingConfig>;  // best-effort parsed formatting
  warnings:   TexParseWarning[];          // fields that couldn't be parsed
  rawSource:  string;                     // original .tex preserved verbatim
}
