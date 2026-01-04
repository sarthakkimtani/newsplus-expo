import { z } from "zod";

const ApiArticleSchema = z.object({
  source: z.object({
    name: z.string(),
  }),
  author: z.string().nullable(),
  title: z.string(),
  description: z.string().nullable(),
  url: z.string().url(),
  urlToImage: z.string().url().nullable(),
  publishedAt: z.string(),
});

export const ArticleSchema = ApiArticleSchema.transform(({ source, ...rest }) => ({
  ...rest,
  source: source.name,
}));

export const HeadlineSchema = z.array(ArticleSchema);

export type Article = z.infer<typeof ArticleSchema>;
export type Headline = z.infer<typeof HeadlineSchema>;
