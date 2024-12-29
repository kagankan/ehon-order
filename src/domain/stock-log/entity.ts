import { z } from "zod";

const schema = z
  .object({
    id: z.string().min(1),
    book: z.object({
      // 本当は bookSchema から作りたいが、brandだからかできない
      name: z.string(),
      id: z.string(),
    }),
    /** 増減の数量。入荷の場合は正の数、販売の場合は負の数。入荷できなかったメモもあるかもなので0も許容 */
    quantity: z.number().int(),
    date: z.coerce.date(),
    createdAt: z.coerce.date(),
    memo: z.string().nullable(),
  })
  .readonly()
  .brand<"StockLog">();

export type StockLog = z.infer<typeof schema>;

export const parseStockLog = (data: unknown) => schema.parse(data);
