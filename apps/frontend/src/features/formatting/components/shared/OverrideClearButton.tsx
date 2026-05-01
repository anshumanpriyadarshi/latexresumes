type OverrideClearButtonProps = {
  onClick: () => void;
};

export function OverrideClearButton({ onClick }: OverrideClearButtonProps) {
  return (
    <button
      onClick={onClick}
      className="text-xs font-medium text-rose-600 hover:text-rose-500 dark:text-rose-400"
    >
      Clear
    </button>
  );
}

OverrideClearButton.displayName = 'OverrideClearButton';
