import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { ResizableDivider, TopBar, useResizablePanel } from './features/app-shell';
import { SectionTabs } from './features/resume-editor';
import { DashboardPanel } from './features/resume-management';
import { FormattingPanel } from './features/formatting';
import { JakesHTMLPreview } from './features/templates';
import { useStores, StoreProvider } from './features/shared/state';
import { usePersistence } from './features/shared/hooks/usePersistence';

const EDITOR_RESIZE_CONFIG = {
  defaultValue: 40,
  min: 28,
  max: 56,
  label: 'Resize editor and preview panels',
};

const AppContent = observer(() => {
  const { appStore } = useStores();
  const editorResize = useResizablePanel(EDITOR_RESIZE_CONFIG);

  useEffect(() => {
    if (appStore.resumes.length === 0) {
      appStore.createResume('My Resume');
    }
  }, [appStore, appStore.resumes.length]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', appStore.colorTheme === 'dark');
  }, [appStore.colorTheme]);

  usePersistence(appStore);

  if (!appStore.activeResume) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-100 text-slate-700 dark:bg-slate-950 dark:text-slate-200">
        No resume loaded
      </div>
    );
  }

  return (
    <div className={appStore.colorTheme === 'dark' ? 'dark' : ''}>
      <div className="flex h-screen flex-col bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
        <TopBar />

        <div ref={editorResize.containerRef} className="relative flex min-h-0 flex-1 overflow-hidden">
          <aside
            className="min-w-[18rem] overflow-hidden border-r border-slate-200 bg-white shadow-inner dark:border-slate-700 dark:bg-slate-900"
            style={{ width: `${editorResize.value}%` }}
          >
            <SectionTabs />
          </aside>

          <ResizableDivider
            label={EDITOR_RESIZE_CONFIG.label}
            min={editorResize.min}
            max={editorResize.max}
            value={editorResize.value}
            isResizing={editorResize.isResizing}
            onPointerDown={editorResize.handlePointerDown}
            onKeyDown={editorResize.handleKeyDown}
          />

          <main className="min-h-0 min-w-0 flex-1 overflow-hidden">
            <JakesHTMLPreview />
          </main>

          <FormattingPanel />
          <DashboardPanel />
        </div>
      </div>
    </div>
  );
});

export function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
