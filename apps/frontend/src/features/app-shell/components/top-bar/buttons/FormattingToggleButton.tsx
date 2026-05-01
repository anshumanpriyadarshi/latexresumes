import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../shared/hooks/useStores';
import { TopBarButton } from '../TopBarButton';

export const FormattingToggleButton = observer(() => {
  const { appStore } = useStores();

  return (
    <TopBarButton
      onClick={() => appStore.toggleFormattingPanel()}
      className={
        appStore.formattingPanelOpen
          ? 'bg-emerald-600 text-white hover:bg-emerald-500'
          : 'bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600'
      }
    >
      Formatting
    </TopBarButton>
  );
});

FormattingToggleButton.displayName = 'FormattingToggleButton';
