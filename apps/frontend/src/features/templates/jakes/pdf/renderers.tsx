import type { ReactElement } from 'react';
import { Text, View } from '@react-pdf/renderer';
import type {
  BulletPoint,
  Certification,
  Education,
  Experience,
  FontDef,
  Project,
  SectionKey,
  SkillCategory,
} from '@resume-builder/shared';
import type { JakesPdfRenderContext } from './types';
import { pdfTextStyle, toPointValue } from './utils';

const renderSectionHeader = (
  section: SectionKey,
  label: string,
  context: JakesPdfRenderContext
): ReactElement => (
  <View style={{ marginBottom: toPointValue(context.resolveSpacing(section, 'afterSectionTitle')) }}>
    <Text
      style={{
        ...pdfTextStyle(context.resolveFont(section, 'sectionTitle'), context.accentColor),
        textTransform: 'uppercase',
      }}
    >
      {label}
    </Text>
    <View style={{ borderBottomWidth: 0.4, borderBottomColor: '#000000', marginTop: 1 }} />
  </View>
);

const renderBulletList = (
  bullets: BulletPoint[],
  section: SectionKey,
  context: JakesPdfRenderContext
): ReactElement | null => {
  if (bullets.length === 0) {
    return null;
  }

  const bulletFont = context.resolveFont(section, 'bodyText');
  const bulletGap = toPointValue(context.resolveSpacing(section, 'betweenSubItems'));

  return (
    <View
      style={{
        marginTop: toPointValue(context.resolveSpacing(section, 'afterSectionTitle')),
        paddingLeft: 18,
      }}
    >
      {bullets.map(bullet => (
        <Text
          key={bullet.id}
          style={{
            ...pdfTextStyle(bulletFont, context.bodyColor),
            marginBottom: bulletGap,
          }}
        >
          {`\u2022 ${bullet.content}`}
        </Text>
      ))}
    </View>
  );
};

const renderTwoColumnLine = (
  left: string,
  right: string,
  leftFont: FontDef,
  rightFont: FontDef,
  leftColor: string,
  rightColor: string,
  gap: number
): ReactElement => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <Text style={{ ...pdfTextStyle(leftFont, leftColor), marginRight: gap }}>{left}</Text>
    <Text style={pdfTextStyle(rightFont, rightColor)}>{right}</Text>
  </View>
);

export function createPdfSectionRenderers(context: JakesPdfRenderContext) {
  const renderExperience = (entry: Experience): ReactElement => {
    const titleFont = context.resolveFont('experience', 'entryTitle');
    const subtitleFont = context.resolveFont('experience', 'entrySubtitle');
    const dateFont = context.resolveFont('experience', 'dateLine');
    const rowGap = toPointValue(context.resolveSpacing('experience', 'inlineGap'));
    const itemGap = toPointValue(context.resolveSpacing('experience', 'betweenItems'));

    return (
      <View key={entry.id} style={{ marginBottom: itemGap }}>
        {renderTwoColumnLine(
          entry.role,
          `${entry.startDate} - ${entry.endDate}`,
          titleFont,
          dateFont,
          context.bodyColor,
          context.dateColor,
          rowGap
        )}
        {renderTwoColumnLine(
          entry.company,
          entry.location,
          subtitleFont,
          subtitleFont,
          context.dateColor,
          context.dateColor,
          rowGap
        )}
        {renderBulletList(entry.bullets, 'experience', context)}
      </View>
    );
  };

  const renderEducation = (entry: Education): ReactElement => {
    const titleFont = context.resolveFont('education', 'entryTitle');
    const subtitleFont = context.resolveFont('education', 'entrySubtitle');
    const dateFont = context.resolveFont('education', 'dateLine');
    const rowGap = toPointValue(context.resolveSpacing('education', 'inlineGap'));
    const itemGap = toPointValue(context.resolveSpacing('education', 'betweenItems'));

    return (
      <View key={entry.id} style={{ marginBottom: itemGap }}>
        {renderTwoColumnLine(
          entry.degree,
          `${entry.startDate} - ${entry.endDate}`,
          titleFont,
          dateFont,
          context.bodyColor,
          context.dateColor,
          rowGap
        )}
        {renderTwoColumnLine(
          entry.institution,
          entry.field,
          subtitleFont,
          subtitleFont,
          context.dateColor,
          context.dateColor,
          rowGap
        )}
        {entry.gpa ? <Text style={pdfTextStyle(subtitleFont, context.dateColor)}>GPA: {entry.gpa}</Text> : null}
        {entry.honors ? <Text style={pdfTextStyle(subtitleFont, context.dateColor)}>{entry.honors}</Text> : null}
      </View>
    );
  };

  const renderSkillCategory = (category: SkillCategory): ReactElement => {
    const subtitleFont = context.resolveFont('skills', 'entrySubtitle');
    const bodyFont = context.resolveFont('skills', 'bodyText');
    const itemGap = toPointValue(context.resolveSpacing('skills', 'betweenItems'));
    const inlineGap = toPointValue(context.resolveSpacing('skills', 'inlineGap'));

    return (
      <View key={category.id} style={{ marginBottom: itemGap, flexDirection: 'row' }}>
        <Text style={{ ...pdfTextStyle(subtitleFont, context.bodyColor), fontWeight: 'bold' }}>
          {category.category}:
        </Text>
        <Text style={{ ...pdfTextStyle(bodyFont, context.bodyColor), marginLeft: inlineGap, flex: 1 }}>
          {category.items.join(', ')}
        </Text>
      </View>
    );
  };

  const renderProject = (project: Project): ReactElement => {
    const titleFont = context.resolveFont('projects', 'entryTitle');
    const subtitleFont = context.resolveFont('projects', 'entrySubtitle');
    const dateFont = context.resolveFont('projects', 'dateLine');
    const rowGap = toPointValue(context.resolveSpacing('projects', 'inlineGap'));
    const itemGap = toPointValue(context.resolveSpacing('projects', 'betweenItems'));
    const afterTitleGap = toPointValue(context.resolveSpacing('projects', 'afterSectionTitle'));

    return (
      <View key={project.id} style={{ marginBottom: itemGap }}>
        {renderTwoColumnLine(
          project.name,
          `${project.startDate} - ${project.endDate}`,
          titleFont,
          dateFont,
          context.bodyColor,
          context.dateColor,
          rowGap
        )}
        <Text style={pdfTextStyle(subtitleFont, context.dateColor)}>{project.techStack.join(', ')}</Text>
        {(project.liveUrl || project.repoUrl) && (
          <View style={{ flexDirection: 'row', marginTop: afterTitleGap }}>
            {project.liveUrl ? <Text style={{ color: context.dateColor }}>{project.liveUrl}</Text> : null}
            {project.liveUrl && project.repoUrl ? <Text style={{ color: context.dateColor }}> | </Text> : null}
            {project.repoUrl ? <Text style={{ color: context.dateColor }}>{project.repoUrl}</Text> : null}
          </View>
        )}
        {renderBulletList(project.bullets, 'projects', context)}
      </View>
    );
  };

  const renderCertification = (cert: Certification): ReactElement => {
    const titleFont = context.resolveFont('certifications', 'entryTitle');
    const subtitleFont = context.resolveFont('certifications', 'entrySubtitle');
    const dateFont = context.resolveFont('certifications', 'dateLine');
    const rowGap = toPointValue(context.resolveSpacing('certifications', 'inlineGap'));
    const itemGap = toPointValue(context.resolveSpacing('certifications', 'betweenItems'));
    const rightSide = cert.expiryDate !== 'never' ? `${cert.issueDate} - ${cert.expiryDate}` : cert.issueDate;

    return (
      <View key={cert.id} style={{ marginBottom: itemGap }}>
        {renderTwoColumnLine(
          cert.name,
          rightSide,
          titleFont,
          dateFont,
          context.bodyColor,
          context.dateColor,
          rowGap
        )}
        {renderTwoColumnLine(
          cert.issuer,
          cert.credentialId ?? '',
          subtitleFont,
          subtitleFont,
          context.dateColor,
          context.dateColor,
          rowGap
        )}
        {cert.url ? <Text style={pdfTextStyle(subtitleFont, context.dateColor)}>{cert.url}</Text> : null}
      </View>
    );
  };

  return {
    renderSectionHeader: (section: SectionKey, label: string) =>
      renderSectionHeader(section, label, context),
    renderExperience,
    renderEducation,
    renderSkillCategory,
    renderProject,
    renderCertification,
  };
}
