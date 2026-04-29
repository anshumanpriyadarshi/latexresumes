import type { Resume } from '@resume-builder/shared';
import type { FormattingStore } from '../store/FormattingStore';

function triggerDownload(blob: Blob, filename: string, type: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.type = type;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function downloadPDF(resume: Resume, formattingStore: FormattingStore): Promise<void> {
  try {
    const { pdf } = await import('@react-pdf/renderer');
    const { JakesPDFTemplate } = await import('../templates/jakes/JakesPDFTemplate');
    const blob = await pdf(
      <JakesPDFTemplate
        resume={resume}
        resolveSpacing={formattingStore.resolveSpacing}
        resolveFont={formattingStore.resolveFont}
      />
    ).toBlob();

    triggerDownload(blob, `${resume.content.personal.lastName}_Resume.pdf`, 'application/pdf');
  } catch (error) {
    throw error;
  }
}
