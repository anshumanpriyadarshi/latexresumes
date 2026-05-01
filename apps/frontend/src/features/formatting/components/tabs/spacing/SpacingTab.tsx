import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../shared/hooks/useStores';
import { FormattingTabHeader } from '../../shared/FormattingTabHeader';
import type { FormattingTabProps } from '../types';
import { PAGE_MARGIN_FIELDS, SPACING_FIELDS } from './constants';
import { PageMarginFieldCard } from './PageMarginFieldCard';
import { SpacingFieldCard } from './SpacingFieldCard';

export const SpacingTab = observer(({ sectionOverride, sectionKey }: FormattingTabProps) => {
  const { formattingStore } = useStores();

  if (!formattingStore.formatting) return null;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <FormattingTabHeader
          title="Spacing"
          sectionOverride={sectionOverride}
          sectionKey={sectionKey}
        />
        <div className="space-y-3">
          {SPACING_FIELDS.map(field => (
            <SpacingFieldCard
              key={field.key}
              field={field}
              sectionOverride={sectionOverride}
              sectionKey={sectionKey}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Page Margins
          </h4>
          {sectionOverride ? (
            <span className="text-xs text-slate-400 dark:text-slate-500">No section override</span>
          ) : null}
        </div>
        <div className="space-y-3">
          {PAGE_MARGIN_FIELDS.map(field => (
            <PageMarginFieldCard key={field.key} field={field} />
          ))}
        </div>
      </div>
    </div>
  );
});

SpacingTab.displayName = 'SpacingTab';
