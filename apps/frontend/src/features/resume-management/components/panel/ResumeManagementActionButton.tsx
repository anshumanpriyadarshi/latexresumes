import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type ResumeManagementActionButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'success';
  }
>;

const variantClassNames = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-500',
  success: 'bg-emerald-600 text-white hover:bg-emerald-500',
} as const;

export function ResumeManagementActionButton({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}: ResumeManagementActionButtonProps) {
  return (
    <button
      type={type}
      className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition ${variantClassNames[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

ResumeManagementActionButton.displayName = 'ResumeManagementActionButton';
