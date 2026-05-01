import type { Resume } from '@resume-builder/shared';
import { createJsonBlob, downloadHelper } from './downloadHelper';

export function downloadJSON(resume: Resume): void {
  downloadHelper(createJsonBlob(resume), `${resume.name}.resume.json`, 'application/json');
}
