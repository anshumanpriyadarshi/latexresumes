import { TopBarExportActions } from './top-bar/TopBarExportActions';
import { TopBarIdentity } from './top-bar/TopBarIdentity';
import { TopBarPrimaryActions } from './top-bar/TopBarPrimaryActions';

export function TopBar() {
  return (
    <div className="flex h-14 items-center justify-between border-b border-slate-200 bg-white/90 px-4 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
      <TopBarIdentity />

      <div className="flex items-center gap-2">
        <TopBarPrimaryActions />
        <TopBarExportActions />
      </div>
    </div>
  );
}

TopBar.displayName = 'TopBar';
