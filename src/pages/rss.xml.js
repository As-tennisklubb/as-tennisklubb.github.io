import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("news", ({ data }) => !data.draft);
  const sorted = posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: "Nyheter – Ås Tennisklubb",
    description: "Siste nyheter fra Ås Tennisklubb",
    site: context.site,
    trailingSlash: false,
    customData: `<language>no</language>`,
    items: sorted.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.ingress ?? post.data.description,
      link: `/nyheter/${post.id}`,
    })),
  });
}
