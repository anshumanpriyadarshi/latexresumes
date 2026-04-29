import type { CSSProperties } from 'react';
import { observer } from 'mobx-react-lite';
import type {
  BulletPoint,
  Certification,
  Education,
  Experience,
  Project,
  SectionKey,
  SkillCategory,
  LaTeXUnit,
} from '@resume-builder/shared';
import { useStores } from '../../hooks/useStores';

const toLatexUnit = (unit: LaTeXUnit): string => `${unit.value}${unit.unit}`;

const fontStyle = (family: string, size: LaTeXUnit, weight: string): CSSProperties => ({
  fontFamily: family,
  fontSize: toLatexUnit(size),
  fontWeight: weight,
});

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

  const spacing = (section: SectionKey, key: keyof typeof formatting.global.spacing): LaTeXUnit =>
    formattingStore.resolveSpacing(section, key);

  const font = (section: SectionKey | null, key: keyof typeof formatting.global.fonts) =>
    formattingStore.resolveFont(section, key);

  const renderSectionHeader = (section: SectionKey, label: string): JSX.Element => {
    const sectionFont = font(section, 'sectionTitle');

    return (
      <div
        style={{
          ...fontStyle(sectionFont.family, sectionFont.size, sectionFont.weight),
          color: accentColor,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: toLatexUnit(spacing(section, 'afterSectionTitle')),
        }}
      >
        {label}
      </div>
    );
  };

  const renderBullet = (section: SectionKey, bullet: BulletPoint): JSX.Element => {
    const bodyFont = font(section, 'bodyText');
    return (
      <li
        key={bullet.id}
        style={{
          ...fontStyle(bodyFont.family, bodyFont.size, bodyFont.weight),
          color: bodyTextColor,
          marginBottom: toLatexUnit(spacing(section, 'betweenSubItems')),
        }}
      >
        {bullet.content}
      </li>
    );
  };

  const renderExperience = (entry: Experience): JSX.Element => {
    const titleFont = font('experience', 'entryTitle');
    const subtitleFont = font('experience', 'entrySubtitle');
    const dateFont = font('experience', 'dateLine');

    return (
      <div key={entry.id} style={{ marginBottom: toLatexUnit(spacing('experience', 'betweenItems')) }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: toLatexUnit(spacing('experience', 'inlineGap')),
          }}
        >
          <div style={{ ...fontStyle(titleFont.family, titleFont.size, titleFont.weight), color: bodyTextColor }}>
            {entry.role}
          </div>
          <div style={{ ...fontStyle(dateFont.family, dateFont.size, dateFont.weight), color: dateTextColor }}>
            {entry.startDate} - {entry.endDate}
          </div>
        </div>
        <div style={{ ...fontStyle(subtitleFont.family, subtitleFont.size, subtitleFont.weight), color: dateTextColor }}>
          {entry.company}
          {entry.location ? `, ${entry.location}` : ''}
        </div>
        <ul
          style={{
            marginTop: toLatexUnit(spacing('experience', 'afterSectionTitle')),
            paddingLeft: toLatexUnit(spacing('experience', 'inlineGap')),
          }}
        >
          {entry.bullets.map(bullet => renderBullet('experience', bullet))}
        </ul>
      </div>
    );
  };

  const renderEducation = (entry: Education): JSX.Element => {
    const titleFont = font('education', 'entryTitle');
    const subtitleFont = font('education', 'entrySubtitle');
    const dateFont = font('education', 'dateLine');

    return (
      <div key={entry.id} style={{ marginBottom: toLatexUnit(spacing('education', 'betweenItems')) }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: toLatexUnit(spacing('education', 'inlineGap')),
          }}
        >
          <div style={{ ...fontStyle(titleFont.family, titleFont.size, titleFont.weight), color: bodyTextColor }}>
            {entry.degree}
            {entry.field ? ` in ${entry.field}` : ''}
          </div>
          <div style={{ ...fontStyle(dateFont.family, dateFont.size, dateFont.weight), color: dateTextColor }}>
            {entry.startDate} - {entry.endDate}
          </div>
        </div>
        <div style={{ ...fontStyle(subtitleFont.family, subtitleFont.size, subtitleFont.weight), color: dateTextColor }}>
          {entry.institution}
          {entry.gpa ? ` • GPA: ${entry.gpa}` : ''}
          {entry.honors ? ` • ${entry.honors}` : ''}
        </div>
      </div>
    );
  };

  const renderSkillCategory = (category: SkillCategory): JSX.Element => {
    const subtitleFont = font('skills', 'entrySubtitle');
    const bodyFont = font('skills', 'bodyText');

    return (
      <div key={category.id} style={{ marginBottom: toLatexUnit(spacing('skills', 'betweenItems')) }}>
        <span style={{ ...fontStyle(subtitleFont.family, subtitleFont.size, 'bold'), color: bodyTextColor }}>
          {category.category}:
        </span>
        <span style={{ ...fontStyle(bodyFont.family, bodyFont.size, bodyFont.weight), color: bodyTextColor, marginLeft: toLatexUnit(spacing('skills', 'inlineGap')) }}>
          {category.items.join(', ')}
        </span>
      </div>
    );
  };

  const renderProject = (project: Project): JSX.Element => {
    const titleFont = font('projects', 'entryTitle');
    const subtitleFont = font('projects', 'entrySubtitle');
    const dateFont = font('projects', 'dateLine');

    return (
      <div key={project.id} style={{ marginBottom: toLatexUnit(spacing('projects', 'betweenItems')) }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: toLatexUnit(spacing('projects', 'inlineGap')),
          }}
        >
          <div style={{ ...fontStyle(titleFont.family, titleFont.size, titleFont.weight), color: bodyTextColor }}>
            {project.name}
          </div>
          <div style={{ ...fontStyle(dateFont.family, dateFont.size, dateFont.weight), color: dateTextColor }}>
            {project.startDate} - {project.endDate}
          </div>
        </div>
        <div style={{ ...fontStyle(subtitleFont.family, subtitleFont.size, subtitleFont.weight), color: dateTextColor }}>
          {project.techStack.join(' • ')}
        </div>
        <div style={{ marginTop: toLatexUnit(spacing('projects', 'afterSectionTitle')) }}>
          {project.liveUrl && (
            <span style={{ color: dateTextColor, marginRight: toLatexUnit(spacing('projects', 'inlineGap')) }}>
              {project.liveUrl}
            </span>
          )}
          {project.repoUrl && <span style={{ color: dateTextColor }}>{project.repoUrl}</span>}
        </div>
        <ul
          style={{
            marginTop: toLatexUnit(spacing('projects', 'afterSectionTitle')),
            paddingLeft: toLatexUnit(spacing('projects', 'inlineGap')),
          }}
        >
          {project.bullets.map(bullet => renderBullet('projects', bullet))}
        </ul>
      </div>
    );
  };

  const renderCertification = (cert: Certification): JSX.Element => {
    const titleFont = font('certifications', 'entryTitle');
    const subtitleFont = font('certifications', 'entrySubtitle');
    const dateFont = font('certifications', 'dateLine');

    return (
      <div key={cert.id} style={{ marginBottom: toLatexUnit(spacing('certifications', 'betweenItems')) }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: toLatexUnit(spacing('certifications', 'inlineGap')),
          }}
        >
          <div style={{ ...fontStyle(titleFont.family, titleFont.size, titleFont.weight), color: bodyTextColor }}>
            {cert.name}
          </div>
          <div style={{ ...fontStyle(dateFont.family, dateFont.size, dateFont.weight), color: dateTextColor }}>
            {cert.issueDate}
            {cert.expiryDate !== 'never' ? ` - ${cert.expiryDate}` : ''}
          </div>
        </div>
        <div style={{ ...fontStyle(subtitleFont.family, subtitleFont.size, subtitleFont.weight), color: dateTextColor }}>
          {cert.issuer}
          {cert.credentialId ? ` • ${cert.credentialId}` : ''}
          {cert.url ? ` • ${cert.url}` : ''}
        </div>
      </div>
    );
  };

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
            <div>
              {content.personal.email}
              {content.personal.phone ? ` | ${content.personal.phone}` : ''}
            </div>
            <div>
              {content.personal.linkedin}
              {content.personal.github ? ` | ${content.personal.github}` : ''}
              {content.personal.website ? ` | ${content.personal.website}` : ''}
            </div>
          </div>
        </header>

        <div
          className="border-t border-slate-300"
          style={{
            borderColor: accentColor,
            marginTop: toLatexUnit(headerGap),
            marginBottom: toLatexUnit(headerGap),
          }}
        />

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
