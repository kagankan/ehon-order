import { Book } from "./entity";

export interface IBookRepository {
  listBooks(): Promise<Book[]>;
  getBookById(id: string): Promise<Book | undefined>;
  createBook(id: string): Promise<{ id: string }>;
  updateBook(args: Book): Promise<{ id: string } | null | undefined>;
  deleteBook(id: string): Promise<void>;
}
