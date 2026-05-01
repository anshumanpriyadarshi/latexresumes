# Frontend Fix

## When To Use

Use for fixing current frontend behavior in React components, MobX stores, export utilities, or template rendering.

## Inspect First

- `apps/frontend/src/App.tsx`
- The affected component under `apps/frontend/src/components`
- Related store in `apps/frontend/src/store`
- Related shared types/schemas/defaults in `packages/shared`
- Related template/export files if resume output changes

## Current Patterns

- Components reading MobX state use `observer`.
- UI writes through store methods, not ad hoc local copies of resume state.
- Store methods mutate active resume state and update `updatedAt`.
- Tailwind classes are inline; dark mode uses `dark:` variants.

## Workflow

1. Reproduce mentally from current code; run the app only when useful.
2. Make the smallest local code change that preserves existing state ownership.
3. Keep shared type/schema/default changes synchronized if data shape changes.
4. If output changes, update HTML preview, PDF template, and TeX generator as applicable.
5. Run validation commands.

## Commands

- `pnpm type-check`
- `pnpm lint`
- `pnpm build`
- `pnpm --filter @resume-builder/frontend dev` when visual/manual checking is needed

## Validation Checklist

- No unrelated refactors.
- Store update path still calls the relevant action/touch behavior.
- TypeScript strict mode passes.
- Export surfaces remain aligned when affected.
- Dark/light UI still has readable classes where touched.

## Lessons Update

Record any repeated fix pattern, data-flow caveat, or fragile export mismatch in `.agents/lessons-learned.md`.
