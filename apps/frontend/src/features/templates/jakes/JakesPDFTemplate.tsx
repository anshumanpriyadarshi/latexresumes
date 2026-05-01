import type { ReactElement } from 'react';
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import type { Resume } from '@resume-builder/shared';
import { createPdfSectionRenderers } from './pdf/renderers';
import type { ResolveFont, ResolveSpacing } from './pdf/types';
import { color, pdfFontFamily, pdfTextStyle, toPointValue } from './pdf/utils';

export type JakesPDFTemplateProps = {
  resume: Resume;
  resolveSpacing: ResolveSpacing;
  resolveFont: ResolveFont;
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    color: '#1f2937',
  },
  header: {
    textAlign: 'center',
  },
});

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

  const {
    renderSectionHeader,
    renderExperience,
    renderEducation,
    renderSkillCategory,
    renderProject,
    renderCertification,
  } = createPdfSectionRenderers({
    resolveSpacing,
    resolveFont,
    bodyColor: bodyTextColor,
    dateColor: dateTextColor,
    accentColor,
  });

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
              {content.personal.phone}
            </Text>
            <Text style={{ ...pdfTextStyle(bodyFont, dateTextColor), marginBottom: inlineGap }}>
              {content.personal.email}
            </Text>
            <Text style={{ ...pdfTextStyle(bodyFont, dateTextColor), marginBottom: inlineGap }}>
              {content.personal.linkedin}
            </Text>
            <Text style={{ ...pdfTextStyle(bodyFont, dateTextColor), marginBottom: inlineGap }}>
              {content.personal.github}
            </Text>
            {content.personal.website ? (
              <Text style={pdfTextStyle(bodyFont, dateTextColor)}>{content.personal.website}</Text>
            ) : null}
          </View>
        </View>

        <View style={{ marginBottom: headerGap }} />

        {content.experience.length > 0 && (
          <View style={{ marginBottom: toPointValue(resolveSpacing('experience', 'beforeSection')) }}>
            {renderSectionHeader('experience', 'Experience')}
            {content.experience.map(renderExperience)}
          </View>
        )}

        {content.education.length > 0 && (
          <View style={{ marginBottom: toPointValue(resolveSpacing('education', 'beforeSection')) }}>
            {renderSectionHeader('education', 'Education')}
            {content.education.map(renderEducation)}
          </View>
        )}

        {content.projects.length > 0 && (
          <View style={{ marginBottom: toPointValue(resolveSpacing('projects', 'beforeSection')) }}>
            {renderSectionHeader('projects', 'Projects')}
            {content.projects.map(renderProject)}
          </View>
        )}

        {content.skills.length > 0 && (
          <View style={{ marginBottom: toPointValue(resolveSpacing('skills', 'beforeSection')) }}>
            {renderSectionHeader('skills', 'Skills')}
            {content.skills.map(renderSkillCategory)}
          </View>
        )}

        {content.certifications.length > 0 && (
          <View
            style={{ marginBottom: toPointValue(resolveSpacing('certifications', 'beforeSection')) }}
          >
            {renderSectionHeader('certifications', 'Certifications')}
            {content.certifications.map(renderCertification)}
          </View>
        )}
      </Page>
    </Document>
  );
}
