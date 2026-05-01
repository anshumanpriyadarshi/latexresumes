import { useEffect } from 'react';
import type { AppStore } from '../state/AppStore';
import { createPersistenceReaction, readPersistedAppState } from './persistence';

export function usePersistence(appStore: AppStore): void {
  // Hydrate on mount
  useEffect(() => {
    try {
      const state = readPersistedAppState();
      if (state) {
        appStore.hydrate(state);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to parse persisted state â€” starting fresh', error);
    }
  }, [appStore]);

  // Persist on every change â€” debounced 500ms
  useEffect(() => {
    const dispose = createPersistenceReaction(appStore);
    return dispose;
  }, [appStore]);
}
