import { observer } from 'mobx-react-lite';
import type { BulletPoint } from '@resume-builder/shared';

type BulletListEditorProps = {
  bullets: BulletPoint[];
  onAddBullet: () => void;
  onUpdateBullet: (bulletId: string, content: string) => void;
  onRemoveBullet: (bulletId: string) => void;
};

export const BulletListEditor = observer(function BulletListEditor({
  bullets,
  onAddBullet,
  onUpdateBullet,
  onRemoveBullet,
}: BulletListEditorProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <label className="text-sm font-semibold">Bullet Points</label>
        <button
          type="button"
          onClick={onAddBullet}
          className="rounded bg-gray-300 px-2 py-1 text-xs hover:bg-gray-400 dark:bg-slate-600"
        >
          Add
        </button>
      </div>

      {bullets.map(bullet => (
        <div key={bullet.id} className="flex gap-2">
          <input
            type="text"
            placeholder="Bullet point"
            value={bullet.content}
            onChange={event => onUpdateBullet(bullet.id, event.target.value)}
            className="flex-1 rounded border px-3 py-2 dark:bg-slate-700 dark:text-white"
          />
          <button
            type="button"
            onClick={() => onRemoveBullet(bullet.id)}
            className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
});

BulletListEditor.displayName = 'BulletListEditor';
