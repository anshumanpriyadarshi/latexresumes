import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../shared/hooks/useStores';
import { TopBarButton } from '../TopBarButton';

export const ResumeDashboardButton = observer(() => {
  const { appStore } = useStores();

  return (
    <TopBarButton
      onClick={() => appStore.toggleDashboard()}
      className="bg-indigo-600 text-white hover:bg-indigo-500"
    >
      Resumes
    </TopBarButton>
  );
});

ResumeDashboardButton.displayName = 'ResumeDashboardButton';
