import { defineConfig } from "vitest/config";

// Tests run in plain Node by default: `src/core` must work there, and the
// tooling tests in `tests/` need it. A UI test can opt into a DOM per file.
export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.{ts,tsx}", "tests/**/*.test.ts"],
  },
});
