import { observer } from 'mobx-react-lite';
import { useStores } from '../../../shared/hooks/useStores';

export const FormattingPanelCloseButton = observer(() => {
  const { appStore } = useStores();

  return (
    <button
      onClick={() => appStore.toggleFormattingPanel()}
      className="rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
    >
      Close
    </button>
  );
});

FormattingPanelCloseButton.displayName = 'FormattingPanelCloseButton';
