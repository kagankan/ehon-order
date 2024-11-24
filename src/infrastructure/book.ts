import {
  createBook,
  deleteBook,
  getBookById,
  listBooks,
  updateBook,
} from "@firebasegen/default-connector";
import { getDownloadURL, ref } from "firebase/storage";
import { parseBook } from "@/domain/book/entity";
import { IBookRepository } from "@/domain/book/repository";
import { dataConnect, storage } from "@/lib/firebase";

const getImageUrl = async (imagePath?: string | null) => {
  try {
    if (!imagePath) {
      throw new Error("No image path");
    }
    return await getDownloadURL(ref(storage, imagePath));
  } catch (error) {
    return "https://placehold.jp/ffcd94/bd6e00/150x150.png?text=NO%20IMAGE";
  }
};

export const bookRepository: IBookRepository = {
  listBooks: async () => {
    const { data } = await listBooks(dataConnect);
    const list = await Promise.all(
      data.books.map(async (record) => {
        const downloadUrl = await getImageUrl(record.imagePath);
        return {
          ...record,
          imageUrl: downloadUrl,
        };
      })
    );
    return list.map((book) => parseBook(book));
  },
  getBookById: async (id) => {
    const { data } = await getBookById(dataConnect, { id: id });
    return parseBook({
      ...data.book,
      imageUrl: await getImageUrl(data.book?.imagePath),
    });
  },
  createBook: async (name) => {
    const { data } = await createBook(dataConnect, { name: name });
    return data.book_insert;
  },
  updateBook: async (args) => {
    const { data } = await updateBook(dataConnect, { ...args });
    return data.book_update;
  },
  deleteBook: async (id) => {
    await deleteBook(dataConnect, { id: id });
  },
};

// こういうclassの書き方もできるが、classを使う理由は特になさそう
// さらに、implementsだと引数の型の指定が必須になってしまう
// export class BookRepository implements IBookRepository {
//   async listBooks() {
//     const { data } = await listBooks();
//     return data.books;
//   }
//   async getBookById(id: string) {
//     const { data } = await getBookById({ id: id });
//     return data.book;
//   }
//   async createBook(name: string) {
//     const { data } = await createBook({ name: name });
//     return data.book_insert;
//   }
//   async updateBook(args: Book) {
//     const { data } = await updateBook({ ...args });
//     return data.book_update;
//   }
//   async deleteBook(id: string) {
//     await deleteBook({ id: id });
//   }
// }
