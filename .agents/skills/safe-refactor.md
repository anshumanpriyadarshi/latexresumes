# Safe Refactor

## When To Use

Use for explicitly requested frontend refactors that should preserve behavior.

## Inspect First

- `git status --short`
- All files in the intended refactor scope
- Direct imports of the touched symbols using `rg`
- Relevant stores, shared types, and template files

## Current Patterns

- Keep behavior in existing ownership boundaries: stores own state, components own UI, shared owns types/schemas/defaults, templates own rendering.
- The repo is strict TypeScript with `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`.
- Existing validation is lint, type-check, and build; no test suite is defined.

## Workflow

1. Confirm the refactor scope from the user request.
2. Search all references before moving or renaming symbols.
3. Make small mechanical changes first; avoid mixing refactor with new behavior.
4. Preserve public shared exports from `packages/shared/index.ts` unless all imports are updated.
5. Run validation commands after the refactor.

## Commands

- `rg "SymbolOrPath"`
- `pnpm type-check`
- `pnpm lint`
- `pnpm build`
- `pnpm --filter @resume-builder/shared type-check` when shared code changes

## Validation Checklist

- No unrelated files changed.
- Imports remain valid under workspace path mapping.
- Behavior and data shapes remain unchanged.
- Existing export and persistence flows remain intact.
- Any uncertainty is noted as `Needs confirmation`.

## Lessons Update

Add refactor hazards, import conventions, or validation gaps found during the work to `.agents/lessons-learned.md`.
