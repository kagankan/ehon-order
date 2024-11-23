export type Book = {
  name: string;
  price?: number | null;
  imagePath?: string | null;
  /** 作 */
  writtenBy?: string | null;
  /** 絵 */
  illustratedBy?: string | null;
  /** 出版社 */
  publisher?: string | null;
};
