import type {
  KeyboardEventHandler,
  PointerEventHandler,
} from 'react';

interface ResizableDividerProps {
  label: string;
  min: number;
  max: number;
  value: number;
  isResizing: boolean;
  onPointerDown: PointerEventHandler<HTMLDivElement>;
  onKeyDown: KeyboardEventHandler<HTMLDivElement>;
}

export const ResizableDivider = ({
  label,
  min,
  max,
  value,
  isResizing,
  onPointerDown,
  onKeyDown,
}: ResizableDividerProps) => (
  <div
    className={`w-1 cursor-col-resize bg-slate-200 transition hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 dark:bg-slate-700 dark:hover:bg-indigo-500 ${
      isResizing ? 'bg-indigo-400 dark:bg-indigo-500' : ''
    }`}
    role="separator"
    aria-label={label}
    aria-orientation="vertical"
    aria-valuemin={min}
    aria-valuemax={max}
    aria-valuenow={Math.round(value)}
    tabIndex={0}
    onPointerDown={onPointerDown}
    onKeyDown={onKeyDown}
  />
);

ResizableDivider.displayName = 'ResizableDivider';
