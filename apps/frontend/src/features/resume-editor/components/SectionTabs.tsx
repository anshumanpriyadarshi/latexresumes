import { useState } from 'react';
import { SectionTabContent } from './section-tabs/SectionTabContent';
import { SectionTabNavigation } from './section-tabs/SectionTabNavigation';
import type { SectionTabKey } from './section-tabs/constants';

export function SectionTabs() {
  const [activeTab, setActiveTab] = useState<SectionTabKey>('personal');

  return (
    <div className="flex h-full min-h-0 flex-col">
      <SectionTabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <SectionTabContent activeTab={activeTab} />
    </div>
  );
}
