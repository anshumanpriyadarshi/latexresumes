import { SECTION_TABS, type SectionTabKey } from './constants';

type SectionTabNavigationProps = {
  activeTab: SectionTabKey;
  onTabChange: (tab: SectionTabKey) => void;
};

export function SectionTabNavigation({
  activeTab,
  onTabChange,
}: SectionTabNavigationProps) {
  return (
    <div className="flex max-w-full shrink-0 gap-2 overflow-x-auto overflow-y-hidden border-b bg-gray-50 px-4 py-2 dark:border-slate-600 dark:bg-slate-800">
      {SECTION_TABS.map(tab => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`shrink-0 rounded-t px-4 py-2 font-medium transition-colors ${
            activeTab === tab.key
              ? 'bg-white text-blue-600 dark:bg-slate-700 dark:text-blue-400'
              : 'text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

SectionTabNavigation.displayName = 'SectionTabNavigation';
