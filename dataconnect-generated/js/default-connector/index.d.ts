import { ConnectorConfig, DataConnect, QueryRef, QueryPromise } from 'firebase/data-connect';
export const connectorConfig: ConnectorConfig;

export type TimestampString = string;

export type UUIDString = string;

export type Int64String = string;

export type DateString = string;



export interface Book_Key {
  id: UUIDString;
  __typename?: 'Book_Key';
}

export interface ListBooksData {
  books: ({
    title: string;
    imageUrl: string;
    genre?: string | null;
  })[];
}



/* Allow users to create refs without passing in DataConnect */
export function listBooksRef(): QueryRef<ListBooksData, undefined>;/* Allow users to pass in custom DataConnect instances */
export function listBooksRef(dc: DataConnect): QueryRef<ListBooksData,undefined>;

export function listBooks(): QueryPromise<ListBooksData, undefined>;
export function listBooks(dc: DataConnect): QueryPromise<ListBooksData,undefined>;


