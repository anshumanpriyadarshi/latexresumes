import type { FormattingConfig, SectionFormatting, SectionKey } from '@resume-builder/shared';

export function cloneFormattingData<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function ensureSectionFormatting(
  formatting: FormattingConfig,
  section: SectionKey
): SectionFormatting {
  return formatting.sections[section] ?? (formatting.sections[section] = {});
}

export function setOptionalField<T extends object, K extends keyof T>(
  target: T,
  key: K,
  value: T[K] | undefined
): void {
  if (value === undefined) {
    delete target[key];
    return;
  }

  target[key] = value;
}
