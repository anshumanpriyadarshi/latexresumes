import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import type { Resume, TemplateId } from '@resume-builder/shared';
import { resumeSchema } from '@resume-builder/shared';
import { useStores } from '../../shared/hooks/useStores';
import { DashboardPanelActions } from './panel/DashboardPanelActions';
import { DashboardPanelHeader } from './panel/DashboardPanelHeader';
import { ResumeList } from './panel/ResumeList';

export const DashboardPanel = observer(() => {
  const { appStore } = useStores();
  const [importError, setImportError] = useState<string | null>(null);

  if (!appStore.dashboardOpen) return null;

  const handleCreate = (templateId: TemplateId = 'jakes'): void => {
    const name = `Resume ${appStore.resumes.length + 1}`;
    appStore.createResume(name, templateId);
  };

  const handleJSONImport = async (file: File): Promise<void> => {
    try {
      const raw = await file.text();
      const parsed = JSON.parse(raw);
      const result = resumeSchema.safeParse(parsed);

      if (!result.success) {
        setImportError(result.error.issues.map(issue => issue.message).join(', '));
        return;
      }

      const resume = JSON.parse(JSON.stringify(result.data)) as Resume;
      appStore.importResume(resume);
      appStore.toggleDashboard();
      setImportError(null);
    } catch {
      setImportError('Could not read JSON file');
    }
  };

  return (
    <aside className="absolute right-0 top-0 z-40 h-full w-[26rem] border-l border-slate-200 bg-white/95 shadow-2xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/95">
      <div className="flex h-full flex-col">
        <DashboardPanelHeader />
        <DashboardPanelActions
          importError={importError}
          onCreateResume={() => handleCreate('jakes')}
          onImportResume={file => void handleJSONImport(file)}
        />
        <ResumeList resumes={appStore.resumes} />
      </div>
    </aside>
  );
});

DashboardPanel.displayName = 'DashboardPanel';
