import { FirestoreDataConverter } from "firebase/firestore";
import { Book } from "./types";

export const bookConverter: FirestoreDataConverter<Book> = {
  toFirestore(book) {
    return { ...book };
  },

  fromFirestore(snapshot, options) {
    const data = snapshot.data(options) as Book;
    return {
      id: snapshot.id,
      ...data,
    };
  },
};
