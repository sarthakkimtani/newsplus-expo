export interface APIArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface ArticleResponse {
  status: string;
  totalResults: number;
  articles: APIArticle[];
}

export type Article = {
  source: string;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
};

export const mapArticle = (article: APIArticle): Article => {
  return {
    source: article.source.name,
    author: article.author,
    title: article.title,
    description: article.description,
    url: article.url,
    urlToImage: article.urlToImage,
    publishedAt: article.publishedAt,
  };
};
