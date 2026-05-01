import { observer } from 'mobx-react-lite';
import type { Experience } from '@resume-builder/shared';
import { useStores } from '../../../../shared/hooks/useStores';
import { BulletListEditor } from '../shared/BulletListEditor';
import { EditorButton } from '../shared/EditorButton';
import { EditorSectionCard } from '../shared/EditorSectionCard';

type ExperienceEntryCardProps = {
  entry: Experience;
};

export const ExperienceEntryCard = observer(({ entry }: ExperienceEntryCardProps) => {
  const { resumeStore } = useStores();

  return (
    <EditorSectionCard>
      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Role"
          value={entry.role}
          onChange={event => resumeStore.updateExperience(entry.id, { role: event.target.value })}
          className="rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
        />
        <input
          type="text"
          placeholder="Company"
          value={entry.company}
          onChange={event => resumeStore.updateExperience(entry.id, { company: event.target.value })}
          className="rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
        />
      </div>

      <input
        type="text"
        placeholder="Location"
        value={entry.location}
        onChange={event => resumeStore.updateExperience(entry.id, { location: event.target.value })}
        className="w-full rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
      />

      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Start Date"
          value={entry.startDate}
          onChange={event => resumeStore.updateExperience(entry.id, { startDate: event.target.value })}
          className="rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
        />
        <input
          type="text"
          placeholder="End Date"
          value={entry.endDate}
          onChange={event => resumeStore.updateExperience(entry.id, { endDate: event.target.value })}
          className="rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
        />
      </div>

      <BulletListEditor
        bullets={entry.bullets}
        onAddBullet={() => resumeStore.addBullet(entry.id, 'experience')}
        onUpdateBullet={(bulletId, content) =>
          resumeStore.updateBullet(entry.id, bulletId, content, 'experience')
        }
        onRemoveBullet={bulletId => resumeStore.removeBullet(entry.id, bulletId, 'experience')}
      />

      <EditorButton variant="danger" fullWidth onClick={() => resumeStore.removeExperience(entry.id)}>
        Remove Entry
      </EditorButton>
    </EditorSectionCard>
  );
});

ExperienceEntryCard.displayName = 'ExperienceEntryCard';
