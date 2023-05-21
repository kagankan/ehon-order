import Link from "next/link";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";
import { useAuthContext } from "@/features/auth/context/AuthContext";
import { Header } from "./Header";

export const AdminLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const user = useAuthContext();
  const router = useRouter();

  if (!user) {
    if (typeof window !== "undefined") {
      void router.push("/login");
    }
    return null;
  }

  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        <nav className="flex flex-col border-r border-gray-200 bg-white py-4">
          <Link
            href="/admin"
            className="
        px-4 py-2 font-medium text-gray-900
        hover:bg-gray-100 hover:text-gray-900
        focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
          >
            管理画面トップ
          </Link>
        </nav>
        <main className="flex-grow bg-gray-200">
          <div className="mx-auto w-[80%] max-w-7xl">{children}</div>
        </main>
      </div>
    </>
  );
};
