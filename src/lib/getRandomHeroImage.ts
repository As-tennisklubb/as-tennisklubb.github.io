import fs from "node:fs";
import path from "node:path";

/**
 * Returnerer tilfeldig hero-basepath fra public/heroes/{category}/
 *
 * Eksempel retur:
 * /heroes/tennis/tennis-01
 *
 * Ikke:
 * /heroes/tennis/tennis-01-1440.webp
 */
export function getRandomHeroImage(category: string): string | undefined {
  const heroDir = path.join(process.cwd(), "public", "heroes", category);

  if (!fs.existsSync(heroDir)) return undefined;

  const files = fs
    .readdirSync(heroDir)
    .filter((f) => /\.(webp|avif)$/i.test(f))
    .map((file) => {
      const match = file.match(/^(.*)-\d+\.(webp|avif)$/i);
      return match?.[1];
    })
    .filter(Boolean) as string[];

  const uniqueBases = [...new Set(files)];

  if (uniqueBases.length === 0) return undefined;

  const picked = uniqueBases[Math.floor(Math.random() * uniqueBases.length)];

  return `${import.meta.env.BASE_URL}heroes/${category}/${picked}`;
}
