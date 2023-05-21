import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import Head from "next/head";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { bookConverter } from "@/features/book/firestore";
import { Book } from "@/features/book/types";
import { db } from "@/lib/firebase";

const storage = getStorage();

export default function Home() {
  const [allBooks, setAllBooks] = useState<Book[]>([]);

  useEffect(() => {
    void (async () => {
      const querySnapshot = await getDocs(
        collection(db, "books").withConverter(bookConverter)
      );
      const list = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          const imagePath = data.image;
          const downloadUrl = await getDownloadURL(ref(storage, imagePath));
          return { ...data, image: downloadUrl };
        })
      );
      setAllBooks(list);
    })();
  }, []);

  return (
    <>
      <Head>
        <title>えほんはともだち</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-orange-200">
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
          <div className="flex w-full max-w-lg flex-col bg-white px-4 py-8 shadow-md sm:rounded-lg sm:px-10">
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              えほんはともだち
            </h2>
            <div className="mt-6 leading-loose text-gray-600">
              <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {allBooks.map((book, index) => (
                  <ErrorBoundary
                    key={index}
                    fallbackRender={() => <p>Error</p>}
                  >
                    <li className="col-span-1 flex gap-4 divide-gray-200 rounded-lg bg-white p-4 shadow">
                      {book.image && (
                        <img
                          className="mx-auto h-32 w-32 flex-shrink-0 object-contain"
                          src={book.image}
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
                      </div>
                    </li>
                  </ErrorBoundary>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
