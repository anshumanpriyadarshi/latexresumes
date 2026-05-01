import type { Resume } from '@resume-builder/shared';
import type { FormattingStore } from '../../formatting/logic/FormattingStore';
import { generateJakesTex } from '../../templates/jakes/jakesTex';
import { downloadHelper } from './downloadHelper';

export function downloadTex(resume: Resume, formattingStore: FormattingStore): void {
  const tex = generateJakesTex(resume, formattingStore.resolveSpacing);
  const blob = new Blob([tex], { type: 'text/plain; charset=utf-8' });
  downloadHelper(blob, `${resume.content.personal.lastName}_Resume.tex`, 'text/plain');
}
