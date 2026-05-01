# UI Polish

## When To Use

Use for frontend visual polish, layout adjustments, responsive improvements, panel ergonomics, or Tailwind class cleanup.

## Inspect First

- `apps/frontend/src/App.tsx`
- The touched component under `apps/frontend/src/components`
- Adjacent components in the same folder
- `apps/frontend/src/index.css`
- `apps/frontend/tailwind.config.js`

## Current Patterns

- Layout is a full-height app shell with a top bar, resizable editor pane, preview area, formatting drawer, and dashboard drawer.
- Styling is inline Tailwind utilities with slate backgrounds, bordered panels, `rounded`/`rounded-md`, and class-based dark mode.
- The resume preview uses fixed letter-like dimensions (`8.5in` by minimum `11in`) inside a scrollable area.

## Workflow

1. Preserve the current app-first interface; do not replace it with a landing page.
2. Match nearby Tailwind class patterns and spacing scale.
3. Update dark-mode classes alongside light-mode classes.
4. Keep panels and preview scroll behavior intact.
5. Check text fit and basic responsiveness after class changes.

## Commands

- `pnpm type-check`
- `pnpm lint`
- `pnpm build`
- `pnpm --filter @resume-builder/frontend dev` for visual inspection

## Validation Checklist

- No production logic changed unnecessarily.
- Light and dark UI remain legible.
- Editor, preview, dashboard, and formatting panel still fit the app shell.
- Buttons/inputs do not introduce obvious overflow in touched areas.

## Lessons Update

Add durable UI conventions or fragile layout notes to `.agents/lessons-learned.md`.
