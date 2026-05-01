import { observer } from 'mobx-react-lite';
import type { Education } from '@resume-builder/shared';
import { useStores } from '../../../../shared/hooks/useStores';
import { EditorButton } from '../shared/EditorButton';
import { EditorSectionCard } from '../shared/EditorSectionCard';
import { getOptionalTextPatch } from '../shared/helpers';

type EducationEntryCardProps = {
  entry: Education;
};

export const EducationEntryCard = observer(({ entry }: EducationEntryCardProps) => {
  const { resumeStore } = useStores();

  return (
    <EditorSectionCard>
      <input
        type="text"
        placeholder="Institution"
        value={entry.institution}
        onChange={event => resumeStore.updateEducation(entry.id, { institution: event.target.value })}
        className="w-full rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
      />

      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Degree"
          value={entry.degree}
          onChange={event => resumeStore.updateEducation(entry.id, { degree: event.target.value })}
          className="rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
        />
        <input
          type="text"
          placeholder="Field of Study"
          value={entry.field}
          onChange={event => resumeStore.updateEducation(entry.id, { field: event.target.value })}
          className="rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Start Date"
          value={entry.startDate}
          onChange={event => resumeStore.updateEducation(entry.id, { startDate: event.target.value })}
          className="rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
        />
        <input
          type="text"
          placeholder="End Date"
          value={entry.endDate}
          onChange={event => resumeStore.updateEducation(entry.id, { endDate: event.target.value })}
          className="rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="GPA (optional)"
          value={entry.gpa || ''}
          onChange={event => resumeStore.updateEducation(entry.id, getOptionalTextPatch('gpa', event.target.value))}
          className="rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
        />
        <input
          type="text"
          placeholder="Honors (optional)"
          value={entry.honors || ''}
          onChange={event =>
            resumeStore.updateEducation(entry.id, getOptionalTextPatch('honors', event.target.value))
          }
          className="rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
        />
      </div>

      <EditorButton variant="danger" fullWidth onClick={() => resumeStore.removeEducation(entry.id)}>
        Remove Entry
      </EditorButton>
    </EditorSectionCard>
  );
});

EducationEntryCard.displayName = 'EducationEntryCard';
