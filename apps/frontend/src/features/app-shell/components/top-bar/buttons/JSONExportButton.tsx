import { observer } from 'mobx-react-lite';
import { downloadJSON } from '../../../../export/utils/jsonExporter';
import { useStores } from '../../../../shared/hooks/useStores';
import { TopBarButton } from '../TopBarButton';

export const JSONExportButton = observer(() => {
  const { appStore } = useStores();
  const { activeResume } = appStore;

  const handleClick = (): void => {
    if (!activeResume) return;
    downloadJSON(activeResume);
  };

  return (
    <TopBarButton
      onClick={handleClick}
      disabled={!activeResume}
      className="bg-cyan-600 text-white hover:bg-cyan-500"
    >
      JSON
    </TopBarButton>
  );
});

JSONExportButton.displayName = 'JSONExportButton';
