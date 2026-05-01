import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ResumeCardActionButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'neutral' | 'primary' | 'success' | 'danger';
  }
>;

const variantClassNames = {
  neutral:
    'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700',
  primary: 'bg-indigo-600 text-white hover:bg-indigo-500',
  success: 'bg-emerald-600 text-white hover:bg-emerald-500',
  danger: 'bg-rose-600 text-white hover:bg-rose-500',
} as const;

export function ResumeCardActionButton({
  children,
  variant = 'neutral',
  className = '',
  type = 'button',
  ...props
}: ResumeCardActionButtonProps) {
  return (
    <button
      type={type}
      className={`rounded-md px-3 py-2 text-xs font-medium transition ${variantClassNames[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

ResumeCardActionButton.displayName = 'ResumeCardActionButton';
