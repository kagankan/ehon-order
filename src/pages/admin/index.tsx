import { getDocs, collection } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { bookConverter } from "@/features/book/firestore";
import { Book } from "@/features/book/types";
import { db, storage } from "@/lib/firebase";
import { AdminLayout } from "./_components/AdminLayout";

export default function Admin() {
  const [allBooks, setAllBooks] = useState<
    Readonly<Book & { id: string; imageUrl: string }>[]
  >([]);

  useEffect(() => {
    void (async () => {
      const querySnapshot = await getDocs(
        collection(db, "books").withConverter(bookConverter)
      );
      const list = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          const imagePath = data.imagePath;
          let downloadUrl: string;
          try {
            downloadUrl = await getDownloadURL(ref(storage, imagePath));
          } catch (error) {
            downloadUrl =
              "https://placehold.jp/ffcd94/bd6e00/150x150.png?text=NO%20IMAGE";
          }
          return {
            ...data,
            imageUrl: downloadUrl,
            id: doc.id,
          };
        })
      );
      setAllBooks(list);
    })();
  }, []);

  return (
    <>
      <Head>
        <title>管理画面</title>
      </Head>
      <AdminLayout>
        <div className="py-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-extrabold text-gray-900">管理画面</h1>
            <Link
              href="/admin/add"
              className="
                      rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75
                      "
            >
              商品追加
            </Link>
          </div>
          <div className="mt-6 leading-loose text-gray-600">
            <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {allBooks.map((book, index) => (
                <ErrorBoundary key={index} fallbackRender={() => <p>Error</p>}>
                  <li className="col-span-1 flex gap-4 divide-gray-200 rounded-lg bg-white p-4 shadow">
                    {book.imageUrl && (
                      <img
                        className="mx-auto h-32 w-32 flex-shrink-0 object-contain"
                        src={book.imageUrl}
                        alt=""
                        width={128}
                        height={128}
                        decoding="async"
                      />
                    )}
                    <div className="grow">
                      <h2 className="mt-6 text-lg font-medium text-gray-900">
                        {book.name}
                      </h2>
                      <p className="mt-1 text-gray-500">{book.price}円</p>
                      <Link
                        href={`/admin/edit?id=${book.id}`}
                        className="
                          mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75
                          "
                      >
                        編集
                      </Link>
                    </div>
                  </li>
                </ErrorBoundary>
              ))}
            </ul>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
