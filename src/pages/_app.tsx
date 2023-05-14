import "@/styles/globals.css";
import "@/lib/firebase";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/features/auth/context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
