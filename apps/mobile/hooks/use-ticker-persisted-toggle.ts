import { usePersistedToggle } from "@/hooks/use-persisted-toggle";
import { deleteTicker, isTickerSaved, saveTicker } from "@/lib/db/stocks";

export const useTickerPersistedToggle = (ticker: string, name?: string) =>
  usePersistedToggle({
    key: ["local", "ticker", ticker],
    check: () => isTickerSaved(ticker),
    save: () => saveTicker(ticker, name),
    remove: () => deleteTicker(ticker),
    errors: {
      save: "Failed to add ticker to watchlist",
      remove: "Failed to remove ticker from watchlist",
    },
  });
