import { IBookRepository } from "@/domain/book/repository";

export const bookUseCase = (bookRepository: IBookRepository) => ({
  listBooks: async () => {
    return await bookRepository.listBooks();
  },
  getBookById: async (id: string) => {
    return await bookRepository.getBookById(id);
  },
  createBook: async (name: string) => {
    return await bookRepository.createBook(name);
  },
  updateBook: async (args: {
    id: string;
    name: string;
    price?: number;
    imagePath?: string;
    writtenBy?: string;
    illustratedBy?: string;
    publisher?: string;
  }) => {
    return await bookRepository.updateBook(args);
  },
  deleteBook: async (id: string) => {
    return await bookRepository.deleteBook(id);
  },
});
