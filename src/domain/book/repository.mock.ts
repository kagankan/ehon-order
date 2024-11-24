import { IBookRepository } from "./repository";

export const bookRepositoryMock: IBookRepository = {
  listBooks: async () => {
    return Promise.resolve([]);
  },
  getBookById: async () => {
    return Promise.resolve(undefined);
  },
  createBook: async () => {
    return Promise.resolve({ id: "mock" });
  },
  updateBook: async () => {
    return Promise.resolve({ id: "mock" });
  },
  deleteBook: async () => {
    return Promise.resolve();
  },
};
