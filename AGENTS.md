# Repository Guide

## Current Product

This repo is a pnpm workspace for `latexresumes`, a user-friendly resume builder for creating resumes in LaTeX-friendly formats. The active user experience is the frontend: a React/Vite app that edits resume content, previews a Jake's-style resume, and exports JSON, `.theme.json`, `.tex`, and PDF files.

The only current template id is `jakes`. The backend app currently exposes a minimal Express `/health` route; do not create backend workflows or skills unless the user explicitly asks.

## Structure

- `apps/frontend`: React 18, Vite, TypeScript, MobX, Tailwind UI.
- `apps/frontend/src/App.tsx`: shell layout, default resume creation, dark-mode class, resizable editor pane, panels.
- `apps/frontend/src/components/editor`: tabbed resume content forms.
- `apps/frontend/src/components/formatting`: formatting drawer, tabs, LaTeX unit input.
- `apps/frontend/src/components/dashboard`: resume create/switch/duplicate/delete/import UI.
- `apps/frontend/src/components/topbar`: app controls and export buttons.
- `apps/frontend/src/store`: MobX root context plus `AppStore`, `ResumeStore`, `FormattingStore`.
- `apps/frontend/src/templates/jakes`: HTML preview, PDF renderer template, LaTeX generator.
- `apps/frontend/src/utils`: browser download/export helpers.
- `packages/shared`: shared TypeScript types, Zod schemas, defaults, and exports.
- `apps/backend`: minimal Express health app. Needs confirmation before treating it as product-critical.

## Commands

- `pnpm dev`: runs frontend and backend concurrently.
- `pnpm --filter @resume-builder/frontend dev`: runs Vite frontend only.
- `pnpm build`: frontend type-check plus Vite production build.
- `pnpm --filter @resume-builder/frontend build`: same frontend build from the package.
- `pnpm lint`: ESLint across `.ts` and `.tsx`.
- `pnpm type-check`: frontend `tsc --noEmit`.
- `pnpm --filter @resume-builder/shared type-check`: shared package type-check.
- No test command is currently defined. Needs confirmation before adding testing workflow docs.

## Current Patterns

- State uses MobX classes with `makeAutoObservable` and action-wrapped arrow methods.
- Components that read stores are usually wrapped in `observer`.
- Access stores through `useStores()` from `apps/frontend/src/hooks/useStores.ts` or `apps/frontend/src/store`.
- `AppStore` owns resumes, active resume id, saved themes, color theme, dashboard state, and formatting panel state.
- `ResumeStore` edits `activeResume.content`, generates ids with `nanoid`, and calls `touch()` after content changes.
- `FormattingStore` edits `activeResume.formatting`, resolves section overrides with global fallbacks, and calls `touch()` after formatting changes.
- Persistence is browser `localStorage` under `resume-builder:state`, hydrated by `usePersistence`, and saved with a MobX `reaction`.
- Shared models live in `packages/shared/types`, runtime validation lives in `packages/shared/schemas`, defaults live in `packages/shared/defaults/formatting.defaults.ts`.
- Optional URL fields are branded through Zod schemas in some forms before storing values.
- Styling is mostly inline Tailwind utility classes with class-based dark mode (`darkMode: 'class'`).
- Template output has three current surfaces: `JakesHTMLPreview.tsx`, `JakesPDFTemplate.tsx`, and `jakesTex.ts`.

## Inspect Before Changing

- Start with `git status --short`, `rg --files`, and the relevant package scripts.
- For UI changes, inspect `App.tsx`, the touched component, and adjacent components for class/style conventions.
- For content fields, inspect shared types, schemas, defaults, store update methods, editor form, HTML preview, PDF template, and LaTeX generator.
- For formatting changes, inspect `FormattingStore`, formatting tabs, shared formatting types/schemas/defaults, and all Jake's output surfaces.
- For import/export changes, inspect `DashboardPanel`, `FormattingPanel`, `utils/*Exporter*`, shared schemas, and browser download helper.

## Safe Change Rules

- Keep changes frontend-focused unless explicitly directed otherwise.
- Do not change production code during repo-memory-only tasks.
- Preserve the `Resume` and `FormattingConfig` shapes unless every current consumer is updated together.
- Keep ids stable with `nanoid` for array items that render in React.
- Keep `updatedAt` updates by calling the relevant store method or preserving `touch()` behavior.
- Keep section override semantics: undefined section values fall back to global formatting.
- Keep exports aligned across HTML preview, PDF template, and `.tex` generation.
- Avoid broad refactors. Make small, local edits that match current file style.
- Do not assume tests exist. Validate with type-check, lint, and build commands that currently exist.

## Definition Of Done Today

- Relevant code paths were inspected before editing.
- TypeScript strictness is respected: no `any`, prefer type-only imports, no unchecked optional assumptions.
- MobX-observed UI still reads/writes through stores.
- Resume/template output surfaces remain in sync for changed fields.
- `pnpm type-check`, `pnpm lint`, and `pnpm build` pass, or any inability to run them is reported.
- `.agents/lessons-learned.md` is updated when a new repo-specific pattern or fragile area is discovered.
