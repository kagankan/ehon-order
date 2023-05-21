import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import Head from "next/head";
import { FormEvent, useState } from "react";
import { bookConverter } from "@/features/book/firestore";
import { db, storage } from "@/lib/firebase";

export default function Add() {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null | undefined>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    if (!imageFile) {
      setErrorMessage("画像を選択してください");
      return;
    }

    void (async () => {
      // まずStorageに画像をアップロード
      const uuid = self.crypto.randomUUID();
      const uploadResult = await uploadBytes(
        ref(storage, `/images/${uuid}-${imageFile.name}`),
        imageFile
      );

      // 続いてFirestoreにデータを保存
      await addDoc(collection(db, "books").withConverter(bookConverter), {
        name: name,
        price: Number(price),
        image: uploadResult.metadata.fullPath,
      });

      setIsLoading(false);
    })();
  };

  return (
    <>
      <Head>
        <title>商品登録</title>
      </Head>
      <main className="min-h-screen bg-gray-200">
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
          <div className="flex w-full max-w-lg flex-col items-center justify-center bg-white px-4 py-8 shadow-md sm:rounded-lg sm:px-10">
            <h2 className="text-3xl font-extrabold text-gray-900">商品登録</h2>
            <div className="mt-6 leading-loose text-gray-600">
              <form className="w-full max-w-lg" onSubmit={onSubmit}>
                <div className="-mx-3 mb-6 flex flex-wrap">
                  <div className="w-full px-3">
                    <label
                      className="mb-2 block text-sm font-bold text-gray-700"
                      htmlFor="name"
                    >
                      商品名
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none"
                      id="name"
                      type="text"
                      placeholder="商品名"
                    />

                    <label
                      className="mb-2 block text-sm font-bold text-gray-700"
                      htmlFor="image"
                    >
                      商品画像
                    </label>
                    <input
                      className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none"
                      id="image"
                      type="file"
                      onChange={(e) => setImageFile(e.target.files?.[0])}
                    />

                    <label
                      className="mb-2 block text-sm font-bold text-gray-700"
                      htmlFor="name"
                    >
                      価格
                    </label>
                    <input
                      className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none"
                      id="name"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="価格"
                    />
                  </div>
                  <button
                    className=" focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 "
                    disabled={
                      isLoading || name === "" || price === "" || !imageFile
                    }
                  >
                    登録
                  </button>
                  {errorMessage && (
                    <p className="mt-4 text-xs italic text-red-500">
                      {errorMessage}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
