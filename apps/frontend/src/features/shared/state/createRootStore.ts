import { FormattingStore } from '../../formatting/logic/FormattingStore';
import { ResumeStore } from '../../resume-editor/logic/ResumeStore';
import { AppStore } from './AppStore';
import type { RootStore } from './types';

export function createRootStore(): RootStore {
  const appStore = new AppStore();
  const resumeStore = new ResumeStore(appStore);
  const formattingStore = new FormattingStore(appStore);

  return { appStore, resumeStore, formattingStore };
}
