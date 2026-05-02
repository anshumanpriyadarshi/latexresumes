# Contributing

Thanks for taking the time to help improve `latexresumes`.

## Project Setup

- Use Node.js `24.x`
- Use `pnpm` `10.33.0`
- Install dependencies with `pnpm install`

If you use `nvm`, run:

```bash
nvm use
```

## Development Workflow

- Run the app locally with `pnpm dev`
- Check code with `pnpm lint`
- Verify TypeScript with `pnpm type-check`
- Build the frontend with `pnpm build`

## Code Style

- Keep changes focused and small when possible
- Follow the existing TypeScript, React, and ESLint conventions in the repo
- Prefer clear component and helper names over clever abstractions
- Avoid adding new dependencies unless they solve a real problem

## Before Opening a Pull Request

Please make sure:

1. `pnpm lint` passes
2. `pnpm type-check` passes
3. `pnpm build` passes
4. Your changes are described clearly in the PR summary

## What to Include

- A short description of what changed and why
- Screenshots or screen recordings for UI changes
- Notes about any follow-up work or tradeoffs

## Backend Notes

The backend currently exists as a lightweight placeholder for future development plans. If you extend it, please keep changes aligned with the current monorepo structure and document any new runtime requirements.
