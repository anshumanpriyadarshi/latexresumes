import { observer } from 'mobx-react-lite';
import type { Project } from '@resume-builder/shared';
import { useStores } from '../../../../shared/hooks/useStores';
import { BulletListEditor } from '../shared/BulletListEditor';
import { EditorButton } from '../shared/EditorButton';
import { EditorSectionCard } from '../shared/EditorSectionCard';
import { getOptionalHttpUrlPatch, splitCommaSeparatedValues } from '../shared/helpers';

type ProjectEntryCardProps = {
  project: Project;
};

export const ProjectEntryCard = observer(({ project }: ProjectEntryCardProps) => {
  const { resumeStore } = useStores();

  const handleOptionalUrlChange = (field: 'liveUrl' | 'repoUrl', value: string): void => {
    const patch = getOptionalHttpUrlPatch(field, value);
    if (patch === null) return;
    resumeStore.updateProject(project.id, patch as Partial<Omit<Project, 'id'>>);
  };

  return (
    <EditorSectionCard>
      <input
        type="text"
        placeholder="Project Name"
        value={project.name}
        onChange={event => resumeStore.updateProject(project.id, { name: event.target.value })}
        className="w-full rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
      />

      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Tech Stack (comma-separated)"
          value={project.techStack.join(', ')}
          onChange={event =>
            resumeStore.updateProject(project.id, {
              techStack: splitCommaSeparatedValues(event.target.value),
            })
          }
          className="rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
        />
        <div />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Start Date"
          value={project.startDate}
          onChange={event => resumeStore.updateProject(project.id, { startDate: event.target.value })}
          className="rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
        />
        <input
          type="text"
          placeholder="End Date"
          value={project.endDate}
          onChange={event => resumeStore.updateProject(project.id, { endDate: event.target.value })}
          className="rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
        />
      </div>

      <input
        type="url"
        placeholder="Live URL (optional)"
        value={(project.liveUrl as string) || ''}
        onChange={event => handleOptionalUrlChange('liveUrl', event.target.value)}
        className="w-full rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
      />

      <input
        type="url"
        placeholder="Repository URL (optional)"
        value={(project.repoUrl as string) || ''}
        onChange={event => handleOptionalUrlChange('repoUrl', event.target.value)}
        className="w-full rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
      />

      <BulletListEditor
        bullets={project.bullets}
        onAddBullet={() => resumeStore.addBullet(project.id, 'projects')}
        onUpdateBullet={(bulletId, content) =>
          resumeStore.updateBullet(project.id, bulletId, content, 'projects')
        }
        onRemoveBullet={bulletId => resumeStore.removeBullet(project.id, bulletId, 'projects')}
      />

      <EditorButton variant="danger" fullWidth onClick={() => resumeStore.removeProject(project.id)}>
        Remove Project
      </EditorButton>
    </EditorSectionCard>
  );
});

ProjectEntryCard.displayName = 'ProjectEntryCard';
