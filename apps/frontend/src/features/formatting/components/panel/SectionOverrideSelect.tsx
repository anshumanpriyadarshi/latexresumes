import type { SectionKey } from '@resume-builder/shared';

type SectionOverrideSelectProps = {
  options: ReadonlyArray<{ value: SectionKey; label: string }>;
  sectionKey: SectionKey;
  sectionOverride: boolean;
  onSectionKeyChange: (value: SectionKey) => void;
};

export function SectionOverrideSelect({
  options,
  sectionKey,
  sectionOverride,
  onSectionKeyChange,
}: SectionOverrideSelectProps) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Section</span>
      <select
        value={sectionKey}
        onChange={event => onSectionKeyChange(event.target.value as SectionKey)}
        disabled={!sectionOverride}
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:disabled:bg-slate-700"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

SectionOverrideSelect.displayName = 'SectionOverrideSelect';
