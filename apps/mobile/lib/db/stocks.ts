import { db } from "@/lib/db";

export interface Ticker {
  id: number;
  symbol: string;
  name: string | null;
}

export async function saveTicker(symbol: string, name?: string): Promise<void> {
  await db.runAsync(`INSERT OR IGNORE INTO tickers (symbol, name) VALUES (?, ?)`, [
    symbol.toUpperCase(),
    name ?? null,
  ]);
}

export async function deleteTicker(symbol: string): Promise<void> {
  await db.runAsync(`DELETE FROM tickers WHERE symbol = ?`, [symbol.toUpperCase()]);
}

export async function isTickerSaved(symbol: string): Promise<boolean> {
  const row = await db.getFirstAsync(`SELECT 1 FROM tickers WHERE symbol = ? LIMIT 1`, [
    symbol.toUpperCase(),
  ]);
  return !!row;
}

export async function fetchSavedTickers(): Promise<Ticker[]> {
  return db.getAllAsync<Ticker>(`
    SELECT * FROM tickers
  `);
}

export async function clearTickers(): Promise<void> {
  await db.runAsync(`DELETE FROM tickers`);
}
