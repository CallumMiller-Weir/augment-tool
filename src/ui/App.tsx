import {
  Box,
  CssBaseline,
  Divider,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { theme } from "./theme";

/** Width of the sidebar that will list the built-in functions (`src/functions`). */
const SIDEBAR_WIDTH = 240;

/**
 * App shell: a sidebar for functions and a main panel. Both are placeholders
 * until the first function lands.
 */
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Box component="nav" sx={{ width: SIDEBAR_WIDTH, flexShrink: 0, p: 2 }}>
          <Typography variant="overline" color="text.secondary">
            Functions
          </Typography>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h5" component="h1">
            augment-tool
          </Typography>
          <Typography color="text.secondary">Nothing here yet.</Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
