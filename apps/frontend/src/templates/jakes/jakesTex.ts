import type { Resume, LaTeXUnit, SectionKey, SpacingConfig, FontConfig } from '@resume-builder/shared';

type ResolveSpacing = (section: SectionKey, key: keyof SpacingConfig) => LaTeXUnit;
type ResolveFont = (section: SectionKey | null, key: keyof FontConfig) => { family: string; size: LaTeXUnit; weight: string };

export const toLatex = (unit: LaTeXUnit): string => `${unit.value}${unit.unit}`;

const latexEscape = (value: string): string =>
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

const fontBlock = (font: { family: string; size: LaTeXUnit; weight: string }, text: string): string =>
  `\\fontsize{${toLatex(font.size)}}{${toLatex(font.size)}}\\selectfont ${text}`;

const sectionHeader = (resolveFont: ResolveFont, resolveSpacing: ResolveSpacing, section: SectionKey, label: string): string => {
  const font = resolveFont(section, 'sectionTitle');
  return [
    `\\vspace{${toLatex(resolveSpacing(section, 'beforeSection'))}}`,
    `\\textbf{${fontBlock(font, latexEscape(label))}}`,
    `\\vspace{${toLatex(resolveSpacing(section, 'afterSectionTitle'))}}`,
  ].join('\n');
};

const entryBullets = (resolveSpacing: ResolveSpacing, section: SectionKey, bullets: Array<{ content: string }>): string =>
  bullets
    .map(bullet => `\\resumeItem{${latexEscape(bullet.content)}}`)
    .join(`\n\\vspace{${toLatex(resolveSpacing(section, 'betweenSubItems'))}}\n`);

export function generateJakesTex(
  resume: Resume,
  resolveSpacing: ResolveSpacing,
  resolveFont: ResolveFont
): string {
  const { content, formatting } = resume;
  const g = formatting.global;
  const headerGap = toLatex(resolveSpacing('personal', 'afterSectionTitle'));
  const inlineGap = toLatex(resolveSpacing('personal', 'inlineGap'));

  const lines: string[] = [
    '\\documentclass[10pt]{article}',
    '\\usepackage[empty]{fullpage}',
    '\\usepackage{geometry}',
    '\\usepackage{xcolor}',
    '\\geometry{',
    `  top=${toLatex(g.pageMargins.top)},`,
    `  bottom=${toLatex(g.pageMargins.bottom)},`,
    `  left=${toLatex(g.pageMargins.left)},`,
    `  right=${toLatex(g.pageMargins.right)}`,
    '}',
    '\\begin{document}',
    '\\begin{center}',
    fontBlock(resolveFont(null, 'name'), latexEscape(`${content.personal.firstName} ${content.personal.lastName}`)),
    `\\\\[${inlineGap}]`,
    fontBlock(resolveFont(null, 'bodyText'), latexEscape(content.personal.location)),
    `\\\\[${headerGap}]`,
    fontBlock(resolveFont(null, 'bodyText'), latexEscape(content.personal.email)),
    '\\end{center}',
  ];

  const sections: Array<{ key: SectionKey; label: string; body: string }> = [];

  if (content.experience.length > 0) {
    const betweenItems = toLatex(resolveSpacing('experience', 'betweenItems'));
    sections.push({
      key: 'experience',
      label: 'Experience',
      body: content.experience
        .map(entry => [
          `\\resumeSubheading{${latexEscape(entry.role)}}{${latexEscape(entry.company)}}{${latexEscape(entry.location)}}{${latexEscape(entry.startDate)} -- ${latexEscape(entry.endDate)}}`,
          `\\begin{itemize}`,
          entryBullets(resolveSpacing, 'experience', entry.bullets),
          `\\end{itemize}`,
        ].join('\n'))
        .join(`\n\\vspace{${betweenItems}}\n`),
    });
  }

  if (content.education.length > 0) {
    const betweenItems = toLatex(resolveSpacing('education', 'betweenItems'));
    sections.push({
      key: 'education',
      label: 'Education',
      body: content.education
        .map(entry => [
          `\\resumeSubheading{${latexEscape(entry.degree)}}{${latexEscape(entry.institution)}}{${latexEscape(entry.field)}}{${latexEscape(entry.startDate)} -- ${latexEscape(entry.endDate)}}`,
          entry.gpa ? `\\textit{GPA: ${latexEscape(entry.gpa)}}` : '',
          entry.honors ? `\\textit{${latexEscape(entry.honors)}}` : '',
        ].filter(Boolean).join('\n'))
        .join(`\n\\vspace{${betweenItems}}\n`),
    });
  }

  if (content.projects.length > 0) {
    const betweenItems = toLatex(resolveSpacing('projects', 'betweenItems'));
    sections.push({
      key: 'projects',
      label: 'Projects',
      body: content.projects
        .map(entry => [
          `\\resumeSubheading{${latexEscape(entry.name)}}{${latexEscape(entry.techStack.join(', '))}}{${entry.liveUrl ? latexEscape(entry.liveUrl) : ''}}{${latexEscape(entry.startDate)} -- ${latexEscape(entry.endDate)}}`,
          `\\begin{itemize}`,
          entryBullets(resolveSpacing, 'projects', entry.bullets),
          `\\end{itemize}`,
        ].join('\n'))
        .join(`\n\\vspace{${betweenItems}}\n`),
    });
  }

  if (content.skills.length > 0) {
    sections.push({
      key: 'skills',
      label: 'Skills',
      body: content.skills
        .map(category => `\\textbf{${latexEscape(category.category)}:} ${latexEscape(category.items.join(', '))}`)
        .join('\n\n'),
    });
  }

  if (content.certifications.length > 0) {
    sections.push({
      key: 'certifications',
      label: 'Certifications',
      body: content.certifications
        .map(entry => [
          `\\textbf{${latexEscape(entry.name)}}`,
          `${latexEscape(entry.issuer)} | ${latexEscape(entry.issueDate)}${entry.expiryDate !== 'never' ? ` -- ${latexEscape(entry.expiryDate)}` : ''}`,
        ].join('\n'))
        .join('\n\n'),
    });
  }

  sections.forEach(section => {
    lines.push(sectionHeader(resolveFont, resolveSpacing, section.key, section.label));
    lines.push(section.body);
  });

  lines.push('\\end{document}');
  return lines.filter(Boolean).join('\n\n');
}
