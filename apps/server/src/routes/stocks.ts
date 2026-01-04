import { EodDataSchema, StockProfileSchema } from "@newsplus/schemas";
import { Request, Response, Router } from "express";

const router = Router();
const baseUrl = "https://api.marketstack.com/v2";
const key = process.env.STOCKS_API_KEY;

router.get("/eod", async (_req: Request, res: Response) => {
  const tickers: string[] = [
    "AAPL",
    "MSFT",
    "NVDA",
    "GOOGL",
    "AVGO",
    "ORCL",
    "CRM",
    "INTC",
    "QCOM",
    "NFLX",
  ];
  const symbols = tickers.join(",");

  try {
    const url = `${baseUrl}/eod/latest?access_key=${key}&symbols=${symbols}`;
    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();
      res.status(response.status).json({ error: "API error", message: text });
      return;
    }

    const { data } = await response.json();
    const result = EodDataSchema.safeParse(data);
    if (!result.success) {
      console.error(result.error);
      res.status(502).json({ error: "Data parsing failed" });
    }

    res.json(result.data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to fetch stocks", message });
  }
});

router.get("/tickers/:symbol", async (req: Request, res: Response) => {
  const { symbol } = req.params;

  try {
    const url = `${baseUrl}/tickerinfo?access_key=${key}&ticker=${symbol}`;
    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();
      res.status(response.status).json({ error: "API error", message: text });
      return;
    }

    const { data } = await response.json();
    const result = StockProfileSchema.safeParse(data);
    if (!result.success) {
      console.error(result.error);
      res.status(502).json({ error: "Data parsing failed" });
    }

    res.json(result.data);
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to fetch stocks", message });
  }
});

export default router;
