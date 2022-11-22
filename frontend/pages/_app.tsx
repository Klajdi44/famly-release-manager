import { useReducer, useMemo } from "react";
import React from "react";
import { MantineProvider } from "@mantine/core";
import { reducer } from "../global-state/main-reducer";
import { DEFAULT_STATE } from "../global-state/constants";
import { Context } from "../global-state/context";
import dynamic from "next/dynamic";
import type { AppProps } from "next/app";

const ApplicationShell = dynamic(
  () => import("../components/application-shell/application-shell"),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  const isLoginPage = useMemo(
    () =>
      typeof window !== "undefined" && window.location.pathname === "/login",
    []
  );
  //? test
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
        <ApplicationShell shouldRender={isLoginPage === false}>
          <Component {...pageProps} suppressHydrationWarning="true" />
        </ApplicationShell>
      </Context.Provider>
    </MantineProvider>
  );
}
