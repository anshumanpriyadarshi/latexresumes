import type {
  BulletPoint,
  Certification,
  Education,
  Experience,
  LaTeXUnit,
  Project,
  SectionKey,
  SkillCategory,
} from '@resume-builder/shared';

export type JakesHtmlPreviewContext = {
  accentColor: string;
  bodyTextColor: string;
  dateTextColor: string;
  spacing: (section: SectionKey, key: 'beforeSection' | 'afterSectionTitle' | 'betweenItems' | 'betweenSubItems' | 'inlineGap') => LaTeXUnit;
  font: (
    section: SectionKey | null,
    key: 'name' | 'sectionTitle' | 'entryTitle' | 'entrySubtitle' | 'bodyText' | 'dateLine'
  ) => { family: string; size: LaTeXUnit; weight: string };
};

export type HtmlBulletRenderer = (section: SectionKey, bullet: BulletPoint) => JSX.Element;

export type HtmlSectionRenderers = {
  renderSectionHeader: (section: SectionKey, label: string) => JSX.Element;
  renderBullet: HtmlBulletRenderer;
  renderExperience: (entry: Experience) => JSX.Element;
  renderEducation: (entry: Education) => JSX.Element;
  renderSkillCategory: (category: SkillCategory) => JSX.Element;
  renderProject: (project: Project) => JSX.Element;
  renderCertification: (certification: Certification) => JSX.Element;
};
