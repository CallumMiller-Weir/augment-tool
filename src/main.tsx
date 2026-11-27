/**
 * Composition root: the one place that wires the layers together and mounts
 * React. Keep it thin; logic belongs in core, platform, ui or functions.
 */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./ui/App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
