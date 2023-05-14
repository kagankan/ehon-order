import { FirebaseError } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { useAuthContext } from "@/features/auth/context/AuthContext";

const emailId = "email";
const passwordId = "password";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const user = useAuthContext();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      // eslint-disable-next-line no-console
      console.log("login success");
      router.push("/admin");
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      if (e instanceof FirebaseError) {
        setErrorMessage(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>ログイン</title>
      </Head>
      <main className="bg-gray-200 min-h-screen">
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <div className="flex flex-col items-center justify-center w-full px-4 py-8 bg-white shadow-md max-w-lg sm:rounded-lg sm:px-10">
            <h2 className="text-3xl font-extrabold text-gray-900">ログイン</h2>
            {user && <p className="mt-4 text-red-500">ログイン済みです</p>}
            {errorMessage && (
              <p aria-live="polite" className="mt-4 text-red-500">
                {errorMessage}
              </p>
            )}
            <div className="w-full mt-6 leading-loose text-gray-600">
              <form className="" onSubmit={onSubmit}>
                <div className="mt-2">
                  <label
                    className="block text-sm text-gray-600"
                    htmlFor={emailId}
                  >
                    メールアドレス
                  </label>
                  <input
                    className="w-full p-2 text-gray-700 border border-slate-400 rounded"
                    id={emailId}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    type="email"
                    required
                    placeholder="メールアドレス"
                  />
                </div>
                <div className="mt-2">
                  <label
                    className="block text-sm text-gray-600"
                    htmlFor={passwordId}
                  >
                    パスワード
                  </label>
                  <input
                    className="w-full p-2 text-gray-700 border border-slate-400 rounded"
                    id={passwordId}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    type="password"
                    required
                    placeholder="パスワード"
                  />
                </div>
                <div className="mt-4 items-center justify-between">
                  <button
                    className="w-full px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-700"
                    type="submit"
                    disabled={isLoading}
                  >
                    ログイン
                  </button>

                  {/* <a
                    className="inline-block right-0 align-baseline font-bold text-sm text-500 hover:text-blue-800"
                    href="#"
                  >
                    パスワードを忘れた場合
                  </a> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
