import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';
export const connectorConfig: ConnectorConfig;

export type TimestampString = string;

export type UUIDString = string;

export type Int64String = string;

export type DateString = string;



export interface Book_Key {
  id: UUIDString;
  __typename?: 'Book_Key';
}

export interface CreateBookData {
  book_insert: Book_Key;
}

export interface CreateBookVariables {
  name: string;
}

export interface CreateStockLogData {
  stockLog_insert: StockLog_Key;
}

export interface CreateStockLogVariables {
  bookId: UUIDString;
  date: DateString;
  quantity: number;
  memo?: string | null;
}

export interface DeleteBookData {
  book_delete?: Book_Key | null;
}

export interface DeleteBookVariables {
  id: UUIDString;
}

export interface GetBookByIdData {
  book?: {
    id: UUIDString;
    name: string;
    price: number;
    imagePath?: string | null;
    writtenBy?: string | null;
    illustratedBy?: string | null;
    publisher?: string | null;
  } & Book_Key;
}

export interface GetBookByIdVariables {
  id: UUIDString;
}

export interface ListBooksData {
  books: ({
    id: UUIDString;
    name: string;
    price: number;
    imagePath?: string | null;
    writtenBy?: string | null;
    illustratedBy?: string | null;
    publisher?: string | null;
  } & Book_Key)[];
}

export interface ListStockLogsData {
  stockLogs: ({
    id: UUIDString;
    book: {
      id: UUIDString;
      name: string;
    } & Book_Key;
      date: DateString;
      quantity: number;
      memo?: string | null;
      createdAt: TimestampString;
  } & StockLog_Key)[];
}

export interface StockLog_Key {
  id: UUIDString;
  __typename?: 'StockLog_Key';
}

export interface UpdateBookData {
  book_update?: Book_Key | null;
}

export interface UpdateBookVariables {
  id: UUIDString;
  name: string;
  price?: number | null;
  imagePath?: string | null;
  writtenBy?: string | null;
  illustratedBy?: string | null;
  publisher?: string | null;
}



/* Allow users to create refs without passing in DataConnect */
export function listBooksRef(): QueryRef<ListBooksData, undefined>;/* Allow users to pass in custom DataConnect instances */
export function listBooksRef(dc: DataConnect): QueryRef<ListBooksData,undefined>;

export function listBooks(): QueryPromise<ListBooksData, undefined>;
export function listBooks(dc: DataConnect): QueryPromise<ListBooksData,undefined>;


/* Allow users to create refs without passing in DataConnect */
export function getBookByIdRef(vars: GetBookByIdVariables): QueryRef<GetBookByIdData, GetBookByIdVariables>;
/* Allow users to pass in custom DataConnect instances */
export function getBookByIdRef(dc: DataConnect, vars: GetBookByIdVariables): QueryRef<GetBookByIdData,GetBookByIdVariables>;

export function getBookById(vars: GetBookByIdVariables): QueryPromise<GetBookByIdData, GetBookByIdVariables>;
export function getBookById(dc: DataConnect, vars: GetBookByIdVariables): QueryPromise<GetBookByIdData,GetBookByIdVariables>;


/* Allow users to create refs without passing in DataConnect */
export function createBookRef(vars: CreateBookVariables): MutationRef<CreateBookData, CreateBookVariables>;
/* Allow users to pass in custom DataConnect instances */
export function createBookRef(dc: DataConnect, vars: CreateBookVariables): MutationRef<CreateBookData,CreateBookVariables>;

export function createBook(vars: CreateBookVariables): MutationPromise<CreateBookData, CreateBookVariables>;
export function createBook(dc: DataConnect, vars: CreateBookVariables): MutationPromise<CreateBookData,CreateBookVariables>;


/* Allow users to create refs without passing in DataConnect */
export function updateBookRef(vars: UpdateBookVariables): MutationRef<UpdateBookData, UpdateBookVariables>;
/* Allow users to pass in custom DataConnect instances */
export function updateBookRef(dc: DataConnect, vars: UpdateBookVariables): MutationRef<UpdateBookData,UpdateBookVariables>;

export function updateBook(vars: UpdateBookVariables): MutationPromise<UpdateBookData, UpdateBookVariables>;
export function updateBook(dc: DataConnect, vars: UpdateBookVariables): MutationPromise<UpdateBookData,UpdateBookVariables>;


/* Allow users to create refs without passing in DataConnect */
export function deleteBookRef(vars: DeleteBookVariables): MutationRef<DeleteBookData, DeleteBookVariables>;
/* Allow users to pass in custom DataConnect instances */
export function deleteBookRef(dc: DataConnect, vars: DeleteBookVariables): MutationRef<DeleteBookData,DeleteBookVariables>;

export function deleteBook(vars: DeleteBookVariables): MutationPromise<DeleteBookData, DeleteBookVariables>;
export function deleteBook(dc: DataConnect, vars: DeleteBookVariables): MutationPromise<DeleteBookData,DeleteBookVariables>;


/* Allow users to create refs without passing in DataConnect */
export function listStockLogsRef(): QueryRef<ListStockLogsData, undefined>;/* Allow users to pass in custom DataConnect instances */
export function listStockLogsRef(dc: DataConnect): QueryRef<ListStockLogsData,undefined>;

export function listStockLogs(): QueryPromise<ListStockLogsData, undefined>;
export function listStockLogs(dc: DataConnect): QueryPromise<ListStockLogsData,undefined>;


/* Allow users to create refs without passing in DataConnect */
export function createStockLogRef(vars: CreateStockLogVariables): MutationRef<CreateStockLogData, CreateStockLogVariables>;
/* Allow users to pass in custom DataConnect instances */
export function createStockLogRef(dc: DataConnect, vars: CreateStockLogVariables): MutationRef<CreateStockLogData,CreateStockLogVariables>;

export function createStockLog(vars: CreateStockLogVariables): MutationPromise<CreateStockLogData, CreateStockLogVariables>;
export function createStockLog(dc: DataConnect, vars: CreateStockLogVariables): MutationPromise<CreateStockLogData,CreateStockLogVariables>;


