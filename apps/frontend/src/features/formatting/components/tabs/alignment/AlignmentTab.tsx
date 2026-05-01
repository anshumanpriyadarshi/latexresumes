import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../shared/hooks/useStores';
import { FormattingTabHeader } from '../../shared/FormattingTabHeader';
import type { FormattingTabProps } from '../types';
import { AlignmentFieldCard } from './AlignmentFieldCard';
import { ALIGNMENT_FIELDS } from './constants';

export const AlignmentTab = observer(({ sectionOverride, sectionKey }: FormattingTabProps) => {
  const { formattingStore } = useStores();

  if (!formattingStore.formatting) return null;

  return (
    <div className="space-y-4">
      <FormattingTabHeader
        title="Alignment"
        sectionOverride={sectionOverride}
        sectionKey={sectionKey}
      />

      <div className="space-y-3">
        {ALIGNMENT_FIELDS.map(field => (
          <AlignmentFieldCard
            key={field.key}
            field={field}
            sectionOverride={sectionOverride}
            sectionKey={sectionKey}
          />
        ))}
      </div>
    </div>
  );
});

AlignmentTab.displayName = 'AlignmentTab';
