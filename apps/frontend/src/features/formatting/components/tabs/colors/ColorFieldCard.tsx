import { observer } from 'mobx-react-lite';
import type { FormattingConfig } from '@resume-builder/shared';
import { useStores } from '../../../../shared/hooks/useStores';
import { FormattingFieldCard } from '../../shared/FormattingFieldCard';
import { COLOR_PRESETS } from './constants';
import { ColorPresetButton } from './ColorPresetButton';
import { normalizeHex } from './utils';

type ColorFieldCardProps = {
  field: { key: keyof FormattingConfig['global']['colors']; label: string };
};

export const ColorFieldCard = observer(({ field }: ColorFieldCardProps) => {
  const { formattingStore } = useStores();
  const formatting = formattingStore.formatting;

  if (!formatting) return null;

  const color = formatting.global.colors[field.key];

  return (
    <FormattingFieldCard
      label={field.label}
      headerContent={<span className="text-xs text-slate-400 dark:text-slate-500">#{color.hex}</span>}
      contentClassName="space-y-3"
    >
      <label className="mt-3 block space-y-1">
        <span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Hex</span>
        <input
          type="text"
          value={color.hex}
          onChange={event =>
            formattingStore.updateGlobalColor(field.key, {
              hex: normalizeHex(event.target.value),
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
          {COLOR_PRESETS.map(preset => (
            <ColorPresetButton
              key={preset.hex}
              hex={preset.hex}
              label={preset.label}
              active={color.hex.toLowerCase() === preset.hex}
              onClick={() =>
                formattingStore.updateGlobalColor(field.key, {
                  hex: preset.hex,
                  preset: preset.label.toLowerCase(),
                })
              }
            />
          ))}
        </div>
      </div>
    </FormattingFieldCard>
  );
});

ColorFieldCard.displayName = 'ColorFieldCard';
