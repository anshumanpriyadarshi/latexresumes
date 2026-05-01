import type {
  BulletPoint,
  Certification,
  Education,
  Experience,
  Project,
  SectionKey,
  SkillCategory,
} from '@resume-builder/shared';
import type { HtmlSectionRenderers, JakesHtmlPreviewContext } from './types';
import { fontStyle, toLatexUnit } from './utils';

export function createHtmlSectionRenderers(
  context: JakesHtmlPreviewContext
): HtmlSectionRenderers {
  const renderSectionHeader = (section: SectionKey, label: string): JSX.Element => {
    const sectionFont = context.font(section, 'sectionTitle');

    return (
      <div style={{ marginBottom: toLatexUnit(context.spacing(section, 'afterSectionTitle')) }}>
        <div
          style={{
            ...fontStyle(sectionFont.family, sectionFont.size, sectionFont.weight),
            color: context.accentColor,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          {label}
        </div>
        <div
          style={{
            borderTop: '0.4pt solid #000000',
            marginTop: '1pt',
          }}
        />
      </div>
    );
  };

  const renderBullet = (section: SectionKey, bullet: BulletPoint): JSX.Element => {
    const bodyFont = context.font(section, 'bodyText');

    return (
      <li
        key={bullet.id}
        style={{
          ...fontStyle(bodyFont.family, bodyFont.size, bodyFont.weight),
          color: context.bodyTextColor,
          marginBottom: toLatexUnit(context.spacing(section, 'betweenSubItems')),
        }}
      >
        {bullet.content}
      </li>
    );
  };

  const renderExperience = (entry: Experience): JSX.Element => {
    const titleFont = context.font('experience', 'entryTitle');
    const subtitleFont = context.font('experience', 'entrySubtitle');
    const dateFont = context.font('experience', 'dateLine');

    return (
      <div
        key={entry.id}
        style={{ marginBottom: toLatexUnit(context.spacing('experience', 'betweenItems')) }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: toLatexUnit(context.spacing('experience', 'inlineGap')),
          }}
        >
          <div
            style={{
              ...fontStyle(titleFont.family, titleFont.size, titleFont.weight),
              color: context.bodyTextColor,
            }}
          >
            {entry.role}
          </div>
          <div
            style={{
              ...fontStyle(dateFont.family, dateFont.size, dateFont.weight),
              color: context.dateTextColor,
            }}
          >
            {entry.startDate} - {entry.endDate}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: toLatexUnit(context.spacing('experience', 'inlineGap')),
            ...fontStyle(subtitleFont.family, subtitleFont.size, subtitleFont.weight),
            color: context.dateTextColor,
          }}
        >
          <span>{entry.company}</span>
          <span>{entry.location}</span>
        </div>
        {entry.bullets.length > 0 ? (
          <ul
            style={{
              marginTop: toLatexUnit(context.spacing('experience', 'afterSectionTitle')),
              paddingLeft: '1.5em',
              listStylePosition: 'outside',
            }}
          >
            {entry.bullets.map(bullet => renderBullet('experience', bullet))}
          </ul>
        ) : null}
      </div>
    );
  };

  const renderEducation = (entry: Education): JSX.Element => {
    const titleFont = context.font('education', 'entryTitle');
    const subtitleFont = context.font('education', 'entrySubtitle');
    const dateFont = context.font('education', 'dateLine');

    return (
      <div
        key={entry.id}
        style={{ marginBottom: toLatexUnit(context.spacing('education', 'betweenItems')) }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: toLatexUnit(context.spacing('education', 'inlineGap')),
          }}
        >
          <div
            style={{
              ...fontStyle(titleFont.family, titleFont.size, titleFont.weight),
              color: context.bodyTextColor,
            }}
          >
            {entry.degree}
          </div>
          <div
            style={{
              ...fontStyle(dateFont.family, dateFont.size, dateFont.weight),
              color: context.dateTextColor,
            }}
          >
            {entry.startDate} - {entry.endDate}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: toLatexUnit(context.spacing('education', 'inlineGap')),
            ...fontStyle(subtitleFont.family, subtitleFont.size, subtitleFont.weight),
            color: context.dateTextColor,
          }}
        >
          <span>{entry.institution}</span>
          <span>{entry.field}</span>
        </div>
        {entry.gpa ? (
          <div
            style={{
              ...fontStyle(subtitleFont.family, subtitleFont.size, subtitleFont.weight),
              color: context.dateTextColor,
            }}
          >
            GPA: {entry.gpa}
          </div>
        ) : null}
        {entry.honors ? (
          <div
            style={{
              ...fontStyle(subtitleFont.family, subtitleFont.size, subtitleFont.weight),
              color: context.dateTextColor,
            }}
          >
            {entry.honors}
          </div>
        ) : null}
      </div>
    );
  };

  const renderSkillCategory = (category: SkillCategory): JSX.Element => {
    const subtitleFont = context.font('skills', 'entrySubtitle');
    const bodyFont = context.font('skills', 'bodyText');

    return (
      <div
        key={category.id}
        style={{ marginBottom: toLatexUnit(context.spacing('skills', 'betweenItems')) }}
      >
        <span
          style={{
            ...fontStyle(subtitleFont.family, subtitleFont.size, 'bold'),
            color: context.bodyTextColor,
          }}
        >
          {category.category}:
        </span>
        <span
          style={{
            ...fontStyle(bodyFont.family, bodyFont.size, bodyFont.weight),
            color: context.bodyTextColor,
            marginLeft: toLatexUnit(context.spacing('skills', 'inlineGap')),
          }}
        >
          {category.items.join(', ')}
        </span>
      </div>
    );
  };

  const renderProject = (project: Project): JSX.Element => {
    const titleFont = context.font('projects', 'entryTitle');
    const subtitleFont = context.font('projects', 'entrySubtitle');
    const dateFont = context.font('projects', 'dateLine');

    return (
      <div
        key={project.id}
        style={{ marginBottom: toLatexUnit(context.spacing('projects', 'betweenItems')) }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: toLatexUnit(context.spacing('projects', 'inlineGap')),
          }}
        >
          <div
            style={{
              ...fontStyle(titleFont.family, titleFont.size, titleFont.weight),
              color: context.bodyTextColor,
            }}
          >
            {project.name}
          </div>
          <div
            style={{
              ...fontStyle(dateFont.family, dateFont.size, dateFont.weight),
              color: context.dateTextColor,
            }}
          >
            {project.startDate} - {project.endDate}
          </div>
        </div>
        <div
          style={{
            ...fontStyle(subtitleFont.family, subtitleFont.size, subtitleFont.weight),
            color: context.dateTextColor,
          }}
        >
          {project.techStack.join(', ')}
        </div>
        {(project.liveUrl || project.repoUrl) && (
          <div style={{ marginTop: toLatexUnit(context.spacing('projects', 'afterSectionTitle')) }}>
            {project.liveUrl ? <span style={{ color: context.dateTextColor }}>{project.liveUrl}</span> : null}
            {project.liveUrl && project.repoUrl ? (
              <span style={{ color: context.dateTextColor }}> | </span>
            ) : null}
            {project.repoUrl ? <span style={{ color: context.dateTextColor }}>{project.repoUrl}</span> : null}
          </div>
        )}
        {project.bullets.length > 0 ? (
          <ul
            style={{
              marginTop: toLatexUnit(context.spacing('projects', 'afterSectionTitle')),
              paddingLeft: '1.5em',
              listStylePosition: 'outside',
            }}
          >
            {project.bullets.map(bullet => renderBullet('projects', bullet))}
          </ul>
        ) : null}
      </div>
    );
  };

  const renderCertification = (cert: Certification): JSX.Element => {
    const titleFont = context.font('certifications', 'entryTitle');
    const subtitleFont = context.font('certifications', 'entrySubtitle');
    const dateFont = context.font('certifications', 'dateLine');

    return (
      <div
        key={cert.id}
        style={{ marginBottom: toLatexUnit(context.spacing('certifications', 'betweenItems')) }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: toLatexUnit(context.spacing('certifications', 'inlineGap')),
          }}
        >
          <div
            style={{
              ...fontStyle(titleFont.family, titleFont.size, titleFont.weight),
              color: context.bodyTextColor,
            }}
          >
            {cert.name}
          </div>
          <div
            style={{
              ...fontStyle(dateFont.family, dateFont.size, dateFont.weight),
              color: context.dateTextColor,
            }}
          >
            {cert.issueDate}
            {cert.expiryDate !== 'never' ? ` - ${cert.expiryDate}` : ''}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: toLatexUnit(context.spacing('certifications', 'inlineGap')),
            ...fontStyle(subtitleFont.family, subtitleFont.size, subtitleFont.weight),
            color: context.dateTextColor,
          }}
        >
          <span>{cert.issuer}</span>
          <span>{cert.credentialId ?? ''}</span>
        </div>
        {cert.url ? (
          <div
            style={{
              ...fontStyle(subtitleFont.family, subtitleFont.size, subtitleFont.weight),
              color: context.dateTextColor,
            }}
          >
            {cert.url}
          </div>
        ) : null}
      </div>
    );
  };

  return {
    renderSectionHeader,
    renderBullet,
    renderExperience,
    renderEducation,
    renderSkillCategory,
    renderProject,
    renderCertification,
  };
}
