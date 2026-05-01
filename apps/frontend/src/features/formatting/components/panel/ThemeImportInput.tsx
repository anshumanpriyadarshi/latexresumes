import { useId } from 'react';

type ThemeImportInputProps = {
  onFileSelect: (file: File) => void;
};

export function ThemeImportInput({ onFileSelect }: ThemeImportInputProps) {
  const inputId = useId();

  return (
    <>
      <label
        htmlFor={inputId}
        className="flex-1 cursor-pointer rounded-md bg-emerald-600 px-3 py-2 text-center text-sm font-medium text-white transition hover:bg-emerald-500"
      >
        Import Theme
      </label>
      <input
        id={inputId}
        type="file"
        accept=".json,application/json"
        className="hidden"
        onChange={event => {
          const file = event.target.files?.[0];
          event.target.value = '';
          if (file) {
            onFileSelect(file);
          }
        }}
      />
    </>
  );
}

ThemeImportInput.displayName = 'ThemeImportInput';
