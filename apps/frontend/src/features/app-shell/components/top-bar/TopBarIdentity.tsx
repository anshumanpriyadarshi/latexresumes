import { observer } from 'mobx-react-lite';
import { useStores } from '../../../shared/hooks/useStores';

export const TopBarIdentity = observer(() => {
  const { appStore } = useStores();

  return (
    <div className="flex items-center gap-4">
      <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
        Resume Builder
      </h1>
      {appStore.activeResume ? (
        <input
          type="text"
          value={appStore.activeResume.name}
          onChange={event => appStore.updateActiveResumeName(event.target.value)}
          className="min-w-64 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          placeholder="Resume Name"
        />
      ) : null}
    </div>
  );
});

TopBarIdentity.displayName = 'TopBarIdentity';
