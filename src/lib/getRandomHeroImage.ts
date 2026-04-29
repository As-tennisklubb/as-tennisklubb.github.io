import fs from "node:fs";
import path from "node:path";

/**
 * Returnerer en tilfeldig bilde-URL fra public/heroes/{category}/.
 * Brukes ved build-time for å velge et hero-bakgrunnsbilde.
 */
export function getRandomHeroImage(category: string): string | undefined {
  const heroDir = path.join(process.cwd(), "public", "heroes", category);

  if (!fs.existsSync(heroDir)) return undefined;

  const files = fs.readdirSync(heroDir).filter((f) => /\.(webp|jpg|avif|png)$/i.test(f));
  if (files.length === 0) return undefined;

  const picked = files[Math.floor(Math.random() * files.length)];
  return `${import.meta.env.BASE_URL}heroes/${category}/${picked}`;
}
