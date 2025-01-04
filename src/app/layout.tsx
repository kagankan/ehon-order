import "@/lib/firebase";
import "./_styles/globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "@/app/_components/functional/AuthContext";
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
