import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { db, storage } from "@/lib/firebase";

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null | undefined>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imagePath, setImagePath] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // get data from firestore
  useEffect(() => {
    if (!id) {
      setErrorMessage("idがありません");
      return;
    }
    if (typeof id !== "string") {
      setErrorMessage("idが文字列ではありません");
      return;
    }

    const fetchBook = async () => {
      const bookDoc = await getDoc(doc(db, "books", id));
      if (bookDoc.exists()) {
        const bookData = bookDoc.data();
        if (bookData) {
          setName(bookData.name);
          setPrice(bookData.price);
          const imagePath = bookData.image;
          setImagePath(imagePath);
          const downloadUrl = await getDownloadURL(ref(storage, imagePath));
          setImageUrl(downloadUrl);
        }
      }
    };
    fetchBook();
  }, [id]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    if (!imageFile) {
      setErrorMessage("画像を選択してください");
      return;
    }

    if (!id) {
      setErrorMessage("idがありません");
      return;
    }
    if (typeof id !== "string") {
      setErrorMessage("idが文字列ではありません");
      return;
    }

    // まずStorageに画像をアップロード
    const uploadResult = await uploadBytes(ref(storage, imagePath), imageFile);

    // 続いてFirestoreにデータを保存
    await setDoc(doc(db, "books", id), {
      name: name,
      price: price,
      image: uploadResult.metadata.fullPath,
    });

    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>編集</title>
      </Head>
      <main className="bg-gray-200 min-h-screen">
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <div className="flex flex-col items-center justify-center w-full px-4 py-8 bg-white shadow-md max-w-md sm:rounded-lg sm:px-10">
            <h2 className="text-3xl font-extrabold text-gray-900">編集</h2>
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
                    <img
                      src={imageUrl}
                      alt="商品画像のプレビュー"
                      className="w-32 h-32 object-contain"
                    />
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="image"
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setImageFile(file);
                        setImageUrl(URL.createObjectURL(file));
                      }}
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
                      isLoading || name === "" || price === "" || !imageFile
                    }
                  >
                    更新
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
