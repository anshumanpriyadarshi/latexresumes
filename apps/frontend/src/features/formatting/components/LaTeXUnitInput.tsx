import type { ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import type { LaTeXUnit, LengthUnit } from '@resume-builder/shared';

const UNIT_OPTIONS: readonly LengthUnit[] = ['pt', 'em', 'ex', 'cm', 'mm', 'in'];

type LaTeXUnitInputProps = {
  label: string;
  value: LaTeXUnit;
  onChange: (value: LaTeXUnit) => void;
  inheritedHint?: LaTeXUnit;
  disabled?: boolean;
};

export const LaTeXUnitInput = observer(({ label, value, onChange, inheritedHint, disabled }: LaTeXUnitInputProps) => {
  const handleValueChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const nextValue = event.target.value.trim();
    onChange({
      value: nextValue === '' ? 0 : Number(nextValue),
      unit: value.unit,
    });
  };

  const handleUnitChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    onChange({
      value: value.value,
      unit: event.target.value as LengthUnit,
    });
  };

  return (
    <label className="block space-y-1">
      {label ? (
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>
          {inheritedHint && !disabled ? (
            <span className="text-xs text-slate-400 dark:text-slate-500">
              inherits {inheritedHint.value}
              {inheritedHint.unit}
            </span>
          ) : null}
        </div>
      ) : null}
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value.value}
          onChange={handleValueChange}
          disabled={disabled}
          className="w-24 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:disabled:bg-slate-700"
        />
        <select
          value={value.unit}
          onChange={handleUnitChange}
          disabled={disabled}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:disabled:bg-slate-700"
        >
          {UNIT_OPTIONS.map(unit => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
});

LaTeXUnitInput.displayName = 'LaTeXUnitInput';
