import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { themeSchema, type Theme } from '@resume-builder/shared';
import { downloadTheme } from '../../../export/utils/themeExporter';
import { useStores } from '../../../shared/hooks/useStores';
import { cloneFormattingData } from '../../logic/helpers';
import { ThemeExportButton } from './ThemeExportButton';
import { ThemeImportInput } from './ThemeImportInput';

export const ThemeControls = observer(() => {
  const { appStore, formattingStore } = useStores();
  const [themeStatus, setThemeStatus] = useState<string | null>(null);

  const handleExportTheme = (): void => {
    const resumeName = appStore.activeResume?.name ?? 'Theme';
    // Clone to plain data so the saved theme does not retain observable references.
    const theme = cloneFormattingData(formattingStore.exportTheme(resumeName)) as Theme;
    appStore.saveTheme(theme);
    downloadTheme(theme);
    setThemeStatus(`Exported ${theme.name}`);
  };

  const handleImportTheme = async (file: File): Promise<void> => {
    try {
      const raw = await file.text();
      const parsed = JSON.parse(raw);
      const result = themeSchema.safeParse(parsed);

      if (!result.success) {
        setThemeStatus(result.error.issues.map(issue => issue.message).join(', '));
        return;
      }

      // The formatting store expects plain serializable theme data when applying imports.
      const theme = cloneFormattingData(result.data) as Theme;
      formattingStore.applyTheme(theme);
      appStore.saveTheme(theme);
      setThemeStatus(`Imported ${theme.name}`);
    } catch {
      setThemeStatus('Could not read theme JSON');
    }
  };

  return (
    <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
      <div className="flex gap-2">
        <ThemeExportButton onClick={handleExportTheme} />
        <ThemeImportInput onFileSelect={file => void handleImportTheme(file)} />
      </div>

      {themeStatus ? (
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{themeStatus}</p>
      ) : null}
    </div>
  );
});

ThemeControls.displayName = 'ThemeControls';
