import { reaction } from 'mobx';
import type { AppState } from '@resume-builder/shared';
import type { AppStore } from '../state/AppStore';

export const STORAGE_KEY = 'resume-builder:state';

export function readPersistedAppState(): Partial<AppState> | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  return JSON.parse(raw) as Partial<AppState>;
}

export function createPersistenceReaction(appStore: AppStore): () => void {
  return reaction(
    () => appStore.serialize(),
    state => localStorage.setItem(STORAGE_KEY, JSON.stringify(state)),
    { delay: 500, fireImmediately: false }
  );
}
