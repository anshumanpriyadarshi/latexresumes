import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';

export interface ResizablePanelConfig {
  defaultValue: number;
  min: number;
  max: number;
  step?: number;
  largeStep?: number;
}

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export const useResizablePanel = ({
  defaultValue,
  min,
  max,
  step = 2,
  largeStep = 5,
}: ResizablePanelConfig) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(defaultValue);
  const [isResizing, setIsResizing] = useState(false);

  const updateValue = useCallback(
    (clientX: number): void => {
      const container = containerRef.current;
      if (!container) return;

      const { left, width } = container.getBoundingClientRect();
      if (width === 0) return;

      const nextValue = ((clientX - left) / width) * 100;
      setValue(clamp(nextValue, min, max));
    },
    [max, min]
  );

  useEffect(() => {
    if (!isResizing) return;

    const handlePointerMove = (event: PointerEvent): void => {
      updateValue(event.clientX);
    };

    const stopResizing = (): void => {
      setIsResizing(false);
    };

    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', stopResizing);
    window.addEventListener('pointercancel', stopResizing);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', stopResizing);
      window.removeEventListener('pointercancel', stopResizing);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, updateValue]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>): void => {
    event.preventDefault();
    updateValue(event.clientX);
    setIsResizing(true);
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>): void => {
    const resizeStep = event.shiftKey ? largeStep : step;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setValue(currentValue => clamp(currentValue - resizeStep, min, max));
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      setValue(currentValue => clamp(currentValue + resizeStep, min, max));
    }

    if (event.key === 'Home') {
      event.preventDefault();
      setValue(min);
    }

    if (event.key === 'End') {
      event.preventDefault();
      setValue(max);
    }
  };

  return {
    containerRef,
    value,
    isResizing,
    min,
    max,
    handlePointerDown,
    handleKeyDown,
  };
};
