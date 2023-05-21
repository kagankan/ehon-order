import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { AdminLayout } from "@/features/admin/components/AdminLayout";
import { bookConverter } from "@/features/book/firestore";
import { db, storage } from "@/lib/firebase";

const nameId = "name";
const priceId = "price";
const imageId = "image";

export default function Add() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null | undefined>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
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
        imagePath: uploadResult.metadata.fullPath,
      });

      setIsLoading(false);
      void router.push("/admin");
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
                  placeholder="商品名"
                />

                <label
                  className="mb-2 block font-bold text-gray-700"
                  htmlFor={imageId}
                >
                  商品画像
                </label>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="商品画像のプレビュー"
                    className="h-32 w-32 object-contain"
                    width={128}
                    height={128}
                    decoding="async"
                  />
                )}
                <input
                  className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  id={imageId}
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setImageFile(file);
                    setImageUrl(URL.createObjectURL(file));
                  }}
                />

                <label
                  className="mb-2 block font-bold text-gray-700"
                  htmlFor={priceId}
                >
                  本体価格
                </label>
                <input
                  className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  id={priceId}
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="本体価格"
                />
              </div>
              <button
                className="focus:shadow-outline ml-auto block rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 "
                disabled={
                  isLoading || name === "" || price === "" || !imageFile
                }
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
