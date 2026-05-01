import type { ReactNode } from 'react';

type EditorSectionHeaderProps = {
  title: string;
  action?: ReactNode;
};

export function EditorSectionHeader({ title, action }: EditorSectionHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-xl font-bold">{title}</h2>
      {action}
    </div>
  );
}

EditorSectionHeader.displayName = 'EditorSectionHeader';
