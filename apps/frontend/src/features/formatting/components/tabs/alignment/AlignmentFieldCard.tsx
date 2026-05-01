import { observer } from 'mobx-react-lite';
import type { AlignmentDef, SectionKey } from '@resume-builder/shared';
import { useStores } from '../../../../shared/hooks/useStores';
import { FormattingFieldCard } from '../../shared/FormattingFieldCard';
import { OverrideClearButton } from '../../shared/OverrideClearButton';
import { HORIZONTAL_OPTIONS, VERTICAL_OPTIONS } from './constants';

type AlignmentFieldCardProps = {
  field: { key: keyof AlignmentDef; label: string };
  sectionOverride: boolean;
  sectionKey: SectionKey;
};

export const AlignmentFieldCard = observer(
  ({ field, sectionOverride, sectionKey }: AlignmentFieldCardProps) => {
    const { formattingStore } = useStores();
    const formatting = formattingStore.formatting;

    if (!formatting) return null;

    const globalValue = formatting.global.alignment[field.key];
    const sectionValue = formatting.sections[sectionKey]?.alignment?.[field.key];
    const value = sectionOverride ? sectionValue ?? globalValue : globalValue;
    const isOverridden = sectionOverride && sectionValue !== undefined;
    const options = field.key === 'vertical' ? VERTICAL_OPTIONS : HORIZONTAL_OPTIONS;

    const handleChange = (nextValue: AlignmentDef[keyof AlignmentDef]): void => {
      if (sectionOverride) {
        formattingStore.updateSectionAlignment(sectionKey, field.key, nextValue);
        return;
      }

      formattingStore.updateGlobalAlignment(field.key, nextValue);
    };

    return (
      <FormattingFieldCard
        label={field.label}
        headerContent={
          isOverridden ? (
            <OverrideClearButton
              onClick={() => formattingStore.updateSectionAlignment(sectionKey, field.key, undefined)}
            />
          ) : undefined
        }
      >
        <select
          value={value}
          onChange={event => handleChange(event.target.value as AlignmentDef[keyof AlignmentDef])}
          className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FormattingFieldCard>
    );
  }
);

AlignmentFieldCard.displayName = 'AlignmentFieldCard';
