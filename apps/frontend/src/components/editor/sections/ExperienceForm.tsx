import { observer } from 'mobx-react-lite';
import { useStores } from '../../../hooks/useStores';

export const ExperienceForm = observer(() => {
  const { resumeStore } = useStores();
  const experience = resumeStore.content?.experience;

  if (!experience) return null;

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Experience</h2>
        <button
          onClick={() => resumeStore.addExperience()}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Add Entry
        </button>
      </div>

      {experience.map(entry => (
        <div key={entry.id} className="border rounded p-4 space-y-3 dark:border-slate-600">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Role"
              value={entry.role}
              onChange={e => resumeStore.updateExperience(entry.id, { role: e.target.value })}
              className="border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
            />
            <input
              type="text"
              placeholder="Company"
              value={entry.company}
              onChange={e => resumeStore.updateExperience(entry.id, { company: e.target.value })}
              className="border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
            />
          </div>

          <input
            type="text"
            placeholder="Location"
            value={entry.location}
            onChange={e => resumeStore.updateExperience(entry.id, { location: e.target.value })}
            className="w-full border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Start Date"
              value={entry.startDate}
              onChange={e => resumeStore.updateExperience(entry.id, { startDate: e.target.value })}
              className="border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
            />
            <input
              type="text"
              placeholder="End Date"
              value={entry.endDate}
              onChange={e => resumeStore.updateExperience(entry.id, { endDate: e.target.value })}
              className="border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-semibold">Bullet Points</label>
              <button
                onClick={() => resumeStore.addBullet(entry.id, 'experience')}
                className="text-xs bg-gray-300 dark:bg-slate-600 px-2 py-1 rounded hover:bg-gray-400"
              >
                Add
              </button>
            </div>
            {entry.bullets.map(bullet => (
              <div key={bullet.id} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Bullet point"
                  value={bullet.content}
                  onChange={e =>
                    resumeStore.updateBullet(entry.id, bullet.id, e.target.value, 'experience')
                  }
                  className="flex-1 border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
                />
                <button
                  onClick={() => resumeStore.removeBullet(entry.id, bullet.id, 'experience')}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => resumeStore.removeExperience(entry.id)}
            className="w-full bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
          >
            Remove Entry
          </button>
        </div>
      ))}
    </div>
  );
});

ExperienceForm.displayName = 'ExperienceForm';
