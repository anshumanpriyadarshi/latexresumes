import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type EditorButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'danger';
    fullWidth?: boolean;
    compact?: boolean;
  }
>;

const variantClassNames = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  secondary: 'bg-gray-300 hover:bg-gray-400 dark:bg-slate-600',
  danger: 'bg-red-500 text-white hover:bg-red-600',
} as const;

export function EditorButton({
  children,
  variant = 'primary',
  fullWidth = false,
  compact = false,
  className = '',
  type = 'button',
  ...props
}: EditorButtonProps) {
  return (
    <button
      type={type}
      className={`${variantClassNames[variant]} rounded ${
        compact ? 'px-2 py-1 text-xs' : 'px-3 py-2'
      } ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

EditorButton.displayName = 'EditorButton';
