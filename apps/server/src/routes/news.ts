import { Request, Response, Router } from "express";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const url = "https://newsapi.org/v2/top-headlines?category=business";

  try {
    const response = await fetch(url, {
      headers: {
        "X-Api-Key": process.env.NEWS_API_KEY as string,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      res.status(response.status).json({ error: "API error", message: text });
      return;
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: "Failed to fetch news", message });
  }
});

export default router;
