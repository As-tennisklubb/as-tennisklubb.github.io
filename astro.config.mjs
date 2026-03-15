    // @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";

export default defineConfig({
  site: "https://as-tennisklubb.github.io",
  base: "/",

  prefetch: {
    prefetchAll: true,
  },

  integrations: [
    svelte(),
    sitemap({
      namespaces: {
        news: false,
        xhtml: false,
        image: false,
        video: false,
      },
      serialize(item) {
        const url = item.url;
        if (url === "https://as-tennisklubb.github.io/") {
          item.priority = 1.0;
          item.changefreq = "weekly";
        } else if (/\/(trening|baner|nyheter|utstyr|om-klubben|english|medlemskap)\/$/.test(url)) {
          item.priority = 0.8;
          item.changefreq = "monthly";
        } else {
          item.priority = 0.5;
          item.changefreq = "monthly";
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
