# State Management

## When To Use

Use when changing MobX stores, persistence, resume updates, formatting updates, or cross-component state.

## Inspect First

- `apps/frontend/src/store/AppStore.ts`
- `apps/frontend/src/store/ResumeStore.ts`
- `apps/frontend/src/store/FormattingStore.ts`
- `apps/frontend/src/store/index.tsx`
- `apps/frontend/src/hooks/usePersistence.ts`
- `packages/shared/types/app.types.ts`
- `packages/shared/types/resume.types.ts`
- `packages/shared/types/formatting.types.ts`

## Current Patterns

- Root stores are created once in `StoreProvider` with `useMemo`.
- `AppStore` owns app-level state and serialization.
- `ResumeStore` and `FormattingStore` operate on `appStore.activeResume`.
- Store methods are arrow properties wrapped in `action`.
- Persistence serializes `AppStore` to localStorage after a 500ms MobX reaction delay.

## Workflow

1. Identify which store owns the state.
2. Add or change action methods rather than mutating store state from components.
3. Preserve derived getters for active resume/content/formatting.
4. Call `touch()` after content or formatting edits.
5. If state persists, update `AppState`, `serialize()`, `hydrate()` behavior, schemas if needed, and import/export expectations.

## Commands

- `pnpm type-check`
- `pnpm lint`
- `pnpm build`

## Validation Checklist

- Components still use `useStores()`.
- Observable state remains in stores.
- Persisted state shape is intentional.
- `updatedAt` remains accurate for resume edits.
- Section override fallback behavior remains intact.

## Lessons Update

Document new ownership rules, persistence caveats, or repeated update patterns in `.agents/lessons-learned.md`.
