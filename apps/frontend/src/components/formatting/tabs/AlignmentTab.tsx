import { observer } from 'mobx-react-lite';
import type { AlignmentDef, SectionKey } from '@resume-builder/shared';
import { useStores } from '../../../hooks/useStores';

const VERTICAL_OPTIONS: ReadonlyArray<{ value: AlignmentDef['vertical']; label: string }> = [
  { value: 'top', label: 'Top' },
  { value: 'middle', label: 'Middle' },
  { value: 'bottom', label: 'Bottom' },
];

const HORIZONTAL_OPTIONS: ReadonlyArray<{ value: AlignmentDef['horizontal']; label: string }> = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
  { value: 'space-between', label: 'Space between' },
];

const ALIGNMENT_FIELDS: ReadonlyArray<{ key: keyof AlignmentDef; label: string }> = [
  { key: 'vertical', label: 'Vertical' },
  { key: 'horizontal', label: 'Horizontal' },
];

type AlignmentTabProps = {
  sectionOverride: boolean;
  sectionKey: SectionKey;
};

export const AlignmentTab = observer(({ sectionOverride, sectionKey }: AlignmentTabProps) => {
  const { formattingStore } = useStores();
  const formatting = formattingStore.formatting;

  if (!formatting) return null;

  const renderSelect = (key: keyof AlignmentDef, label: string): JSX.Element => {
    const globalValue = formatting.global.alignment[key];
    const sectionValue = formatting.sections[sectionKey]?.alignment?.[key];
    const value = sectionOverride ? sectionValue ?? globalValue : globalValue;
    const isOverridden = sectionOverride && sectionValue !== undefined;
    const options = key === 'vertical' ? VERTICAL_OPTIONS : HORIZONTAL_OPTIONS;

    const updateValue = (next: AlignmentDef[typeof key]): void => {
      if (sectionOverride) {
        formattingStore.updateSectionAlignment(sectionKey, key, next);
        return;
      }
      formattingStore.updateGlobalAlignment(key, next);
    };

    return (
      <div key={key} className="space-y-2 rounded-md border border-slate-200 p-3 dark:border-slate-700">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>
          {isOverridden ? (
            <button
              onClick={() => formattingStore.updateSectionAlignment(sectionKey, key, undefined)}
              className="text-xs font-medium text-rose-600 hover:text-rose-500 dark:text-rose-400"
            >
              Clear
            </button>
          ) : null}
        </div>
        <select
          value={value}
          onChange={e => updateValue(e.target.value as AlignmentDef[typeof key])}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">Alignment</h3>
        {sectionOverride ? (
          <span className="text-xs text-slate-500 dark:text-slate-400">Overrides {sectionKey}</span>
        ) : (
          <span className="text-xs text-slate-500 dark:text-slate-400">Global formatting</span>
        )}
      </div>

      <div className="space-y-3">
        {ALIGNMENT_FIELDS.map(field => renderSelect(field.key, field.label))}
      </div>
    </div>
  );
});

AlignmentTab.displayName = 'AlignmentTab';
