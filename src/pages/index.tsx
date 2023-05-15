import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import Head from "next/head";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { db } from "@/lib/firebase";

type Book = Partial<{
  name: string;
  price: number;
  image: string;
}>;

const storage = getStorage();

export default function Home() {
  const [allBooks, setAllBooks] = useState<Book[]>([]);

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "books"));
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
      <main className="bg-gray-200 min-h-screen">
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <div className="flex flex-col items-center justify-center w-full px-4 py-8 bg-white shadow-md max-w-lg sm:rounded-lg sm:px-10">
            <h2 className="text-3xl font-extrabold text-gray-900">
              えほんはともだち
            </h2>
            <div className="mt-6 leading-loose text-gray-600">
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {allBooks.map((book, index) => (
                  <ErrorBoundary
                    key={index}
                    fallbackRender={() => <p>Error</p>}
                  >
                    <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
                      {book.image && (
                        <div className="flex-1 flex flex-col p-8">
                          <img
                            className="w-32 h-32 flex-shrink-0 mx-auto object-contain"
                            src={book.image}
                            alt=""
                          />
                          <h2 className="mt-6 text-gray-900 text-sm font-medium">
                            {book.name}
                          </h2>
                          <p className="mt-1 text-gray-500 text-sm">
                            {book.price}円
                          </p>
                        </div>
                      )}
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
