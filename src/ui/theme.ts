import { createTheme } from "@mui/material/styles";

/**
 * Base app theme with light and dark color schemes. MUI picks the scheme from
 * the OS preference (`prefers-color-scheme`), so no toggle is needed yet.
 */
export const theme = createTheme({
  colorSchemes: { light: true, dark: true },
});
