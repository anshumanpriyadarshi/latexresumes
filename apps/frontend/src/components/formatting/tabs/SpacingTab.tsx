import { observer } from 'mobx-react-lite';
import type { PageMargins, SectionKey, SpacingConfig } from '@resume-builder/shared';
import { useStores } from '../../../hooks/useStores';
import { LaTeXUnitInput } from '../LaTeXUnitInput';

const SPACING_FIELDS: ReadonlyArray<{ key: keyof SpacingConfig; label: string }> = [
  { key: 'beforeSection', label: 'Before section' },
  { key: 'afterSectionTitle', label: 'After section title' },
  { key: 'betweenItems', label: 'Between items' },
  { key: 'betweenSubItems', label: 'Between sub items' },
  { key: 'inlineGap', label: 'Inline gap' },
];

const PAGE_MARGIN_FIELDS: ReadonlyArray<{ key: keyof PageMargins; label: string }> = [
  { key: 'top', label: 'Top' },
  { key: 'bottom', label: 'Bottom' },
  { key: 'left', label: 'Left' },
  { key: 'right', label: 'Right' },
];

type SpacingTabProps = {
  sectionOverride: boolean;
  sectionKey: SectionKey;
};

export const SpacingTab = observer(({ sectionOverride, sectionKey }: SpacingTabProps) => {
  const { formattingStore } = useStores();
  const formatting = formattingStore.formatting;

  if (!formatting) return null;

  const renderSpacingField = (key: keyof SpacingConfig, label: string): JSX.Element => {
    const sectionSpacing = formatting.sections[sectionKey]?.spacing;
    const overrideValue = sectionSpacing?.[key];
    const globalValue = formatting.global.spacing[key];
    const value = sectionOverride ? overrideValue ?? globalValue : formatting.global.spacing[key];
    const isOverridden = sectionOverride && overrideValue !== undefined;

    return (
      <div key={key} className="space-y-2 rounded-md border border-slate-200 p-3 dark:border-slate-700">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>
          {isOverridden ? (
            <button
              onClick={() => formattingStore.updateSectionSpacing(sectionKey, key, undefined)}
              className="text-xs font-medium text-rose-600 hover:text-rose-500 dark:text-rose-400"
            >
              Clear
            </button>
          ) : null}
        </div>
        <LaTeXUnitInput
          label=""
          value={value}
          onChange={next =>
            sectionOverride
              ? formattingStore.updateSectionSpacing(sectionKey, key, next)
              : formattingStore.updateGlobalSpacing(key, next)
          }
          {...(sectionOverride ? { inheritedHint: globalValue } : {})}
        />
      </div>
    );
  };

  const renderMarginField = (key: keyof PageMargins, label: string): JSX.Element => {
    const value = formatting.global.pageMargins[key];
    return (
      <div key={key} className="space-y-2 rounded-md border border-slate-200 p-3 dark:border-slate-700">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>
          <span className="text-xs text-slate-400 dark:text-slate-500">Global only</span>
        </div>
        <LaTeXUnitInput
          label=""
          value={value}
          onChange={next => formattingStore.updateGlobalPageMargin(key, next)}
        />
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Spacing</h3>
          {sectionOverride ? (
            <span className="text-xs text-slate-500 dark:text-slate-400">Overrides {sectionKey}</span>
          ) : (
            <span className="text-xs text-slate-500 dark:text-slate-400">Global formatting</span>
          )}
        </div>
        <div className="space-y-3">
          {SPACING_FIELDS.map(field => renderSpacingField(field.key, field.label))}
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
          {PAGE_MARGIN_FIELDS.map(field => renderMarginField(field.key, field.label))}
        </div>
      </div>
    </div>
  );
});

SpacingTab.displayName = 'SpacingTab';
