import { createContext } from 'react';
import type { RootStore } from './types';

export const StoreContext = createContext<RootStore | null>(null);
