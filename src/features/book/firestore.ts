import { FirestoreDataConverter } from "firebase/firestore";
import { Book } from "./types";

export const bookConverter: FirestoreDataConverter<Book> = {
  toFirestore(book) {
    return { ...book };
  },

  fromFirestore(snapshot, options) {
    const data = snapshot.data(options) as Omit<Book, "id">;
    return {
      id: snapshot.id,
      ...data,
    };
  },
};
