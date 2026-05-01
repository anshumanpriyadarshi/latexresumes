# Repo Scan

## When To Use

Use for the first pass in a future Codex session, before changing frontend code or answering broad repo questions.

## Inspect First

- `git status --short`
- `package.json`, `pnpm-workspace.yaml`
- `apps/frontend/package.json`, `apps/frontend/src/App.tsx`
- `apps/frontend/src/store/*`
- `packages/shared/index.ts`
- Relevant component/template files for the user request

## Current Patterns

- Frontend is React/Vite/TypeScript/MobX/Tailwind.
- Shared types, schemas, and defaults live in `packages/shared`.
- Template output is split across HTML preview, PDF template, and TeX generation.

## Workflow

1. Check the worktree and avoid overwriting user changes.
2. List files with `rg --files`.
3. Read package scripts and the files most likely to own the requested behavior.
4. Trace data from shared type/schema/default to store, form, preview, and exporter when resume fields are involved.
5. Note unclear facts as `Needs confirmation`.

## Commands

- `git status --short`
- `rg --files`
- `pnpm type-check`
- `pnpm lint`
- `pnpm build`

## Validation Checklist

- Current package/app structure understood.
- Relevant stores and shared types inspected.
- No production code changed during scan-only work.
- Unclear facts marked `Needs confirmation`.

## Lessons Update

Update `.agents/lessons-learned.md` when discovering a durable convention, fragile area, or repo-specific flow.
