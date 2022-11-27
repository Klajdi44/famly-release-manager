import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { MantineProvider } from "@mantine/core";
import App from "./App";
import ApplicationShell from "./components/application-shell/application-shell";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "dark",
        }}
      >
        <ApplicationShell shouldRender={window.location.pathname !== "/login"}>
          <App />
        </ApplicationShell>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
