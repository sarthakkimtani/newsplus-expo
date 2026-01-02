export async function GET(req: Request) {
  const url = "https://newsapi.org/v2/top-headlines?category=business";

  try {
    const res = await fetch(url, {
      headers: {
        "X-Api-Key": process.env.NEWS_API_KEY as string,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      return Response.json({ error: "NewsAPI error", message: text }, { status: res.status });
    }

    const data = await res.json();
    return Response.json(data);
  } catch (err: any) {
    return Response.json({ error: "Failed to fetch news", message: err.message }, { status: 500 });
  }
}
