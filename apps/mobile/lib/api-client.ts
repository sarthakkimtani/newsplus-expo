import type { EodData, Headline, StockProfile } from "@newsplus/schemas";

import { fetchSavedTickers } from "@/lib/db/stocks";

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const baseUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
  const res = await fetch(`${baseUrl}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || `Request failed: ${res.status}`);
  }

  return res.json();
}

export const fetchArticles = async (): Promise<Headline> => {
  return apiFetch<Headline>("/news");
};

export const fetchStocks = async (): Promise<EodData> => {
  return apiFetch<EodData>("/stocks/eod");
};

export const fetchStockProfile = async (ticker: string): Promise<StockProfile> => {
  return apiFetch<StockProfile>(`/stocks/tickers/${ticker}`);
};

export const fetchWatchlist = async (): Promise<EodData> => {
  const savedTickers = await fetchSavedTickers();
  const tickers = savedTickers.map((t) => t.symbol).join(",");
  if (tickers.length === 0) return [];

  return apiFetch<EodData>(`/stocks/watchlist?tickers=${tickers}`);
};
