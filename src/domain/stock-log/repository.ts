import { StockLog } from "./entity";

export interface IStockLogRepository {
  listStockLogs(): Promise<StockLog[]>;
}
