import { JSONExportButton } from './buttons/JSONExportButton';
import { PDFExportButton } from './buttons/PDFExportButton';
import { TEXExportButton } from './buttons/TEXExportButton';

export function TopBarExportActions() {
  return (
    <>
      <PDFExportButton />
      <TEXExportButton />
      <JSONExportButton />
    </>
  );
}

TopBarExportActions.displayName = 'TopBarExportActions';
