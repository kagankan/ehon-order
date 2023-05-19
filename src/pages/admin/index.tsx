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
import { db, storage } from "@/lib/firebase";

type Book = {
  id: string;
  name?: string;
  price?: number;
  image?: string;
};

export default function Admin() {
  const user = useAuthContext();
  const router = useRouter();
  const [allBooks, setAllBooks] = useState<Book[]>([]);

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "books"));
      const list = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          const imagePath = data.image;
          const downloadUrl = await getDownloadURL(ref(storage, imagePath));
          return { ...data, image: downloadUrl, id: doc.id };
        })
      );
      setAllBooks(list);
    })();
  }, []);

  const logOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      router.push("/login");
    } catch (e) {
      if (e instanceof FirebaseError) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    }
  };

  return (
    <>
      <Head>
        <title>管理画面</title>
      </Head>
      {user && (
        <main className="bg-gray-200 min-h-screen">
          <div className="w-[80%] max-w-7xl mx-auto">
            <div className="py-8">
              <h1 className="text-3xl font-extrabold text-gray-900">
                管理画面
              </h1>
              <div className="mt-6 leading-loose text-gray-600">
                <Link
                  href="/admin/add"
                  className="
                  mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75
                "
                >
                  商品追加
                </Link>
                <button
                  className="mt-4 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
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
                      <li className="col-span-1 flex gap-4 bg-white rounded-lg shadow p-4 divide-gray-200">
                        {book.image && (
                          <img
                            className="w-32 h-32 flex-shrink-0 mx-auto object-contain"
                            src={book.image}
                            alt=""
                          />
                        )}
                        <div className="grow">
                          <h2 className="mt-6 text-gray-900 text-lg font-medium">
                            {book.name}
                          </h2>
                          <p className="mt-1 text-gray-500">{book.price}円</p>
                          <Link
                            href={`/admin/edit?id=${book.id}`}
                            className="
                          mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75
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
