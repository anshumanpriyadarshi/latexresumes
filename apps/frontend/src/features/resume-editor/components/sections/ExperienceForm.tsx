import { observer } from 'mobx-react-lite';
import { useStores } from '../../../shared/hooks/useStores';
import { ExperienceEntryCard } from './experience/ExperienceEntryCard';
import { EditorButton } from './shared/EditorButton';
import { EditorSectionHeader } from './shared/EditorSectionHeader';

export const ExperienceForm = observer(() => {
  const { resumeStore } = useStores();
  const experience = resumeStore.content?.experience;

  if (!experience) return null;

  return (
    <div className="space-y-4 p-4">
      <EditorSectionHeader
        title="Experience"
        action={
          <EditorButton compact onClick={() => resumeStore.addExperience()}>
            Add Entry
          </EditorButton>
        }
      />

      {experience.map(entry => (
        <ExperienceEntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
});

ExperienceForm.displayName = 'ExperienceForm';
