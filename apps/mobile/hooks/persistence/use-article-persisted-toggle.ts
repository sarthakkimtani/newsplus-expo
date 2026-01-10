import { Article } from "@newsplus/schemas";

import { usePersistedToggle } from "@/hooks/persistence/use-persisted-toggle";
import { deleteArticle, isArticleSaved, saveArticle } from "@/lib/db/articles";

export const useArticlePersistedToggle = (article: Article) =>
  usePersistedToggle({
    key: ["local", "article", article.url],
    check: () => isArticleSaved(article.url),
    save: () => saveArticle(article),
    remove: () => deleteArticle(article.url),
    errors: {
      save: "Failed to add save article",
      remove: "Failed to remove article",
    },
  });
