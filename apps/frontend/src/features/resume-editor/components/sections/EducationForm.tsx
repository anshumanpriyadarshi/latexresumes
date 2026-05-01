import { observer } from 'mobx-react-lite';
import { useStores } from '../../../shared/hooks/useStores';
import { EducationEntryCard } from './education/EducationEntryCard';
import { EditorButton } from './shared/EditorButton';
import { EditorSectionHeader } from './shared/EditorSectionHeader';

export const EducationForm = observer(() => {
  const { resumeStore } = useStores();
  const education = resumeStore.content?.education;

  if (!education) return null;

  return (
    <div className="space-y-4 p-4">
      <EditorSectionHeader
        title="Education"
        action={
          <EditorButton compact onClick={() => resumeStore.addEducation()}>
            Add Entry
          </EditorButton>
        }
      />

      {education.map(entry => (
        <EducationEntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
});

EducationForm.displayName = 'EducationForm';
