import { httpUrlSchema, type HttpUrl } from '@resume-builder/shared';

export function getOptionalTextValue(value: string): string | undefined {
  return value || undefined;
}

export function getOptionalTextPatch<K extends string>(key: K, value: string): Partial<Record<K, string>> {
  const nextValue = getOptionalTextValue(value);
  return nextValue ? ({ [key]: nextValue } as Partial<Record<K, string>>) : {};
}

export function parseOptionalHttpUrl(value: string): string | undefined | null {
  if (!value) return undefined;

  const result = httpUrlSchema.safeParse(value);
  if (!result.success) {
    return null;
  }

  return result.data;
}

export function getOptionalHttpUrlPatch<K extends string>(
  key: K,
  value: string
): Partial<Record<K, HttpUrl>> | null {
  const parsedValue = parseOptionalHttpUrl(value);
  if (parsedValue === null) return null;
  return parsedValue ? ({ [key]: parsedValue } as Partial<Record<K, HttpUrl>>) : {};
}

export function splitCommaSeparatedValues(value: string): string[] {
  return value
    .split(',')
    .map(item => item.trim())
    .filter(Boolean);
}
