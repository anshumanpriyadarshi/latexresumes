# latexresumes

`latexresumes` is a monorepo for building and exporting resumes with a LaTeX-first workflow.

The app provides a browser-based editor for resume content, formatting controls, template previews, and export flows for PDF, TeX, and JSON. The backend is currently a lightweight placeholder for future development plans and includes a `/health` endpoint for local development.

## Features

- Resume editor with section-based content management
- Live template preview
- Formatting controls for spacing, fonts, colors, alignment, and page margins
- Export to PDF, TeX, JSON, and theme presets
- Local persistence for resume data and preferences
- Dark and light theme support

## Project Structure

- `apps/frontend` - React + Vite frontend
- `apps/backend` - lightweight Express backend reserved for future development plans
- `packages/shared` - shared types, schemas, and defaults

## Requirements

- Node.js 24.x
- `pnpm` 10.33.0

If you use `nvm`, run `nvm use` from the repository root to switch to Node 24.

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the app in development mode:

```bash
pnpm dev
```

This starts:

- the frontend at `http://localhost:5173`
- the backend on port `3000`

Build the frontend:

```bash
pnpm build
```

Run checks:

```bash
pnpm lint
pnpm type-check
```

## Available Scripts

### Root

- `pnpm dev` - runs the frontend and backend together
- `pnpm build` - builds the frontend app
- `pnpm lint` - lints the repository
- `pnpm type-check` - runs TypeScript checks for the frontend

### Frontend

- `pnpm --filter @resume-builder/frontend dev`
- `pnpm --filter @resume-builder/frontend build`
- `pnpm --filter @resume-builder/frontend preview`

### Backend

- `pnpm --filter @resume-builder/backend dev`
- `pnpm --filter @resume-builder/backend build`

## Backend

The backend currently exposes a simple health check:

```bash
GET /health
```

It responds with:

```json
{ "status": "ok" }
```

## Deployment

The repository is configured for Vercel with the frontend build output in `apps/frontend/dist`.

GitHub Actions also includes cleanup automation for merged branches and stale Vercel preview deployments. The Vercel cleanup workflow expects `VERCEL_TOKEN` and `VERCEL_PROJECT_ID` secrets.

## License

MIT

## Contributing

See [CONTRIBUTING.md](/d:/Git/latexresumes/CONTRIBUTING.md) for setup, workflow, and pull request guidelines.
