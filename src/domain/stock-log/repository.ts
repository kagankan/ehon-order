import { StockLog } from "./entity";

export interface IStockLogRepository {
  listStockLogs(): Promise<StockLog[]>;
  createStockLog(args: {
    bookId: string;
    date: string;
    quantity: number;
    memo?: string;
  }): Promise<{ id: string }>;
}
