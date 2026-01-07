import { Article } from "@newsplus/schemas";

import { db } from "@/lib/db";

export async function saveArticle(article: Article): Promise<void> {
  await db.runAsync(
    `
    INSERT OR IGNORE INTO articles
    (source, author, title, description, url, urlToImage, publishedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      article.source,
      article.author,
      article.title,
      article.description,
      article.url,
      article.urlToImage,
      article.publishedAt,
    ]
  );
}

export async function deleteArticle(url: string): Promise<void> {
  await db.runAsync(
    `
    DELETE FROM articles
    WHERE url = ?
    `,
    [url]
  );
}

export async function isArticleSaved(url: string): Promise<boolean> {
  const row = await db.getFirstAsync<{ id: number }>(
    `
    SELECT id
    FROM articles
    WHERE url = ?
    LIMIT 1
    `,
    [url]
  );

  return !!row;
}

export async function clearArticles(): Promise<void> {
  await db.runAsync(`
    DELETE FROM articles
  `);
}

export async function fetchSavedArticles(): Promise<Article[]> {
  return db.getAllSync<Article>(`
    SELECT * FROM articles
    ORDER BY publishedAt DESC
  `);
}
