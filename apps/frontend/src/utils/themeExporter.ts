import type { Theme } from '@resume-builder/shared';
import { triggerDownload } from './download';

export function downloadTheme(theme: Theme): void {
  const blob = new Blob([JSON.stringify(theme, null, 2)], { type: 'application/json' });
  triggerDownload(blob, `${theme.name}.theme.json`, 'application/json');
}
