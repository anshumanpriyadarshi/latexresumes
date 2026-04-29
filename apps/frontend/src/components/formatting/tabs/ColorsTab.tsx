import { observer } from 'mobx-react-lite';
import type { FormattingConfig } from '@resume-builder/shared';
import { useStores } from '../../../hooks/useStores';

const COLOR_FIELDS: ReadonlyArray<{ key: keyof FormattingConfig['global']['colors']; label: string }> = [
  { key: 'accent', label: 'Accent' },
  { key: 'nameText', label: 'Name text' },
  { key: 'bodyText', label: 'Body text' },
  { key: 'dateText', label: 'Date text' },
];

const COLOR_PRESETS: ReadonlyArray<{ hex: string; label: string }> = [
  { hex: '4f46e5', label: 'Indigo' },
  { hex: '0f766e', label: 'Teal' },
  { hex: '2563eb', label: 'Blue' },
  { hex: '15803d', label: 'Green' },
  { hex: 'b45309', label: 'Amber' },
  { hex: '374151', label: 'Slate' },
  { hex: '000000', label: 'Black' },
  { hex: 'ef4444', label: 'Red' },
];

const normalizeHex = (value: string): string => value.replace(/^#/, '').slice(0, 6).toLowerCase();

export const ColorsTab = observer(() => {
  const { formattingStore } = useStores();
  const formatting = formattingStore.formatting;

  if (!formatting) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">Colors</h3>
        <span className="text-xs text-slate-500 dark:text-slate-400">Global only in v1</span>
      </div>

      <div className="space-y-3">
        {COLOR_FIELDS.map(field => {
          const color = formatting.global.colors[field.key];

          return (
            <div key={field.key} className="space-y-3 rounded-md border border-slate-200 p-3 dark:border-slate-700">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{field.label}</span>
                <span className="text-xs text-slate-400 dark:text-slate-500">#{color.hex}</span>
              </div>

              <label className="block space-y-1">
                <span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Hex</span>
                  <input
                    type="text"
                    value={color.hex}
                    onChange={e =>
                    formattingStore.updateGlobalColor(field.key, {
                      hex: normalizeHex(e.target.value),
                      ...(color.preset ? { preset: color.preset } : {}),
                    })
                  }
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                  />
              </label>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Presets
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {COLOR_PRESETS.map(preset => {
                    const active = color.hex.toLowerCase() === preset.hex;
                    return (
                      <button
                        key={preset.hex}
                        onClick={() =>
                          formattingStore.updateGlobalColor(field.key, {
                            hex: preset.hex,
                            preset: preset.label.toLowerCase(),
                          })
                        }
                        className={`flex flex-col items-center gap-1 rounded-md border px-2 py-2 text-[11px] transition ${
                          active
                            ? 'border-slate-900 bg-slate-100 text-slate-900 dark:border-white dark:bg-slate-800 dark:text-white'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
                        }`}
                      >
                        <span
                          className="h-6 w-6 rounded-full border border-white shadow"
                          style={{ backgroundColor: `#${preset.hex}` }}
                        />
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

ColorsTab.displayName = 'ColorsTab';
