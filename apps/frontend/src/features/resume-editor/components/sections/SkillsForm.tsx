import { observer } from 'mobx-react-lite';
import { useStores } from '../../../shared/hooks/useStores';
import { SkillCategoryCard } from './skills/SkillCategoryCard';
import { EditorButton } from './shared/EditorButton';
import { EditorSectionHeader } from './shared/EditorSectionHeader';

export const SkillsForm = observer(() => {
  const { resumeStore } = useStores();
  const skills = resumeStore.content?.skills;

  if (!skills) return null;

  return (
    <div className="space-y-4 p-4">
      <EditorSectionHeader
        title="Skills"
        action={
          <EditorButton compact onClick={() => resumeStore.addSkillCategory()}>
            Add Category
          </EditorButton>
        }
      />

      {skills.map(category => (
        <SkillCategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
});

SkillsForm.displayName = 'SkillsForm';
