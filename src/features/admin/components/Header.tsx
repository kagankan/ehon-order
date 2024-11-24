import { FirebaseError } from "firebase/app";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useAuthContext } from "@/features/auth/context/AuthContext";
import { auth } from "@/lib/firebase";

export const Header: FC = () => {
  const router = useRouter();
  const user = useAuthContext();
  const logOut = () => {
    void (async () => {
      try {
        await signOut(auth);
        router.push("/login");
      } catch (e) {
        if (e instanceof FirebaseError) {
          // eslint-disable-next-line no-console
          console.log(e);
        }
      }
    })();
  };

  return user ? (
    <header className="sticky top-0 flex items-center justify-between bg-gray-800 px-[2%] py-4 shadow-md">
      <Link href="/" className="font-bold text-white">
        閲覧者向けトップを表示
      </Link>
      <button
        className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        onClick={logOut}
      >
        ログアウト
      </button>
    </header>
  ) : null;
};
