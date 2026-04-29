// Used to validate uploaded .json resume files before hydrating the store.
// Never call .parse() inside a MobX store — validate at the form/import boundary only.
import { z } from 'zod';
import { resumeContentSchema } from './resume.schemas';
import { formattingConfigSchema } from './formatting.schemas';

export const resumeSchema = z.object({
  id:         z.string(),
  name:       z.string().min(1),
  templateId: z.enum(['jakes']),
  createdAt:  z.string().datetime(),
  updatedAt:  z.string().datetime(),
  content:    resumeContentSchema,
  formatting: formattingConfigSchema,
});

// Usage at import boundary:
// const result = resumeSchema.safeParse(uploadedJson);
// if (!result.success) { showWarnings(result.error.issues); return; }
// appStore.importResume(result.data);
