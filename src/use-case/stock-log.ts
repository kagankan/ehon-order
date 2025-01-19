import { IStockLogRepository } from "@/domain/stock-log/repository";

export const stockLogUseCase = (stockLogRepository: IStockLogRepository) => ({
  listStockLogs: async () => {
    return await stockLogRepository.listStockLogs();
  },
  createStockLog: async (args: {
    bookId: string;
    date: string;
    quantity: number;
    memo?: string;
  }) => {
    return await stockLogRepository.createStockLog(args);
  },
});
