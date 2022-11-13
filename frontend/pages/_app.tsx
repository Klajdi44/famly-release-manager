import { useReducer } from "react";
import { MantineProvider } from "@mantine/core";
import { reducer } from "../global-state/main-reducer";
import { DEFAULT_STATE } from "../global-state/constants";
import { Context } from "../global-state/context";

import type { AppProps } from "next/app";

import ApplicationShell from "../components/application-shell/application-shell";

export default function App({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "dark",
      }}
    >
      <Context.Provider value={[state, dispatch]}>
        <ApplicationShell>
          <Component {...pageProps} />
        </ApplicationShell>
      </Context.Provider>
    </MantineProvider>
  );
}
