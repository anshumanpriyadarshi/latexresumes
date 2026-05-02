import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { TopBar } from './features/app-shell';
import { SectionTabs } from './features/resume-editor';
import { DashboardPanel } from './features/resume-management';
import { FormattingPanel } from './features/formatting';
import { JakesHTMLPreview } from './features/templates';
import { useStores, StoreProvider } from './features/shared/state';
import { usePersistence } from './features/shared/hooks/usePersistence';

const MIN_EDITOR_WIDTH = 28;
const MAX_EDITOR_WIDTH = 56;

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const AppContent = observer(() => {
  const { appStore } = useStores();
  const [editorWidth, setEditorWidth] = useState(40);

  useEffect(() => {
    if (appStore.resumes.length === 0) {
      appStore.createResume('My Resume');
    }
  }, [appStore, appStore.resumes.length]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', appStore.colorTheme === 'dark');
  }, [appStore.colorTheme]);

  usePersistence(appStore);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent): void => {
      const nextWidth = (event.clientX / window.innerWidth) * 100;
      setEditorWidth(clamp(nextWidth, MIN_EDITOR_WIDTH, MAX_EDITOR_WIDTH));
    };

    const handleMouseUp = (): void => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    const handleMouseDown = (event: MouseEvent): void => {
      event.preventDefault();
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    };

    const handle = document.getElementById('editor-resize-handle');
    handle?.addEventListener('mousedown', handleMouseDown);

    return () => {
      handle?.removeEventListener('mousedown', handleMouseDown);
      handleMouseUp();
    };
  }, []);

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

        <div className="relative flex min-h-0 flex-1 overflow-hidden">
          <aside
            className="min-w-[18rem] overflow-hidden border-r border-slate-200 bg-white shadow-inner dark:border-slate-700 dark:bg-slate-900"
            style={{ width: `${editorWidth}%` }}
          >
            <SectionTabs />
          </aside>

          <div
            id="editor-resize-handle"
            className="w-1 cursor-col-resize bg-slate-200 transition hover:bg-indigo-400 dark:bg-slate-700 dark:hover:bg-indigo-500"
            aria-hidden="true"
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
