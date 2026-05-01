type ColorPresetButtonProps = {
  hex: string;
  label: string;
  active: boolean;
  onClick: () => void;
};

export function ColorPresetButton({ hex, label, active, onClick }: ColorPresetButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 rounded-md border px-2 py-2 text-[11px] transition ${
        active
          ? 'border-slate-900 bg-slate-100 text-slate-900 dark:border-white dark:bg-slate-800 dark:text-white'
          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
      }`}
    >
      <span
        className="h-6 w-6 rounded-full border border-white shadow"
        style={{ backgroundColor: `#${hex}` }}
      />
      {label}
    </button>
  );
}

ColorPresetButton.displayName = 'ColorPresetButton';
