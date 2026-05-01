import { ResumeImportInput } from './ResumeImportInput';
import { ResumeManagementActionButton } from './ResumeManagementActionButton';

type DashboardPanelActionsProps = {
  importError: string | null;
  onCreateResume: () => void;
  onImportResume: (file: File) => void;
};

export function DashboardPanelActions({
  importError,
  onCreateResume,
  onImportResume,
}: DashboardPanelActionsProps) {
  return (
    <div className="border-b border-slate-200 px-4 py-4 dark:border-slate-700">
      <div className="flex gap-2">
        <ResumeManagementActionButton onClick={onCreateResume}>
          New Resume
        </ResumeManagementActionButton>
        <ResumeImportInput onFileSelect={onImportResume} />
      </div>
      {importError ? (
        <p className="mt-3 text-xs text-rose-600 dark:text-rose-400">{importError}</p>
      ) : null}
    </div>
  );
}

DashboardPanelActions.displayName = 'DashboardPanelActions';
