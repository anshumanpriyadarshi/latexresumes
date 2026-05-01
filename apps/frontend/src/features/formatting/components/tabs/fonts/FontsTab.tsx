import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../shared/hooks/useStores';
import { FormattingTabHeader } from '../../shared/FormattingTabHeader';
import type { FormattingTabProps } from '../types';
import { FONT_FIELDS } from './constants';
import { FontFieldCard } from './FontFieldCard';

export const FontsTab = observer(({ sectionOverride, sectionKey }: FormattingTabProps) => {
  const { formattingStore } = useStores();

  if (!formattingStore.formatting) return null;

  return (
    <div className="space-y-4">
      <FormattingTabHeader
        title="Fonts"
        sectionOverride={sectionOverride}
        sectionKey={sectionKey}
      />

      <div className="space-y-3">
        {FONT_FIELDS.map(field => (
          <FontFieldCard
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

FontsTab.displayName = 'FontsTab';
