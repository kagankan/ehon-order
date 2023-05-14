import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { app } from "@/lib/firebase";
export default function App({ Component, pageProps }: AppProps) {
  console.log(app);
  return <Component {...pageProps} />;
}
