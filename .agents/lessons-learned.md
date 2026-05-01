# Lessons Learned

## Frontend Structure

- `apps/frontend/src/features` is now the main frontend organization boundary.
- `features/app-shell` owns app-level chrome such as `TopBar`.
- `features/resume-editor` owns resume editing UI and `ResumeStore`.
- `features/resume-management` owns the dashboard drawer and resume cards for create, switch, duplicate, delete, import, and export actions.
- `features/formatting` owns formatting UI controls and `FormattingStore`.
- `features/templates` owns template-specific rendering and generation files; the current template is `jakes`.
- `features/export` owns browser download helpers and JSON, theme, TeX, and PDF exporters.
- `features/shared` owns cross-feature hooks and global state: `AppStore`, `StoreProvider`, `useStores`, and persistence.

## Refactor Notes

- Keep feature barrels (`features/*/index.ts`) thin and focused on public feature entry points.
- Keep global app state in `features/shared/state` because multiple features depend on it.
- Keep template-specific preview code with the template while there is no generic preview abstraction.
- Use relative imports within the frontend; shared domain types still come from `@resume-builder/shared`.
- If a file touches multiple features and is not truly reusable UI, prefer the feature that owns the user workflow.
- In `features/formatting/components/panel`, keep layout owners shallow and extract paired UI concerns into nearby children:
  `FormattingPanelHeader` composes header content plus a close action,
  `FormattingScopeControls` composes the scope toggle plus section select,
  and `ThemeControls` composes the export button plus import input.
- `FormattingTabNavigation` is already cohesive as a single component because it owns one focused responsibility: tab switching UI for the formatting panel.
- Prefer colocating feature-only presentational controls next to their owner component instead of promoting them to shared UI too early.
- In `features/formatting/logic`, shared helper functions are a good fit for repeated plain-data cloning and section-override mutation setup; keep `FormattingStore` focused on feature behavior instead of repeated object-shaping code.
- In `features/resume-editor`, keep `SectionTabs` shallow by splitting tab navigation from tab content, and prefer entry-card child components for large repeatable section items such as experience, education, projects, skills, and certifications.
- `features/resume-editor/components/sections/shared` is the right home for small editor-only primitives like section headers, entry cards, shared action buttons, and bullet-list editors.
- When forms start rebuilding store-owned list mutations inline, move that behavior back into `ResumeStore` or feature-local helpers instead of leaving array/object update logic in JSX.
- In `features/resume-management`, keep `DashboardPanel` as the drawer owner and split header, action/import controls, and resume list rendering into nearby panel components.
- `ResumeCard` reads best as a small owner that wires store callbacks into separate header and action-grid children; feature-only action button styles can stay colocated in `components/card` or `components/panel` instead of being promoted globally.
- In `features/shared`, split store bootstrapping, context, shared state types, and persistence helpers so `index.tsx` stays a thin provider/hook entry point and stores keep only feature behavior.
- In `features/templates/jakes`, keep each top-level template file as the owner for one output target and move heavy formatting/rendering logic into nearby `html-preview`, `pdf`, and `tex` helper folders instead of leaving one giant renderer file per output.

## Validation

- For feature moves, run `pnpm type-check`, `pnpm lint`, and `pnpm build`.
- On this Windows sandbox, pnpm commands may need escalation if Node fails with `EPERM` while resolving `C:\Users\Dell`.
