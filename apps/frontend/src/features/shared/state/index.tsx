import type { ReactNode } from 'react';
import { useContext, useMemo } from 'react';
import { StoreContext } from './context';
import { createRootStore } from './createRootStore';
import type { RootStore } from './types';

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const stores = useMemo(() => createRootStore(), []);

  return <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>;
};

export const useStores = (): RootStore => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStores must be used within StoreProvider');
  return ctx;
};
