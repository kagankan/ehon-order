import { addDoc, collection } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { AdminLayout } from "@/features/admin/components/AdminLayout";
import { bookConverter } from "@/features/book/firestore";
import { db } from "@/lib/firebase";

const nameId = "name";

export default function Add() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    void (async () => {
      // Firestoreにデータを保存
      const ref = await addDoc(
        collection(db, "books").withConverter(bookConverter),
        {
          name: name,
        }
      );

      setIsLoading(false);
      void router.push(`/admin/edit?id=${ref.id}`);
    })();
  };

  return (
    <>
      <Head>
        <title>商品登録</title>
      </Head>
      <AdminLayout>
        <div className="py-6">
          <h2 className="text-3xl font-extrabold text-gray-900">商品登録</h2>
          <div className="mt-6 leading-loose text-gray-600">
            <form className="w-full max-w-lg" onSubmit={onSubmit}>
              <div className="mb-6">
                <label
                  className="mb-2 block font-bold text-gray-700"
                  htmlFor={nameId}
                >
                  商品名
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  id={nameId}
                  type="text"
                />
              </div>

              <button
                type="submit"
                className="focus:shadow-outline ml-auto block rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 "
                disabled={isLoading || name === ""}
              >
                登録
              </button>
              <p className="mt-4 text-red-500 empty:mt-0">{errorMessage}</p>
            </form>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
