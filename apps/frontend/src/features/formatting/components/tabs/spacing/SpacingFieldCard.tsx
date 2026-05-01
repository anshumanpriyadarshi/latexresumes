import { observer } from 'mobx-react-lite';
import type { SectionKey, SpacingConfig } from '@resume-builder/shared';
import { useStores } from '../../../../shared/hooks/useStores';
import { LaTeXUnitInput } from '../../LaTeXUnitInput';
import { FormattingFieldCard } from '../../shared/FormattingFieldCard';
import { OverrideClearButton } from '../../shared/OverrideClearButton';

type SpacingFieldCardProps = {
  field: { key: keyof SpacingConfig; label: string };
  sectionOverride: boolean;
  sectionKey: SectionKey;
};

export const SpacingFieldCard = observer(
  ({ field, sectionOverride, sectionKey }: SpacingFieldCardProps) => {
    const { formattingStore } = useStores();
    const formatting = formattingStore.formatting;

    if (!formatting) return null;

    const sectionSpacing = formatting.sections[sectionKey]?.spacing;
    const overrideValue = sectionSpacing?.[field.key];
    const globalValue = formatting.global.spacing[field.key];
    const value = sectionOverride ? overrideValue ?? globalValue : globalValue;
    const isOverridden = sectionOverride && overrideValue !== undefined;

    return (
      <FormattingFieldCard
        label={field.label}
        headerContent={
          isOverridden ? (
            <OverrideClearButton
              onClick={() => formattingStore.updateSectionSpacing(sectionKey, field.key, undefined)}
            />
          ) : undefined
        }
      >
        <div className="mt-2">
          <LaTeXUnitInput
            label=""
            value={value}
            onChange={nextValue =>
              sectionOverride
                ? formattingStore.updateSectionSpacing(sectionKey, field.key, nextValue)
                : formattingStore.updateGlobalSpacing(field.key, nextValue)
            }
            {...(sectionOverride ? { inheritedHint: globalValue } : {})}
          />
        </div>
      </FormattingFieldCard>
    );
  }
);

SpacingFieldCard.displayName = 'SpacingFieldCard';
