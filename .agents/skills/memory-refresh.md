# Memory Refresh

## When To Use

Use when code has changed and repo memory may be stale: `AGENTS.md`, `.agents/lessons-learned.md`, or `.agents/skills/*.md` no longer match the current frontend codebase.

## Inspect First

- `git status --short`
- `AGENTS.md`
- `.agents/lessons-learned.md`
- `.agents/skills/*.md`
- `package.json`, `pnpm-workspace.yaml`
- `apps/frontend/package.json`
- `apps/frontend/src/App.tsx`
- `apps/frontend/src/store/*`
- `apps/frontend/src/components/**/*`
- `apps/frontend/src/templates/jakes/*`
- `apps/frontend/src/utils/*`
- `packages/shared/**/*`

## Current Patterns To Preserve

- Keep memory files concise, practical, and based on current code only.
- Keep the focus frontend-first.
- Do not add backend skills unless the user explicitly asks.
- Do not add roadmap, future architecture, or speculative plans.
- Mark unclear facts as `Needs confirmation`.
- Preserve each skill's existing sections: when to use, inspect first, patterns, workflow, commands, validation checklist, and lessons update.

## Workflow

1. Scan the current code and existing memory files.
2. Compare memory claims against actual code, package scripts, and file structure.
3. Build a proposed change summary before editing anything.
4. Prompt the user with:
   - Which files would change.
   - What current code changed since the memory was written.
   - What memory or skill text would be updated.
   - Any facts marked `Needs confirmation`.
5. Wait for explicit user approval before modifying `AGENTS.md`, `.agents/lessons-learned.md`, or `.agents/skills/*.md`.
6. After approval, make only the approved documentation edits.
7. Re-read the changed memory files and verify they describe current code, not intended future work.

## Commands

- `git status --short`
- `rg --files`
- `rg -n "term-or-path" AGENTS.md .agents apps/frontend packages/shared package.json pnpm-workspace.yaml`
- `pnpm type-check`
- `pnpm lint`
- `pnpm build`

## Validation Checklist

- User saw the proposed memory/skill changes before edits were made.
- User explicitly approved the memory/skill edits.
- Only repo memory files changed unless the user separately requested code changes.
- Updated claims are backed by current code.
- No backend, testing, roadmap, or architecture skill was added unless explicitly requested.
- `.agents/lessons-learned.md` includes new durable observations discovered during the refresh.

## Lessons Update

When refreshing memory, add only durable repo-specific observations to `.agents/lessons-learned.md`; avoid recording one-off implementation details or speculation.
