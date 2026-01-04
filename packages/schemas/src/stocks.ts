import { z } from "zod";

// EOD Route
export const EodStockData = z
  .object({
    name: z.string(),
    symbol: z.string(),
    open: z.number(),
    high: z.number(),
    low: z.number(),
    close: z.number(),
  })
  .transform((data) => ({
    name: data.name,
    symbol: data.symbol,
    open: data.open,
    high: data.high,
    low: data.low,
    close: data.close,
  }));

export const EodDataSchema = z.array(EodStockData);

export type EodData = z.infer<typeof EodDataSchema>;

// Stock Ticker Route
export const HeadquartersSchema = z.object({
  city: z.string().optional(),
  region: z.string().optional(),
  regionDescription: z.string().optional(),
});

export const StockProfileSchema = z
  .object({
    name: z.string(),
    ticker: z.string(),
    sector: z.string(),
    industry: z.string(),
    ipo_date: z.string().nullable(),
    date_founded: z.string().nullable(),
    full_time_employees: z.string(),
    website: z.string(),
    about: z.string(),
    address: z.object({
      city: z.string().nullable(),
      stateOrCountry: z.string().nullable(),
      state_or_country_description: z.string().nullable(),
    }),
  })
  .transform((data) => ({
    name: data.name,
    ticker: data.ticker,
    sector: data.sector,
    industry: data.industry,
    ipoDate: data.ipo_date,
    dateFounded: data.date_founded,
    employees: data.full_time_employees,
    website: data.website,
    about: data.about,
    headquarters: {
      city: data.address.city,
      region: data.address.stateOrCountry,
      regionDescription: data.address.state_or_country_description,
    },
  }));

export type StockProfile = z.infer<typeof StockProfileSchema>;
