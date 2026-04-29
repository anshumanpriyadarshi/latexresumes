// Types
export type {
  Email,
  PhoneNumber,
  HttpUrl,
  ResumeDate,
  CertExpiryDate,
} from './types/primitives.types';

export type {
  LengthUnit,
  LaTeXUnit,
  FontWeight,
  FontDef,
  ColorDef,
  AlignmentDef,
  SpacingConfig,
  FontConfig,
  PageMargins,
  GlobalFormatting,
  SectionFormatting,
  FormattingConfig,
  Theme,
} from './types/formatting.types';

export type {
  SectionKey,
  PersonalInfo,
  BulletPoint,
  Experience,
  Education,
  SkillCategory,
  Project,
  Certification,
  ResumeContent,
} from './types/resume.types';

export type {
  ColorTheme,
  TemplateId,
  Resume,
  AppState,
} from './types/app.types';

export type {
  TexParseWarning,
  TexParseResult,
} from './types/texParser.types';

// Schemas
export {
  emailSchema,
  phoneSchema,
  httpUrlSchema,
  resumeDateSchema,
  certExpirySchema,
} from './schemas/primitives.schemas';

export {
  bulletPointSchema,
  personalInfoSchema,
  experienceSchema,
  educationSchema,
  skillCategorySchema,
  projectSchema,
  certificationSchema,
  resumeContentSchema,
} from './schemas/resume.schemas';

export {
  lengthUnitSchema,
  latexUnitSchema,
  fontWeightSchema,
  fontDefSchema,
  colorDefSchema,
  alignmentDefSchema,
  spacingConfigSchema,
  fontConfigSchema,
  pageMarginsSchema,
  globalFormattingSchema,
  sectionFormattingSchema,
  formattingConfigSchema,
} from './schemas/formatting.schemas';

export { resumeSchema } from './schemas/app.schemas';
