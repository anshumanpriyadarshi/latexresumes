type ThemeExportButtonProps = {
  onClick: () => void;
};

export function ThemeExportButton({ onClick }: ThemeExportButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
    >
      Export Theme
    </button>
  );
}

ThemeExportButton.displayName = 'ThemeExportButton';
