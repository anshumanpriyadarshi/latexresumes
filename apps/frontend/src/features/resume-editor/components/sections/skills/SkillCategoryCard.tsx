import { observer } from 'mobx-react-lite';
import type { SkillCategory } from '@resume-builder/shared';
import { useStores } from '../../../../shared/hooks/useStores';
import { EditorButton } from '../shared/EditorButton';
import { EditorSectionCard } from '../shared/EditorSectionCard';

type SkillCategoryCardProps = {
  category: SkillCategory;
};

export const SkillCategoryCard = observer(({ category }: SkillCategoryCardProps) => {
  const { resumeStore } = useStores();

  return (
    <EditorSectionCard>
      <input
        type="text"
        placeholder="Category Name"
        value={category.category}
        onChange={event =>
          resumeStore.updateSkillCategory(category.id, { category: event.target.value })
        }
        className="w-full rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
      />

      <div className="space-y-2">
        <label className="text-sm font-semibold">Skills</label>
        {category.items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              placeholder="Skill"
              value={item}
              onChange={event => resumeStore.updateSkillItem(category.id, index, event.target.value)}
              className="flex-1 rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
            />
            <EditorButton
              variant="danger"
              compact
              onClick={() => resumeStore.removeSkillItem(category.id, index)}
            >
              X
            </EditorButton>
          </div>
        ))}

        <EditorButton
          variant="secondary"
          compact
          onClick={() => resumeStore.addSkillItem(category.id, '')}
        >
          Add Skill
        </EditorButton>
      </div>

      <EditorButton
        variant="danger"
        fullWidth
        onClick={() => resumeStore.removeSkillCategory(category.id)}
      >
        Remove Category
      </EditorButton>
    </EditorSectionCard>
  );
});

SkillCategoryCard.displayName = 'SkillCategoryCard';
