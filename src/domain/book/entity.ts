import { z } from "zod";

// エンティティ、もしくはドメインモデル、もしくはドメインオブジェクト
// https://qiita.com/takasek/items/70ab5a61756ee620aee6
const schema = z
  .object({
    id: z.string(),
    name: z.string(),
    price: z.number().nullable().optional(),
    writtenBy: z.string().nullable().optional(),
    illustratedBy: z.string().nullable().optional(),
    publisher: z.string().nullable().optional(),
    imagePath: z.string().nullable().optional(),
    imageUrl: z.string().nullable().optional(),
  })
  .readonly()
  .brand<"Book">();

export type Book = z.infer<typeof schema>;
export const parseBook = (data: unknown) => schema.parse(data);
