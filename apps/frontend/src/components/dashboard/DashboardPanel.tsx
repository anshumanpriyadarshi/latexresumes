import { useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import type { Resume, TemplateId } from '@resume-builder/shared';
import { resumeSchema } from '@resume-builder/shared';
import { useStores } from '../../hooks/useStores';
import { ResumeCard } from './ResumeCard';

export const DashboardPanel = observer(() => {
  const { appStore } = useStores();
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!appStore.dashboardOpen) return null;

  const handleCreate = (templateId: TemplateId = 'jakes'): void => {
    const name = `Resume ${appStore.resumes.length + 1}`;
    appStore.createResume(name, templateId);
  };

  const handleImportClick = (): void => {
    fileInputRef.current?.click();
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
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 dark:border-slate-700">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Resumes</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Create, switch, duplicate, delete, or import a resume.
            </p>
          </div>
          <button
            onClick={() => appStore.toggleDashboard()}
            className="rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Close
          </button>
        </div>

        <div className="border-b border-slate-200 px-4 py-4 dark:border-slate-700">
          <div className="flex gap-2">
            <button
              onClick={() => handleCreate('jakes')}
              className="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
            >
              New Resume
            </button>
            <button
              onClick={handleImportClick}
              className="flex-1 rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
            >
              Import JSON
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            className="hidden"
            onChange={event => {
              const file = event.target.files?.[0];
              event.target.value = '';
              if (file) {
                void handleJSONImport(file);
              }
            }}
          />
          {importError ? (
            <p className="mt-3 text-xs text-rose-600 dark:text-rose-400">{importError}</p>
          ) : null}
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid gap-3">
            {appStore.resumes.map(resume => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
});

DashboardPanel.displayName = 'DashboardPanel';
