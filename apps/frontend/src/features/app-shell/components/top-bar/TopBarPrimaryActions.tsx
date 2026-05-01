import { FormattingToggleButton } from './buttons/FormattingToggleButton';
import { ResumeDashboardButton } from './buttons/ResumeDashboardButton';
import { ThemeToggleButton } from './buttons/ThemeToggleButton';

export function TopBarPrimaryActions() {
  return (
    <>
      <ThemeToggleButton />
      <ResumeDashboardButton />
      <FormattingToggleButton />
    </>
  );
}

TopBarPrimaryActions.displayName = 'TopBarPrimaryActions';
