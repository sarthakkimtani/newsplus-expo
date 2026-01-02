import { db } from "@/lib/db";
import { Article } from "@/utils/types/article";

export function saveArticle(article: Article) {
  db.runSync(
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

export function deleteArticle(url: string) {
  db.runSync(
    `
    DELETE FROM articles
    WHERE url = ?
    `,
    [url]
  );
}

export function isArticleSaved(url: string): boolean {
  const row = db.getFirstSync<{ id: number }>(
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

export function clearArticles() {
  db.runSync(`
    DELETE FROM articles
  `);
}

export function fetchSavedArticles(): Article[] {
  return db.getAllSync<Article>(`
    SELECT * FROM articles
    ORDER BY publishedAt DESC
  `);
}
