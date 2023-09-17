export type Book = {
  name: string;
  price?: number;
  imagePath?: string;
  /** 作 */
  writtenBy?: string;
  /** 絵 */
  illustratedBy?: string;
  /** 出版社 */
  publisher?: string;
};
