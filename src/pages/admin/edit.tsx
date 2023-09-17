import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { AdminLayout } from "@/features/admin/components/AdminLayout";
import { bookConverter } from "@/features/book/firestore";
import { db, storage } from "@/lib/firebase";

const nameId = "name";
const priceId = "price";
const imageId = "image";
const writtenById = "writtenBy";
const illustratedById = "illustratedBy";
const publisherId = "publisher";
const DEFAULT_IMAGE_URL =
  "https://placehold.jp/ffcd94/bd6e00/150x150.png?text=NO%20IMAGE";

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null | undefined>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imagePath, setImagePath] = useState<string>("");
  const [writtenBy, setWrittenBy] = useState<string>("");
  const [illustratedBy, setIllustratedBy] = useState<string>("");
  const [publisher, setPublisher] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 現在のデータを読み込み
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
      const bookDoc = await getDoc(
        doc(db, "books", id).withConverter(bookConverter)
      );
      if (bookDoc.exists()) {
        const bookData = bookDoc.data();
        if (bookData) {
          setName(bookData.name);
          setPrice(String(bookData.price));
          bookData.writtenBy && setWrittenBy(bookData.writtenBy);
          bookData.illustratedBy && setIllustratedBy(bookData.illustratedBy);
          bookData.publisher && setPublisher(bookData.publisher);
          if (bookData.imagePath) {
            setImagePath(bookData.imagePath);
            let downloadUrl: string;
            try {
              downloadUrl = await getDownloadURL(
                ref(storage, bookData.imagePath)
              );
            } catch (error) {
              downloadUrl = DEFAULT_IMAGE_URL;
            }
            setImageUrl(downloadUrl);
          } else {
            setImageUrl(DEFAULT_IMAGE_URL);
          }
        }
      }
    };
    void fetchBook();
  }, [id]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    if (!id) {
      setErrorMessage("idがありません");
      return;
    }
    if (typeof id !== "string") {
      setErrorMessage("idが文字列ではありません");
      return;
    }

    void (async () => {
      // 画像を更新する場合
      if (imageFile) {
        await uploadBytes(ref(storage, imagePath), imageFile);
      }

      // 続いてFirestoreにデータを保存
      await setDoc(doc(db, "books", id).withConverter(bookConverter), {
        name: name,
        price: Number(price),
        imagePath: imagePath,
        writtenBy: writtenBy,
        illustratedBy: illustratedBy,
        publisher: publisher,
      });
      setIsLoading(false);
    })();
  };

  return (
    <>
      <Head>
        <title>編集</title>
      </Head>
      <AdminLayout>
        <div className="py-8">
          <h2 className="text-3xl font-extrabold text-gray-900">編集</h2>
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

                <label
                  className="mb-2 block font-bold text-gray-700"
                  htmlFor={imageId}
                >
                  商品画像
                </label>
                <img
                  src={imageUrl}
                  alt="商品画像のプレビュー"
                  className="h-32 w-32 object-contain"
                  width={128}
                  height={128}
                  decoding="async"
                />
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
                />
              </div>
              <div className="mb-6">
                <label
                  className="mb-2 block font-bold text-gray-700"
                  htmlFor={writtenById}
                >
                  著者
                </label>
                <input
                  value={writtenBy}
                  onChange={(e) => setWrittenBy(e.target.value)}
                  className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  id={writtenById}
                  type="text"
                />
              </div>
              <div className="mb-6">
                <label
                  className="mb-2 block font-bold text-gray-700"
                  htmlFor={illustratedById}
                >
                  絵
                </label>
                <input
                  value={illustratedBy}
                  onChange={(e) => setIllustratedBy(e.target.value)}
                  className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  id={illustratedById}
                  type="text"
                />
              </div>
              <div className="mb-6">
                <label
                  className="mb-2 block font-bold text-gray-700"
                  htmlFor={publisherId}
                >
                  出版社
                </label>
                <input
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                  className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  id={publisherId}
                  type="text"
                />
              </div>

              <button
                className="focus:shadow-outline ml-auto block rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 "
                disabled={isLoading || name === "" || price === ""}
              >
                更新
              </button>
              <p className="mt-4 text-red-500 empty:mt-0">{errorMessage}</p>
            </form>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
