import { makeAutoObservable, action } from 'mobx';
import { nanoid } from 'nanoid';
import type {
  FormattingConfig,
  Theme,
  LaTeXUnit,
  FontDef,
  ColorDef,
  SectionKey,
  SpacingConfig,
  FontConfig,
  GlobalFormatting,
  AlignmentDef,
  PageMargins,
} from '@resume-builder/shared';
import { defaultFormattingConfig } from '@resume-builder/shared';
import type { AppStore } from '../../shared/state/AppStore';
import { cloneFormattingData, ensureSectionFormatting, setOptionalField } from './helpers';

export class FormattingStore {
  constructor(private appStore: AppStore) {
    makeAutoObservable(this);
  }

  get formatting(): FormattingConfig | undefined {
    return this.appStore.activeResume?.formatting;
  }

  private get activeFormatting(): FormattingConfig {
    return this.appStore.activeResume?.formatting ?? defaultFormattingConfig('jakes');
  }

  private touch = (): void => {
    if (this.appStore.activeResume) {
      this.appStore.activeResume.updatedAt = new Date().toISOString();
    }
  };

  // Merged value: section override ?? global default
  resolveSpacing = (
    section: SectionKey | null,
    key: keyof SpacingConfig
  ): LaTeXUnit => {
    const override = section ? this.formatting?.sections[section]?.spacing?.[key] : undefined;
    return override ?? this.activeFormatting.global.spacing[key];
  };

  resolveFont = (section: SectionKey | null, key: keyof FontConfig): FontDef => {
    const override = section ? this.formatting?.sections[section]?.fonts?.[key] : undefined;
    return override ?? this.activeFormatting.global.fonts[key];
  };

  updateGlobalSpacing = action((key: keyof SpacingConfig, value: LaTeXUnit): void => {
    if (!this.formatting) return;
    this.formatting.global.spacing[key] = value;
    this.touch();
  });

  updateGlobalFont = action((key: keyof FontConfig, value: FontDef): void => {
    if (!this.formatting) return;
    this.formatting.global.fonts[key] = value;
    this.touch();
  });

  updateGlobalColor = action(
    (key: keyof GlobalFormatting['colors'], value: ColorDef): void => {
      if (!this.formatting) return;
      this.formatting.global.colors[key] = value;
      this.touch();
    }
  );

  updateGlobalAlignment = action((key: keyof AlignmentDef, value: AlignmentDef[keyof AlignmentDef]): void => {
    if (!this.formatting) return;
    if (key === 'vertical') {
      this.formatting.global.alignment.vertical = value as AlignmentDef['vertical'];
    } else {
      this.formatting.global.alignment.horizontal = value as AlignmentDef['horizontal'];
    }
    this.touch();
  });

  updateGlobalPageMargin = action((key: keyof PageMargins, value: PageMargins[keyof PageMargins]): void => {
    if (!this.formatting) return;
    this.formatting.global.pageMargins[key] = value;
    this.touch();
  });

  updateSectionSpacing = action(
    (section: SectionKey, key: keyof SpacingConfig, value: LaTeXUnit | undefined): void => {
      if (!this.formatting) return;
      const sectionFormatting = ensureSectionFormatting(this.formatting, section);
      const sectionSpacing = sectionFormatting.spacing ?? (sectionFormatting.spacing = {});
      setOptionalField(sectionSpacing, key, value);
      this.touch();
    }
  );

  updateSectionFont = action(
    (section: SectionKey, key: keyof FontConfig, value: FontDef | undefined): void => {
      if (!this.formatting) return;
      const sectionFormatting = ensureSectionFormatting(this.formatting, section);
      const sectionFonts = sectionFormatting.fonts ?? (sectionFormatting.fonts = {});
      setOptionalField(sectionFonts, key, value);
      this.touch();
    }
  );

  updateSectionAlignment = action(
    (section: SectionKey, key: keyof AlignmentDef, value: AlignmentDef[keyof AlignmentDef] | undefined): void => {
      if (!this.formatting) return;
      const sectionFormatting = ensureSectionFormatting(this.formatting, section);
      const sectionAlignment = sectionFormatting.alignment ?? (sectionFormatting.alignment = {});
      setOptionalField(
        sectionAlignment,
        key,
        value as Partial<AlignmentDef>[typeof key] | undefined
      );
      this.touch();
    }
  );

  applyTheme = action((theme: Theme): void => {
    if (!this.formatting) return;
    Object.assign(this.formatting, cloneFormattingData(theme.formatting));
    this.touch();
  });

  exportTheme = (name: string): Theme => ({
    id: nanoid(),
    name,
    createdAt: new Date().toISOString(),
    formatting: cloneFormattingData(this.formatting ?? this.activeFormatting),
  });
}
