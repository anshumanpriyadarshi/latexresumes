import { observer } from 'mobx-react-lite';
import { useStores } from '../../hooks/useStores';
import { downloadPDF } from '../../utils/pdfExporter';
import { downloadTex } from '../../utils/texExporter';
import { downloadJSON } from '../../utils/jsonExporter';

export const TopBar = observer(() => {
  const { appStore, formattingStore } = useStores();

  return (
    <div className="flex h-14 items-center justify-between border-b border-slate-200 bg-white/90 px-4 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
          Resume Builder
        </h1>
        {appStore.activeResume && (
          <input
            type="text"
            value={appStore.activeResume.name}
            onChange={e => appStore.updateActiveResumeName(e.target.value)}
            className="min-w-64 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            placeholder="Resume Name"
          />
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => appStore.toggleTheme()}
          className="rounded-md bg-slate-200 px-3 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
        >
          {appStore.colorTheme === 'light' ? 'Dark' : 'Light'}
        </button>

        <button
          onClick={() => appStore.toggleDashboard()}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
        >
          Resumes
        </button>

        <button
          onClick={() => appStore.toggleFormattingPanel()}
          className={`rounded-md px-3 py-2 text-sm font-medium transition ${
            appStore.formattingPanelOpen
              ? 'bg-emerald-600 text-white hover:bg-emerald-500'
              : 'bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600'
          }`}
        >
          Formatting
        </button>

        <button
          onClick={() => {
            if (appStore.activeResume) {
              void downloadPDF(appStore.activeResume, formattingStore).catch((e) => {
                // eslint-disable-next-line no-console
                console.error('PDF export failed:', e);
                window.alert('PDF export failed. Please try again.');
              });
            }
          }}
          disabled={!appStore.activeResume}
          className="rounded-md bg-rose-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:bg-slate-300 dark:disabled:bg-slate-700"
        >
          PDF
        </button>

        <button
          onClick={() => {
            if (appStore.activeResume) {
              downloadTex(appStore.activeResume, formattingStore);
            }
          }}
          disabled={!appStore.activeResume}
          className="rounded-md bg-amber-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:bg-slate-300 dark:disabled:bg-slate-700"
        >
          TEX
        </button>

        <button
          onClick={() => {
            if (appStore.activeResume) {
              downloadJSON(appStore.activeResume);
            }
          }}
          disabled={!appStore.activeResume}
          className="rounded-md bg-cyan-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:bg-slate-300 dark:disabled:bg-slate-700"
        >
          JSON
        </button>
      </div>
    </div>
  );
});

TopBar.displayName = 'TopBar';
