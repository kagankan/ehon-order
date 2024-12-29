"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
// import { ErrorBoundary } from "react-error-boundary";
import { Book, formatPrice, taxIn } from "@/domain/book";
import { bookRepository } from "@/infrastructure/book";

export default function Home() {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    void (async () => {
      const list = await bookRepository.listBooks();
      setAllBooks(list);
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      <Head>
        <title>えほんはともだち 絵本リスト</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-orange-200">
        <div className="flex min-h-screen flex-col justify-center px-[4%] py-4">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            えほんはともだち 絵本リスト
          </h2>
          {isLoading ? (
            <div
              className="
          mt-8 flex flex-col items-center justify-center
        "
            >
              <div
                className="
            h-32 w-32 animate-spin rounded-full border-8 border-white border-t-transparent
          "
              ></div>
              <p className="mt-4 text-gray-900">読み込み中...</p>
            </div>
          ) : (
            <ul className="ma mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {allBooks.map((book, index) => (
                <li
                  key={index}
                  className="col-span-1 flex gap-4 divide-gray-200 rounded-lg bg-white p-4 shadow"
                >
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
                  <div className="grow py-4">
                    <h2 className="text-xl font-medium text-gray-900">
                      {book.name}
                    </h2>
                    {(book.writtenBy ||
                      book.illustratedBy ||
                      book.publisher) && (
                      <div className="mt-2">
                        {book.writtenBy && (
                          <p className="text-gray-500">作:{book.writtenBy}</p>
                        )}
                        {book.illustratedBy && (
                          <p className="text-gray-500">
                            絵:{book.illustratedBy}
                          </p>
                        )}
                        {book.publisher && (
                          <p className="text-gray-500">出版:{book.publisher}</p>
                        )}
                      </div>
                    )}
                    {book.price && (
                      <p className="mt-2">
                        {formatPrice(taxIn(book.price))}円
                        <span className="text-sm">（税込み）</span>
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}
