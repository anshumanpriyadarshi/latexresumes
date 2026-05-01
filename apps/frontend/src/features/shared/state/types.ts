import type { FormattingStore } from '../../formatting/logic/FormattingStore';
import type { ResumeStore } from '../../resume-editor/logic/ResumeStore';
import type { AppStore } from './AppStore';

export interface RootStore {
  appStore: AppStore;
  resumeStore: ResumeStore;
  formattingStore: FormattingStore;
}
