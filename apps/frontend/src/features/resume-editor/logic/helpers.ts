type Identifiable = {
  id: string;
};

export function findEntryById<T extends Identifiable>(entries: T[], id: string): T | undefined {
  return entries.find(entry => entry.id === id);
}

export function removeEntryById<T extends Identifiable>(entries: T[], id: string): T[] {
  return entries.filter(entry => entry.id !== id);
}
