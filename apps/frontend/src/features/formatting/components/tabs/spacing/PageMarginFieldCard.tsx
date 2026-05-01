import { observer } from 'mobx-react-lite';
import type { PageMargins } from '@resume-builder/shared';
import { useStores } from '../../../../shared/hooks/useStores';
import { LaTeXUnitInput } from '../../LaTeXUnitInput';
import { FormattingFieldCard } from '../../shared/FormattingFieldCard';

type PageMarginFieldCardProps = {
  field: { key: keyof PageMargins; label: string };
};

export const PageMarginFieldCard = observer(({ field }: PageMarginFieldCardProps) => {
  const { formattingStore } = useStores();
  const formatting = formattingStore.formatting;

  if (!formatting) return null;

  return (
    <FormattingFieldCard
      label={field.label}
      headerContent={<span className="text-xs text-slate-400 dark:text-slate-500">Global only</span>}
    >
      <div className="mt-2">
        <LaTeXUnitInput
          label=""
          value={formatting.global.pageMargins[field.key]}
          onChange={nextValue => formattingStore.updateGlobalPageMargin(field.key, nextValue)}
        />
      </div>
    </FormattingFieldCard>
  );
});

PageMarginFieldCard.displayName = 'PageMarginFieldCard';
