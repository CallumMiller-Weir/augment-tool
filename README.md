# augment-tool

Desktop app built with Tauri v2, React, Vite, TypeScript and MUI.

## Prerequisites

- Node 18+ (Yarn 4 is pinned in `.yarn/releases`, so a global Yarn 1 install is enough to run it)
- Rust (stable, via [rustup](https://rustup.rs))
- Windows: the MSVC C++ Build Tools and WebView2 (WebView2 ships with Windows 11). For other OSes, see
  the [Tauri prerequisites](https://tauri.app/start/prerequisites/).

## Getting started

```sh
yarn install
yarn tauri dev    # opens the app window, with hot reload for the frontend
```

## Scripts

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

## Architecture

The code is split into layers. Each can import only the layers listed after it:

| Folder           | Holds                                            | May import               |
| ---------------- | ------------------------------------------------ | ------------------------ |
| `src/functions/` | Built-in sidebar functions                       | `ui`, `platform`, `core` |
| `src/ui/`        | React + MUI shell, theme, shared components      | `platform`, `core`       |
| `src/platform/`  | Tauri adapters (git bridge, dialogs, store)      | `core`                   |
| `src/core/`      | Pure domain logic (parsers, attribution, models) | nothing app-specific     |
| `src-tauri/`     | Rust host, kept deliberately thin                | n/a                      |

`src/core` has to run in plain Node, so a CLI or MCP server can reuse it. ESLint fails if code in
`src/core` imports React, `@tauri-apps/*`, `ui`, `platform` or `functions`, and
`tests/boundaries.test.ts` checks that rule. ESLint enforces only the `core` boundary so far; the
other rows are conventions. Each layer folder has a short README.

`src/main.tsx` is the composition root: it mounts `src/ui/App.tsx`.
