import { FormattingPanelCloseButton } from './FormattingPanelCloseButton';
import { FormattingPanelHeaderContent } from './FormattingPanelHeaderContent';

export function FormattingPanelHeader() {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 dark:border-slate-700">
      <FormattingPanelHeaderContent />
      <FormattingPanelCloseButton />
    </div>
  );
}

FormattingPanelHeader.displayName = 'FormattingPanelHeader';
