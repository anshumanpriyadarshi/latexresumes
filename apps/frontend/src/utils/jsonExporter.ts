import type { Resume } from '@resume-builder/shared';
import { triggerDownload } from './download';

export function downloadJSON(resume: Resume): void {
  const blob = new Blob([JSON.stringify(resume, null, 2)], { type: 'application/json' });
  triggerDownload(blob, `${resume.name}.resume.json`, 'application/json');
}
