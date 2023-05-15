import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import Head from "next/head";
import { FormEvent, useState } from "react";
import { app } from "@/lib/firebase";

const storage = getStorage();
const db = getFirestore(app);

export default function Add() {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [image, setImage] = useState<File | null | undefined>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    if (!image) {
      setErrorMessage("画像を選択してください");
      return;
    }

    // まずStorageに画像をアップロード
    const uuid = self.crypto.randomUUID();
    const uploadResult = await uploadBytes(
      ref(storage, `/images/${uuid}-${image.name}`),
      image
    );

    // 続いてFirestoreにデータを保存
    await addDoc(collection(db, "books"), {
      name: name,
      price: price,
      image: uploadResult.metadata.fullPath,
    });

    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>商品登録</title>
      </Head>
      <main className="bg-gray-200 min-h-screen">
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <div className="flex flex-col items-center justify-center w-full px-4 py-8 bg-white shadow-md max-w-lg sm:rounded-lg sm:px-10">
            <h2 className="text-3xl font-extrabold text-gray-900">商品登録</h2>
            <div className="mt-6 leading-loose text-gray-600">
              <form className="w-full max-w-lg" onSubmit={onSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="name"
                    >
                      商品名
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="商品名"
                    />

                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="image"
                    >
                      商品画像
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="image"
                      type="file"
                      onChange={(e) => setImage(e.target.files?.[0])}
                    />

                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="name"
                    >
                      価格
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="name"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="価格"
                    />
                  </div>
                  <button
                    className=" px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed "
                    disabled={
                      isLoading || name === "" || price === "" || !image
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
