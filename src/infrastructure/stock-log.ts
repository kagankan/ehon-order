import { listStockLogs, createStockLog } from "@firebasegen/default-connector";
import { parseStockLog } from "@/domain/stock-log/entity";
import { IStockLogRepository } from "@/domain/stock-log/repository";

export const stockLogRepository: IStockLogRepository = {
  listStockLogs: async () => {
    const { data } = await listStockLogs();
    const validated = data.stockLogs
      .map((record) => {
        try {
          return parseStockLog(record);
        } catch (e) {
          console.log("Invalid record", record);
          console.error(e);
          return null;
        }
      })
      .filter((record) => record !== null);
    return validated;
  },
  createStockLog: async (args) => {
    const { data } = await createStockLog(args);
    return data.stockLog_insert;
  },
};
