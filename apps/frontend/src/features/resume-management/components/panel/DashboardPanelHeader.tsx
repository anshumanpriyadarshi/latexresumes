import { DashboardPanelCloseButton } from './DashboardPanelCloseButton';
import { DashboardPanelHeaderContent } from './DashboardPanelHeaderContent';

export function DashboardPanelHeader() {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 dark:border-slate-700">
      <DashboardPanelHeaderContent />
      <DashboardPanelCloseButton />
    </div>
  );
}

DashboardPanelHeader.displayName = 'DashboardPanelHeader';
