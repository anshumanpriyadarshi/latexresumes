import type { Resume } from '@resume-builder/shared';
import type { FormattingStore } from '../../formatting/logic/FormattingStore';
import { downloadHelper } from './downloadHelper';

export async function downloadPDF(resume: Resume, formattingStore: FormattingStore): Promise<void> {
  const { pdf } = await import('@react-pdf/renderer');
  const { JakesPDFTemplate } = await import('../../templates/jakes/JakesPDFTemplate');
  const blob = await pdf(
    <JakesPDFTemplate
      resume={resume}
      resolveSpacing={formattingStore.resolveSpacing}
      resolveFont={formattingStore.resolveFont}
    />
  ).toBlob();

  downloadHelper(blob, `${resume.content.personal.lastName}_Resume.pdf`, 'application/pdf');
}
