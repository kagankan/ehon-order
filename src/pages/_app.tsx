import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import { app } from "@/lib/firebase";
export default function App({ Component, pageProps }: AppProps) {
  console.log(app);
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
