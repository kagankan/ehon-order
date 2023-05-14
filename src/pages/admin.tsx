import { FirebaseError } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuthContext } from "@/features/auth/context/AuthContext";

export default function Admin() {
  const user = useAuthContext();
  const router = useRouter();

  const logOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      router.push("/login");
    } catch (e) {
      if (e instanceof FirebaseError) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    }
  };

  return (
    <>
      <Head>
        <title>管理画面</title>
      </Head>
      {user && (
        <main className="bg-gray-200 min-h-screen">
          <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="flex flex-col items-center justify-center w-full px-4 py-8 bg-white shadow-md max-w-lg sm:rounded-lg sm:px-10">
              <h2 className="text-3xl font-extrabold text-gray-900">
                管理画面
              </h2>
              <div className="mt-6 leading-loose text-gray-600">
                <p>管理画面です。</p>
                <button
                  className="mt-4 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  onClick={logOut}
                >
                  ログアウト
                </button>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
