import "./i18n";
import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { StyledEngineProvider } from "@mui/material";
import ReduxProvider from "./components/ReduxProvider";
import { SnackbarProvider } from "./components/Snackbar";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ReduxProvider>
    <StyledEngineProvider injectFirst>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </StyledEngineProvider>
  </ReduxProvider>
);

reportWebVitals();
