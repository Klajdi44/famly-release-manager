import React from "react";
import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";

import ApplicationShell from "../components/application-shell/application-shell";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "dark",
      }}
    >
      <ApplicationShell>
        <Component {...pageProps} />
      </ApplicationShell>
    </MantineProvider>
  );
}
