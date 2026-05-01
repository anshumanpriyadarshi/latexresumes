# Component Cleanup

## When To Use

Use for small frontend component cleanup that improves readability while preserving current behavior.

## Inspect First

- The component being cleaned up
- Adjacent components in the same folder
- Any store methods or shared types the component uses
- Template/export files only if rendered output changes

## Current Patterns

- Components are plain function components.
- MobX-connected components use `observer`.
- Repeated field lists are often `const` arrays near the top of the file.
- JSX uses direct Tailwind classes rather than extracted CSS modules.
- Some forms use local helper functions for typed field updates.

## Workflow

1. Confirm cleanup is scoped and behavior-preserving.
2. Keep exports, display names, and observer wrapping stable.
3. Extract only local helpers that reduce real duplication.
4. Keep class names and DOM structure stable unless the cleanup specifically targets layout.
5. Run validation commands.

## Commands

- `pnpm type-check`
- `pnpm lint`
- `pnpm build`

## Validation Checklist

- No data shape changes.
- No store ownership changes.
- JSX remains readable and consistent with neighboring files.
- Type-only imports are used where applicable.

## Lessons Update

Add cleanup conventions that appear repeatedly across components to `.agents/lessons-learned.md`.
