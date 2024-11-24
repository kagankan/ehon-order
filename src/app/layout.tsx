import "@/styles/globals.css";
import "@/lib/firebase";
import type { Metadata } from "next";
import { AuthProvider } from "@/features/auth/context/AuthContext";
export const metadata: Metadata = {
  title: {
    default: "えほんはともだち",
    template: "%s | えほんはともだち",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
