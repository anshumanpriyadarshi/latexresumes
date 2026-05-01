import type { Resume } from '@resume-builder/shared';
import type { FormattingStore } from '../store/FormattingStore';
import { generateJakesTex } from '../templates/jakes/jakesTex';
import { triggerDownload } from './download';

export function downloadTex(resume: Resume, formattingStore: FormattingStore): void {
  const tex = generateJakesTex(resume, formattingStore.resolveSpacing);
  const blob = new Blob([tex], { type: 'text/plain; charset=utf-8' });
  triggerDownload(blob, `${resume.content.personal.lastName}_Resume.tex`, 'text/plain');
}
