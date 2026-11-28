# translations

All user-facing text. Components import `t` from `src/translations` and never hard-code strings.

- `en.ts` is English and the source of truth for the text's shape.
- `index.ts` picks the active language (English only for now).
- Any layer may import from here, `core` included. It's plain data with no dependencies.
