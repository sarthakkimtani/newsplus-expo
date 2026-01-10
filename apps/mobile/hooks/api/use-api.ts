import { useAuth } from "@clerk/clerk-expo";
import { EodData, Headline, StockProfile } from "@newsplus/schemas";

import { apiFetch } from "@/lib/api-client";
import { fetchSavedTickers } from "@/lib/db/stocks";

export function useApi() {
  const { getToken } = useAuth();

  const authedFetch = async <T>(url: string) => {
    const token = await getToken();
    return apiFetch<T>(url, token);
  };

  return {
    fetchArticles: () => authedFetch<Headline>("/news"),
    fetchStocks: () => authedFetch<EodData>("/stocks/eod"),
    fetchStockProfile: (ticker: string) => authedFetch<StockProfile>(`/stocks/tickers/${ticker}`),
    fetchWatchlist: async () => {
      const savedTickers = await fetchSavedTickers();
      const tickers = savedTickers.map((t) => t.symbol).join(",");
      if (tickers.length === 0) return [];

      return authedFetch<EodData>(`/stocks/watchlist?tickers=${tickers}`);
    },
  };
}
