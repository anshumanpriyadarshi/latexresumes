import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type TopBarButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

const baseClassName =
  'rounded-md px-3 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:bg-slate-300 dark:disabled:bg-slate-700';

export function TopBarButton({
  children,
  className = '',
  type = 'button',
  ...props
}: TopBarButtonProps) {
  return (
    <button
      type={type}
      className={`${baseClassName} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

TopBarButton.displayName = 'TopBarButton';
