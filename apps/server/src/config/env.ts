export const env = {
  port: process.env.PORT || 3000,
  stocksApiKey: process.env.STOCKS_API_KEY!,
  newsApiKey: process.env.NEWS_API_KEY!,
} as const;
