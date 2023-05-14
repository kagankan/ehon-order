import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const emailId = "email";
const passwordId = "password";

export default function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(userCredential.user);
      router.push("/signup-completed");
    } catch (e) {
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
        <title>アカウント登録</title>
      </Head>
      <main className="bg-gray-200 min-h-screen">
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <div className="flex flex-col items-center justify-center w-full px-4 py-8 bg-white shadow-md max-w-md sm:rounded-lg sm:px-10">
            <h2 className="text-3xl font-extrabold text-gray-900">
              アカウント登録
            </h2>
            {errorMessage && (
              <p aria-live="polite" className="mt-4 text-red-500">
                {errorMessage}
              </p>
            )}
            <form className="mt-8 w-full" onSubmit={onSubmit}>
              <div
                className="
                grid grid-cols-1 gap-6
              "
              >
                <div className="grid gap-2">
                  <label htmlFor={emailId} className="">
                    メールアドレス
                  </label>
                  <input
                    id={emailId}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                    type="email"
                    className="border rounded border-slate-400 p-2"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor={passwordId} className="">
                    パスワード（6文字以上）
                  </label>
                  <input
                    id={passwordId}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    type="password"
                    required
                    minLength={6}
                    className="border rounded border-slate-400 p-2"
                  />
                </div>
              </div>
              <button
                disabled={isLoading}
                className="
                w-full mt-8 px-4 py-2 text-base font-medium text-white bg-slate-600 rounded-md
                hover:bg-slate-700
                disabled:bg-gray-300 disabled:cursor-not-allowed
              "
              >
                登録
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
