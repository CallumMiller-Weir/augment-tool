# augment-tool

**See what the AI wrote.** augment-tool is a desktop app for reviewing AI-assisted code changes. Open
a repository, and it shows the files that changed, renders their diffs, and highlights which lines
came from an AI agent and which came from a person.

> **Status: early development.** The app skeleton (M0) is in place, and the features below arrive
> milestone by milestone. See the GitHub issues and milestones for progress.

## Why it exists

AI agents now write a real share of our code, but reviews still treat every line the same. A
reviewer looking at an agent-built PR can't easily tell what the agent wrote, what a human changed
afterwards, or where to look hardest.

augment-tool answers that in seconds. It uses the attribution git already records (commit trailers
such as `Co-Authored-By: Claude`, plus `git blame`), so reviewers can put their attention on the
AI-written lines without slowing down on the rest.

## What it does

| Feature                                                                                                  | Milestone |
| -------------------------------------------------------------------------------------------------------- | --------- |
| Open a local repository and pick what to compare (branch, commit, working tree)                          | M1        |
| Browse **only the changed files**, with a side-by-side diff                                              | M1        |
| Classify every changed line as **AI**, **human** or **uncommitted**, and highlight it in the diff        | M2        |
| Attribution summary per file, plus jump to the next or previous AI change                                | M2        |
| A sidebar of **functions** as the extension point for future AI review, suggestions and JIRA integration | M1 to M3  |

It's built to be safe on code you don't trust:

- Git access is **read-only**: a small, allowlisted command bridge, with no shell and no writes.
- The domain logic runs in plain Node, so a CLI or MCP server can reuse it later.

## Getting started

### Prerequisites

- Node 18+. Yarn 4 is pinned in `.yarn/releases`, so any global Yarn (even 1.x) can run it.
- Rust stable, via [rustup](https://rustup.rs).
- Windows: the MSVC C++ build tools and a Windows SDK (Visual Studio's "Desktop development with
  C++" workload), plus WebView2, which ships with Windows 11. For other OSes, see the
  [Tauri prerequisites](https://tauri.app/start/prerequisites/).

### Run it

```sh
yarn install
yarn tauri dev    # opens the app window, with hot reload for the frontend
```

The first run compiles the Rust side, which takes a few minutes. Later runs are fast.

### Scripts

| Script             | What it does                                                            |
| ------------------ | ----------------------------------------------------------------------- |
| `yarn tauri dev`   | Run the desktop app in development                                      |
| `yarn tauri build` | Build a release bundle                                                  |
| `yarn dev`         | Run only the Vite frontend in a browser (no Tauri APIs)                 |
| `yarn check`       | Typecheck, lint and test. Run it before pushing.                        |
| `yarn typecheck`   | `tsc` for app code (`tsconfig.json`) and tooling (`tsconfig.node.json`) |
| `yarn lint`        | ESLint, including the layer boundaries                                  |
| `yarn test`        | Vitest, once (Node environment by default)                              |
| `yarn format`      | Prettier, writing changes (`format:check` to only verify)               |

## How the code is organised

Built with Tauri v2, React, Vite, TypeScript and MUI. The code is split into layers. Each can import
only the layers listed after it:

| Folder              | Holds                                            | May import                 |
| ------------------- | ------------------------------------------------ | -------------------------- |
| `src/functions/`    | Built-in sidebar functions                       | `ui`, `platform`, `core`   |
| `src/ui/`           | React + MUI shell, theme, shared components      | `platform`, `core`         |
| `src/platform/`     | Tauri adapters (git bridge, dialogs, store)      | `core`                     |
| `src/core/`         | Pure domain logic (parsers, attribution, models) | nothing app-specific       |
| `src/translations/` | All user-facing text (`en.ts`)                   | nothing; any layer uses it |
| `src-tauri/`        | Rust host, kept deliberately thin                | n/a                        |

- `src/core` has to run in plain Node. ESLint fails if code there imports React, `@tauri-apps/*`,
  `ui`, `platform` or `functions`, and `tests/boundaries.test.ts` checks that rule. ESLint
  enforces only this boundary so far; the other rows are conventions.
- UI text is never hard-coded. Add it to `src/translations/en.ts` and read it through
  `import { t } from "../translations"`.
- `src/main.tsx` is the composition root: it mounts `src/ui/App.tsx`.

Each folder under `src/` has a short README with its rules.
