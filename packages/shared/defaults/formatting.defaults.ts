import type {
  FormattingConfig,
  ResumeContent,
  TemplateId,
  Email,
  PhoneNumber,
  HttpUrl,
} from '../index';

// Default FormattingConfig for Jake's Resume template
// Based on the original Jake's Resume spacing, fonts, and colors
export function defaultFormattingConfig(templateId: TemplateId): FormattingConfig {
  if (templateId === 'jakes') {
    return {
      global: {
        spacing: {
          beforeSection: { value: 6, unit: 'pt' },
          afterSectionTitle: { value: 3, unit: 'pt' },
          betweenItems: { value: 6, unit: 'pt' },
          betweenSubItems: { value: 2, unit: 'pt' },
          inlineGap: { value: 4, unit: 'pt' },
        },
        fonts: {
          name: {
            family: 'Calibri',
            size: { value: 18, unit: 'pt' },
            weight: 'bold',
          },
          sectionTitle: {
            family: 'Calibri',
            size: { value: 11, unit: 'pt' },
            weight: 'bold',
          },
          entryTitle: {
            family: 'Calibri',
            size: { value: 11, unit: 'pt' },
            weight: 'bold',
          },
          entrySubtitle: {
            family: 'Calibri',
            size: { value: 10, unit: 'pt' },
            weight: 'normal',
          },
          bodyText: {
            family: 'Calibri',
            size: { value: 10, unit: 'pt' },
            weight: 'normal',
          },
          dateLine: {
            family: 'Calibri',
            size: { value: 10, unit: 'pt' },
            weight: 'normal',
          },
        },
        colors: {
          accent: {
            hex: '4f46e5',    // Indigo
            preset: 'indigo',
          },
          nameText: {
            hex: '000000',    // Black
            preset: 'black',
          },
          bodyText: {
            hex: '1f2937',    // Slate
            preset: 'slate',
          },
          dateText: {
            hex: '6b7280',    // Gray
            preset: 'gray',
          },
        },
        alignment: {
          vertical: 'top',
          horizontal: 'left',
        },
        pageMargins: {
          top: { value: 0.75, unit: 'in' },
          bottom: { value: 0.75, unit: 'in' },
          left: { value: 0.75, unit: 'in' },
          right: { value: 0.75, unit: 'in' },
        },
      },
      sections: {},
    };
  }

  throw new Error(`Unknown template: ${templateId}`);
}

// Helper to create empty resume content with all required fields.
export function emptyResumeContent(): ResumeContent {
  return {
    personal: {
      firstName: '',
      lastName: '',
      email: '' as Email,
      phone: '' as PhoneNumber,
      linkedin: '' as HttpUrl,
      github: '' as HttpUrl,
      location: '',
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
  };
}
