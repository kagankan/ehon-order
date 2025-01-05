import { bookRepository } from "@/infrastructure/book";
import { stockLogRepository } from "@/infrastructure/stock-log";
import { bookUseCase } from "@/use-case/book";
import { stockLogUseCase } from "@/use-case/stock-log";

export const container = {
  bookUseCase: bookUseCase(bookRepository),
  stockLogUseCase: stockLogUseCase(stockLogRepository),
};
