import { observer } from 'mobx-react-lite';
import type { Resume } from '@resume-builder/shared';
import { useStores } from '../../hooks/useStores';
import { downloadJSON } from '../../utils/jsonExporter';

type ResumeCardProps = {
  resume: Resume;
};

export const ResumeCard = observer(({ resume }: ResumeCardProps) => {
  const { appStore } = useStores();
  const isActive = appStore.activeResumeId === resume.id;

  return (
    <article
      className={`rounded-xl border p-4 shadow-sm transition ${
        isActive
          ? 'border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-slate-800'
          : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900'
      }`}
    >
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{resume.name}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Updated {new Date(resume.updatedAt).toLocaleString()}
            </p>
          </div>
          {isActive ? (
            <span className="rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-medium text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
              Active
            </span>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={() => appStore.setActiveResume(resume.id)}
            className="rounded-md bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Open
          </button>
          <button
            onClick={() => appStore.duplicateResume(resume.id)}
            className="rounded-md bg-indigo-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-indigo-500"
          >
            Duplicate
          </button>
          <button
            onClick={() => downloadJSON(resume)}
            className="rounded-md bg-emerald-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-emerald-500"
          >
            Export
          </button>
          <button
            onClick={() => appStore.deleteResume(resume.id)}
            className="rounded-md bg-rose-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-rose-500"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
});

ResumeCard.displayName = 'ResumeCard';
