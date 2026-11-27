# core

Pure domain logic: git output parsers, attribution, models.

- **No** React, `@tauri-apps/*`, DOM APIs, or imports from `ui`, `platform` or `functions`.
  ESLint enforces the imports (see `eslint.config.js`).
- Must run in plain Node, so a CLI or MCP server can reuse it later. Tests run in Node by default.
