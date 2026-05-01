# Add Feature

## When To Use

Use for adding a current frontend feature, especially a resume field, formatting control, import/export capability, or UI action.

## Inspect First

- `packages/shared/types/*`
- `packages/shared/schemas/*`
- `packages/shared/defaults/formatting.defaults.ts`
- `packages/shared/index.ts`
- `apps/frontend/src/store/*`
- Relevant editor/formatting/dashboard component
- `apps/frontend/src/templates/jakes/*`
- Relevant `apps/frontend/src/utils/*Exporter*`

## Current Patterns

- Data shape starts in shared types and schemas.
- Defaults are created by `emptyResumeContent()` and `defaultFormattingConfig('jakes')`.
- UI changes flow through MobX store methods.
- User-visible resume output must be considered across HTML, PDF, and TeX.

## Workflow

1. Decide whether the feature changes data shape, UI only, formatting only, or export only.
2. For data shape changes, update shared type, schema, default, exports, store methods, forms, preview, PDF, and TeX together.
3. For UI-only features, stay within component/store ownership already present.
4. Keep template id assumptions explicit: current id is `jakes`.
5. Validate with existing commands.

## Commands

- `pnpm type-check`
- `pnpm lint`
- `pnpm build`
- `pnpm --filter @resume-builder/shared type-check` when shared package changes

## Validation Checklist

- New fields have defaults if required.
- Import schemas accept the intended persisted/exported shape.
- Store updates preserve `updatedAt`.
- HTML, PDF, and TeX behavior is intentionally aligned or intentionally unchanged.
- No backend work added unless explicitly requested.

## Lessons Update

Record new feature pathways, naming conventions, or template-flow details in `.agents/lessons-learned.md`.
