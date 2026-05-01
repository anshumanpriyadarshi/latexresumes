import type { LaTeXUnit, Resume, SectionKey, SpacingConfig } from '@resume-builder/shared';
import {
  centerHeader,
  certificationsSection,
  documentPreamble,
  educationSection,
  experienceSection,
  projectsSection,
  skillsSection,
} from './tex/sections';

type ResolveSpacing = (section: SectionKey, key: keyof SpacingConfig) => LaTeXUnit;

export { toLatex } from './tex/utils';

export function generateJakesTex(resume: Resume, resolveSpacing: ResolveSpacing): string {
  const document = [
    documentPreamble(resume),
    '\\begin{document}',
    centerHeader(resume),
    '\\bigskip',
    experienceSection(resume.content.experience),
    educationSection(resume.content.education),
    projectsSection(resume.content.projects),
    skillsSection(resume.content.skills),
    certificationsSection(resume.content.certifications),
    '\\end{document}',
  ];

  void resolveSpacing;

  return document.filter(Boolean).join('\n\n');
}
