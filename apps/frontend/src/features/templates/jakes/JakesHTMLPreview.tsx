import { observer } from 'mobx-react-lite';
import type { SectionKey } from '@resume-builder/shared';
import { useStores } from '../../shared/hooks/useStores';
import { createHtmlSectionRenderers } from './html-preview/renderers';
import { fontStyle, toLatexUnit } from './html-preview/utils';

export const JakesHTMLPreview = observer(() => {
  const { resumeStore, formattingStore } = useStores();
  const content = resumeStore.content;
  const formatting = formattingStore.formatting;

  if (!content || !formatting) return null;

  const accentColor = `#${formatting.global.colors.accent.hex}`;
  const nameTextColor = `#${formatting.global.colors.nameText.hex}`;
  const bodyTextColor = `#${formatting.global.colors.bodyText.hex}`;
  const dateTextColor = `#${formatting.global.colors.dateText.hex}`;
  const pageMargins = formatting.global.pageMargins;

  const spacing = (section: SectionKey, key: keyof typeof formatting.global.spacing) =>
    formattingStore.resolveSpacing(section, key);

  const font = (section: SectionKey | null, key: keyof typeof formatting.global.fonts) =>
    formattingStore.resolveFont(section, key);

  const {
    renderSectionHeader,
    renderExperience,
    renderEducation,
    renderSkillCategory,
    renderProject,
    renderCertification,
  } = createHtmlSectionRenderers({
    accentColor,
    bodyTextColor,
    dateTextColor,
    spacing,
    font,
  });

  const nameFont = font(null, 'name');
  const bodyFont = font(null, 'bodyText');
  const headerGap = spacing('personal', 'afterSectionTitle');
  const inlineGap = spacing('personal', 'inlineGap');

  return (
    <div className="flex justify-center overflow-auto bg-slate-100 p-6 dark:bg-slate-950">
      <div
        className="min-h-[11in] w-[8.5in] bg-white px-8 py-7 text-slate-900 shadow-2xl dark:bg-slate-50"
        style={{
          paddingTop: toLatexUnit(pageMargins.top),
          paddingRight: toLatexUnit(pageMargins.right),
          paddingBottom: toLatexUnit(pageMargins.bottom),
          paddingLeft: toLatexUnit(pageMargins.left),
          color: bodyTextColor,
        }}
      >
        <header className="text-center">
          <div
            style={{
              ...fontStyle(nameFont.family, nameFont.size, nameFont.weight),
              color: nameTextColor,
              lineHeight: 1,
            }}
          >
            {content.personal.firstName} {content.personal.lastName}
          </div>
          <div
            style={{
              ...fontStyle(bodyFont.family, bodyFont.size, bodyFont.weight),
              color: dateTextColor,
              marginTop: toLatexUnit(headerGap),
              display: 'flex',
              flexDirection: 'column',
              gap: toLatexUnit(inlineGap),
            }}
          >
            <div>{content.personal.location}</div>
            <div>{content.personal.phone}</div>
            <div>{content.personal.email}</div>
            <div>{content.personal.linkedin}</div>
            <div>{content.personal.github}</div>
            {content.personal.website ? <div>{content.personal.website}</div> : null}
          </div>
        </header>

        <div style={{ marginBottom: toLatexUnit(headerGap) }} />

        {content.experience.length > 0 && (
          <section style={{ marginBottom: toLatexUnit(spacing('experience', 'beforeSection')) }}>
            {renderSectionHeader('experience', 'Experience')}
            {content.experience.map(renderExperience)}
          </section>
        )}

        {content.education.length > 0 && (
          <section style={{ marginBottom: toLatexUnit(spacing('education', 'beforeSection')) }}>
            {renderSectionHeader('education', 'Education')}
            {content.education.map(renderEducation)}
          </section>
        )}

        {content.projects.length > 0 && (
          <section style={{ marginBottom: toLatexUnit(spacing('projects', 'beforeSection')) }}>
            {renderSectionHeader('projects', 'Projects')}
            {content.projects.map(renderProject)}
          </section>
        )}

        {content.skills.length > 0 && (
          <section style={{ marginBottom: toLatexUnit(spacing('skills', 'beforeSection')) }}>
            {renderSectionHeader('skills', 'Skills')}
            {content.skills.map(renderSkillCategory)}
          </section>
        )}

        {content.certifications.length > 0 && (
          <section style={{ marginBottom: toLatexUnit(spacing('certifications', 'beforeSection')) }}>
            {renderSectionHeader('certifications', 'Certifications')}
            {content.certifications.map(renderCertification)}
          </section>
        )}
      </div>
    </div>
  );
});

JakesHTMLPreview.displayName = 'JakesHTMLPreview';
