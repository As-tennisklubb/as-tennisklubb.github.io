// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { EnumChangefreq } from "sitemap";

export default defineConfig({
  site: "https://aastk.no",
  base: "/",

  prefetch: {
    prefetchAll: true,
  },

  integrations: [
    sitemap({
      filter: (page) => !page.includes("/hero-test"),
      namespaces: {
        news: false,
        xhtml: false,
        image: false,
        video: false,
      },
      serialize(item) {
        const url = item.url;
        if (url === "https://aastk.no/") {
          item.priority = 1.0;
          item.changefreq = EnumChangefreq.WEEKLY;
        } else if (/\/(baner|baner\/tennis|baner\/padel|baner\/bordtennis|nyheter|om-klubben|english|medlemskap|kontakt|arrangementer)\/$/.test(url)) {
          item.priority = 0.8;
          item.changefreq = EnumChangefreq.MONTHLY;
        } else {
          item.priority = 0.5;
          item.changefreq = EnumChangefreq.MONTHLY;
        }
        return item;
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  experimental: {
    queuedRendering: {
      enabled: true,
    },
  },
});
