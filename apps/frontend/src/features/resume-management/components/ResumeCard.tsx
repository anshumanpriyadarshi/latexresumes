import { observer } from 'mobx-react-lite';
import type { Resume } from '@resume-builder/shared';
import { useStores } from '../../shared/hooks/useStores';
import { downloadJSON } from '../../export/utils/jsonExporter';
import { ResumeCardActions } from './card/ResumeCardActions';
import { ResumeCardHeader } from './card/ResumeCardHeader';

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
        <ResumeCardHeader name={resume.name} updatedAt={resume.updatedAt} isActive={isActive} />
        <ResumeCardActions
          onOpen={() => appStore.setActiveResume(resume.id)}
          onDuplicate={() => appStore.duplicateResume(resume.id)}
          onExport={() => downloadJSON(resume)}
          onDelete={() => appStore.deleteResume(resume.id)}
        />
      </div>
    </article>
  );
});

ResumeCard.displayName = 'ResumeCard';
