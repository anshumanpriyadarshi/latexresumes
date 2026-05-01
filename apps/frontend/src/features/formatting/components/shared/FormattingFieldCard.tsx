import type { PropsWithChildren, ReactNode } from 'react';

type FormattingFieldCardProps = PropsWithChildren<{
  label: string;
  headerContent?: ReactNode;
  contentClassName?: string;
}>;

export function FormattingFieldCard({
  label,
  headerContent,
  contentClassName = 'space-y-2',
  children,
}: FormattingFieldCardProps) {
  return (
    <div className={`rounded-md border border-slate-200 p-3 dark:border-slate-700 ${contentClassName}`}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>
        {headerContent}
      </div>
      {children}
    </div>
  );
}

FormattingFieldCard.displayName = 'FormattingFieldCard';
