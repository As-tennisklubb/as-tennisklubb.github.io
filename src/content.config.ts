import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    author: z.string().optional(),
    categories: z.union([
      z.array(z.string()),
      z.string().transform(s => [s]),
    ]).optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
    cover: z.string().optional(),
    ingress: z.string().optional(),
    attachments: z.array(z.string()).optional(),
  }),
});

export const collections = {
  news,
};