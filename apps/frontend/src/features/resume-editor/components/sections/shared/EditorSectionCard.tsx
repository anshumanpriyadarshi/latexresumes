import type { PropsWithChildren } from 'react';

export function EditorSectionCard({ children }: PropsWithChildren) {
  return <div className="space-y-3 rounded border p-4 dark:border-slate-600">{children}</div>;
}

EditorSectionCard.displayName = 'EditorSectionCard';
