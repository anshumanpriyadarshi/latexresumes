import { observer } from 'mobx-react-lite';
import type { FontConfig, FontDef, FontWeight, SectionKey } from '@resume-builder/shared';
import { useStores } from '../../../../shared/hooks/useStores';
import { LaTeXUnitInput } from '../../LaTeXUnitInput';
import { FormattingFieldCard } from '../../shared/FormattingFieldCard';
import { OverrideClearButton } from '../../shared/OverrideClearButton';
import { FONT_FAMILIES, FONT_WEIGHT_OPTIONS } from './constants';

type FontFieldCardProps = {
  field: { key: keyof FontConfig; label: string };
  sectionOverride: boolean;
  sectionKey: SectionKey;
};

export const FontFieldCard = observer(({ field, sectionOverride, sectionKey }: FontFieldCardProps) => {
  const { formattingStore } = useStores();
  const formatting = formattingStore.formatting;

  if (!formatting) return null;

  const globalFont = formatting.global.fonts[field.key];
  const sectionFont = formatting.sections[sectionKey]?.fonts?.[field.key];
  const value = sectionOverride
    ? sectionFont ?? formattingStore.resolveFont(sectionKey, field.key)
    : globalFont;
  const isOverridden = sectionOverride && sectionFont !== undefined;
  // Keep imported custom font families visible even if they are not part of the built-in presets.
  const familyOptions = Array.from(new Set([...FONT_FAMILIES, value.family]));

  const updateFont = (nextValue: FontDef): void => {
    if (sectionOverride) {
      formattingStore.updateSectionFont(sectionKey, field.key, nextValue);
      return;
    }

    formattingStore.updateGlobalFont(field.key, nextValue);
  };

  return (
    <FormattingFieldCard
      label={field.label}
      headerContent={
        isOverridden ? (
          <OverrideClearButton
            onClick={() => formattingStore.updateSectionFont(sectionKey, field.key, undefined)}
          />
        ) : undefined
      }
      contentClassName="space-y-3"
    >
      <label className="mt-3 block space-y-1">
        <span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Family</span>
        <select
          value={value.family}
          onChange={event => updateFont({ ...value, family: event.target.value })}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        >
          {familyOptions.map(family => (
            <option key={family} value={family}>
              {family}
            </option>
          ))}
        </select>
      </label>

      <LaTeXUnitInput
        label="Size"
        value={value.size}
        onChange={nextValue => updateFont({ ...value, size: nextValue })}
        {...(sectionOverride ? { inheritedHint: globalFont.size } : {})}
      />

      <label className="block space-y-1">
        <span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Weight</span>
        <select
          value={value.weight}
          onChange={event => updateFont({ ...value, weight: event.target.value as FontWeight })}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        >
          {FONT_WEIGHT_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </FormattingFieldCard>
  );
});

FontFieldCard.displayName = 'FontFieldCard';
