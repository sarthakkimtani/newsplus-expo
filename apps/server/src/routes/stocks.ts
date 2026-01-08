import { Router } from "express";

import { DEFAULT_TICKERS } from "../config";
import { getEodData, getStockProfile } from "../controllers";

const router = Router();

const parseTickers = (tickers?: string) =>
  tickers
    ?.split(",")
    .map((t) => t.trim().toUpperCase())
    .filter(Boolean);

router.get("/eod", (req, res) => getEodData(req, res, [...DEFAULT_TICKERS]));

router.get("/tickers/:symbol", getStockProfile);

router.get("/watchlist", (req, res) => {
  const tickers = parseTickers(req.query.tickers as string);
  if (!tickers?.length) {
    return res.status(400).json({ error: "tickers query param required" });
  }

  return getEodData(req, res, tickers);
});

export default router;
