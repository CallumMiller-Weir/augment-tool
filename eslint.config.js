// @ts-check
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

/**
 * Imports that `src/core` must never use. Core is pure domain logic that has
 * to run in plain Node (for a future CLI or MCP server), so it can't depend on
 * React, Tauri, or the layers built on top of it.
 *
 * Patterns use .gitignore syntax and match the import specifier, so
 * `**\/ui/**` catches relative imports such as `../ui/Shell`.
 */
const CORE_FORBIDDEN_IMPORTS = [
  {
    group: ["react", "react/*", "react-dom", "react-dom/*"],
    message: "src/core must stay framework-free: no React.",
  },
  {
    group: ["@tauri-apps/*"],
    message: "src/core must run in Node: put Tauri calls in src/platform.",
  },
  {
    group: [
      "**/ui",
      "**/ui/**",
      "**/platform",
      "**/platform/**",
      "**/functions",
      "**/functions/**",
    ],
    message:
      "src/core is the bottom layer: it may not import ui, platform or functions.",
  },
];

export default defineConfig(
  { ignores: ["dist", "src-tauri", ".yarn"] },

  js.configs.recommended,
  tseslint.configs.recommended,

  // Browser code: the app itself.
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [reactHooks.configs.flat.recommended],
    languageOptions: { globals: globals.browser },
  },

  // Node code: config files and tooling tests.
  {
    files: ["*.{js,ts}", "tests/**/*.ts"],
    languageOptions: { globals: globals.node },
  },

  // Layering: see CORE_FORBIDDEN_IMPORTS above.
  {
    files: ["src/core/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": ["error", { patterns: CORE_FORBIDDEN_IMPORTS }],
    },
  },
);
