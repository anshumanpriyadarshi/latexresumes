import { observer } from 'mobx-react-lite';
import type { FontConfig, FontDef, FontWeight, SectionKey } from '@resume-builder/shared';
import { useStores } from '../../../hooks/useStores';
import { LaTeXUnitInput } from '../LaTeXUnitInput';

const FONT_FAMILIES = [
  'Calibri',
  'Helvetica',
  'Arial',
  'Georgia',
  'Times New Roman',
  'Computer Modern',
  'Latin Modern',
] as const;

const FONT_FIELDS: ReadonlyArray<{ key: keyof FontConfig; label: string }> = [
  { key: 'name', label: 'Name' },
  { key: 'sectionTitle', label: 'Section title' },
  { key: 'entryTitle', label: 'Entry title' },
  { key: 'entrySubtitle', label: 'Entry subtitle' },
  { key: 'bodyText', label: 'Body text' },
  { key: 'dateLine', label: 'Date line' },
];

type FontsTabProps = {
  sectionOverride: boolean;
  sectionKey: SectionKey;
};

export const FontsTab = observer(({ sectionOverride, sectionKey }: FontsTabProps) => {
  const { formattingStore } = useStores();
  const formatting = formattingStore.formatting;

  if (!formatting) return null;

  const renderFontRow = (key: keyof FontConfig, label: string): JSX.Element => {
    const globalFont = formatting.global.fonts[key];
    const sectionFont = formatting.sections[sectionKey]?.fonts?.[key];
    const value = sectionOverride ? sectionFont ?? formattingStore.resolveFont(sectionKey, key) : globalFont;
    const isOverridden = sectionOverride && sectionFont !== undefined;
    const familyOptions = Array.from(new Set([...FONT_FAMILIES, value.family]));

    const updateFont = (next: FontDef): void => {
      if (sectionOverride) {
        formattingStore.updateSectionFont(sectionKey, key, next);
        return;
      }
      formattingStore.updateGlobalFont(key, next);
    };

    const updateFamily = (family: string): void => {
      updateFont({ ...value, family });
    };

    const updateWeight = (weight: FontWeight): void => {
      updateFont({ ...value, weight });
    };

    return (
      <div key={key} className="space-y-3 rounded-md border border-slate-200 p-3 dark:border-slate-700">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>
          {isOverridden ? (
            <button
              onClick={() => formattingStore.updateSectionFont(sectionKey, key, undefined)}
              className="text-xs font-medium text-rose-600 hover:text-rose-500 dark:text-rose-400"
            >
              Clear
            </button>
          ) : null}
        </div>

        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Family</span>
          <select
            value={value.family}
            onChange={e => updateFamily(e.target.value)}
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
          onChange={next => updateFont({ ...value, size: next })}
          {...(sectionOverride ? { inheritedHint: globalFont.size } : {})}
        />

        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Weight</span>
          <select
            value={value.weight}
            onChange={e => updateWeight(e.target.value as FontWeight)}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="light">Light</option>
          </select>
        </label>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">Fonts</h3>
        {sectionOverride ? (
          <span className="text-xs text-slate-500 dark:text-slate-400">Overrides {sectionKey}</span>
        ) : (
          <span className="text-xs text-slate-500 dark:text-slate-400">Global formatting</span>
        )}
      </div>

      <div className="space-y-3">
        {FONT_FIELDS.map(field => renderFontRow(field.key, field.label))}
      </div>
    </div>
  );
});

FontsTab.displayName = 'FontsTab';
