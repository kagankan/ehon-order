import { FirebaseError } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getDocs, collection } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useAuthContext } from "@/features/auth/context/AuthContext";
import { bookConverter } from "@/features/book/firestore";
import { Book } from "@/features/book/types";
import { db, storage } from "@/lib/firebase";

export default function Admin() {
  const user = useAuthContext();
  const router = useRouter();
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
          const downloadUrl = await getDownloadURL(ref(storage, imagePath));
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

  const logOut = () => {
    void (async () => {
      try {
        const auth = getAuth();
        await signOut(auth);
        await router.push("/login");
      } catch (e) {
        if (e instanceof FirebaseError) {
          // eslint-disable-next-line no-console
          console.log(e);
        }
      }
    })();
  };

  return (
    <>
      <Head>
        <title>管理画面</title>
      </Head>
      {user && (
        <main className="min-h-screen bg-gray-200">
          <div className="mx-auto w-[80%] max-w-7xl">
            <div className="py-8">
              <h1 className="text-3xl font-extrabold text-gray-900">
                管理画面
              </h1>
              <div className="mt-6 leading-loose text-gray-600">
                <Link
                  href="/admin/add"
                  className="
                  mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75
                "
                >
                  商品追加
                </Link>
                <button
                  className="mt-4 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  onClick={logOut}
                >
                  ログアウト
                </button>

                <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {allBooks.map((book, index) => (
                    <ErrorBoundary
                      key={index}
                      fallbackRender={() => <p>Error</p>}
                    >
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
          </div>
        </main>
      )}
    </>
  );
}
