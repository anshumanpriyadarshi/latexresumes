import { observer } from 'mobx-react-lite';
import type { Project } from '@resume-builder/shared';
import { httpUrlSchema } from '@resume-builder/shared';
import { useStores } from '../../../hooks/useStores';

export const ProjectsForm = observer(() => {
  const { resumeStore } = useStores();
  const projects = resumeStore.content?.projects;

  if (!projects) return null;

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Projects</h2>
        <button
          onClick={() => resumeStore.addProject()}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Add Project
        </button>
      </div>

      {projects.map(project => (
        <div key={project.id} className="border rounded p-4 space-y-3 dark:border-slate-600">
          <input
            type="text"
            placeholder="Project Name"
            value={project.name}
            onChange={e => resumeStore.updateProject(project.id, { name: e.target.value })}
            className="w-full border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Tech Stack (comma-separated)"
              value={project.techStack.join(', ')}
              onChange={e =>
                resumeStore.updateProject(project.id, {
                  techStack: e.target.value.split(',').map(s => s.trim()).filter(Boolean),
                })
              }
              className="border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
            />
            <div />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Start Date"
              value={project.startDate}
              onChange={e => resumeStore.updateProject(project.id, { startDate: e.target.value })}
              className="border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
            />
            <input
              type="text"
              placeholder="End Date"
              value={project.endDate}
              onChange={e => resumeStore.updateProject(project.id, { endDate: e.target.value })}
              className="border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
            />
          </div>

          <input
            type="url"
            placeholder="Live URL (optional)"
            value={(project.liveUrl as string) || ''}
            onChange={e => {
              const value = e.target.value;
              const patch: Partial<Omit<Project, 'id'>> = {};
              if (value) {
                const result = httpUrlSchema.safeParse(value);
                if (!result.success) return;
                patch.liveUrl = result.data;
              }
              resumeStore.updateProject(project.id, patch);
            }}
            className="w-full border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
          />

          <input
            type="url"
            placeholder="Repository URL (optional)"
            value={(project.repoUrl as string) || ''}
            onChange={e => {
              const value = e.target.value;
              const patch: Partial<Omit<Project, 'id'>> = {};
              if (value) {
                const result = httpUrlSchema.safeParse(value);
                if (!result.success) return;
                patch.repoUrl = result.data;
              }
              resumeStore.updateProject(project.id, patch);
            }}
            className="w-full border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
          />

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-semibold">Bullet Points</label>
              <button
                onClick={() => resumeStore.addBullet(project.id, 'projects')}
                className="text-xs bg-gray-300 dark:bg-slate-600 px-2 py-1 rounded hover:bg-gray-400"
              >
                Add
              </button>
            </div>
            {project.bullets.map(bullet => (
              <div key={bullet.id} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Bullet point"
                  value={bullet.content}
                  onChange={e =>
                    resumeStore.updateBullet(project.id, bullet.id, e.target.value, 'projects')
                  }
                  className="flex-1 border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
                />
                <button
                  onClick={() => resumeStore.removeBullet(project.id, bullet.id, 'projects')}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => resumeStore.removeProject(project.id)}
            className="w-full bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
          >
            Remove Project
          </button>
        </div>
      ))}
    </div>
  );
});

ProjectsForm.displayName = 'ProjectsForm';
