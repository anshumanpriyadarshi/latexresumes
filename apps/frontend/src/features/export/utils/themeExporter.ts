import type { Theme } from '@resume-builder/shared';
import { createJsonBlob, downloadHelper } from './downloadHelper';

export function downloadTheme(theme: Theme): void {
  downloadHelper(createJsonBlob(theme), `${theme.name}.theme.json`, 'application/json');
}
