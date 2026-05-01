import type { SectionKey } from '@resume-builder/shared';

type FormattingTabHeaderProps = {
  title: string;
  sectionOverride?: boolean;
  sectionKey?: SectionKey;
  globalLabel?: string;
};

export function FormattingTabHeader({
  title,
  sectionOverride = false,
  sectionKey,
  globalLabel = 'Global formatting',
}: FormattingTabHeaderProps) {
  const description = sectionOverride && sectionKey ? `Overrides ${sectionKey}` : globalLabel;

  return (
    <div className="flex items-center justify-between">
      <h3 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
      <span className="text-xs text-slate-500 dark:text-slate-400">{description}</span>
    </div>
  );
}

FormattingTabHeader.displayName = 'FormattingTabHeader';
