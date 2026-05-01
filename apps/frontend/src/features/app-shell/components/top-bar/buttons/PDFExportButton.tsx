import { observer } from 'mobx-react-lite';
import { downloadPDF } from '../../../../export/utils/pdfExporter';
import { useStores } from '../../../../shared/hooks/useStores';
import { TopBarButton } from '../TopBarButton';

export const PDFExportButton = observer(() => {
  const { appStore, formattingStore } = useStores();
  const { activeResume } = appStore;

  const handleClick = (): void => {
    if (!activeResume) return;

    void downloadPDF(activeResume, formattingStore).catch(error => {
      // eslint-disable-next-line no-console
      console.error('PDF export failed:', error);
      window.alert('PDF export failed. Please try again.');
    });
  };

  return (
    <TopBarButton
      onClick={handleClick}
      disabled={!activeResume}
      className="bg-rose-600 text-white hover:bg-rose-500"
    >
      PDF
    </TopBarButton>
  );
});

PDFExportButton.displayName = 'PDFExportButton';
