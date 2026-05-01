import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import type { SectionKey } from '@resume-builder/shared';
import { useStores } from '../../shared/hooks/useStores';
import { AlignmentTab } from './tabs/alignment';
import { ColorsTab } from './tabs/colors';
import { FontsTab } from './tabs/fonts';
import { SpacingTab } from './tabs/spacing';
import { FormattingPanelHeader } from './panel/FormattingPanelHeader';
import { FormattingScopeControls } from './panel/FormattingScopeControls';
import { FormattingTabNavigation } from './panel/FormattingTabNavigation';
import { ThemeControls } from './panel/ThemeControls';
import type { TabKey } from './panel/constants';

export const FormattingPanel = observer(() => {
  const { appStore, formattingStore } = useStores();
  const [activeTab, setActiveTab] = useState<TabKey>('spacing');
  const [sectionOverride, setSectionOverride] = useState(false);
  const [sectionKey, setSectionKey] = useState<SectionKey>('experience');

  if (!formattingStore.formatting) return null;

  return (
    <aside
      className={`absolute left-0 top-0 z-30 h-full w-[24rem] border-r border-slate-200 bg-white/95 shadow-2xl backdrop-blur transition-transform duration-300 dark:border-slate-700 dark:bg-slate-900/95 ${
        appStore.formattingPanelOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex h-full flex-col">
        <FormattingPanelHeader />
        <ThemeControls />
        <FormattingScopeControls
          sectionOverride={sectionOverride}
          sectionKey={sectionKey}
          onSectionOverrideChange={setSectionOverride}
          onSectionKeyChange={setSectionKey}
        />
        <FormattingTabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {activeTab === 'spacing' && (
            <SpacingTab sectionOverride={sectionOverride} sectionKey={sectionKey} />
          )}
          {activeTab === 'fonts' && (
            <FontsTab sectionOverride={sectionOverride} sectionKey={sectionKey} />
          )}
          {activeTab === 'colors' && <ColorsTab />}
          {activeTab === 'alignment' && (
            <AlignmentTab sectionOverride={sectionOverride} sectionKey={sectionKey} />
          )}
        </div>
      </div>
    </aside>
  );
});

FormattingPanel.displayName = 'FormattingPanel';
