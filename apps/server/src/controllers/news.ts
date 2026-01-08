import { HeadlineSchema } from "@newsplus/schemas";
import { Request, Response } from "express";

import { API_URLS, env } from "../config";

export const getHeadlines = async (_req: Request, res: Response) => {
  const url = `${API_URLS.newsapi}/top-headlines?category=business`;

  try {
    const response = await fetch(url, {
      headers: { "X-Api-Key": env.newsApiKey },
    });

    if (!response.ok) {
      const text = await response.text();
      res.status(response.status).json({ error: "API error", message: text });
      return;
    }

    const { articles } = await response.json();
    const result = HeadlineSchema.safeParse(articles);

    if (!result.success) {
      res.status(502).json({ error: "Data parsing failed" });
      return;
    }

    res.json(result.data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to fetch news", message });
  }
};
