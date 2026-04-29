import { useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { themeSchema, type SectionKey, type Theme } from '@resume-builder/shared';
import { useStores } from '../../hooks/useStores';
import { AlignmentTab } from './tabs/AlignmentTab';
import { ColorsTab } from './tabs/ColorsTab';
import { FontsTab } from './tabs/FontsTab';
import { SpacingTab } from './tabs/SpacingTab';
import { downloadTheme } from '../../utils/themeExporter';

const TAB_KEYS = ['spacing', 'fonts', 'colors', 'alignment'] as const;
type TabKey = (typeof TAB_KEYS)[number];

const SECTION_OPTIONS: ReadonlyArray<{ value: SectionKey; label: string }> = [
  { value: 'personal', label: 'Personal' },
  { value: 'experience', label: 'Experience' },
  { value: 'education', label: 'Education' },
  { value: 'skills', label: 'Skills' },
  { value: 'projects', label: 'Projects' },
  { value: 'certifications', label: 'Certifications' },
];

export const FormattingPanel = observer(() => {
  const { appStore, formattingStore } = useStores();
  const [activeTab, setActiveTab] = useState<TabKey>('spacing');
  const [sectionOverride, setSectionOverride] = useState(false);
  const [sectionKey, setSectionKey] = useState<SectionKey>('experience');
  const [themeStatus, setThemeStatus] = useState<string | null>(null);
  const themeFileInputRef = useRef<HTMLInputElement | null>(null);

  if (!formattingStore.formatting) return null;

  const tabButtonClass = (tab: TabKey): string =>
    `flex-1 rounded-md px-3 py-2 text-sm font-medium transition ${
      activeTab === tab
        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
    }`;

  return (
    <aside
      className={`absolute left-0 top-0 z-30 h-full w-[24rem] border-r border-slate-200 bg-white/95 shadow-2xl backdrop-blur transition-transform duration-300 dark:border-slate-700 dark:bg-slate-900/95 ${
        appStore.formattingPanelOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 dark:border-slate-700">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Formatting</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Global and section overrides for Jake&apos;s template.
            </p>
          </div>
          <button
            onClick={() => appStore.toggleFormattingPanel()}
            className="rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Close
          </button>
        </div>

        <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
          <div className="flex gap-2">
            <button
              onClick={() => {
                const resumeName = appStore.activeResume?.name ?? 'Theme';
                const theme = JSON.parse(
                  JSON.stringify(formattingStore.exportTheme(resumeName))
                ) as Theme;
                appStore.saveTheme(theme);
                downloadTheme(theme);
                setThemeStatus(`Exported ${theme.name}`);
              }}
              className="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
            >
              Export Theme
            </button>
            <button
              onClick={() => themeFileInputRef.current?.click()}
              className="flex-1 rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
            >
              Import Theme
            </button>
          </div>
          <input
            ref={themeFileInputRef}
            type="file"
            accept=".json,application/json"
            className="hidden"
            onChange={event => {
              const file = event.target.files?.[0];
              event.target.value = '';
              if (!file) return;

              void (async () => {
                try {
                  const raw = await file.text();
                  const parsed = JSON.parse(raw);
                  const result = themeSchema.safeParse(parsed);
                  if (!result.success) {
                    setThemeStatus(result.error.issues.map(issue => issue.message).join(', '));
                    return;
                  }

                  const theme = JSON.parse(JSON.stringify(result.data)) as Theme;
                  formattingStore.applyTheme(theme);
                  appStore.saveTheme(theme);
                  setThemeStatus(`Imported ${theme.name}`);
                } catch {
                  setThemeStatus('Could not read theme JSON');
                }
              })();
            }}
          />
          {themeStatus ? (
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{themeStatus}</p>
          ) : null}
        </div>

        <div className="space-y-4 border-b border-slate-200 px-4 py-4 dark:border-slate-700">
          <div className="flex gap-2">
            <button
              onClick={() => setSectionOverride(false)}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition ${
                !sectionOverride
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Global
            </button>
            <button
              onClick={() => setSectionOverride(true)}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition ${
                sectionOverride
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Section Override
            </button>
          </div>

          <label className="block space-y-1">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Section</span>
            <select
              value={sectionKey}
              onChange={e => setSectionKey(e.target.value as SectionKey)}
              disabled={!sectionOverride}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:disabled:bg-slate-700"
            >
              {SECTION_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex gap-2 border-b border-slate-200 px-4 py-3 dark:border-slate-700">
          {TAB_KEYS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={tabButtonClass(tab)}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {activeTab === 'spacing' && (
            <SpacingTab sectionOverride={sectionOverride} sectionKey={sectionKey} />
          )}
          {activeTab === 'fonts' && (
            <FontsTab sectionOverride={sectionOverride} sectionKey={sectionKey} />
          )}
          {activeTab === 'colors' && <ColorsTab />}
          {activeTab === 'alignment' && (
            <AlignmentTab sectionOverride={sectionOverride} sectionKey={sectionKey} />
          )}
        </div>
      </div>
    </aside>
  );
});

FormattingPanel.displayName = 'FormattingPanel';
