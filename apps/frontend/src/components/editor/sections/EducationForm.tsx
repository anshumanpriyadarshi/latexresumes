import { observer } from 'mobx-react-lite';
import type { Education } from '@resume-builder/shared';
import { useStores } from '../../../hooks/useStores';

export const EducationForm = observer(() => {
  const { resumeStore } = useStores();
  const education = resumeStore.content?.education;

  if (!education) return null;

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Education</h2>
        <button
          onClick={() => resumeStore.addEducation()}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Add Entry
        </button>
      </div>

      {education.map(entry => (
        <div key={entry.id} className="border rounded p-4 space-y-3 dark:border-slate-600">
          <input
            type="text"
            placeholder="Institution"
            value={entry.institution}
            onChange={e => resumeStore.updateEducation(entry.id, { institution: e.target.value })}
            className="w-full border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Degree"
              value={entry.degree}
              onChange={e => resumeStore.updateEducation(entry.id, { degree: e.target.value })}
              className="border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
            />
            <input
              type="text"
              placeholder="Field of Study"
              value={entry.field}
              onChange={e => resumeStore.updateEducation(entry.id, { field: e.target.value })}
              className="border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Start Date"
              value={entry.startDate}
              onChange={e => resumeStore.updateEducation(entry.id, { startDate: e.target.value })}
              className="border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
            />
            <input
              type="text"
              placeholder="End Date"
              value={entry.endDate}
              onChange={e => resumeStore.updateEducation(entry.id, { endDate: e.target.value })}
              className="border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="GPA (optional)"
              value={entry.gpa || ''}
              onChange={e => {
                const value = e.target.value;
                const patch: Partial<Omit<Education, 'id'>> = value ? { gpa: value } : {};
                resumeStore.updateEducation(entry.id, patch);
              }}
              className="border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
            />
            <input
              type="text"
              placeholder="Honors (optional)"
              value={entry.honors || ''}
              onChange={e => {
                const value = e.target.value;
                const patch: Partial<Omit<Education, 'id'>> = value ? { honors: value } : {};
                resumeStore.updateEducation(entry.id, patch);
              }}
              className="border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
            />
          </div>

          <button
            onClick={() => resumeStore.removeEducation(entry.id)}
            className="w-full bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
          >
            Remove Entry
          </button>
        </div>
      ))}
    </div>
  );
});

EducationForm.displayName = 'EducationForm';
