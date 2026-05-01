import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../shared/hooks/useStores';
import { FormattingTabHeader } from '../../shared/FormattingTabHeader';
import { ColorFieldCard } from './ColorFieldCard';
import { COLOR_FIELDS } from './constants';

export const ColorsTab = observer(() => {
  const { formattingStore } = useStores();

  if (!formattingStore.formatting) return null;

  return (
    <div className="space-y-4">
      <FormattingTabHeader title="Colors" globalLabel="Global only in v1" />

      <div className="space-y-3">
        {COLOR_FIELDS.map(field => (
          <ColorFieldCard key={field.key} field={field} />
        ))}
      </div>
    </div>
  );
});

ColorsTab.displayName = 'ColorsTab';
