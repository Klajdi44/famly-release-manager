import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import NavBar from "../components/navbar/navbar";

import "../styles/globals.css";

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
      <NavBar />
      <Component {...pageProps} />
    </MantineProvider>
  );
}
