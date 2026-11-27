/**
 * Guards the layering rules in `eslint.config.js`. Each case lints a snippet
 * as if it lived in `src/core`, so a broken or loosened rule fails the test
 * suite, not just a code review.
 */
import { ESLint } from "eslint";
import { describe, expect, it } from "vitest";

const eslint = new ESLint();

/** Lint `code` as though it were the file `src/core/probe.ts`; returns rule ids hit. */
async function lintAsCore(code: string): Promise<string[]> {
  const [result] = await eslint.lintText(code, {
    filePath: "src/core/probe.ts",
  });
  return (result?.messages ?? []).map((m) => m.ruleId ?? "fatal");
}

describe("src/core import boundary", () => {
  it.each([
    ['import React from "react";'],
    ['import { createRoot } from "react-dom/client";'],
    ['import { invoke } from "@tauri-apps/api/core";'],
    ['import { Shell } from "../ui/Shell";'],
    ['import { store } from "../platform/store";'],
    ['import { fn } from "../functions/example";'],
  ])("rejects %s", async (code) => {
    expect(await lintAsCore(`${code}\nexport {};`)).toContain(
      "no-restricted-imports",
    );
  });

  it("allows imports within core", async () => {
    expect(
      await lintAsCore('import { x } from "./models";\nexport { x };'),
    ).toEqual([]);
  });
});
