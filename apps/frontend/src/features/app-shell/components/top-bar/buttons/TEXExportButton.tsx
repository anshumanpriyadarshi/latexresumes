import { observer } from 'mobx-react-lite';
import { downloadTex } from '../../../../export/utils/texExporter';
import { useStores } from '../../../../shared/hooks/useStores';
import { TopBarButton } from '../TopBarButton';

export const TEXExportButton = observer(() => {
  const { appStore, formattingStore } = useStores();
  const { activeResume } = appStore;

  const handleClick = (): void => {
    if (!activeResume) return;
    downloadTex(activeResume, formattingStore);
  };

  return (
    <TopBarButton
      onClick={handleClick}
      disabled={!activeResume}
      className="bg-amber-600 text-white hover:bg-amber-500"
    >
      TEX
    </TopBarButton>
  );
});

TEXExportButton.displayName = 'TEXExportButton';
