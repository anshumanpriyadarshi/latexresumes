import { TAB_KEYS, type TabKey } from './constants';

type FormattingTabNavigationProps = {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
};

export function FormattingTabNavigation({
  activeTab,
  onTabChange,
}: FormattingTabNavigationProps) {
  const getTabButtonClassName = (tab: TabKey): string =>
    `flex-1 rounded-md px-3 py-2 text-sm font-medium transition ${
      activeTab === tab
        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
    }`;

  return (
    <div className="flex gap-2 border-b border-slate-200 px-4 py-3 dark:border-slate-700">
      {TAB_KEYS.map(tab => (
        <button key={tab} onClick={() => onTabChange(tab)} className={getTabButtonClassName(tab)}>
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
}

FormattingTabNavigation.displayName = 'FormattingTabNavigation';
