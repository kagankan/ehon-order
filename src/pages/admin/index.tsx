import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Book, formatPrice, taxIn } from "@/domain/book";
import { AdminLayout } from "@/features/admin/components/AdminLayout";
import { bookRepository } from "@/infrastructure/book";

export default function Admin() {
  const [allBooks, setAllBooks] = useState<Readonly<Book>[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    void (async () => {
      const list = await bookRepository.listBooks();
      setAllBooks(list);
    })();
  }, []);

  const handleDeleteBook = async (id: string) => {
    setIsLoading(true);
    const targetBook = allBooks.find((book) => book.id === id);
    if (
      targetBook &&
      window.confirm(`「${targetBook?.name}」を削除しますか？`)
    ) {
      await bookRepository.deleteBook(id);
      setAllBooks(allBooks.filter((book) => book.id !== id));
    }
    setIsLoading(false);
  };

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
          <div className="mt-6 text-gray-600">
            <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {allBooks.map((book, index) => (
                <ErrorBoundary key={index} fallbackRender={() => <p>Error</p>}>
                  <li className="col-span-1 flex gap-4 divide-gray-200 rounded-lg bg-white p-4 shadow">
                    {book.imageUrl && (
                      <img
                        className="mx-auto h-32 w-32 flex-shrink-0 rounded object-contain"
                        src={book.imageUrl}
                        alt=""
                        width={128}
                        height={128}
                        decoding="async"
                      />
                    )}
                    <div className="grow">
                      <h2 className="text-xl font-bold leading-loose text-gray-900">
                        {book.name}
                      </h2>
                      {book.price && (
                        <div className="mt-1">
                          <p>本体価格: {formatPrice(book.price)}円</p>
                          <p>税込み: {formatPrice(taxIn(book.price))}円</p>
                        </div>
                      )}
                      <div
                        className="
                      mt-2 flex justify-end gap-4
                      "
                      >
                        <Link
                          href={`/admin/edit?id=${book.id}`}
                          className="
                          rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75
                          "
                        >
                          編集
                        </Link>
                        <button
                          disabled={isLoading}
                          className="
                        rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75
                        "
                          onClick={() => void handleDeleteBook(book.id)}
                        >
                          削除
                        </button>
                      </div>
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
