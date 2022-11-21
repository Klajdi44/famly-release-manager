import { useMemo } from "react";
import React from "react";
import { MantineProvider } from "@mantine/core";
import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
import { store } from "../redux/store";
import { Provider as ReduxProvider } from "react-redux";
const ApplicationShell = dynamic(
  () => import("../components/application-shell/application-shell"),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  const isLoginPage = useMemo(
    () =>
      typeof window !== "undefined" && window.location.pathname === "/login",
    []
  );

  return (
    <ReduxProvider store={store}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "dark",
        }}
      >
        <ApplicationShell shouldRender={isLoginPage === false}>
          <Component {...pageProps} suppressHydrationWarning="true" />
        </ApplicationShell>
      </MantineProvider>
    </ReduxProvider>
  );
}
