// @ts-check
import eslintPluginAstro from "eslint-plugin-astro";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  // ─── Layer 1 — Astro ESLint ─────────────────────────────────────
  // Code quality, Astro syntax, frontmatter/template structure.
  ...eslintPluginAstro.configs["flat/recommended"],

  // TypeScript support for Astro frontmatter.
  // astro-eslint-parser delegates script parsing to @typescript-eslint/parser.
  {
    files: ["*.astro", "**/*.astro"],
    languageOptions: {
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
    },
  },

  // ─── Layer 2 — Tailwind lint ────────────────────────────────────
  // We do not use eslint-plugin-tailwindcss in this project.
  // Tailwind quality is handled by:
  //   • prettier-plugin-tailwindcss  → class sorting (official, v4-aware)
  //   • custom design-lint           → design-system rules
  //   • eslint-plugin-astro          → general Astro quality
  //
  // This is a deliberate choice to keep the setup stable in our
  // Tailwind CSS v4 / CSS-first configuration.
  //
  // If eslint-plugin-tailwindcss gains reliable v4 support, add it here:
  //   import tailwindcss from "eslint-plugin-tailwindcss";
  //   ...tailwindcss.configs["flat/recommended"],

  // ─── Prettier compat — must be last ────────────────────────────
  // Disables ESLint rules that conflict with Prettier formatting.
  eslintConfigPrettier,

  // ─── Ignores ───────────────────────────────────────────────────
  {
    ignores: ["dist/", ".astro/", "node_modules/"],
  },
];
