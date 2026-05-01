# Template Update

## When To Use

Use for changes to resume preview, PDF output, TeX output, Jake's template formatting, or resume field rendering.

## Inspect First

- `apps/frontend/src/templates/jakes/JakesHTMLPreview.tsx`
- `apps/frontend/src/templates/jakes/JakesPDFTemplate.tsx`
- `apps/frontend/src/templates/jakes/jakesTex.ts`
- `apps/frontend/src/utils/pdfExporter.tsx`
- `apps/frontend/src/utils/texExporter.ts`
- `apps/frontend/src/store/FormattingStore.ts`
- `packages/shared/types/resume.types.ts`
- `packages/shared/types/formatting.types.ts`
- `packages/shared/defaults/formatting.defaults.ts`

## Current Patterns

- HTML preview converts `LaTeXUnit` to CSS strings like `6pt`.
- PDF template converts supported units to point values.
- TeX generation escapes LaTeX-sensitive text and builds a complete article document.
- Colors are stored without `#` and added at render time.
- Section renderers are local helper functions inside each template surface.

## Workflow

1. Determine whether the update affects content fields, formatting, or visual structure.
2. Update HTML preview, PDF template, and TeX generator together when the resume output should match.
3. Use `FormattingStore.resolveSpacing()` and `resolveFont()` for merged formatting values where relevant.
4. Preserve LaTeX escaping for user-provided text in TeX output.
5. Validate with type-check, lint, and build.

## Commands

- `pnpm type-check`
- `pnpm lint`
- `pnpm build`
- `pnpm --filter @resume-builder/frontend dev` for visual preview checks

## Validation Checklist

- HTML preview still renders active resume content.
- PDF export path still dynamically imports the PDF renderer/template.
- TeX export still returns a complete document.
- New or changed user text is escaped in TeX.
- Formatting changes do not accidentally apply only to one output surface unless intended.

## Lessons Update

Record template synchronization rules, rendering differences, or formatting caveats in `.agents/lessons-learned.md`.
