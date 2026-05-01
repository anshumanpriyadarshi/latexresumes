import type {
  LaTeXUnit,
  Resume,
  SectionKey,
  SpacingConfig,
} from '@resume-builder/shared';

type ResolveSpacing = (section: SectionKey, key: keyof SpacingConfig) => LaTeXUnit;

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

const latexUrl = (value: string): string => `\\url{${value}}`;

const formatLatexNumber = (value: number): string =>
  Number.isInteger(value) ? `${value}` : `${Number(value.toFixed(2))}`;

const latexParagraph = (lines: string[]): string =>
  lines.filter(Boolean).join('\n\n');

const documentPreamble = (resume: Resume): string => {
  const { formatting } = resume;
  const margins = formatting.global.pageMargins;
  const accent = formatting.global.colors.accent.hex;

  return [
    '\\documentclass[10pt,letterpaper]{article}',
    '\\usepackage[utf8]{inputenc}',
    '\\usepackage[T1]{fontenc}',
    '\\usepackage{geometry}',
    '\\usepackage{xcolor}',
    '\\usepackage{hyperref}',
    '\\usepackage{enumitem}',
    '\\usepackage{lmodern}',
    '\\pagestyle{empty}',
    '\\setlength{\\parindent}{0pt}',
    '\\setlength{\\parskip}{0pt}',
    '\\hypersetup{hidelinks}',
    '\\setlist[itemize]{leftmargin=1.5em, itemsep=0.35em, topsep=0.35em, parsep=0pt, partopsep=0pt}',
    `\\geometry{top=${toLatex(margins.top)}, bottom=${toLatex(margins.bottom)}, left=${toLatex(margins.left)}, right=${toLatex(margins.right)}}`,
    `\\definecolor{resumeAccent}{HTML}{${accent}}`,
  ].join('\n');
};

const centerHeader = (resume: Resume): string => {
  const { personal } = resume.content;
  const name = resume.formatting.global.fonts.name;

  const contactLines = [
    personal.location ? latexEscape(personal.location) : '',
    personal.phone ? latexEscape(personal.phone) : '',
    personal.email ? `\\href{mailto:${personal.email}}{${latexEscape(personal.email)}}` : '',
    personal.linkedin ? latexUrl(personal.linkedin) : '',
    personal.github ? latexUrl(personal.github) : '',
    personal.website ? latexUrl(personal.website) : '',
  ].filter(Boolean);

  const body = [
    `\\textbf{\\fontsize{${toLatex(name.size)}}{${formatLatexNumber(name.size.value * 1.2)}}\\selectfont ${latexEscape(
      `${personal.firstName} ${personal.lastName}`
    )}}`,
    ...contactLines.map(line => `\\small ${line}`),
  ];

  return [
    '\\begin{center}',
    body.join('\n\n'),
    '\\end{center}',
  ].join('\n');
};

const sectionHeading = (title: string): string => [
  '\\medskip',
  `\\noindent{\\large\\bfseries\\color{resumeAccent} ${latexEscape(title.toUpperCase())}}`,
  '\\par',
  '\\noindent\\rule{\\textwidth}{0.4pt}',
  '\\par',
  '\\smallskip',
].join('\n');

const subsectionTitle = (left: string, right: string): string =>
  [
    `\\noindent\\textbf{${latexEscape(left)}}\\hfill ${latexEscape(right)}`,
    '\\par',
  ].join('\n');

const subsectionDetail = (left: string, right: string): string =>
  [
    `\\noindent\\textit{${latexEscape(left)}}\\hfill ${latexEscape(right)}`,
    '\\par',
  ].join('\n');

const itemList = (items: string[]): string => {
  if (items.length === 0) {
    return '';
  }

  return [
    '\\begin{itemize}',
    ...items.map(item => `  \\item ${latexEscape(item)}`),
    '\\end{itemize}',
  ].join('\n');
};

const experienceSection = (entries: Resume['content']['experience']): string =>
  latexParagraph([
    sectionHeading('Experience'),
    ...entries.flatMap(entry => {
      const blocks = [
        subsectionTitle(entry.role, `${entry.startDate} -- ${entry.endDate}`),
        subsectionDetail(entry.company, entry.location),
      ];

      const bullets = itemList(entry.bullets.map(bullet => bullet.content));
      if (bullets) {
        blocks.push(bullets);
      }

      blocks.push('\\medskip');
      return blocks;
    }),
  ]);

const educationSection = (entries: Resume['content']['education']): string =>
  latexParagraph([
    sectionHeading('Education'),
    ...entries.flatMap(entry => {
      const blocks = [
        subsectionTitle(entry.degree, `${entry.startDate} -- ${entry.endDate}`),
        subsectionDetail(entry.institution, entry.field),
      ];

      if (entry.gpa) {
        blocks.push(`\\noindent GPA: ${latexEscape(entry.gpa)}\\par`);
      }

      if (entry.honors) {
        blocks.push(`\\noindent ${latexEscape(entry.honors)}\\par`);
      }

      blocks.push('\\medskip');
      return blocks;
    }),
  ]);

const projectsSection = (entries: Resume['content']['projects']): string =>
  latexParagraph([
    sectionHeading('Projects'),
    ...entries.flatMap(entry => {
      const techStack = entry.techStack.join(', ');
      const blocks = [
        subsectionTitle(entry.name, `${entry.startDate} -- ${entry.endDate}`),
      ];

      if (techStack) {
        blocks.push(`\\noindent\\textit{${latexEscape(techStack)}}\\par`);
      }

      const links = [
        entry.liveUrl ? latexUrl(entry.liveUrl) : '',
        entry.repoUrl ? latexUrl(entry.repoUrl) : '',
      ].filter(Boolean);

      if (links.length > 0) {
        blocks.push(`\\noindent ${links.join(' \\textbar{} ')}\\par`);
      }

      const bullets = itemList(entry.bullets.map(bullet => bullet.content));
      if (bullets) {
        blocks.push(bullets);
      }

      blocks.push('\\medskip');
      return blocks;
    }),
  ]);

const skillsSection = (entries: Resume['content']['skills']): string =>
  latexParagraph([
    sectionHeading('Skills'),
    ...entries.flatMap(category => [
      `\\noindent\\textbf{${latexEscape(category.category)}:} ${latexEscape(category.items.join(', '))}\\par`,
    ]),
  ]);

const certificationsSection = (entries: Resume['content']['certifications']): string =>
  latexParagraph([
    sectionHeading('Certifications'),
    ...entries.flatMap(entry => {
      const rightSide =
        entry.expiryDate !== 'never'
          ? `${entry.issueDate} -- ${entry.expiryDate}`
          : entry.issueDate;

      const blocks = [
        subsectionTitle(entry.name, rightSide),
        subsectionDetail(entry.issuer, entry.credentialId ?? ''),
      ];

      if (entry.url) {
        blocks.push(`\\noindent ${latexUrl(entry.url)}\\par`);
      }

      blocks.push('\\medskip');
      return blocks;
    }),
  ]);

export function generateJakesTex(
  resume: Resume,
  resolveSpacing: ResolveSpacing
): string {
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
