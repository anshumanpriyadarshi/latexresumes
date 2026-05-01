import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../shared/hooks/useStores';
import { TopBarButton } from '../TopBarButton';

export const ThemeToggleButton = observer(() => {
  const { appStore } = useStores();

  return (
    <TopBarButton
      onClick={() => appStore.toggleTheme()}
      className="bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
    >
      {appStore.colorTheme === 'light' ? 'Dark' : 'Light'}
    </TopBarButton>
  );
});

ThemeToggleButton.displayName = 'ThemeToggleButton';
