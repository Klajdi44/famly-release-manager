import { useMemo, useReducer } from "react";
import { useLocation } from "react-router-dom";
import ApplicationShell from "./components/application-shell/application-shell";

import { DEFAULT_STATE } from "./global-state/constants";
import { Context } from "./global-state/context";
import { reducer } from "./global-state/main-reducer";

import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import App from "./App";

const AppProviders = () => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  const location = useLocation();

  const shouldAppShellRender = useMemo(
    () => location.pathname !== "/login",
    [location]
  );

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: state.colorScheme,
        loader: "bars",
      }}
    >
      <NotificationsProvider>
        <Context.Provider value={[state, dispatch]}>
          <ApplicationShell shouldRender={shouldAppShellRender}>
            <App />
          </ApplicationShell>
        </Context.Provider>
      </NotificationsProvider>
    </MantineProvider>
  );
};

export default AppProviders;
