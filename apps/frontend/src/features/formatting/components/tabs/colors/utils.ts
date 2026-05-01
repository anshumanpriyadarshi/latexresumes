export const normalizeHex = (value: string): string =>
  value.replace(/^#/, '').slice(0, 6).toLowerCase();
