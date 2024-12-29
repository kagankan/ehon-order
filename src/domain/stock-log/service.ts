import { StockLog } from "./entity";

export const getCurrentStocks = (
  allStockLogs: StockLog[]
): Record<string, number> => {
  const grouped = Object.groupBy(allStockLogs, (log) => log.book.id);
  const currentStocks = Object.fromEntries(
    Object.entries(grouped).map(([bookId, logs]) => [
      bookId,
      logs.reduce((acc, log) => acc + log.quantity, 0),
    ])
  );
  return currentStocks;
};
