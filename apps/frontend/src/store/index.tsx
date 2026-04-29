import type { ReactNode } from 'react';
import { createContext, useContext, useMemo } from 'react';
import { AppStore } from './AppStore';
import { ResumeStore } from './ResumeStore';
import { FormattingStore } from './FormattingStore';

export interface RootStore {
  appStore: AppStore;
  resumeStore: ResumeStore;
  formattingStore: FormattingStore;
}

const StoreContext = createContext<RootStore | null>(null);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const stores = useMemo(() => {
    const appStore = new AppStore();
    const resumeStore = new ResumeStore(appStore);
    const formattingStore = new FormattingStore(appStore);
    return { appStore, resumeStore, formattingStore };
  }, []);

  return <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>;
};

export const useStores = (): RootStore => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStores must be used within StoreProvider');
  return ctx;
};
