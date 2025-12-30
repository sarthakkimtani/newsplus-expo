import { create } from "zustand";

import { Article } from "@/utils/types/article";

type ArticlesStore = {
  articlesByUrl: Record<string, Article>;

  setArticles: (articles: Article[]) => void;
  clearArticles: () => void;

  getArticleByUrl: (url: string) => Article | undefined;
};

export const useArticlesStore = create<ArticlesStore>((set, get) => ({
  articlesByUrl: {},

  setArticles: (articles) =>
    set({
      articlesByUrl: Object.fromEntries(articles.map((article) => [article.url, article])),
    }),

  clearArticles: () => set({ articlesByUrl: {} }),

  getArticleByUrl: (url) => get().articlesByUrl[url],
}));
