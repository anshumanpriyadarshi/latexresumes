import { useEffect } from 'react';
import { reaction } from 'mobx';
import type { AppState } from '@resume-builder/shared';
import type { AppStore } from '../store/AppStore';

const STORAGE_KEY = 'resume-builder:state';

export function usePersistence(appStore: AppStore): void {
  // Hydrate on mount
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const state = JSON.parse(raw) as Partial<AppState>;
      appStore.hydrate(state);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to parse persisted state — starting fresh', error);
    }
  }, [appStore]);

  // Persist on every change — debounced 500ms
  useEffect(() => {
    const dispose = reaction(
      () => appStore.serialize(),
      state => localStorage.setItem(STORAGE_KEY, JSON.stringify(state)),
      { delay: 500, fireImmediately: false }
    );
    return dispose;
  }, [appStore]);
}
