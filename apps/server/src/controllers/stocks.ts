import { EodDataSchema, StockProfileSchema } from "@newsplus/schemas";
import { Request, Response } from "express";

import { API_URLS, env } from "../config";

export const getEodData = async (_req: Request, res: Response, tickers: string[]) => {
  const symbols = tickers.join(",");
  const url = `${API_URLS.marketstack}/eod/latest?access_key=${env.stocksApiKey}&symbols=${symbols}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();
      res.status(response.status).json({ error: "API error", message: text });
      return;
    }

    const { data } = await response.json();
    const result = EodDataSchema.safeParse(data);

    if (!result.success) {
      res.status(502).json({ error: "Data parsing failed" });
      return;
    }

    res.json(result.data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to fetch stocks", message });
  }
};

export const getStockProfile = async (req: Request, res: Response) => {
  const { symbol } = req.params;
  const url = `${API_URLS.marketstack}/tickerinfo?access_key=${env.stocksApiKey}&ticker=${symbol}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();
      res.status(response.status).json({ error: "API error", message: text });
      return;
    }

    const { data } = await response.json();
    const result = StockProfileSchema.safeParse(data);

    if (!result.success) {
      res.status(502).json({ error: "Data parsing failed" });
      return;
    }

    res.json(result.data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to fetch stock profile", message });
  }
};
