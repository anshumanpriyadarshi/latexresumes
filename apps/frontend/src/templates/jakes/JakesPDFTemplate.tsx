import type { ReactElement } from 'react';
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import type {
  BulletPoint,
  Certification,
  Education,
  Experience,
  FontConfig,
  FontDef,
  LaTeXUnit,
  Project,
  Resume,
  SectionKey,
  SkillCategory,
  SpacingConfig,
} from '@resume-builder/shared';

type ResolveSpacing = (section: SectionKey, key: keyof SpacingConfig) => LaTeXUnit;
type ResolveFont = (section: SectionKey | null, key: keyof FontConfig) => FontDef;

export type JakesPDFTemplateProps = {
  resume: Resume;
  resolveSpacing: ResolveSpacing;
  resolveFont: ResolveFont;
};

const PT_PER_IN = 72;
const PT_PER_CM = 28.3464567;
const PT_PER_MM = 2.83464567;

const toPointValue = (unit: LaTeXUnit): number => {
  switch (unit.unit) {
    case 'pt':
      return unit.value;
    case 'in':
      return unit.value * PT_PER_IN;
    case 'cm':
      return unit.value * PT_PER_CM;
    case 'mm':
      return unit.value * PT_PER_MM;
    case 'em':
      return unit.value * 12;
    case 'ex':
      return unit.value * 6;
    default:
      return unit.value;
  }
};

const toTextWeight = (weight: FontDef['weight']): number | 'bold' | 'normal' => {
  if (weight === 'bold') return 'bold';
  if (weight === 'light') return 300;
  return 'normal';
};

const normalizePdfFontFamily = (family: string): string => {
  const normalized = family.toLowerCase();

  if (
    normalized.includes('calibri') ||
    normalized.includes('helvetica') ||
    normalized.includes('arial')
  ) {
    return 'Helvetica';
  }

  if (
    normalized.includes('georgia') ||
    normalized.includes('times') ||
    normalized.includes('computer modern') ||
    normalized.includes('latin modern')
  ) {
    return 'Times-Roman';
  }

  return 'Helvetica';
};

const pdfFontFamily = (font: FontDef): string => normalizePdfFontFamily(font.family);

const pdfTextStyle = (font: FontDef, color: string) => ({
  fontFamily: pdfFontFamily(font),
  fontSize: font.size.value,
  fontWeight: toTextWeight(font.weight),
  color,
});

const color = (hex: string): string => `#${hex}`;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    color: '#1f2937',
  },
  header: {
    textAlign: 'center',
  },
});

const renderBulletList = (
  bullets: BulletPoint[],
  section: SectionKey,
  resolveSpacing: ResolveSpacing,
  resolveFont: ResolveFont,
  bodyColor: string
): ReactElement => {
  const bulletFont = resolveFont(section, 'bodyText');
  const bulletGap = toPointValue(resolveSpacing(section, 'betweenSubItems'));
  const inlineGap = toPointValue(resolveSpacing(section, 'inlineGap'));

  return (
    <View style={{ marginTop: toPointValue(resolveSpacing(section, 'afterSectionTitle')), paddingLeft: inlineGap }}>
      {bullets.map(bullet => (
        <Text
          key={bullet.id}
          style={{
            ...pdfTextStyle(bulletFont, bodyColor),
            marginBottom: bulletGap,
          }}
        >
          • {bullet.content}
        </Text>
      ))}
    </View>
  );
};

const renderExperience = (
  entry: Experience,
  resolveSpacing: ResolveSpacing,
  resolveFont: ResolveFont,
  bodyColor: string,
  dateColor: string
): ReactElement => {
  const titleFont = resolveFont('experience', 'entryTitle');
  const subtitleFont = resolveFont('experience', 'entrySubtitle');
  const dateFont = resolveFont('experience', 'dateLine');
  const rowGap = toPointValue(resolveSpacing('experience', 'inlineGap'));
  const itemGap = toPointValue(resolveSpacing('experience', 'betweenItems'));

  return (
    <View key={entry.id} style={{ marginBottom: itemGap }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ ...pdfTextStyle(titleFont, bodyColor), marginRight: rowGap }}>{entry.role}</Text>
        <Text style={{ ...pdfTextStyle(dateFont, dateColor), textAlign: 'right' }}>
          {entry.startDate} - {entry.endDate}
        </Text>
      </View>

      <Text style={pdfTextStyle(subtitleFont, dateColor)}>
        {entry.company}
        {entry.location ? `, ${entry.location}` : ''}
      </Text>

      {renderBulletList(entry.bullets, 'experience', resolveSpacing, resolveFont, bodyColor)}
    </View>
  );
};

const renderEducation = (
  entry: Education,
  resolveSpacing: ResolveSpacing,
  resolveFont: ResolveFont,
  bodyColor: string,
  dateColor: string
): ReactElement => {
  const titleFont = resolveFont('education', 'entryTitle');
  const subtitleFont = resolveFont('education', 'entrySubtitle');
  const dateFont = resolveFont('education', 'dateLine');
  const rowGap = toPointValue(resolveSpacing('education', 'inlineGap'));
  const itemGap = toPointValue(resolveSpacing('education', 'betweenItems'));

  return (
    <View key={entry.id} style={{ marginBottom: itemGap }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ ...pdfTextStyle(titleFont, bodyColor), marginRight: rowGap }}>
          {entry.degree}
          {entry.field ? ` in ${entry.field}` : ''}
        </Text>
        <Text style={pdfTextStyle(dateFont, dateColor)}>
          {entry.startDate} - {entry.endDate}
        </Text>
      </View>
      <Text style={pdfTextStyle(subtitleFont, dateColor)}>
        {entry.institution}
        {entry.gpa ? ` • GPA: ${entry.gpa}` : ''}
        {entry.honors ? ` • ${entry.honors}` : ''}
      </Text>
    </View>
  );
};

const renderSkillCategory = (
  category: SkillCategory,
  resolveSpacing: ResolveSpacing,
  resolveFont: ResolveFont,
  bodyColor: string
): ReactElement => {
  const subtitleFont = resolveFont('skills', 'entrySubtitle');
  const bodyFont = resolveFont('skills', 'bodyText');
  const itemGap = toPointValue(resolveSpacing('skills', 'betweenItems'));
  const inlineGap = toPointValue(resolveSpacing('skills', 'inlineGap'));

  return (
    <View key={category.id} style={{ marginBottom: itemGap, flexDirection: 'row' }}>
      <Text style={{ ...pdfTextStyle(subtitleFont, bodyColor), fontWeight: 'bold' }}>
        {category.category}:
      </Text>
      <Text
        style={{
          ...pdfTextStyle(bodyFont, bodyColor),
          marginLeft: inlineGap,
          flex: 1,
        }}
      >
        {category.items.join(', ')}
      </Text>
    </View>
  );
};

const renderProject = (
  project: Project,
  resolveSpacing: ResolveSpacing,
  resolveFont: ResolveFont,
  bodyColor: string,
  dateColor: string
): ReactElement => {
  const titleFont = resolveFont('projects', 'entryTitle');
  const subtitleFont = resolveFont('projects', 'entrySubtitle');
  const dateFont = resolveFont('projects', 'dateLine');
  const rowGap = toPointValue(resolveSpacing('projects', 'inlineGap'));
  const itemGap = toPointValue(resolveSpacing('projects', 'betweenItems'));
  const afterTitleGap = toPointValue(resolveSpacing('projects', 'afterSectionTitle'));

  return (
    <View key={project.id} style={{ marginBottom: itemGap }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ ...pdfTextStyle(titleFont, bodyColor), marginRight: rowGap }}>{project.name}</Text>
        <Text style={pdfTextStyle(dateFont, dateColor)}>
          {project.startDate} - {project.endDate}
        </Text>
      </View>
      <Text style={pdfTextStyle(subtitleFont, dateColor)}>{project.techStack.join(' • ')}</Text>
      <View style={{ flexDirection: 'row', marginTop: afterTitleGap }}>
        {project.liveUrl && (
          <Text style={{ color: dateColor, marginRight: rowGap }}>{project.liveUrl}</Text>
        )}
        {project.repoUrl && <Text style={{ color: dateColor }}>{project.repoUrl}</Text>}
      </View>
      {renderBulletList(project.bullets, 'projects', resolveSpacing, resolveFont, bodyColor)}
    </View>
  );
};

const renderCertification = (
  cert: Certification,
  resolveSpacing: ResolveSpacing,
  resolveFont: ResolveFont,
  bodyColor: string,
  dateColor: string
): ReactElement => {
  const titleFont = resolveFont('certifications', 'entryTitle');
  const subtitleFont = resolveFont('certifications', 'entrySubtitle');
  const dateFont = resolveFont('certifications', 'dateLine');
  const rowGap = toPointValue(resolveSpacing('certifications', 'inlineGap'));
  const itemGap = toPointValue(resolveSpacing('certifications', 'betweenItems'));

  return (
    <View key={cert.id} style={{ marginBottom: itemGap }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ ...pdfTextStyle(titleFont, bodyColor), marginRight: rowGap }}>{cert.name}</Text>
        <Text style={pdfTextStyle(dateFont, dateColor)}>
          {cert.issueDate}
          {cert.expiryDate !== 'never' ? ` - ${cert.expiryDate}` : ''}
        </Text>
      </View>
      <Text style={pdfTextStyle(subtitleFont, dateColor)}>
        {cert.issuer}
        {cert.credentialId ? ` • ${cert.credentialId}` : ''}
        {cert.url ? ` • ${cert.url}` : ''}
      </Text>
    </View>
  );
};

export function JakesPDFTemplate({
  resume,
  resolveSpacing,
  resolveFont,
}: JakesPDFTemplateProps): ReactElement {
  const { content, formatting } = resume;
  const nameFont = resolveFont(null, 'name');
  const bodyFont = resolveFont(null, 'bodyText');
  const headerGap = toPointValue(resolveSpacing('personal', 'afterSectionTitle'));
  const inlineGap = toPointValue(resolveSpacing('personal', 'inlineGap'));
  const accentColor = color(formatting.global.colors.accent.hex);
  const nameTextColor = color(formatting.global.colors.nameText.hex);
  const bodyTextColor = color(formatting.global.colors.bodyText.hex);
  const dateTextColor = color(formatting.global.colors.dateText.hex);

  return (
    <Document>
      <Page
        size="LETTER"
        style={{
          ...styles.page,
          paddingTop: toPointValue(formatting.global.pageMargins.top),
          paddingRight: toPointValue(formatting.global.pageMargins.right),
          paddingBottom: toPointValue(formatting.global.pageMargins.bottom),
          paddingLeft: toPointValue(formatting.global.pageMargins.left),
          fontFamily: pdfFontFamily(bodyFont),
        }}
      >
        <View style={styles.header}>
          <Text style={{ ...pdfTextStyle(nameFont, nameTextColor), lineHeight: 1 }}>
            {content.personal.firstName} {content.personal.lastName}
          </Text>
          <View style={{ marginTop: headerGap }}>
            <Text style={{ ...pdfTextStyle(bodyFont, dateTextColor), marginBottom: inlineGap }}>
              {content.personal.location}
            </Text>
            <Text style={{ ...pdfTextStyle(bodyFont, dateTextColor), marginBottom: inlineGap }}>
              {content.personal.email}
              {content.personal.phone ? ` | ${content.personal.phone}` : ''}
            </Text>
            <Text style={pdfTextStyle(bodyFont, dateTextColor)}>
              {content.personal.linkedin}
              {content.personal.github ? ` | ${content.personal.github}` : ''}
              {content.personal.website ? ` | ${content.personal.website}` : ''}
            </Text>
          </View>
        </View>

        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: accentColor,
            marginTop: headerGap,
            marginBottom: headerGap,
          }}
        />

        {content.experience.length > 0 && (
          <View style={{ marginBottom: toPointValue(resolveSpacing('experience', 'beforeSection')) }}>
            <Text
              style={{
                ...pdfTextStyle(resolveFont('experience', 'sectionTitle'), accentColor),
                textTransform: 'uppercase',
                marginBottom: toPointValue(resolveSpacing('experience', 'afterSectionTitle')),
              }}
            >
              Experience
            </Text>
            {content.experience.map(entry =>
              renderExperience(entry, resolveSpacing, resolveFont, bodyTextColor, dateTextColor)
            )}
          </View>
        )}

        {content.education.length > 0 && (
          <View style={{ marginBottom: toPointValue(resolveSpacing('education', 'beforeSection')) }}>
            <Text
              style={{
                ...pdfTextStyle(resolveFont('education', 'sectionTitle'), accentColor),
                textTransform: 'uppercase',
                marginBottom: toPointValue(resolveSpacing('education', 'afterSectionTitle')),
              }}
            >
              Education
            </Text>
            {content.education.map(entry =>
              renderEducation(entry, resolveSpacing, resolveFont, bodyTextColor, dateTextColor)
            )}
          </View>
        )}

        {content.projects.length > 0 && (
          <View style={{ marginBottom: toPointValue(resolveSpacing('projects', 'beforeSection')) }}>
            <Text
              style={{
                ...pdfTextStyle(resolveFont('projects', 'sectionTitle'), accentColor),
                textTransform: 'uppercase',
                marginBottom: toPointValue(resolveSpacing('projects', 'afterSectionTitle')),
              }}
            >
              Projects
            </Text>
            {content.projects.map(entry =>
              renderProject(entry, resolveSpacing, resolveFont, bodyTextColor, dateTextColor)
            )}
          </View>
        )}

        {content.skills.length > 0 && (
          <View style={{ marginBottom: toPointValue(resolveSpacing('skills', 'beforeSection')) }}>
            <Text
              style={{
                ...pdfTextStyle(resolveFont('skills', 'sectionTitle'), accentColor),
                textTransform: 'uppercase',
                marginBottom: toPointValue(resolveSpacing('skills', 'afterSectionTitle')),
              }}
            >
              Skills
            </Text>
            {content.skills.map(category =>
              renderSkillCategory(category, resolveSpacing, resolveFont, bodyTextColor)
            )}
          </View>
        )}

        {content.certifications.length > 0 && (
          <View style={{ marginBottom: toPointValue(resolveSpacing('certifications', 'beforeSection')) }}>
            <Text
              style={{
                ...pdfTextStyle(resolveFont('certifications', 'sectionTitle'), accentColor),
                textTransform: 'uppercase',
                marginBottom: toPointValue(resolveSpacing('certifications', 'afterSectionTitle')),
              }}
            >
              Certifications
            </Text>
            {content.certifications.map(entry =>
              renderCertification(entry, resolveSpacing, resolveFont, bodyTextColor, dateTextColor)
            )}
          </View>
        )}
      </Page>
    </Document>
  );
}
