import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

export const theme = {
  colors: {
    yellow: "#ffa822",
    blue: "#134e6f",
    orange: "#ff6150",
    green: "#1ac0c6",
    gray: "#f3f4f6",
    darkGray: "#4b5563",
    dark: "#111827",
    white: "#fff",
  },
};
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
