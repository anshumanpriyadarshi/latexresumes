# Lessons Learned

## Product Reality

- The current app is a frontend-first resume builder for editing resume data, previewing a Jake's-style resume, and exporting JSON, theme JSON, TeX, and PDF.
- The workspace has `apps/frontend`, `apps/backend`, and `packages/shared`; only the frontend is product-rich today.
- The backend is a minimal Express `/health` server. Needs confirmation before treating backend behavior as central.

## Repeated Conventions

- React components are function components. Store-reading components use `observer`.
- Store access goes through `useStores()`; `hooks/useStores.ts` re-exports from `store/index`.
- Stores are MobX classes using `makeAutoObservable(this)` and arrow actions wrapped with `action(...)`.
- Arrays use `nanoid()` ids for resume ids and nested entries.
- Store update methods mutate active MobX objects directly, then call a private `touch()` to refresh `updatedAt`.
- Shared exports are centralized from `packages/shared/index.ts`.
- Types and Zod schemas are parallel files under `packages/shared/types` and `packages/shared/schemas`.
- Tailwind utility classes are inline in JSX; dark mode uses `dark:` variants plus the root `dark` class.
- Component files often set `Component.displayName` after observer-wrapped exports.

## State And Update Notes

- `AppStore` owns resume collection, active resume, saved themes, `colorTheme`, `dashboardOpen`, and `formattingPanelOpen`.
- `AppStore.serialize()` intentionally does not persist dashboard open state; formatting panel open state is not part of `AppState`.
- `usePersistence(appStore)` hydrates from `localStorage` once and saves serialized state with a delayed MobX reaction.
- `ResumeStore.content` and `FormattingStore.formatting` always target the active resume.
- Section formatting overrides are partial; missing values should resolve to global defaults via `FormattingStore.resolveSpacing()` and `resolveFont()`.

## Template And Export Flow

- Active resume content and formatting render into `JakesHTMLPreview.tsx` for on-screen preview.
- PDF export dynamically imports `@react-pdf/renderer` and `JakesPDFTemplate.tsx`.
- TeX export calls `generateJakesTex(resume, formattingStore.resolveSpacing)` from `jakesTex.ts`.
- JSON resume import validates with `resumeSchema`; theme import validates with `themeSchema`.
- The LaTeX generator currently receives `resolveSpacing` but does not use resolved spacing values. Preserve current behavior unless explicitly changing template formatting behavior.

## Fragile Areas To Inspect Carefully

- Shared schema/type/default changes ripple through forms, stores, persistence, import/export, preview, PDF, and TeX.
- Optional fields with `exactOptionalPropertyTypes` need careful patch objects; setting `undefined` is not always equivalent to omitting a key.
- URL-branded fields rely on Zod parsing in some forms and type casts in others.
- Formatting changes can diverge across HTML preview, PDF output, and TeX output if only one surface is updated.
- File import paths rely on workspace path mapping for `@resume-builder/shared`.
- Existing files contain some non-ASCII comments/button glyphs; follow the file's current encoding when editing code, but keep new memory files ASCII.

## Naming And Style Notes

- Section keys are `personal`, `experience`, `education`, `skills`, `projects`, `certifications`.
- Template id is currently only `jakes`.
- Formatting fields include spacing, fonts, colors, alignment, and page margins.
- Buttons and inputs use direct Tailwind classes, commonly `rounded-md`, slate/indigo/emerald/rose/cyan/amber colors, and `dark:` variants.
- No roadmap or backend skill files should be added from current repo facts.
