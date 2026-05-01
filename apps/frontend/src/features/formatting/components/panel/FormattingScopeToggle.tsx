type FormattingScopeToggleProps = {
  sectionOverride: boolean;
  onSectionOverrideChange: (value: boolean) => void;
};

const baseButtonClassName =
  'flex-1 rounded-md px-3 py-2 text-sm font-medium transition';

const inactiveButtonClassName =
  'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700';

export function FormattingScopeToggle({
  sectionOverride,
  onSectionOverrideChange,
}: FormattingScopeToggleProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onSectionOverrideChange(false)}
        className={`${baseButtonClassName} ${
          !sectionOverride ? 'bg-emerald-600 text-white' : inactiveButtonClassName
        }`}
      >
        Global
      </button>
      <button
        onClick={() => onSectionOverrideChange(true)}
        className={`${baseButtonClassName} ${
          sectionOverride ? 'bg-emerald-600 text-white' : inactiveButtonClassName
        }`}
      >
        Section Override
      </button>
    </div>
  );
}

FormattingScopeToggle.displayName = 'FormattingScopeToggle';
