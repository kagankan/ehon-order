"use client";

import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useAuthContext } from "@/app/_components/functional/AuthContext";
import { auth } from "@/lib/firebase";

const emailId = "email";
const passwordId = "password";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const user = useAuthContext();
  if (user) {
    void router.push("/admin");
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    void (async () => {
      try {
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
    })();
  };

  return (
    <>
      <Head>
        <title>ログイン</title>
      </Head>

      <main className="min-h-screen bg-gray-200">
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
          <div className="flex w-full max-w-lg flex-col items-center justify-center bg-white px-4 py-8 shadow-md sm:rounded-lg sm:px-10">
            <h2 className="text-3xl font-extrabold text-gray-900">ログイン</h2>
            <div className="mt-6 w-full leading-loose text-gray-600">
              <form className="" onSubmit={onSubmit}>
                <div className="mt-2">
                  <label
                    className="block text-sm text-gray-600"
                    htmlFor={emailId}
                  >
                    メールアドレス
                  </label>
                  <input
                    className="w-full rounded border border-slate-400 p-2 text-gray-700"
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
                    className="w-full rounded border border-slate-400 p-2 text-gray-700"
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
                    className="w-full rounded bg-gray-900 px-4 py-1 font-light tracking-wider text-white hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                    type="submit"
                    disabled={isLoading}
                  >
                    ログイン
                  </button>
                  <p
                    aria-live="polite"
                    aria-atomic="true"
                    className="mt-4 text-red-500 empty:mt-0"
                  >
                    {errorMessage}
                  </p>
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
