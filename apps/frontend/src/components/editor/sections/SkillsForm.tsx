import { observer } from 'mobx-react-lite';
import { useStores } from '../../../hooks/useStores';

export const SkillsForm = observer(() => {
  const { resumeStore } = useStores();
  const skills = resumeStore.content?.skills;

  if (!skills) return null;

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Skills</h2>
        <button
          onClick={() => resumeStore.addSkillCategory()}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Add Category
        </button>
      </div>

      {skills.map(category => (
        <div key={category.id} className="border rounded p-4 space-y-3 dark:border-slate-600">
          <input
            type="text"
            placeholder="Category Name"
            value={category.category}
            onChange={e => resumeStore.updateSkillCategory(category.id, { category: e.target.value })}
            className="w-full border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
          />

          <div className="space-y-2">
            <label className="text-sm font-semibold">Skills</label>
            {category.items.map((item, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Skill"
                  value={item}
                  onChange={e => {
                    const newItems = [...category.items];
                    newItems[idx] = e.target.value;
                    resumeStore.updateSkillCategory(category.id, { items: newItems });
                  }}
                  className="flex-1 border rounded px-3 py-2 dark:bg-slate-700 dark:text-white"
                />
                <button
                  onClick={() => resumeStore.removeSkillItem(category.id, idx)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={() => resumeStore.addSkillItem(category.id, '')}
              className="text-xs bg-gray-300 dark:bg-slate-600 px-2 py-1 rounded hover:bg-gray-400"
            >
              Add Skill
            </button>
          </div>

          <button
            onClick={() => resumeStore.removeSkillCategory(category.id)}
            className="w-full bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
          >
            Remove Category
          </button>
        </div>
      ))}
    </div>
  );
});

SkillsForm.displayName = 'SkillsForm';
