import type { SectionKey } from '@resume-builder/shared';
import { SECTION_OPTIONS } from './constants';
import { FormattingScopeToggle } from './FormattingScopeToggle';
import { SectionOverrideSelect } from './SectionOverrideSelect';

type FormattingScopeControlsProps = {
  sectionOverride: boolean;
  sectionKey: SectionKey;
  onSectionOverrideChange: (value: boolean) => void;
  onSectionKeyChange: (value: SectionKey) => void;
};

export function FormattingScopeControls({
  sectionOverride,
  sectionKey,
  onSectionOverrideChange,
  onSectionKeyChange,
}: FormattingScopeControlsProps) {
  return (
    <div className="space-y-4 border-b border-slate-200 px-4 py-4 dark:border-slate-700">
      <FormattingScopeToggle
        sectionOverride={sectionOverride}
        onSectionOverrideChange={onSectionOverrideChange}
      />
      <SectionOverrideSelect
        options={SECTION_OPTIONS}
        sectionKey={sectionKey}
        sectionOverride={sectionOverride}
        onSectionKeyChange={onSectionKeyChange}
      />
    </div>
  );
}

FormattingScopeControls.displayName = 'FormattingScopeControls';
